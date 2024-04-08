import nodemailer from "nodemailer";
 
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: "aumeralikhan@gmail.com",
    pass: "ymkm yweh mljg wyzd",
  },
});

export const sendEmail = async (email: string, subject: string, text: string) => {
  try {
    // Hardcoded subject and text for OTP authentication
    const info = await transporter.sendMail({
      from: '"From e-commerce" <aumeralikhan@gmail.com>',
      to: email,
      subject: "OTP for Authentication",
      html: `<p>Your <strong>OTP (One-Time Password)</strong> for authentication is: <strong>${text}</strong>. It will be expired in one hour.</p>`,
    });

    if (info) {
      console.log("Verification email sent:", info.messageId);
    }
  } catch (error) {
    console.error("Error sending verification email:", error);
  }
};
