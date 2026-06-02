"use server";

import nodemailer from "nodemailer";
import { redirect } from "next/navigation";
import { CONTACT_NOTIFICATION_EMAIL } from "@/lib/contact-config";

export async function submitContactForm(formData: FormData) {
  const name    = String(formData.get("name")    ?? "").trim();
  const email   = String(formData.get("email")   ?? "").trim();
  const phone   = String(formData.get("phone")   ?? "").trim();
  const subject = String(formData.get("subject") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !message) {
    throw new Error("Name, email, and message are required.");
  }

  // TODO: move these to Vercel env vars after confirming email delivery works
  const smtpHost = "smtp.gmail.com";
  const smtpPort = 587;
  const smtpUser = "rcsowjanya72@gmail.com";
  const smtpPass = "ganbbldjgferlduh";

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: false,   // port 587 uses STARTTLS, not SSL
    auth: { user: smtpUser, pass: smtpPass },
  });

  // Verify SMTP connection before sending
  try {
    await transporter.verify();
  } catch (err) {
    console.error("[Contact] SMTP connection verification failed:", err);
    throw new Error("Could not connect to mail server. Please try again later.");
  }

  const timestamp = new Date().toLocaleString("en-US", { timeZone: "America/New_York" });

  // ── Notification email to site owner ────────────────────────────────
  await transporter.sendMail({
    from: `"NYC GravityNet Website" <${smtpUser}>`,
    to: CONTACT_NOTIFICATION_EMAIL,
    replyTo: email,
    subject: `New Inquiry${subject ? `: ${subject}` : ""} – NYC GravityNet`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#f8fafc;padding:32px;border-radius:12px">
        <div style="background:#1d4ed8;padding:20px 24px;border-radius:8px 8px 0 0;margin-bottom:0">
          <h1 style="color:#fff;margin:0;font-size:20px">New Contact Form Submission</h1>
          <p style="color:#bfdbfe;margin:4px 0 0;font-size:13px">${timestamp} (ET)</p>
        </div>
        <div style="background:#fff;padding:24px;border-radius:0 0 8px 8px;border:1px solid #e2e8f0">
          <table style="width:100%;border-collapse:collapse">
            <tr style="border-bottom:1px solid #f1f5f9">
              <td style="padding:10px 8px;font-weight:bold;color:#475569;width:110px;font-size:14px">Name</td>
              <td style="padding:10px 8px;color:#0f172a;font-size:14px">${name}</td>
            </tr>
            <tr style="border-bottom:1px solid #f1f5f9">
              <td style="padding:10px 8px;font-weight:bold;color:#475569;font-size:14px">Email</td>
              <td style="padding:10px 8px;font-size:14px"><a href="mailto:${email}" style="color:#2563eb">${email}</a></td>
            </tr>
            ${phone ? `<tr style="border-bottom:1px solid #f1f5f9"><td style="padding:10px 8px;font-weight:bold;color:#475569;font-size:14px">Phone</td><td style="padding:10px 8px;color:#0f172a;font-size:14px">${phone}</td></tr>` : ""}
            ${subject ? `<tr style="border-bottom:1px solid #f1f5f9"><td style="padding:10px 8px;font-weight:bold;color:#475569;font-size:14px">Subject</td><td style="padding:10px 8px;color:#0f172a;font-size:14px">${subject}</td></tr>` : ""}
            <tr>
              <td style="padding:10px 8px;font-weight:bold;color:#475569;vertical-align:top;font-size:14px">Message</td>
              <td style="padding:10px 8px;color:#0f172a;font-size:14px;line-height:1.6">${message.replace(/\n/g, "<br>")}</td>
            </tr>
          </table>
          <div style="margin-top:20px;padding:12px 16px;background:#eff6ff;border-radius:6px;font-size:13px;color:#1e40af">
            💡 Reply directly to this email to respond to ${name}.
          </div>
        </div>
      </div>
    `,
  });

  // ── Auto-reply to the visitor ────────────────────────────────────────
  await transporter.sendMail({
    from: `"NYC GravityNet" <${smtpUser}>`,
    to: email,
    subject: "We received your message – NYC GravityNet",
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#f8fafc;padding:32px;border-radius:12px">
        <div style="background:#1d4ed8;padding:20px 24px;border-radius:8px 8px 0 0">
          <h1 style="color:#fff;margin:0;font-size:20px">Thank you, ${name}!</h1>
        </div>
        <div style="background:#fff;padding:24px;border-radius:0 0 8px 8px;border:1px solid #e2e8f0">
          <p style="color:#334155;font-size:15px;line-height:1.6">
            Thank you for reaching out to <strong>NYC GravityNet</strong>. We've received your inquiry and will get back to you within 1–2 business days.
          </p>
          <p style="color:#64748b;font-size:14px">Here's a copy of your message:</p>
          <blockquote style="border-left:4px solid #2563eb;margin:12px 0;padding:12px 16px;background:#f8fafc;color:#475569;font-size:14px;line-height:1.6">
            ${message.replace(/\n/g, "<br>")}
          </blockquote>
          <p style="color:#334155;font-size:14px;margin-top:24px">
            Best regards,<br>
            <strong>NYC GravityNet Team</strong><br>
            <span style="color:#64748b">New York, USA</span>
          </p>
        </div>
      </div>
    `,
  });

  console.log(`[Contact] Emails sent successfully for submission from ${name} <${email}>`);

  redirect("/thank-you");
}
