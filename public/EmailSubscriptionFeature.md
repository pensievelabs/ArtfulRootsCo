# Agent Prompt — Clean Reader Website: Email Capture, Worksheet Delivery & List Management
## What You Are Building

A complete, production-ready email capture and delivery workflow with the following features:

1. **Two free worksheets** — download instantly with no email required (direct links)
2. **Full pack of 6 worksheets** — gated behind an email form; triggers delivery email
3. **Email delivery** — sends a branded HTML email with PDF download links via Resend
4. **Email list** — every subscriber is added to a Resend Audience for future broadcasts
5. **Unsubscribe** — fully compliant; Resend handles it automatically on broadcasts, plus a custom unsubscribe page for manual requests
6. **Input validation** — client-side and server-side
7. **Error handling** — graceful failures at every step, never punishes the user
8. **Loading and success states** — clear UI feedback on form submission
9. **Duplicate handling** — re-submitting an existing email silently succeeds (Resend contacts are idempotent)
10. **Environment variable security** — all secrets in Vercel env vars, never in code

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Hosting | Vercel (already configured) |
| Serverless functions | Vercel API routes (`/api/*.js`) — Node.js |
| Email sending + list | Resend (free tier: 3,000 emails/mo, 50,000 contacts) |
| PDF storage | Google Drive (direct download links, publicly shared) |
| Environment secrets | Vercel Environment Variables |
| Frontend | Vanilla HTML/CSS/JS — no framework |
| Package manager | npm |

---

## Final Project Structure

Build to this exact structure. Do not deviate.

```
project-root/
├── public/
│   ├── index.html              ← existing, do not modify
│   └── worksheets.html         ← existing, wire up forms only (see Step 9)
├── api/
│   ├── subscribe.js            ← main endpoint: send email + add to list
│   └── unsubscribe.js          ← optional: custom unsubscribe page
├── lib/
│   └── email-templates.js      ← HTML email builder, separated for cleanliness
├── .env.local                  ← local dev only, in .gitignore
├── .gitignore
├── package.json
├── package-lock.json
└── vercel.json                 ← optional, only if CORS or routing config needed
```

---

## Step 1 — package.json

Create or update `package.json` with exactly this content:

```json
{
  "name": "cleanreader-site",
  "version": "1.0.0",
  "private": true,
  "dependencies": {
    "resend": "^3.2.0"
  },
  "engines": {
    "node": ">=18"
  }
}
```

Run `npm install` after creating this file.

---

## Step 2 — .gitignore

Create `.gitignore` with at minimum:

```
node_modules/
.env.local
.env
.DS_Store
```

---

## Step 3 — .env.local (local development only)

Create `.env.local` for local testing. This file must NEVER be committed.

```
RESEND_API_KEY=re_YOUR_KEY_HERE
RESEND_AUDIENCE_ID=YOUR_AUDIENCE_ID_HERE
```

Both values are placeholders. The developer fills them in after completing the Resend setup steps described later in this prompt.

---

## Step 4 — lib/email-templates.js

Create `lib/email-templates.js`. This file exports a single function `buildWorksheetEmail(pack, sheets)` that returns a complete HTML email string.

### Requirements for the email template:

- Matches the Clean Reader brand: background `#FDFBF7`, primary text `#2A2724`, muted text `#6B6560`, accent/links `#C4694A`, font Georgia serif
- Opens with a small Clean Reader logo mark (a terracotta dot + "Clean Reader" wordmark in Georgia)
- Heading: "Your worksheets are ready."
- Subheading: one sentence, calm and direct
- A table listing each worksheet as a clickable download link
- A dark panel (`#2A2724` background) with the "audio first, paper second" message and a link to download Clean Reader on iOS
- Footer with: "You're receiving this because you signed up at cleanreader.app." and the domain link
- A note that unsubscribes are handled automatically (Resend appends the link to broadcasts)
- All styles must be **inline** — no `<style>` tags, no external CSS — email clients strip them
- Must render correctly in Gmail, Apple Mail, and Outlook
- No images — text and color only (images break in many email clients without hosted assets)

