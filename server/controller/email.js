import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

const config = dotenv.config();

/* eslint-disable no-console */

export default {
  notification(text, destination, subject) {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: config.parsed.ADMIN_EMAIL_ACCOUNT,
        pass: config.parsed.ADMIN_EMAIL_PASSWORD
      }
    });

    const message = text;
    const destinationEmail = destination;
    const emailSubject = subject;

    const mailOptions = {
      from: 'paradisekelechi@gmail.com',
      to: destinationEmail,
      subject: emailSubject,
      html: `<h1><b>${message}</b></h1>`
    };

    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        console.log('Error encountered when sending mail');
        console.log(error);
      } else {
        console.log(`Email sent to ${destinationEmail} successfully`);
      }
    });
  }
};
