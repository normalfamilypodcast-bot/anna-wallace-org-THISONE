import { type NextRequest, NextResponse } from 'next/server';

import { resendClient, type ContactFormData } from '@/lib/client/resend';
import { getEmailSenderConfiguration } from '@/lib/contact-source';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { name, email, phone, contactType, message } = body;

    // Validate required fields
    if (!name || !email || !contactType || !message) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 },
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email format' },
        { status: 400 },
      );
    }

    // Validate contact type
    const validContactTypes = [
      'Media inquiry',
      'Speaker request',
      'Sponsorship or partnership',
      'Coaching inquiry',
      'Register for event',
      'Other',
    ];
    if (!validContactTypes.includes(contactType)) {
      return NextResponse.json(
        { success: false, message: 'Invalid contact type' },
        { status: 400 },
      );
    }

    // Basic spam protection
    if (message.length > 5000) {
      return NextResponse.json(
        { success: false, message: 'Message too long' },
        { status: 400 },
      );
    }

    const contactData: ContactFormData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim(),
      contactType: contactType.trim(),
      message: message.trim(),
    };

    const { contact, fromName, noreply } = await getEmailSenderConfiguration();
    const result = await resendClient.sendContactFormEmail(
      contactData,
      `${fromName} <${noreply}>`,
      contact,
    );

    if (!result.success) {
      console.error('Resend error:', result.error);
      return NextResponse.json(
        {
          success: false,
          message:
            `Failed to send message. Please try again or contact us directly at ${contact}.`,
        },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Thank you for your message! We'll get back to you soon.",
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'An unexpected error occurred. Please try again.',
      },
      { status: 500 },
    );
  }
}
