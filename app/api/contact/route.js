import sgMail from '@sendgrid/mail';
import { NextResponse } from 'next/server';

// Set API key
sgMail.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_API_KEY);

// Validation function
const validateForm = (data) => {
  const errors = {};

  if (!data.name || data.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters long';
  }

  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!data.mobile || !/^[0-9]{10,15}$/.test(data.mobile.replace(/\s+/g, ''))) {
    errors.mobile = 'Please enter a valid mobile number (10-15 digits)';
  }

  if (!data.subject || data.subject.trim().length < 3) {
    errors.subject = 'Subject must be at least 3 characters long';
  }

  if (!data.message || data.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters long';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, mobile, subject, message } = body;

    // Validate form data
    const validation = validateForm({ name, email, mobile, subject, message });
    if (!validation.isValid) {
      return NextResponse.json({
        success: false,
        message: 'Validation failed',
        errors: validation.errors
      }, { status: 400 });
    }

    const fromEmail = process.env.NEXT_PUBLIC_FROM_EMAIL;
    const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

    // Email to admin
    const adminEmailData = {
      to: adminEmail,
      from: fromEmail,
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333; border-bottom: 2px solid #8b5cf6; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Mobile:</strong> ${mobile}</p>
            <p><strong>Subject:</strong> ${subject}</p>
          </div>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #333;">Message:</h3>
            <div style="background-color: #ffffff; padding: 15px; border-left: 4px solid #8b5cf6; margin: 10px 0;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #6b7280;">
            <p>This email was sent from the contact form on your website.</p>
          </div>
        </div>
      `,
    };

    // Email to user (confirmation)
    const userEmailData = {
      to: email,
      from: fromEmail,
      subject: 'Thank you for contacting us - We will be in touch soon',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333; border-bottom: 2px solid #8b5cf6; padding-bottom: 10px;">
            Thank You for Reaching Out
          </h2>
          
          <div style="margin: 20px 0; line-height: 1.6;">
            <p>Dear ${name},</p>
            
            <p>Thank you for contacting us through our website. Your message has been successfully received and we appreciate you taking the time to reach out.</p>
            
            <p>Mr. Lalit Gautam will review your inquiry and get back to you within 24-48 hours. We value your interest and look forward to connecting with you soon.</p>
          </div>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Your Message Details:</h3>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <div style="background-color: #ffffff; padding: 15px; border-left: 4px solid #8b5cf6; margin: 10px 0;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p>Best regards,</p>
            <p><strong>Lalit Gautam's Team</strong></p>
          </div>
          
          <div style="margin-top: 20px; font-size: 12px; color: #6b7280;">
            <p>This is an automated confirmation email. Please do not reply to this message.</p>
          </div>
        </div>
      `,
    };

    // Send both emails
    await Promise.all([
      sgMail.send(adminEmailData),
      sgMail.send(userEmailData)
    ]);

    return NextResponse.json({
      success: true,
      message: 'Emails sent successfully'
    });

  } catch (error) {
    console.error('SendGrid Error:', error);
    
    return NextResponse.json({
      success: false,
      message: 'Failed to send emails. Please try again later.'
    }, { status: 500 });
  }
}