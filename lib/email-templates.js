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
  <div style="max-width:540px;margin:30px auto;background:#FDFBF7;
              padding:48px 40px;border-radius:4px;border:1px solid #EAE3D5;">

    <!-- Logo -->
    <div style="display:flex;align-items:center;margin-bottom:40px;">
      <div style="width:8px;height:8px;border-radius:50%;
                  background:#C4694A;margin-right:8px;"></div>
      <span style="font-family:Georgia,serif;font-size:13px;
                   color:#2A2724;font-weight:normal;letter-spacing:0.02em;">
        CLEAN READER
      </span>
    </div>

    <!-- Heading -->
    <h1 style="font-family:Georgia,serif;font-size:24px;font-weight:500;
               color:#2A2724;margin:0 0 24px;line-height:1.3;">
      Your worksheets are here.
    </h1>

    <div style="font-family:Georgia,serif;font-size:16px;color:#4A4540;
                line-height:1.8;margin:0 0 32px;">
      <p style="margin:0 0 20px;">
        Hi there,
      </p>
      <p style="margin:0 0 20px;">
        I'm Priyank, a parent and the founder of Artful Roots Co. Like you, I was looking for a way to teach my child to read that didn't involve flashing lights, addictive point systems, or "gamified" attention traps.
      </p>
      <p style="margin:0 0 20px;">
        We built Clean Reader to be the "quiet" phonics tool. It fills the one gap paper can't: <strong>the audio.</strong>
      </p>

      <p style="margin:0 0 20px;">
        <strong>The "Audio First" Ritual:</strong><br/>
        Before you sit down with these sheets, open the app with your child. Let them hear the phonemes first. Audio loads the sounds into their memory; the paper then tests if they can retrieve them.
      </p>

      <div style="background:#F5F0E8;border-radius:4px;padding:24px;margin:32px 0;">
        <h3 style="font-size:16px;margin:0 0 12px;color:#2A2724;">Why we built it this way:</h3>
        <ul style="margin:0;padding:0 0 0 20px;color:#5A5550;">
          <li style="margin-bottom:8px;"><strong>100% Offline:</strong> Works anywhere, even on those long flights without Wi-Fi.</li>
          <li style="margin-bottom:8px;"><strong>Completely Private:</strong> No accounts, no data collection, no tracking.</li>
          <li style="margin-bottom:8px;"><strong>Respectful:</strong> No In-App Purchases, no ads, and no addictive loops.</li>
        </ul>
      </div>

      <p style="margin:0 0 24px;">
        You can download the app here:
      </p>
      <div style="margin-bottom:32px;">
        <a href="https://apps.apple.com/us/app/clean-reader-learn-to-read/id6759177993" style="text-decoration:none;display:inline-block;margin-right:12px;vertical-align:middle;">
          <img src="https://www.artfulroots.co/assets/app-store-badge.png" alt="Download on the App Store" height="40" style="border:0;height:40px;display:block;" />
        </a>
        <a href="https://play.google.com/store/apps/details?id=com.cleanreader.app" style="text-decoration:none;display:inline-block;vertical-align:middle;">
          <img src="https://www.artfulroots.co/assets/google-play-badge.png" alt="Get it on Google Play" height="40" style="border:0;height:40px;display:block;" />
        </a>
      </div>

      <div style="margin:36px 0;">
        <a href="https://tinyurl.com/CleanReaderFullSheets" 
           style="display:inline-block;background:#C4694A;color:#FFFFFF;
                  padding:14px 28px;text-decoration:none;border-radius:4px;
                  font-family:sans-serif;font-size:15px;font-weight:500;">
          Download the Full Pack (50+ Sheets)
        </a>
      </div>

      <p style="margin:0;font-style:italic;color:#6B6560;">
        Happy reading,<br/>
        Priyank
      </p>
    </div>

    <!-- Footer -->
    <div style="border-top:1px solid #EAE3D5;padding-top:24px;margin-top:40px;">
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

  </div>
</body>
</html>`;
}



module.exports = { buildWorksheetEmail };
