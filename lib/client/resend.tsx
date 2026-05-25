import { Resend } from 'resend';
import { getEmailSafeColors } from '@/lib/theme-source';

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  contactType: string;
  message: string;
}

interface ResendResponse {
  success: boolean;
  message: string;
  error?: string;
}

class ResendClient {
  private resend: Resend;

  constructor() {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error('Missing RESEND_API_KEY environment variable');
    }
    this.resend = new Resend(apiKey);
  }

  async sendContactFormEmail(
    contactData: ContactFormData,
    fromEmail,
    toEmail,
  ): Promise<ResendResponse> {
    try {
      const emailPayload = {
        from: fromEmail,
        to: [toEmail],
        replyTo: contactData.email,
        subject: `Contact Form: ${contactData.contactType}`,
        html: this.generateEmailHTML(contactData),
        text: this.generateEmailText(contactData),
      };

      const result = await this.resend.emails.send(emailPayload);

      const { data, error } = result;

      if (error) {
        return {
          success: false,
          message: 'Failed to send email',
          error: error.message,
        };
      }

      return {
        success: true,
        message: 'Contact form email sent successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to send contact form email',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  private generateEmailHTML(contactData: ContactFormData): string {
    const colors = getEmailSafeColors();
    
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Contact Form Submission</title>
          <style>
            body { 
              font-family: Georgia, 'Times New Roman', serif; 
              line-height: 1.6; 
              color: ${colors.foreground}; 
              margin: 0; 
              padding: 0; 
              background: ${colors.background};
            }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { 
              background: ${colors.primary}; 
              color: ${colors.primaryForeground}; 
              padding: 30px 20px; 
              border-radius: 8px 8px 0 0; 
            }
            .header h2 {
              margin: 0;
              font-size: 24px;
              font-weight: 400;
              letter-spacing: 0.5px;
            }
            .header p {
              margin: 8px 0 0 0;
              opacity: 0.9;
              font-size: 14px;
            }
            .content { 
              background: ${colors.card}; 
              padding: 30px 20px; 
            }
            .contact-details { 
              background: ${colors.background}; 
              padding: 20px; 
              border-radius: 6px; 
              margin: 0 0 20px 0;
              border: 1px solid ${colors.border};
            }
            .contact-details h3 {
              margin-top: 0;
              margin-bottom: 15px;
              color: ${colors.primary};
              font-size: 18px;
              font-weight: 400;
            }
            .contact-details p {
              margin: 10px 0;
              font-size: 15px;
            }
            .message-box { 
              background: ${colors.background}; 
              padding: 20px; 
              border-left: 4px solid ${colors.primary}; 
              margin: 20px 0 0 0;
              border-radius: 0 6px 6px 0;
            }
            .message-box h3 {
              margin-top: 0;
              margin-bottom: 15px;
              color: ${colors.primary};
              font-size: 18px;
              font-weight: 400;
            }
            .message-box p {
              font-size: 15px;
              line-height: 1.7;
            }
            .footer { 
              background: ${colors.muted}; 
              padding: 20px; 
              border-radius: 0 0 8px 8px; 
              font-size: 13px; 
              color: ${colors.mutedForeground}; 
            }
            .footer p {
              margin: 0 0 8px 0;
            }
            .footer p:last-child {
              margin: 0;
            }
            .label { 
              font-weight: 600; 
              color: ${colors.foreground};
              display: inline-block;
              min-width: 120px;
            }
            a {
              color: ${colors.primary};
              text-decoration: none;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>New Contact Form Submission</h2>
              <p>A Normal Family</p>
            </div>
            
            <div class="content">
              <div class="contact-details">
                <h3>Contact Details</h3>
                <p><span class="label">Name:</span> ${contactData.name}</p>
                <p><span class="label">Email:</span> <a href="mailto:${contactData.email}">${contactData.email}</a></p>
                ${contactData.phone ? `<p><span class="label">Phone:</span> <a href="tel:${contactData.phone}">${contactData.phone}</a></p>` : ''}
                <p><span class="label">Contact Type:</span> ${contactData.contactType}</p>
              </div>
              
              <div class="message-box">
                <h3>Message</h3>
                <p style="white-space: pre-wrap;">${contactData.message}</p>
              </div>
            </div>
            
            <div class="footer">
              <p>This email was sent from the A Normal Family contact form.</p>
              <p>Reply directly to this email to respond to ${contactData.name}.</p>
            </div>
          </div>
        </body>
      </html>
    `;
  }

  private generateEmailText(contactData: ContactFormData): string {
    return `
NEW CONTACT FORM SUBMISSION
A Normal Family

CONTACT DETAILS:
Name: ${contactData.name}
Email: ${contactData.email}
${contactData.phone ? `Phone: ${contactData.phone}` : ''}
Contact Type: ${contactData.contactType}

MESSAGE:
${contactData.message}

---
This email was sent from the A Normal Family contact form.
Reply directly to this email to respond to ${contactData.name}.
    `.trim();
  }

}

export const resendClient = new ResendClient();
export type { ContactFormData, ResendResponse };

function getEmailSenderConfiguration() {
  return {
    fromName: 'Anna Wallace Org',
    contact: 'contact@anna-wallace-org.com',
  };
}
