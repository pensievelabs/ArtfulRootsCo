// api/unsubscribe.js

const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

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
      email:        email.trim().toLowerCase(),
      unsubscribed: true,
    });

    return res.status(200).send(successPage());

  } catch (err) {
    console.error('[unsubscribe] Failed:', err);
    return res.status(500).send(errorPage('Something went wrong. Please email us at hello@artfulroots.co.'));
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
    <a href="https://www.artfulroots.co/worksheets.html"
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
    <a href="https://www.artfulroots.co"
       style="font-size:0.85rem;color:#C4694A;font-family:sans-serif;">
      Return home →
    </a>
  </div>
</body>
</html>`;
}
