import { SMTPClient, Message } from 'emailjs';
interface EmailParams {
    from?: string;
    subject: string;
    text: string;
    to: string;
    template: string;
}

type MessageResult = {
    err?: Error;
    message?: Message | {
        text: string;
        from: string;
        to: string;
        subject: string;
    };
}

export default class MailClient {
    private _client: SMTPClient;
    private _result: MessageResult = {};
    constructor() {
        this._client = new SMTPClient({
            user: process.env.EMAIL_SERVER_USER,
            password: process.env.EMAIL_SERVER_PASSWORD,
            host: 'mail.gandi.net',
            ssl: true
        });;
    }
    public sendMail = ({ from, subject, text, to }: Omit<EmailParams, 'template'>) => {
        const _this = this;
        this._client.send({
            text,
            from: from ?? 'noreply - LätkäMamma Oy <noreply@latkamamma.fi>',
            to,
            subject,
        }, function (err, message) {
            console.log(err || message);
            if (err) {
                _this._result.err = err;
            }
            _this._result.message = message;
        }

        )
        return this._result
    }
}



