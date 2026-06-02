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

  // ── Log exact config being used ────────────────────────────────────────
  console.log("[Contact] ══════════════ RESEND DEBUG ══════════════");
  console.log("[Contact] API key present     :", !!apiKey);
  console.log("[Contact] API key prefix      :", apiKey ? apiKey.slice(0, 12) + "..." : "MISSING");
  console.log("[Contact] CONTACT_NOTIFICATION_EMAIL env :", process.env.CONTACT_NOTIFICATION_EMAIL ?? "NOT SET — using fallback");
  console.log("[Contact] to (resolved)       :", CONTACT_NOTIFICATION_EMAIL);
  console.log("[Contact] from                :", "NYC GravityNet <onboarding@resend.dev>");
  console.log("[Contact] subject             :", `New Inquiry${subject ? `: ${subject}` : ""} – NYC GravityNet`);
  console.log("[Contact] replyTo             :", email);
  console.log("[Contact] ════════════════════════════════════════════");

  if (!apiKey) {
    console.error("[Contact] RESEND_API_KEY is missing from environment variables!");
    redirect("/thank-you");
  }

  try {
    const resend = new Resend(apiKey);
    const timestamp = new Date().toLocaleString("en-US", { timeZone: "America/New_York" });

    const payload = {
      from: "NYC GravityNet <onboarding@resend.dev>" as const,
      to: [CONTACT_NOTIFICATION_EMAIL] as string[],
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
    };

    console.log("[Contact] Calling resend.emails.send() now...");
    const result = await resend.emails.send(payload);

    console.log("[Contact] ══════════════ RESEND RESPONSE ══════════════");
    console.log("[Contact] Full result         :", JSON.stringify(result, null, 2));
    console.log("[Contact] result.data         :", JSON.stringify(result.data, null, 2));
    console.log("[Contact] result.error        :", JSON.stringify(result.error, null, 2));
    console.log("[Contact] Email ID            :", result.data?.id ?? "NO ID RETURNED");
    console.log("[Contact] ════════════════════════════════════════════════");

    if (result.error) {
      console.error("[Contact] Resend returned an error:", JSON.stringify(result.error, null, 2));
    } else {
      console.log("[Contact] ✅ Email accepted by Resend. ID:", result.data?.id);
      console.log("[Contact] Delivered to:", CONTACT_NOTIFICATION_EMAIL);
    }

  } catch (err) {
    console.error("[Contact] Resend threw an exception:", err);
  }

  redirect("/thank-you");
}
