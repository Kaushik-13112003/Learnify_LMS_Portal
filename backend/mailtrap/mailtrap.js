const { MailtrapClient } = require("mailtrap");

const TOKEN = "79f8b9d777c60da16c76d0d59ab8f785";

const mailtrapClient = new MailtrapClient({
  token: TOKEN,
});

const sender = {
  email: "mailtrap@demomailtrap.com",
  name: "Mailtrap Test",
};

module.exports = { mailtrapClient, sender };
