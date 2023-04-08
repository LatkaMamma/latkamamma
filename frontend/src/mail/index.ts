import path from 'path';
import {createTransport} from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
export interface EmailParams {
    from?: string;
    subject: string;
    text: string;
    to: string;
    html: string;
}

const transporter = createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
    },
});

export async function sendEmail({
    to,
    subject,
    text,
    html,
    from
}: EmailParams): Promise<SMTPTransport.SentMessageInfo> {
    const mailOptions = {
        from: from ?? process.env.EMAIL_DEFAULT_FROM,
        to,
        subject,
        text,
        html,
    };
    return await transporter.sendMail(mailOptions);
}

export * from './types';

