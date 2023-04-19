const sgMail = require("@sendgrid/mail");
const cors = require("micro-cors")();

const send = cors(async (req, res) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const { subject, html } = JSON.parse(req.body);

  if (
    req.headers.origin === process.env.HOST ||
    req.headers.origin === "https://barkat-3d-ville.com"
  ) {
    try {
      await sgMail.send({
        from: "order@barkat-3d-ville.com",
        to: "order@barkat-3d-ville.com",
        cc: "sergii.barkat@gmail.com",
        subject,
        html,
      });
      res.status(200).send("Message sent successfully.");
    } catch (error) {
      console.error("ERROR", error);
      res.status(400).send({
        reason: "Message not sent, check email server.",
        error: error?.message,
      });
    }
  } else {
    res.status(400).send({
      reason: "access denied",
      error: "don't have access",
    });
  }
});

export default send;
