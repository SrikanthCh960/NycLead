"use server";

import nodemailer from "nodemailer";
import { redirect } from "next/navigation";
import { CONTACT_NOTIFICATION_EMAIL } from "@/lib/contact-config";

export async function submitContactForm(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const subject = String(formData.get("subject") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !message) {
    throw new Error("Name, email, and message are required.");
  }

  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  if (smtpUser && smtpPass && smtpPass !== "your_app_password_here") {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST ?? "smtp.gmail.com",
        port: Number(process.env.SMTP_PORT ?? 587),
        secure: false,
        auth: { user: smtpUser, pass: smtpPass },
      });

      await transporter.sendMail({
        from: `"NYC GravityNet Website" <${smtpUser}>`,
        to: CONTACT_NOTIFICATION_EMAIL,
        subject: "New Website Inquiry - NYC GravityNet",
        html: `
          <h2>New Contact Form Submission</h2>
          <table style="border-collapse:collapse;width:100%">
            <tr><td style="padding:8px;font-weight:bold">Name</td><td style="padding:8px">${name}</td></tr>
            <tr><td style="padding:8px;font-weight:bold">Email</td><td style="padding:8px">${email}</td></tr>
            ${phone ? `<tr><td style="padding:8px;font-weight:bold">Phone</td><td style="padding:8px">${phone}</td></tr>` : ""}
            ${subject ? `<tr><td style="padding:8px;font-weight:bold">Subject</td><td style="padding:8px">${subject}</td></tr>` : ""}
            <tr><td style="padding:8px;font-weight:bold;vertical-align:top">Message</td><td style="padding:8px">${message.replace(/\n/g, "<br>")}</td></tr>
          </table>
        `,
      });

      await transporter.sendMail({
        from: `"NYC GravityNet" <${smtpUser}>`,
        to: email,
        subject: "We received your inquiry – NYC GravityNet",
        html: `
          <p>Hi ${name},</p>
          <p>Thank you for reaching out to NYC GravityNet. We've received your inquiry and will get back to you shortly.</p>
          <p>Here's a copy of your message:</p>
          <blockquote style="border-left:4px solid #2563eb;padding-left:12px;color:#555">${message.replace(/\n/g, "<br>")}</blockquote>
          <p>Best regards,<br>NYC GravityNet Team<br>New York, USA</p>
        `,
      });
    } catch (err) {
      console.error("[Contact] Email send failed:", err);
    }
  } else {
    console.warn("[Contact] SMTP not configured — skipping email. Submission:", { name, email, phone, subject, message });
  }

  redirect("/thank-you");
}
