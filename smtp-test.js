import nodemailer from "nodemailer";

async function testSMTP() {
  let transporter = nodemailer.createTransport({
    host: "sbg106.truehost.cloud",
    port: 465, // or 465 for SSL
    secure: true, // true for port 465, false for 587
    auth: {
      user: "odyss.travels@odyss.ng",
      pass: "*FVNjpHzrG?#",
    },
  });

  let info = await transporter.sendMail({
    from: '"Test" <odyss.travels@odyss.ng>',
    to: "divinewisdom.dev@gmail.com",
    subject: "SMTP test",
    text: "Hello, this is a test email to check SMTP!",
  });

  console.log("Message sent: %s", info.messageId);
}

testSMTP().catch(console.error);