```javascript
// lib/email-templates.js

/**
 * Builds the worksheet delivery email HTML.
 * @param {Array} sheets - Array of { name: string, url: string }
 * @returns {string} Complete HTML email
 */
function buildWorksheetEmail(sheets) {
  const linkRows = sheets.map(sheet => `
    <tr>
      <td style="padding:14px 0;border-bottom:1px solid rgba(42,39,36,0.08);">
        <a href="${sheet.url}"
           style="font-family:Georgia,serif;font-size:15px;color:#C4694A;
                  text-decoration:none;font-weight:normal;">
          ↓ ${sheet.name}
        </a>
        <span style="font-size:11px;color:#A09890;
                     margin-left:10px;font-family:sans-serif;">
          PDF
        </span>
      </td>
    </tr>
  `).join('');

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>Your Clean Reader worksheets</title>
</head>
<body style="margin:0;padding:0;background:#F5F0E8;font-family:Georgia,serif;">
  <div style="max-width:540px;margin:0 auto;background:#FDFBF7;
              padding:48px 40px;border-radius:4px;">

    <!-- Logo -->
    <div style="display:flex;align-items:center;margin-bottom:40px;">
      <div style="width:8px;height:8px;border-radius:50%;
                  background:#C4694A;margin-right:8px;"></div>
      <span style="font-family:Georgia,serif;font-size:13px;
                   color:#2A2724;font-weight:normal;">
        Clean Reader
      </span>
    </div>

    <!-- Heading -->
    <h1 style="font-family:Georgia,serif;font-size:24px;font-weight:500;
               color:#2A2724;margin:0 0 10px;line-height:1.3;">
      Your worksheets are ready.
    </h1>
    <p style="font-family:Georgia,serif;font-size:15px;color:#6B6560;
              line-height:1.75;margin:0 0 32px;">
      Click each link to download. Print one at a time, or the full pack at once.
    </p>

    <!-- Sheet links -->
    <table style="width:100%;border-collapse:collapse;margin-bottom:36px;">
      <tr>
        <td style="padding-bottom:10px;
                   border-bottom:1px solid rgba(42,39,36,0.15);">
          <span style="font-family:sans-serif;font-size:10px;font-weight:500;
                       letter-spacing:0.14em;text-transform:uppercase;
                       color:#A09890;">
            Your sheets
          </span>
        </td>
      </tr>
      ${linkRows}
    </table>

    <!-- App bridge panel -->
    <div style="background:#2A2724;border-radius:4px;
                padding:24px 28px;margin-bottom:40px;">
      <p style="font-family:Georgia,serif;font-style:italic;
                font-size:14px;color:rgba(245,240,232,0.55);
                margin:0 0 16px;line-height:1.8;">
        Before each worksheet, open Clean Reader and tap through
        today's letters. Audio first — paper second.
      </p>
      <a href="https://cleanreader.app"
         style="font-family:sans-serif;font-size:13px;color:#C4694A;
                font-weight:500;text-decoration:none;">
        Download Clean Reader — Free on iOS →
      </a>
    </div>

    <!-- Footer -->
    <p style="font-family:sans-serif;font-size:11px;color:#A09890;
              line-height:1.7;margin:0;">
      You're receiving this because you signed up at
      <a href="https://cleanreader.app"
         style="color:#A09890;text-decoration:underline;">
        cleanreader.app
      </a>.<br/>
      No ads. No tracking. Unsubscribe any time using the link below.
    </p>

  </div>
</body>
</html>`;
}

module.exports = { buildWorksheetEmail };
```

---

## Step 5 — api/subscribe.js

This is the main serverless function. It handles the POST request from both email forms on `worksheets.html`.

### Endpoint specification

```
POST /api/subscribe
Content-Type: application/json

Body:
{
  "email": "parent@example.com",
  "pack": "full"   // always "full" from the gate form
}

Success response (200):
{ "success": true }

Validation error (400):
{ "error": "Please enter a valid email address." }

