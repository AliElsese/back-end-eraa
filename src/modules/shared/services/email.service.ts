import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import getConfig from '../../../config/config'

@Injectable()
export class MailService {
    private transporter: nodemailer.Transporter;

    constructor() {
        const config = getConfig();
        const { mailHost, mailPort, mailUser, mailPass } = config.mail;
        this.transporter = nodemailer.createTransport({
            host: mailHost,
            port: parseInt(mailPort, 10),
            auth: {
                user: mailUser,
                pass: mailPass,
            },
        });
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////

    // Password Reset Email
    async sendInvitationCode(to: string, invitationCode: string) {
        const mailOptions = {
            from: 'bugxploretest@outlook.com',
            to,
            subject: 'Assistant Invitation Code',
            html: `
                <html>
                <body style="font-family: Arial, sans-serif; padding: 20px;">
                    <h2>Assistant Invitation Code</h2>
                    <p>Dear ${to},</p>
                    <p>This is your invitation code:</p>
                    <p style="background-color: #4CAF50; color: white; padding: 10px 20px;">${invitationCode}</p>
                    <p>Regards,<br/>A&Z Team</p>
                </body>
                </html>
            `,
        };

        await this.transporter.sendMail(mailOptions);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////

    // Password Reset Email
    async sendPasswordResetEmail(to: string, token: string, firstName: string, userType: string) {
        const resetLink = `http://localhost:3000/${userType}/resetPassword?token=${token}`;
        const mailOptions = {
            from: 'bugxploretest@outlook.com',
            to,
            subject: 'Password Reset Request',
            html: `
                <html>
                <body style="font-family: Arial, sans-serif; padding: 20px;">
                    <h2>Password Reset Request</h2>
                    <p>Dear ${firstName},</p>
                    <p>We received a request to reset your password. If you did not make this request, please ignore this email. Otherwise, click the link below to reset your password:</p>
                    <p><a href="${resetLink}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none;">Reset Password</a></p>
                    <p>If the button above doesn't work, copy and paste the following link into your browser:</p>
                    <p>${resetLink}</p>
                    <p>Regards,<br/>BugXplore Team</p>
                </body>
                </html>
            `,
        };

        await this.transporter.sendMail(mailOptions);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////    

    // Registration Attempt Notification Email
    async sendRegistrationAttemptEmail(to: string) {
        const mailOptions = {
            from: 'bugxploretest@outlook.com',
            to,
            subject: 'Registration Attempt',
            html: `
                <html>
                <body style="font-family: Arial, sans-serif; padding: 20px;">
                    <h2>Registration Attempt</h2>
                    <p>Dear ${to},</p>
                    <p>We noticed a registration attempt using your email address. If this was not you, please make sure to secure your account or report this incident.</p>
                    <p>If you registered and are expecting this message, no further action is needed. If you need assistance, feel free to contact support.</p>
                    <p>Regards,<br/>A&Z Team</p>
                </body>
                </html>
            `,
        };

        await this.transporter.sendMail(mailOptions);
    }
}