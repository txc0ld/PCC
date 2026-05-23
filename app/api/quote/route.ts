import { NextResponse } from "next/server";
import { EMAIL } from "@/lib/utils";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const RESEND_ENDPOINT = "https://api.resend.com/emails";
const DEFAULT_FROM = "Perth Commercial Flooring <quotes@perthcommercialfloors.com.au>";
const MAX_ATTACHMENTS = 5;
const MAX_FILE_BYTES = 8 * 1024 * 1024;
const MAX_TOTAL_BYTES = 24 * 1024 * 1024;

const allowedFileTypes = new Set([
  "image/avif",
  "image/heic",
  "image/heif",
  "image/jpg",
  "image/jpeg",
  "image/png",
  "image/webp",
]);

type Attachment = {
  filename: string;
  content: string;
};

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    if (getString(formData, "company")) {
      return NextResponse.json({ ok: true });
    }

    const name = getString(formData, "name");
    const suburb = getString(formData, "suburb");
    const area = getString(formData, "area");
    const finish = getString(formData, "finish") || "Not sure yet";
    const email = getString(formData, "email");
    const phone = getString(formData, "phone");
    const description = getString(formData, "description");

    if (!name || !suburb || !area) {
      return NextResponse.json(
        { ok: false, error: "Name, suburb and approximate area are required." },
        { status: 400 }
      );
    }

    if (!email && !phone) {
      return NextResponse.json(
        { ok: false, error: "Add an email or phone number so we can return the quote." },
        { status: 400 }
      );
    }

    if (email && !isValidEmail(email)) {
      return NextResponse.json(
        { ok: false, error: "Enter a valid email address." },
        { status: 400 }
      );
    }

    const photos = formData.getAll("photos").filter(isFileWithContent);
    const attachmentError = validatePhotos(photos);

    if (attachmentError) {
      return NextResponse.json({ ok: false, error: attachmentError }, { status: 400 });
    }

    const resendApiKey = process.env.RESEND_API_KEY;

    if (!resendApiKey) {
      return NextResponse.json(
        { ok: false, error: "Quote email is not configured yet." },
        { status: 503 }
      );
    }

    const attachments = await Promise.all(photos.map(fileToAttachment));
    const from = process.env.QUOTE_FROM_EMAIL || DEFAULT_FROM;
    const to = process.env.QUOTE_TO_EMAIL || EMAIL;
    const subject = `Quote request - ${suburb} - ${name}`;
    const submittedAt = new Intl.DateTimeFormat("en-AU", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "Australia/Perth",
    }).format(new Date());

    const text = [
      "New website quote request",
      "",
      `Submitted: ${submittedAt}`,
      `Name: ${name}`,
      `Suburb: ${suburb}`,
      `Approx. area: ${area} m2`,
      `Finish interest: ${finish}`,
      `Email: ${email || "-"}`,
      `Phone: ${phone || "-"}`,
      `Photos attached: ${attachments.length}`,
      "",
      "Traffic, slab, timing and goals:",
      description || "-",
    ].join("\n");

    const html = buildEmailHtml({
      area,
      description,
      email,
      finish,
      name,
      phone,
      photoCount: attachments.length,
      suburb,
      submittedAt,
    });

    const response = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject,
        text,
        html,
        reply_to: email || undefined,
        attachments: attachments.length ? attachments : undefined,
        tags: [{ name: "source", value: "website_quote" }],
      }),
    });

    const data = (await response.json().catch(() => ({}))) as { id?: string; message?: string };

    if (!response.ok) {
      console.error("Resend quote email failed", data);
      return NextResponse.json(
        { ok: false, error: "The quote request could not be sent. Please call or email us directly." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, id: data.id });
  } catch (error) {
    console.error("Quote request failed", error);
    return NextResponse.json(
      { ok: false, error: "The quote request could not be sent. Please call or email us directly." },
      { status: 500 }
    );
  }
}

function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isFileWithContent(value: FormDataEntryValue): value is File {
  return typeof File !== "undefined" && value instanceof File && value.size > 0;
}

function validatePhotos(files: File[]) {
  if (files.length > MAX_ATTACHMENTS) {
    return `Attach up to ${MAX_ATTACHMENTS} photos.`;
  }

  const totalBytes = files.reduce((sum, file) => sum + file.size, 0);

  if (totalBytes > MAX_TOTAL_BYTES) {
    return "Photo attachments must be 24 MB total or less.";
  }

  for (const file of files) {
    if (file.size > MAX_FILE_BYTES) {
      return `${file.name} is larger than 8 MB.`;
    }

    if (file.type && !allowedFileTypes.has(file.type)) {
      return `${file.name} is not a supported image type.`;
    }
  }

  return "";
}

async function fileToAttachment(file: File): Promise<Attachment> {
  const buffer = Buffer.from(await file.arrayBuffer());

  return {
    filename: sanitizeFilename(file.name),
    content: buffer.toString("base64"),
  };
}

function sanitizeFilename(value: string) {
  return value.replace(/[^\w.\- ]+/g, "").trim() || "quote-photo";
}

function buildEmailHtml({
  area,
  description,
  email,
  finish,
  name,
  phone,
  photoCount,
  suburb,
  submittedAt,
}: {
  area: string;
  description: string;
  email: string;
  finish: string;
  name: string;
  phone: string;
  photoCount: number;
  suburb: string;
  submittedAt: string;
}) {
  const rows = [
    ["Submitted", submittedAt],
    ["Name", name],
    ["Suburb", suburb],
    ["Approx. area", `${area} m2`],
    ["Finish interest", finish],
    ["Email", email || "-"],
    ["Phone", phone || "-"],
    ["Photos attached", String(photoCount)],
  ];

  return `
    <div style="font-family:Arial,sans-serif;color:#151516;line-height:1.5">
      <h1 style="font-size:22px;margin:0 0 16px">New website quote request</h1>
      <table style="border-collapse:collapse;width:100%;max-width:720px">
        <tbody>
          ${rows
            .map(
              ([label, value]) => `
                <tr>
                  <th style="border-bottom:1px solid #ddd;padding:10px 12px 10px 0;text-align:left;width:180px;color:#666;font-size:12px;text-transform:uppercase;letter-spacing:.08em">${escapeHtml(label)}</th>
                  <td style="border-bottom:1px solid #ddd;padding:10px 0;font-size:15px">${escapeHtml(value)}</td>
                </tr>`
            )
            .join("")}
        </tbody>
      </table>
      <h2 style="font-size:16px;margin:24px 0 8px">Traffic, slab, timing and goals</h2>
      <p style="white-space:pre-wrap;margin:0;max-width:720px">${escapeHtml(description || "-")}</p>
    </div>
  `;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
