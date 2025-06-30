import httpStatus from 'http-status';
import nodemailer from 'nodemailer';

import { config } from '../../config/config.js';
import { AppException } from './appException.lib.js';

export class EmailService {
  public name = 'EmailService';

  public static async sendEmail(subject: string, html: string, to_email: string): Promise<void> {
    try {
      const mail_transport = nodemailer.createTransport({
        host: config.smtp.SMTP_HOST,
        port: config.smtp.SMTP_PORT,
        auth: { user: config.smtp.SMTP_USER, pass: config.smtp.SMTP_PASSWORD },
      });

      const res = await mail_transport.sendMail({
        from: config.email.EMAIL_FROM,
        to: to_email,
        replyTo: config.email.EMAIL_FROM,
        subject: subject,
        html: html,
      });

      console.log('email log', { res });
    } catch (error) {
      AppException.exceptionHandler(error, 'Failed to send email', httpStatus.INTERNAL_SERVER_ERROR, {});
    }
  }
}