Server error (500):
{ "error": "Something went wrong. Please try again." }
```

### Behavior

1. Validate email — must contain `@` and `.` and be trimmed
2. Send the worksheet delivery email via `resend.emails.send()`
3. Add the contact to the Resend Audience via `resend.contacts.create()`
4. If step 3 fails (e.g. Resend API blip), still return 200 — do not fail the user because the list add failed. Log the error server-side.
5. If step 2 fails, return 500 with a user-friendly message
6. Handle CORS for local development

### PDF sheet definitions

The full pack contains 6 sheets. The developer must replace `YOUR_DRIVE_ID_N` placeholders with real Google Drive file IDs after uploading PDFs.

```javascript
// api/subscribe.js

const { Resend } = require('resend');
const { buildWorksheetEmail } = require('../lib/email-templates');

const resend = new Resend(process.env.RESEND_API_KEY);
const AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID;

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
    await resend.emails.send({
      from:    'Clean Reader <worksheets@cleanreader.app>',
      to:      [cleanEmail],
      subject: 'Your Clean Reader phonics worksheets',
      html:    buildWorksheetEmail(FULL_PACK),
    });
  } catch (emailErr) {
    console.error('[subscribe] Email send failed:', emailErr);
    return res.status(500).json({
      error: 'Something went wrong sending your email. Please try again.',
    });
  }

  // ── Add to audience (non-blocking — failure does not affect user) ──
  try {
    await resend.contacts.create({
      audienceId:   AUDIENCE_ID,
      email:        cleanEmail,
      unsubscribed: false,
    });
  } catch (listErr) {
    // Log but don't fail — email already sent successfully
    console.error('[subscribe] Audience add failed:', listErr);
  }

  return res.status(200).json({ success: true });
};
```

---

## Step 6 — api/unsubscribe.js

This is an optional but recommended endpoint. It provides a custom unsubscribe page a parent can land on if they want to manually opt out (outside of Resend's automatic broadcast unsubscribe footer).

Usage: link to `api/unsubscribe?email=parent@example.com`

```javascript
// api/unsubscribe.js

const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);
const AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID;

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).send('Method not allowed.');
  }

  const { email } = req.query;

  if (!email || !email.includes('@')) {
    return res.status(400).send(errorPage('Invalid unsubscribe link.'));
  }

  try {
    await resend.contacts.update({
      audienceId:   AUDIENCE_ID,
      email:        email.trim().toLowerCase(),
      unsubscribed: true,
    });

    return res.status(200).send(successPage());

  } catch (err) {
    console.error('[unsubscribe] Failed:', err);
    return res.status(500).send(errorPage('Something went wrong. Please email us at hello@cleanreader.app.'));
  }
};

