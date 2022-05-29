import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "500454cdf2e7ab",
      pass: "487d1d3490f0d5"
    }
  });

export class NodemailerMailAdapter implements MailAdapter {

    async sendMail({subject, body}: SendMailData) {
        await transport.sendMail({
        from : 'Equipe Feedget <oi@feedget.com>',
        to: 'Wyllton Junior <wyllton85@gmail.com>',
         subject: subject,
         html: body,
    })
    }
}