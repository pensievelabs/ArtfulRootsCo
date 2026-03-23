// api/subscribe.js

const { Resend } = require('resend');
const { buildWorksheetEmail } = require('../lib/email-templates');

const resend = new Resend(process.env.RESEND_API_KEY);
const SEGMENT_ID = process.env.RESEND_SEGMENT_ID;

// ─────────────────────────────────────────────
// REPLACE these Google Drive file IDs with your real ones.
// How to get a file ID:
//   1. Upload PDF to Google Drive
//   2. Right-click → Share → Anyone with the link → Viewer
//   3. Copy link: https://drive.google.com/file/d/FILE_ID/view
//   4. Paste FILE_ID below
//   5. Download URL format: https://drive.google.com/uc?export=download&id=FILE_ID
// ─────────────────────────────────────────────
const DRIVE_BASE = 'https://drive.google.com/uc?export=download&id=';

const ALL_SHEETS = [
  {
    name: 'Letter Sounds A–M',
    id:   'YOUR_DRIVE_ID_1',
  },
  {
    name: 'Letter Sounds N–Z',
    id:   'YOUR_DRIVE_ID_2',
  },
  {
    name: 'CVC Blending',
    id:   'YOUR_DRIVE_ID_3',
  },
  {
    name: 'Digraphs: sh · ch · th',
    id:   'YOUR_DRIVE_ID_4',
  },
  {
    name: 'Sight Word Cards',
    id:   'YOUR_DRIVE_ID_5',
  },
  {
    name: 'Decodable Sentences',
    id:   'YOUR_DRIVE_ID_6',
  },
];

// Map to { name, url } for the email template
const FULL_PACK = ALL_SHEETS.map(s => ({
  name: s.name,
  url:  `${DRIVE_BASE}${s.id}`,
}));

function isValidEmail(email) {
  return (
    typeof email === 'string' &&
    email.includes('@') &&
    email.includes('.') &&
    email.trim().length > 5
  );
}

module.exports = async function handler(req, res) {
  console.log('[subscribe] ========================================');
  console.log('[subscribe] Endpoint Hit! Method:', req.method, 'URL:', req.url);
  console.log('[subscribe] Headers:', JSON.stringify(req.headers));
  console.log('[subscribe] Body:', JSON.stringify(req.body));
  // ── CORS ──
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  // ── Parse body ──
  const { email } = req.body || {};
  const cleanEmail = (email || '').trim().toLowerCase();

  // ── Validate ──
  if (!isValidEmail(cleanEmail)) {
    return res.status(400).json({
      error: 'Please enter a valid email address.',
    });
  }

  // ── Send email ──
  try {
    const { data: emailData, error: emailError } = await resend.emails.send({
      from:    'Clean Reader <worksheets@artfulroots.co>',
      to:      [cleanEmail],
      subject: 'Your Clean Reader phonics worksheets',
      html:    buildWorksheetEmail(FULL_PACK),
    });

    if (emailError) {
      console.error('[subscribe] Resend email error response:', JSON.stringify(emailError));
      return res.status(500).json({
        error: 'Something went wrong sending your email. Please try again.',
      });
    }
    console.log('[subscribe] Email sent successfully. ID:', emailData?.id);
  } catch (emailErr) {
    console.error('[subscribe] Email send exception:', emailErr);
    return res.status(500).json({
      error: 'Something went wrong sending your email. Please try again.',
    });
  }

  // ── Add to segment (non-blocking — failure does not affect user) ──
  try {
    console.log('[subscribe] Adding contact to segment. Segment ID:', SEGMENT_ID);
    const { data: contactData, error: contactError } = await resend.contacts.create({
      email:        cleanEmail,
      unsubscribed: false,
      segments:     [{ id: SEGMENT_ID }],
    });

    if (contactError) {
      console.error('[subscribe] Resend contacts.create error response:', JSON.stringify(contactError));
    } else {
      console.log('[subscribe] Contact added successfully:', JSON.stringify(contactData));
    }
  } catch (listErr) {
    // Log but don't fail — email already sent successfully
    console.error('[subscribe] Segment add exception:', listErr);
  }

  return res.status(200).json({ success: true });
};
// Add a global catch to ensure no unhandled promise rejections kill the function silently
process.on('unhandledRejection', (reason, promise) => {
  console.error('[subscribe] Unhandled Rejection at:', promise, 'reason:', reason);
});
