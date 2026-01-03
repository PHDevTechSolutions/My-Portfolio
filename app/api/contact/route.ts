import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import path from "path";

/**
 * ✅ REQUIRED FOR NODEMAILER ON VERCEL
 * Prevents Edge runtime crashes
 */
export const runtime = "nodejs";

/**
 * ✅ VERCEL-SAFE ABSOLUTE PATH
 * (public/ is NOT available via relative paths in serverless)
 */
const LOGO_PATH = path.join(process.cwd(), "public", "images", "vah-logo-2.png");

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { fullName, company, email, phone, subject, message } = data;

    if (!fullName || !email || !phone || !subject) {
      return NextResponse.json(
        { error: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      throw new Error("Missing EMAIL_USER or EMAIL_PASS environment variables");
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Dark mode CSS for email
    const darkCSS = `
      @media (prefers-color-scheme: dark) {
        body {
          background: #111 !important;
        }
        .card {
          background: #1b1b1b !important;
          color: #e2e2e2 !important;
        }
        .divider {
          border-color: #333 !important;
        }
        .footer {
          color: #999 !important;
        }
      }
    `;

    // Email preheader (hidden text)
    const preheader = `
      <span style="
        display:none;
        visibility:hidden;
        opacity:0;
        color:transparent;
        height:0;
        width:0;
        overflow:hidden;
      ">
        We received your inquiry. Our team will get back to you shortly.
      </span>
    `;

    // Reusable email template wrapper
    const EmailCard = (content: string) => `
      ${preheader}
      <html>
      <head>
        <style>${darkCSS}</style>
      </head>
      <body style="margin:0; padding:40px; background:#f4f4f4; font-family:Arial, sans-serif;">

        <div class="card" style="
          max-width:640px;
          margin:0 auto;
          background:#ffffff;
          border-radius:12px;
          padding:40px 32px;
          box-shadow:0 4px 14px rgba(0,0,0,0.08);
        ">

          <!-- Logo -->
          <div style="text-align:center; margin-bottom:28px;">
            <img src="cid:vah-logo-2" style="width:150px;" />
          </div>

          <!-- Main Content -->
          ${content}

          <!-- Divider -->
          <hr class="divider" style="border:none; border-top:1px solid #e5e5e5; margin:32px 0;" />

          <!-- Footer -->
          <div class="footer" style="font-size:12px; color:#777; text-align:center; line-height:18px;">
            © 2025 Value Acquisitions Holdings Inc. All rights reserved.<br />
            Block 14, Brgy. Golden Mile Business Park,<br />
            Lot 110TH Street, Maduya, Carmona, 4116 Cavite
          </div>

        </div>

      </body>
      </html>
    `;

    // Admin email content
    const adminContent = `
      <h2 style="margin:0 0 16px; font-size:22px;">New Website Inquiry</h2>
      <p style="line-height:24px; font-size:15px;">
        You have received a new inquiry from the website.
      </p>

      <hr class="divider" style="border:none;border-top:1px solid #e5e5e5;margin:24px 0;" />

      <p style="margin:6px 0;"><strong>Full Name:</strong> ${fullName}</p>
      <p style="margin:6px 0;"><strong>Company:</strong> ${company || "N/A"}</p>
      <p style="margin:6px 0;"><strong>Email:</strong> ${email}</p>
      <p style="margin:6px 0;"><strong>Phone:</strong> ${phone}</p>
      <p style="margin:6px 0;"><strong>Subject:</strong> ${subject}</p>
      <p style="margin:6px 0;"><strong>Message:</strong></p>
      <p style="white-space:pre-line; margin-top:4px;">${message || "N/A"}</p>
    `;

    // Auto-reply email content to user
    const userContent = `
      <h2 style="margin:0 0 16px; font-size:22px; text-align:center;">
        Thank You for Contacting Us
      </h2>

      <p style="font-size:15px; line-height:24px;">
        Hi <strong>${fullName}</strong>,<br><br>
        Thank you for reaching out to
        <strong>Value Acquisitions Holdings Inc.</strong>.
        We have successfully received your inquiry and a member of our team
        will respond shortly.
      </p>
      <p style="font-size:15px; line-height:24px;">
        Best regards,<br />
        <strong>Value Acquisitions Holdings Inc.</strong>
      </p>
    `;

    // Send admin notification email
    await transporter.sendMail({
      from: `"Value Acquisitions Holdings Inc." <${process.env.EMAIL_USER}>`,
      to: "valueacquisitionsholdings@gmail.com",
      subject: `📩 New Website Inquiry — ${fullName}`,
      attachments: [
        {
          filename: "vah-logo-2.png",
          path: LOGO_PATH,
          cid: "vah-logo-2",
        },
      ],
      html: EmailCard(adminContent),
    });

    // Send auto-reply to user
    await transporter.sendMail({
      from: `"Value Acquisitions Holdings Inc." <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Thank You for Your Inquiry — Value Acquisitions Holdings Inc.`,
      attachments: [
        {
          filename: "vah-logo-2.png",
          path: LOGO_PATH,
          cid: "vah-logo-2",
        },
      ],
      html: EmailCard(userContent),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("EMAIL ERROR:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}
