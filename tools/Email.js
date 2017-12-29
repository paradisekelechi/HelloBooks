import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import logger from './Logger';

dotenv.config();

/**
 *
 * @param {String} transactionMessage
 * @returns {String} formatted email message
 */
const mailFormat = (transactionMessage) => {
  return `<div style="font-family: 'Trebuchet MS'; margin-left: 5px;">
  <h4>HelloBooks Notifications</h4>
  <p>Dear user, you just completed a transaction!</p>
  <p >${transactionMessage}</p>
  <p>It has been a pleasure working with you. Visit
  <a href="www.hellobooks.com">HelloBooks Page</a>
  for more pleasure!</p>
  <p>Thanks.</p>
  </div>`;
};

export default {
  /**
   * Notification object
   *
   * @param {String} text
   * @param {String} destination
   * @param {String} subject
   * @returns {undefined}
   */
  notification(text, destination, subject) {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.ADMIN_EMAIL_ACCOUNT,
        pass: process.env.ADMIN_EMAIL_PASSWORD
      }
    });
    const message = text;
    const destinationEmail = destination;
    const emailSubject = subject;
    const mailOptions = {
      from: 'paradisekelechi@gmail.com',
      to: destinationEmail,
      subject: emailSubject,
      html: mailFormat(message)
    };
    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        logger('error', `Error encountered when sending mail: ${error}`);
        return {
          isSent: false,
          message: error
        };
      }
      logger('info', `Email sent to ${destinationEmail} successfully`);
      return {
        isSent: true,
        message: `Email sent to ${destinationEmail} successfully`
      };
    });
  }
};
