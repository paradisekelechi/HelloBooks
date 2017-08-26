import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
const config = dotenv.config();

export default {
    notification(text, destination, subject) {
        const transporter =  nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: config.parsed.ADMIN_EMAIL_ACCOUNT,
                pass: config.parsed.ADMIN_EMAIL_PASSWORD
            }
        });

        let message = text ;
        let destinationEmail = destination;
        let emailSubject = subject;

        const mailOptions = {
            from: 'paradisekelechi@gmail.com',
            to: destinationEmail,
            subject: emailSubject,
            html: '<h1><b>'+message+'</b></h1>'
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if(error){
                console.log('Error encountered when sending mail');
                console.log(error);
            }else{
                console.log('Email sent to ' + destinationEmail + ' successfully')
            }
        });
    }
}