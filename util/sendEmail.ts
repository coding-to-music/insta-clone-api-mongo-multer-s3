import nodemailer from "nodemailer";

export async function sendEmail(email: string, subject: string, body: string) {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      service: process.env.EMAIL_SERVICE,
      port: 587,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject,
      html: body,
    });
    console.log(subject + ", sent to " + email + " successfully");
  } catch (err) {
    console.log(err);
  }
}

export default sendEmail;
