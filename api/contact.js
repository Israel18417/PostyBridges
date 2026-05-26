import nodemailer from 'nodemailer';

function cleanText(value, maxLength = 1000) {
  return String(value || '').trim().slice(0, maxLength);
}

function escapeHtml(value) {
  return cleanText(value, 5000)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

async function parseBody(req) {
  if (req.body && Object.keys(req.body).length > 0) {
    return req.body;
  }

  const chunks = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }

  const rawBody = Buffer.concat(chunks).toString('utf8');
  const contentType = (req.headers['content-type'] || '').toLowerCase();

  if (contentType.includes('application/json')) {
    return JSON.parse(rawBody || '{}');
  }

  if (contentType.includes('application/x-www-form-urlencoded')) {
    return Object.fromEntries(new URLSearchParams(rawBody));
  }

  return {};
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  let body;
  try {
    body = await parseBody(req);
  } catch (error) {
    res.status(400).json({ error: 'Unable to parse request body' });
    return;
  }

  if (body.website) {
    res.status(200).json({ success: true });
    return;
  }

  const name = cleanText(body.name, 120);
  const email = cleanText(body.email, 160);
  const phone = cleanText(body.phone, 80);
  const vehicle = cleanText(body.vehicle, 160);
  const message = cleanText(body.message, 3000);

  if (!name || !email || !vehicle || !message) {
    res.status(400).json({ error: 'Missing required form fields' });
    return;
  }

  if (!isValidEmail(email)) {
    res.status(400).json({ error: 'Please enter a valid email address' });
    return;
  }

  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = Number(process.env.SMTP_PORT || 587);
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpSecure = process.env.SMTP_SECURE === 'true';
  const emailFrom = process.env.EMAIL_FROM || 'no-reply@postybridges.com';
  const emailTo = process.env.EMAIL_TO || 'postybridges@gmail.com';

  if (!smtpHost || !smtpUser || !smtpPass) {
    res.status(500).json({ error: 'Email server is not configured' });
    return;
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpSecure,
    auth: {
      user: smtpUser,
      pass: smtpPass
    }
  });

  const mailOptions = {
    from: emailFrom,
    to: emailTo,
    replyTo: email,
    subject: `New PostyBridges inquiry from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\nVehicle: ${vehicle}\n\nMessage:\n${message}`,
    html: `
      <h2>New PostyBridges Inquiry</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(phone || 'N/A')}</p>
      <p><strong>Vehicle:</strong> ${escapeHtml(vehicle)}</p>
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(message).replace(/\n/g, '<br/>')}</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Email send failed:', error);
    res.status(500).json({ error: 'Unable to send email' });
  }
}
