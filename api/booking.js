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

  // Honeypot check
  if (body.website) {
    res.status(200).json({ success: true });
    return;
  }

  const bookingCode = cleanText(body.bookingCode, 50);
  const name = cleanText(body.name, 120);
  const email = cleanText(body.email, 160);
  const phone = cleanText(body.phone, 80);
  const vehicle = cleanText(body.vehicle, 160);
  const selectedVehicleType = cleanText(body.selectedVehicleType, 80);
  const servicesListString = cleanText(body.services, 2000);
  const totalPrice = cleanText(body.totalPrice, 80);
  const preferredDate = cleanText(body.preferredDate, 80);

  if (!bookingCode || !name || !email || !vehicle || !servicesListString || !totalPrice) {
    res.status(400).json({ error: 'Missing required booking fields' });
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

  // Parse services back to list for clean HTML display
  let parsedServices = [];
  try {
    parsedServices = JSON.parse(servicesListString);
  } catch (e) {
    parsedServices = servicesListString.split(',').map(s => s.trim()).filter(Boolean);
  }

  const servicesHtml = parsedServices.map(service => `
    <li style="margin-bottom: 6px; color: #f3f4f6;">
      <span style="color: #00f0ff; margin-right: 6px;">✔</span> ${escapeHtml(service)}
    </li>
  `).join('');

  const mailOptions = {
    from: emailFrom,
    to: emailTo,
    replyTo: email,
    subject: `[BOOKING] New Installation Request - ${bookingCode} (${name})`,
    text: `NEW BOOKING APPOINTMENT REQUEST\n\n` +
          `Booking Reference: ${bookingCode}\n` +
          `Locked Price: ${totalPrice}\n\n` +
          `--- Customer Information ---\n` +
          `Name: ${name}\n` +
          `Email: ${email}\n` +
          `Phone: ${phone || 'N/A'}\n` +
          `Preferred Date/Time: ${preferredDate || 'N/A'}\n\n` +
          `--- Vehicle Specs ---\n` +
          `Vehicle Description: ${vehicle}\n` +
          `Vehicle Estimator Type: ${selectedVehicleType || 'N/A'}\n\n` +
          `--- Upgrade Integrations Requested ---\n` +
          `${parsedServices.map((s, idx) => `${idx + 1}. ${s}`).join('\n')}`,
    html: `
      <div style="background-color: #06070a; color: #f3f4f6; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 24px; border-radius: 8px; max-width: 600px; margin: 0 auto; border: 1px solid #131726;">
        <div style="text-align: center; border-bottom: 1px solid #131726; padding-bottom: 16px; margin-bottom: 20px;">
          <h2 style="color: #00f0ff; margin: 0; font-size: 24px; letter-spacing: 1px;">POSTYBRIDGES</h2>
          <p style="color: #9ca3af; margin: 4px 0 0 0; font-size: 12px; text-transform: uppercase; letter-spacing: 3px;">Vehicle Intelligence Booking</p>
        </div>

        <div style="background-color: rgba(0, 240, 255, 0.05); border-left: 4px solid #00f0ff; padding: 16px; margin-bottom: 24px; border-radius: 4px;">
          <h3 style="margin: 0 0 8px 0; color: #00f0ff; font-size: 18px;">Booking Code: ${escapeHtml(bookingCode)}</h3>
          <p style="margin: 0; color: #9ca3af; font-size: 14px;">Locked Package Estimate: <strong style="color: #f3f4f6; font-size: 16px;">${escapeHtml(totalPrice)} NGN</strong></p>
        </div>

        <h4 style="color: #9ca3af; border-bottom: 1px solid #131726; padding-bottom: 6px; margin-top: 0; text-transform: uppercase; font-size: 12px; letter-spacing: 1px;">Customer Information</h4>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
          <tr>
            <td style="padding: 6px 0; color: #9ca3af; width: 35%;">Full Name:</td>
            <td style="padding: 6px 0; color: #f3f4f6; font-weight: bold;">${escapeHtml(name)}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #9ca3af;">Email Address:</td>
            <td style="padding: 6px 0; color: #f3f4f6;"><a href="mailto:${escapeHtml(email)}" style="color: #00f0ff; text-decoration: none;">${escapeHtml(email)}</a></td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #9ca3af;">Phone Number:</td>
            <td style="padding: 6px 0; color: #f3f4f6;">${escapeHtml(phone || 'Not Provided')}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #9ca3af;">Preferred Date:</td>
            <td style="padding: 6px 0; color: #f3f4f6; font-weight: bold; color: #9d4edd;">${escapeHtml(preferredDate || 'Flexible / Contact To Schedule')}</td>
          </tr>
        </table>

        <h4 style="color: #9ca3af; border-bottom: 1px solid #131726; padding-bottom: 6px; text-transform: uppercase; font-size: 12px; letter-spacing: 1px;">Vehicle Details</h4>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
          <tr>
            <td style="padding: 6px 0; color: #9ca3af; width: 35%;">Make & Model:</td>
            <td style="padding: 6px 0; color: #f3f4f6; font-weight: bold;">${escapeHtml(vehicle)}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #9ca3af;">Profile Selected:</td>
            <td style="padding: 6px 0; color: #f3f4f6; text-transform: capitalize;">${escapeHtml(selectedVehicleType)}</td>
          </tr>
        </table>

        <h4 style="color: #9ca3af; border-bottom: 1px solid #131726; padding-bottom: 6px; text-transform: uppercase; font-size: 12px; letter-spacing: 1px;">Requested Integrations</h4>
        <ul style="margin: 0; padding-left: 20px; font-size: 14px; line-height: 1.6;">
          ${servicesHtml}
        </ul>

        <div style="margin-top: 32px; border-top: 1px solid #131726; padding-top: 16px; text-align: center; font-size: 12px; color: #6b7280;">
          <p style="margin: 0;">This request was generated dynamically from the PostyBridges Estimate Booking System.</p>
          <p style="margin: 4px 0 0 0;">Please follow up with the client within 2 hours to confirm vehicle inspection and lock pricing.</p>
        </div>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, bookingCode });
  } catch (error) {
    console.error('Booking notification email dispatch failed:', error);
    res.status(500).json({ error: 'Unable to send booking request. Please try again or contact us directly.' });
  }
}
