import nodemailer, { SendMailOptions } from 'nodemailer';
import { EmailOptions } from '../interface/email';

const sendMail = async (options: EmailOptions) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
        },
        tls: {
            rejectUnauthorized: false,
        }
    });
    
    const emailOptions: SendMailOptions = {
        from: ` <${process.env.EMAIL_USERNAME}>`,
        to: options.email,
        subject: options.subject,
        text: options.message,
        html: `<div style="background-color:#F6F5F5;padding:2%;margin:2%">
                   <h1>${options.subject}</h1>
                   <p>${options.message}</p>
               </div>`,
    };

    await transporter.sendMail(emailOptions);
};

export default sendMail;