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
      No ads. No tracking. Unsubscribe any time using the link below.
    </p>

  </div>
</body>
</html>`;
}

module.exports = { buildWorksheetEmail };