function successPage() {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>Unsubscribed — Clean Reader</title>
</head>
<body style="margin:0;padding:0;background:#FDFBF7;font-family:Georgia,serif;">
  <div style="max-width:480px;margin:120px auto;padding:0 2rem;text-align:center;">
    <div style="width:8px;height:8px;border-radius:50%;background:#C4694A;
                margin:0 auto 2rem;"></div>
    <h1 style="font-size:1.5rem;font-weight:500;color:#2A2724;margin:0 0 1rem;">
      You've been unsubscribed.
    </h1>
    <p style="font-size:0.95rem;color:#6B6560;line-height:1.75;margin:0 0 2rem;">
      You won't receive any further emails from Clean Reader.<br/>
      Your two free worksheets are still available any time.
    </p>
    <a href="https://cleanreader.app/worksheets.html"
       style="font-size:0.85rem;color:#C4694A;font-family:sans-serif;">
      Back to worksheets →
    </a>
  </div>
</body>
</html>`;
}

function errorPage(message) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>Error — Clean Reader</title>
</head>
<body style="margin:0;padding:0;background:#FDFBF7;font-family:Georgia,serif;">
  <div style="max-width:480px;margin:120px auto;padding:0 2rem;text-align:center;">
    <h1 style="font-size:1.5rem;font-weight:500;color:#2A2724;margin:0 0 1rem;">
      Something went wrong.
    </h1>
    <p style="font-size:0.95rem;color:#6B6560;line-height:1.75;margin:0 0 2rem;">
      ${message}
    </p>
    <a href="https://cleanreader.app"
       style="font-size:0.85rem;color:#C4694A;font-family:sans-serif;">
      Return home →
    </a>
  </div>
</body>
</html>`;
}
```

---

## Step 7 — Direct download links (no-email sheets)

The two free sheets that require no email are plain `<a>` links in `worksheets.html`. They must already exist in the HTML. The developer must update the `href` values with the real Google Drive download URLs:

```
https://drive.google.com/uc?export=download&id=YOUR_DRIVE_ID_1
https://drive.google.com/uc?export=download&id=YOUR_DRIVE_ID_3
```

These are the same IDs used in `api/subscribe.js` for sheets 1 and 3 (Letter Sounds A–M and CVC Blending). No API call, no email, no friction.

---

## Step 8 — vercel.json

Create `vercel.json` at the project root to ensure API routes are handled correctly and the public folder is served:

```json
{
  "version": 2,
  "public": true,
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/api/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/public/$1"
    }
  ],
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        { "key": "Access-Control-Allow-Origin",  "value": "*" },
        { "key": "Access-Control-Allow-Methods", "value": "POST, GET, OPTIONS" },
        { "key": "Access-Control-Allow-Headers", "value": "Content-Type" }
      ]
    }
  ]
}
```

> Note: If your Vercel project already has a `vercel.json` or a specific output directory configured, adjust accordingly. Do not overwrite existing routing logic — merge these routes carefully.

---

## Step 9 — JavaScript to add to worksheets.html

Find the closing `</body>` tag in `public/worksheets.html` and replace the existing `<script>` block entirely with the following. This handles all form interactions on the page.

The script must:
- Keep the existing IntersectionObserver scroll animation
- Wire up the gate form (mid-page, full pack)
- Wire up the identity form (bottom of page)
- Handle loading state (button text changes to "Sending…", disabled)
- Handle success state (replace form area with a calm confirmation message)
- Handle error state (restore button, show error message inline)
- Handle Enter key on email inputs
- Validate email client-side before sending the fetch request

```html
<script>
  // ── Scroll animations (keep existing) ──────────────────────────────
  const _io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('visible');
    });
  }, { threshold: 0.07, rootMargin: '0px 0px -30px 0px' });
  document.querySelectorAll('.fade-up').forEach(el => _io.observe(el));


  // ── Shared form submit handler ─────────────────────────────────────
  async function submitEmailForm(emailInput, submitBtn, wrapperEl) {
    const email = (emailInput.value || '').trim();

    // Client-side validation
    if (!email || !email.includes('@') || !email.includes('.')) {
      emailInput.style.borderColor = '#C4694A';
      emailInput.focus();
      return;
    }

    // Reset any previous error state
    emailInput.style.borderColor = '';

    // Loading state
    const originalLabel = submitBtn.innerHTML;
    submitBtn.innerHTML  = 'Sending&hellip;';
    submitBtn.disabled   = true;

    try {
      const response = await fetch('/api/subscribe', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ email, pack: 'full' }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // ── Success — replace form with confirmation ──
        wrapperEl.innerHTML = `
          <p style="
            font-family:'Lora',Georgia,serif;
            font-style:italic;
            font-size:1rem;
            line-height:1.75;
            color:#5A7A5C;
            margin:0;
          ">
            Check your inbox — your worksheets are on their way.
          </p>
          <p style="
            font-family:'DM Sans',sans-serif;
            font-size:0.78rem;
            color:#A09890;
            margin:0.5rem 0 0;
          ">
            Didn't arrive? Check your spam folder, or email
            <a href="mailto:hello@cleanreader.app"
               style="color:#A09890;">hello@cleanreader.app</a>.
          </p>`;
      } else {
        // ── API error — show message, restore button ──
        submitBtn.innerHTML = originalLabel;
        submitBtn.disabled  = false;
        showFormError(wrapperEl, data.error || 'Something went wrong. Please try again.');
      }

    } catch (networkErr) {
      // ── Network error ──
      submitBtn.innerHTML = originalLabel;
      submitBtn.disabled  = false;
      showFormError(wrapperEl, 'Network error — please check your connection and try again.');
    }
  }

  function showFormError(wrapperEl, message) {
    // Remove any existing error message first
    const existing = wrapperEl.querySelector('.form-error');
    if (existing) existing.remove();

    const errEl = document.createElement('p');
    errEl.className = 'form-error';
    errEl.style.cssText = `
      font-family:'DM Sans',sans-serif;
      font-size:0.8rem;
      color:#C4694A;
      margin:0.5rem 0 0;
    `;
    errEl.textContent = message;
    wrapperEl.appendChild(errEl);
  }


  // ── Gate form (mid-page, inside dark gate-bar) ─────────────────────
  const gateForm  = document.querySelector('.gate-form');
  const gateInput = document.querySelector('.gate-input');
  const gateBtn   = document.querySelector('.btn-gate');

  if (gateForm && gateInput && gateBtn) {
    gateBtn.addEventListener('click', () => {
      submitEmailForm(gateInput, gateBtn, gateForm);
    });
    gateInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') submitEmailForm(gateInput, gateBtn, gateForm);
    });
  }


  // ── Identity form (bottom of page) ────────────────────────────────
  const identityForm  = document.querySelector('.identity-form');
  const identityInput = document.querySelector('.identity-input');
  const identityBtn   = identityForm
    ? identityForm.querySelector('button')
    : null;

  if (identityForm && identityInput && identityBtn) {
    identityBtn.addEventListener('click', () => {
      submitEmailForm(identityInput, identityBtn, identityForm);
    });
    identityInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') submitEmailForm(identityInput, identityBtn, identityForm);
    });
  }
