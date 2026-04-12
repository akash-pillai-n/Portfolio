import { Resend } from "resend";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const { error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to:   ["akash.pillai.0810@gmail.com"],
      replyTo: email,
      subject: `[Portfolio] Message from ${name}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;
                    background:#0f1117;color:#e4e8f0;border-radius:12px;
                    border:1px solid #252d3d">
          <h2 style="color:#00b4ff;margin-top:0">New message from your portfolio</h2>

          <table style="width:100%;border-collapse:collapse">
            <tr>
              <td style="padding:8px 0;color:#7a8599;width:80px">Name</td>
              <td style="padding:8px 0;color:#e4e8f0;font-weight:600">${name}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#7a8599">Email</td>
              <td style="padding:8px 0">
                <a href="mailto:${email}" style="color:#00b4ff;text-decoration:none">${email}</a>
              </td>
            </tr>
          </table>

          <hr style="border:none;border-top:1px solid #252d3d;margin:20px 0"/>
          <p style="color:#7a8599;margin:0 0 8px">Message</p>
          <p style="color:#e4e8f0;white-space:pre-wrap;margin:0">${message}</p>
          <hr style="border:none;border-top:1px solid #252d3d;margin:20px 0"/>
          <p style="color:#3a4a5c;font-size:12px;margin:0">
            Sent from your portfolio · Reply goes directly to ${name} at ${email}
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Failed to send email." }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
