import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export async function sendVerificationOTP(email, otp) {
  if (!resend) {
    console.warn('RESEND_API_KEY is missing. Skipping email sending.');
    console.log('DEMO MODE: OTP for', email, 'is', otp);
    return { success: false, error: 'Missing API Key' };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || '25 Squares <info@25-squares.com>',
      to: [email],
      subject: 'Verify your email for 25 Squares',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Verify your email</h2>
          <p>Thanks for signing up for 25 Squares! Use the following code to verify your email address:</p>
          <div style="background-color: #f4f4f4; padding: 15px; text-align: center; border-radius: 5px; font-size: 24px; letter-spacing: 5px; font-weight: bold;">
            ${otp}
          </div>
          <p>This code will expire in 10 minutes.</p>
          <p>If you didn't sign up for 25 Squares, you can safely ignore this email.</p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      throw new Error('Failed to send verification email');
    }

    console.log('Verification email sent:', data);
    return data;
  } catch (error) {
    console.error('Send verification OTP error:', error);
    // In development or if Key is missing, we might want to log the OTP to console
    console.log('DEMO MODE: OTP for', email, 'is', otp);
    throw error;
  }
}

export function generateOTP() {
  // Generate a 6-digit number
  return Math.floor(100000 + Math.random() * 900000).toString();
}