</script>
```

---

## Step 10 — Resend account setup (manual steps for developer)

These cannot be automated. Complete them in order:

### 10a — Create Resend account
Go to **resend.com** → sign up → confirm email.

### 10b — Add and verify your domain
1. Resend dashboard → **Domains** → **Add Domain**
2. Enter `cleanreader.app`
3. Resend generates 3 DNS records (SPF, DKIM, MX-style)
4. Add each record in **Vercel dashboard** → your project → **Settings** → **Domains** → your domain → **DNS Records**
5. Return to Resend → **Verify** — wait 5–30 minutes for propagation
6. Status must show green **Verified** before emails will send

### 10c — Create API key
Resend dashboard → **API Keys** → **Create API Key**
- Name: `cleanreader-production`
- Permission: **Full access**
- Copy key — it shows only once

### 10d — Create Audience
Resend dashboard → **Audiences** → **Create Audience**
- Name: `Clean Reader — Parents`
- Copy the **Audience ID** from the page URL or detail view

### 10e — Add env vars to Vercel
Vercel dashboard → your project → **Settings** → **Environment Variables**

Add both variables to **Production**, **Preview**, and **Development**:

```
RESEND_API_KEY      = re_xxxxxxxxxxxxxxxxxxxx
RESEND_AUDIENCE_ID  = xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

---

## Step 11 — Google Drive PDF setup (manual steps for developer)

### 11a — Upload PDFs
1. Go to **drive.google.com**
2. Create a folder: `Clean Reader Worksheets`
3. Upload all 6 PDF files

### 11b — Set sharing permissions
Select all 6 files → right-click → **Share** → **Change to anyone with the link** → **Viewer** → **Done**

### 11c — Extract file IDs
For each file, click the three-dot menu → **Share** → copy the link. Format:
```
https://drive.google.com/file/d/  1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbo  /view
                                   ↑ this is the file ID
```

### 11d — Update api/subscribe.js
Replace each `YOUR_DRIVE_ID_N` placeholder in `ALL_SHEETS` with the real file ID.

### 11e — Update direct download links in worksheets.html
Find the two ungated download buttons in `public/worksheets.html` and update their `href` attributes:
```html
href="https://drive.google.com/uc?export=download&id=YOUR_DRIVE_ID_1"
href="https://drive.google.com/uc?export=download&id=YOUR_DRIVE_ID_3"
```

---

## Step 12 — Deploy

