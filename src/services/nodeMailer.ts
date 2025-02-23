import nodemailer from "nodemailer";
import { google } from "googleapis";

const CLIENT_ID = process.env.OAUTH_CLIENTID as string;
const CLIENT_SECRET = process.env.OAUTH_CLIENT_SECRET as string;
const REDIRECT_URI = process.env.OAUTH_REDIRECT_URI as string;
const REFRESH_TOKEN = process.env.OAUTH_REFRESH_TOKEN as string;
const EMAIL_USER = process.env.EMAIL_USER as string;

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

export const sendEmail = async (
  appName: string,
  name: string,
  email: string,
  content: string
): Promise<void> => {
  try {
    const accessTokenResponse = await oAuth2Client.getAccessToken();
    if (!accessTokenResponse) {
      throw new Error("Failed to generate access token for email service.");
    }
    const accessToken = accessTokenResponse.token || "";

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: EMAIL_USER,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: `"${appName} Reminder" <${EMAIL_USER}>`,
      to: email,
      subject: "Fitness Goal Reminder: 24 Hours Left!",
      html: `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              padding: 20px;
              margin: 0;
            }
            .container {
              max-width: 600px;
              background: #ffffff;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            }
            h1 {
              color: #333;
              font-size: 24px;
            }
            p {
              color: #555;
              font-size: 16px;
              line-height: 1.5;
            }
            .highlight {
              color: #d9534f;
              font-weight: bold;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Fitness Goal Reminder</h1>
            <p>Dear <strong>${name}</strong>,</p>
            <p>This is a reminder from <strong>${appName}</strong> that your fitness goal is ending in <strong>24 hours</strong>.</p>
            <p>${content}</p>
            <p>Please make sure to complete your goal on time.</p>
            <p>Best regards,<br/><strong>${appName} Team</strong></p>
          </div>
        </body>
      </html>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email sent successfully to ${email}`);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email.");
  }
};
