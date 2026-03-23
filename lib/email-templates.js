// lib/email-templates.js

/**
 * Builds the worksheet delivery email HTML.
 * @param {string} recipientEmail - The recipient's email for the unsubscribe link
 * @returns {string} Complete HTML email
 */
function buildWorksheetEmail(recipientEmail) {
  const unsubscribeUrl = `https://www.artfulroots.co/api/unsubscribe?email=${encodeURIComponent(recipientEmail)}`;

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
      Thank you for signing up!
    </h1>
    <p style="font-family:Georgia,serif;font-size:15px;color:#6B6560;
              line-height:1.75;margin:0 0 32px;">
      We're preparing your free phonics worksheets. You'll receive them
      in a follow-up email soon. In the meantime, try Clean Reader
      with your child — audio first, paper second.
    </p>

    <!-- App bridge panel -->
    <div style="background:#2A2724;border-radius:4px;
                padding:24px 28px;margin-bottom:40px;">
      <p style="font-family:Georgia,serif;font-style:italic;
                font-size:14px;color:rgba(245,240,232,0.55);
                margin:0 0 16px;line-height:1.8;">
        Open Clean Reader and tap through today's letters.
        Audio first — paper second.
      </p>
      <a href="https://www.artfulroots.co"
         style="font-family:sans-serif;font-size:13px;color:#C4694A;
                font-weight:500;text-decoration:none;">
        Download Clean Reader — Free on iOS →
      </a>
    </div>

    <!-- Footer -->
    <p style="font-family:sans-serif;font-size:11px;color:#A09890;
              line-height:1.7;margin:0;">
      You're receiving this because you signed up at
      <a href="https://www.artfulroots.co"
         style="color:#A09890;text-decoration:underline;">
        www.artfulroots.co
      </a>.<br/>
      No ads. No tracking.
      <a href="${unsubscribeUrl}"
         style="color:#A09890;text-decoration:underline;">
        Unsubscribe
      </a>
    </p>

  </div>
</body>
</html>`;
}

module.exports = { buildWorksheetEmail };
