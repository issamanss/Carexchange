const nodemailer = require("nodemailer");

async function sendotpEmail(email, otp) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.email, 
      pass: process.env.app_pass,
    },
  });

  const mailOptions = {
    from:process.env.email,
    to: email,
    subject: "Your OTP for Registration",
    text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
  };

  await transporter.sendMail(mailOptions);
}
module.exports=sendotpEmail;