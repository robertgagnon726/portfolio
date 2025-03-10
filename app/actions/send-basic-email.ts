'use server';

import { ContactFormValues } from '@Features/Contact/ContactForm';
import { Logger } from '@Src/observability/Logger';
import { Resend } from 'resend';

// I typically use sendgrid for email sending, but Resend is a newer service and seems to be a good alternative.
// It supports embedded React components which will be super interesting to play with.
// https://resend.io/

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendBasicEmail(formData: ContactFormValues) {
  if (!process.env.FROM_EMAIL || !process.env.TO_EMAIL) {
    Logger.error('No email address configured');
    return { success: false };
  }

  // delay 10 seconds
  await new Promise((resolve) => setTimeout(resolve, 10000));

  try {
    await resend.emails.send({
      from: process.env.FROM_EMAIL,
      to: process.env.TO_EMAIL,
      subject: `Portfolio Form Submission: ${formData.subject}`,
      text: `From: ${formData.firstName} ${formData.lastName}\n\nEmail: ${formData.email}\n\nMessage: ${formData.message}`,
    });

    return { success: true };
  } catch (error) {
    Logger.error(error, 'Email send failed:');
    return { success: false };
  }
}
