import nodemailer, { Transporter } from 'nodemailer';

import { envs } from "../../config";
import { MailDatasource, SendMailOptions } from "../../domain";

export class MailDatasourceImpl implements MailDatasource {

    private transporter: Transporter;

    constructor(
        mailerService: string, 
        mailerEmail: string,
        mailerEmailPassword: string,
        private readonly postToProvider: boolean
      ) {
        this.transporter = nodemailer.createTransport( {
            service: mailerService,
            auth: {
                user: mailerEmail,
                pass: mailerEmailPassword
            }
          });
    
      }
    
    async send(options: SendMailOptions): Promise<boolean> {
        const { to, subject, htmlBody, attachements = [] } = options;
    
    
        try {
    
          if(this.postToProvider) {
            const sentInformation = await this.transporter.sendMail( {
              to: to,
              subject: subject,
              html: htmlBody,
              attachments: attachements,
            });
          }
    
          return true;
        } catch ( error ) {
          return false;
        }
    }
      
}