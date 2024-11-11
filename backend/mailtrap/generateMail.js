const { mailtrapClient, sender } = require("./mailtrap");
const { forgotPasswordTemplate } = require("./templates");

const forgotPasswordMail = async (email, resetLink) => {
  const recipients = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipients,
      subject: "Reset your Password", // Corrected typo
      html: forgotPasswordTemplate.replace("resetLink", resetLink), // Corrected typo
      category: "Password Reset", // Corrected typo
    });
    console.log("Email sent successfully:", response);
  } catch (err) {
    console.log("Error sending email:", err);
  }
};

module.exports = { forgotPasswordMail };
