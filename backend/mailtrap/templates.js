const forgotPasswordTemplate = `
  <html>
    <body style="font-family: Arial, sans-serif; color: #333;">
      <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
        <h2 style="color: #007bff;">Reset Your Password</h2>
        <p>Dear User,</p>
        <p>We received a request to reset your password. Please click the button below to reset your password:</p>
        <div style="margin: 20px 0;">
          <a href="resetLink" style="padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px;">Reset Password</a>
        </div>
        <p>If you did not request this, please ignore this email.</p>
        <p>This link will expire in 1 hour.</p>
        <br>
        <p>Best regards,</p>
        <p>Learnify</p>
      </div>
    </body>
  </html>
`;

module.exports = { forgotPasswordTemplate };
