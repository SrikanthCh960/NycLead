"use server";

import { Resend } from "resend";
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

  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey || apiKey === "your_resend_api_key_here") {
    console.error(
      "[Contact] RESEND_API_KEY is not configured. " +
      "Set RESEND_API_KEY in your environment variables. " +
      "Submission details:",
      { name, email, phone, subject, message }
    );
    redirect("/thank-you");
  }

  try {
    const resend = new Resend(apiKey);
    const timestamp = new Date().toLocaleString("en-US", { timeZone: "America/New_York" });
    // ── Notification email to site owner ──────────────────────────────
    await resend.emails.send({
      from: "NYC GravityNet <onboarding@resend.dev>",
      to: [CONTACT_NOTIFICATION_EMAIL],
      replyTo: email,
      subject: `New Inquiry${subject ? `: ${subject}` : ""} – NYC GravityNet`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#f8fafc;padding:32px;border-radius:12px">
          <div style="background:#1d4ed8;padding:20px 24px;border-radius:8px 8px 0 0">
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

    // NOTE: Auto-reply to visitor is disabled until a custom domain is verified in Resend.
    // Once domain is added, uncomment and update the `from` address below.
    // await resend.emails.send({ from: "NYC GravityNet <noreply@yourdomain.com>", to: [email], ... });

    console.log(`[Contact] Notification email sent via Resend for ${name} <${email}>`);
  } catch (err) {
    console.error("[Contact] Resend email failed:", err);
    // Don't throw — still redirect to thank-you so the user isn't stuck
  }

  redirect("/thank-you");
}