```bash
git add .
git commit -m "feat: add email subscribe API, worksheet delivery, and list management"
git push
```

Vercel detects the push and redeploys automatically. The `api/` folder is automatically treated as serverless functions — no additional Vercel config is needed for this.

### Verify deployment

Test the API is live:
```
GET https://artfulroots.co/api/subscribe
Expected: {"error":"Method not allowed."}
```

If you see that response, the function is deployed and routing correctly.

---

## Step 13 — End-to-end test checklist

Complete every item before considering this done.

- [ ] Visit `worksheets.html` — page loads correctly, no console errors
- [ ] Click "Download PDF" on a free sheet — file downloads immediately, no email required
- [ ] Submit gate form with an invalid email — input border turns terracotta, no API call fires
- [ ] Submit gate form with a valid email — button shows "Sending…" then form area shows success message
- [ ] Check inbox — worksheet email arrives within 30 seconds
- [ ] Email renders correctly in Gmail (web)
- [ ] Email renders correctly in Apple Mail (if available)
- [ ] All 6 PDF links in the email work and download correctly
- [ ] Go to Resend dashboard → Audiences → confirm contact appears in list
- [ ] Submit the same email again — no error, success message appears (idempotent)
- [ ] Submit bottom identity form — same behaviour as gate form
- [ ] Visit `/api/unsubscribe?email=your@email.com` — shows unsubscribe confirmation page
- [ ] Go to Resend dashboard → Audiences → confirm contact is now marked unsubscribed
- [ ] Disable Wi-Fi and submit form — "Network error" message appears, button restores

---

## How unsubscribe works — summary for developer

| Scenario | What happens |
|----------|-------------|
| Parent receives a broadcast email and clicks "Unsubscribe" | Resend's auto-injected footer link fires; contact marked unsubscribed in Audience automatically |
| Parent visits `/api/unsubscribe?email=x` directly | `api/unsubscribe.js` calls `resend.contacts.update()` with `unsubscribed: true`; shows confirmation page |
| Developer unsubscribes someone manually | Resend dashboard → Audiences → find contact → Unsubscribe |
| Parent submits form again after unsubscribing | `resend.contacts.create()` with `unsubscribed: false` re-subscribes them — this is intentional, they actively re-signed up |

Resend **never sends broadcasts to unsubscribed contacts** — this is enforced at the API level, not in your code.

---

## Sending a broadcast campaign (future — no code needed)

When you have something to send to your whole list (new worksheets, app launch, iOS update):

1. Resend dashboard → **Broadcasts** → **Create Broadcast**
2. Select audience: `Clean Reader — Parents`
3. Write subject line and HTML email body (or use the visual editor)
4. Send immediately or schedule
5. Resend skips all contacts with `unsubscribed: true` automatically
6. Every broadcast email includes a legal unsubscribe footer automatically

---

## Free tier limits — when you will hit them

| Service | Free limit | When you'd hit it |
|---------|-----------|-------------------|
| Resend emails | 3,000/month | ~100 new signups/day sustained |
| Resend contacts | 50,000 | Several years at normal growth |
| Vercel functions | 100GB-hours/month | Never at this scale |
| Google Drive | 15GB | ~15,000 PDF downloads (assume 1MB/PDF) |

At 3,000+ emails/month: upgrade Resend to Pro ($20/month).
At 15GB Drive storage: move PDFs to Vercel's own static hosting (just put them in `/public/pdfs/`) — no external storage needed, no cost.

---

## Notes and constraints

- **Do not add a database.** There is no need for one. Resend Audiences is the list. Google Drive is the file store. Vercel is the host.
- **Do not add a frontend framework.** The site is plain HTML. Keep it that way.
- **Do not add analytics scripts.** The brand promise is no tracking. Honour it.
- **Do not modify `public/index.html`** unless fixing a broken direct-download link.
- **All secrets go in environment variables.** Never hardcode API keys.
- **The email delivery and the list add are intentionally decoupled.** A failure adding to the list must never cause a 500 response if the email has already been sent. The user got what they came for.
- **Test with your own email first** before sharing the page publicly.