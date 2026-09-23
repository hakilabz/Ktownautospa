import nodemailer from 'nodemailer';

/**
 * Default notification recipients as specified by the business:
 * 1. ktownautomobilespa@gmail.com (Shop primary email)
 * 2. gud4notin@hotmail.com (Secondary owner/manager notification email)
 */
export function getNotificationRecipients() {
  const envRecipients = process.env.SHOP_NOTIFICATION_EMAILS
    ? process.env.SHOP_NOTIFICATION_EMAILS.split(',').map(e => e.trim()).filter(Boolean)
    : [];

  const defaults = ['ktownautomobilespa@gmail.com', 'gud4notin@hotmail.com'];
  const all = [...defaults, ...envRecipients];
  return Array.from(new Set(all));
}

/**
 * Configure Nodemailer transport if SMTP credentials are provided in .env
 */
function createTransporter() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (host && user && pass) {
    return nodemailer.createTransport({
      host,
      port: Number(process.env.SMTP_PORT) || 465,
      secure: process.env.SMTP_SECURE !== 'false',
      auth: { user, pass },
    });
  }

  // Check if standard Gmail auth is provided
  if (user && pass && user.includes('@gmail.com')) {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: { user, pass },
    });
  }

  return null;
}

/**
 * Generate formatted plain-text and HTML notification templates
 */
export function generateBookingNotification(reservation) {
  const { id, customer, appointment, items, pricing, payment, status } = reservation;
  const now = new Date().toLocaleString('en-CA', { timeZone: 'America/Toronto' });

  const itemListText = items
    .map(i => `  • ${i.title} (${i.vehicleLabel}): $${i.totalPrice} CAD${i.addons && i.addons.length ? ` [Add-ons: ${i.addons.map(a => a.title).join(', ')}]` : ''}`)
    .join('\n');

  const itemListHtml = items
    .map(i => `
      <li style="margin-bottom: 8px;">
        <strong>${i.title}</strong> (${i.vehicleLabel}) - <span style="color: #c9a03c; font-weight: bold;">$${i.totalPrice} CAD</span>
        ${i.addons && i.addons.length ? `<div style="font-size: 12px; color: #64748b; margin-top: 2px;">Add-ons: ${i.addons.map(a => `${a.title} (+$${a.price})`).join(', ')}</div>` : ''}
      </li>
    `).join('');

  const plainText = `
🚨 NEW BOOKING RECEIVED - KTOWN AUTO SPA
==================================================
Reservation Reference: ${id}
Booking Status: ${status.toUpperCase()}
Submitted At: ${now}

CUSTOMER INFORMATION:
- Name: ${customer.name}
- Phone: ${customer.phone}
- Email: ${customer.email}
- Vehicle: ${customer.vehicleYear || ''} ${customer.vehicleMake || ''} ${customer.vehicleModel || ''}
- Preferred Date: ${appointment.date}
- Preferred Time Slot: ${appointment.slot}
- Drop-off Location: 36 Joseph St, Kingston, ON K7K 2H5

SERVICES BOOKED:
${itemListText}

PRICING BREAKDOWN:
- Subtotal: $${pricing.subtotal.toFixed(2)} CAD
- Ontario HST (13%): $${pricing.hstTax.toFixed(2)} CAD
- Grand Total: $${pricing.grandTotal.toFixed(2)} CAD
- Payment Method: ${payment.method === 'card_stripe' ? 'Credit Card (Stripe)' : 'Pay at Drop-off (In Shop)'}
- Payment Status: ${payment.status.toUpperCase()}

SPECIAL INSTRUCTIONS:
${customer.notes ? customer.notes : 'None provided'}
==================================================
Ktown Auto Spa | 36 Joseph St, Kingston, ON | 647-915-3530
  `.trim();

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 20px; color: #1e293b; }
        .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.06); }
        .header { background: #0f172a; padding: 24px; text-align: center; border-bottom: 3px solid #c9a03c; }
        .header h1 { color: #f8fafc; font-size: 20px; margin: 0; letter-spacing: 0.5px; }
        .header p { color: #c9a03c; font-size: 13px; margin: 6px 0 0; text-transform: uppercase; font-weight: 600; }
        .content { padding: 24px; }
        .badge { display: inline-block; padding: 4px 10px; border-radius: 9999px; font-size: 12px; font-weight: 700; background: #fef3c7; color: #92400e; }
        .section-title { font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #64748b; font-weight: 700; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; margin: 20px 0 12px; }
        .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; font-size: 14px; }
        .info-label { font-size: 11px; color: #64748b; text-transform: uppercase; }
        .info-value { font-weight: 600; color: #0f172a; }
        .services-list { list-style: none; padding: 0; margin: 0; font-size: 14px; }
        .totals-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px; margin-top: 20px; }
        .total-row { display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 4px; color: #475569; }
        .grand-total { display: flex; justify-content: space-between; font-size: 18px; font-weight: 800; color: #0f172a; border-top: 1px dashed #cbd5e1; padding-top: 8px; margin-top: 6px; }
        .footer { background: #f1f5f9; padding: 16px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="header">
          <h1>🚨 NEW BOOKING RESERVATION</h1>
          <p>Ktown Auto Spa &middot; Reference: ${id}</p>
        </div>
        <div class="content">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span class="badge">${payment.status === 'paid' ? 'PAID WITH STRIPE' : 'PAY AT DROP-OFF (PENDING)'}</span>
            <span style="font-size: 12px; color: #64748b;">${now}</span>
          </div>

          <div class="section-title">Customer Details</div>
          <div class="info-grid">
            <div>
              <div class="info-label">Customer Name</div>
              <div class="info-value">${customer.name}</div>
            </div>
            <div>
              <div class="info-label">Phone Number</div>
              <div class="info-value"><a href="tel:${customer.phone}" style="color: #0284c7; text-decoration: none;">${customer.phone}</a></div>
            </div>
            <div>
              <div class="info-label">Email Address</div>
              <div class="info-value"><a href="mailto:${customer.email}" style="color: #0284c7; text-decoration: none;">${customer.email}</a></div>
            </div>
            <div>
              <div class="info-label">Vehicle</div>
              <div class="info-value">${customer.vehicleYear || ''} ${customer.vehicleMake || ''} ${customer.vehicleModel || 'Not specified'}</div>
            </div>
          </div>

          <div class="section-title">Appointment Schedule</div>
          <div class="info-grid">
            <div>
              <div class="info-label">Drop-off Date</div>
              <div class="info-value" style="color: #c9a03c;">${appointment.date}</div>
            </div>
            <div>
              <div class="info-label">Time Window</div>
              <div class="info-value">${appointment.slot}</div>
            </div>
            <div style="grid-column: span 2;">
              <div class="info-label">Drop-off Location</div>
              <div class="info-value">36 Joseph St, Kingston, ON K7K 2H5</div>
            </div>
          </div>

          <div class="section-title">Services Booked</div>
          <ul class="services-list">
            ${itemListHtml}
          </ul>

          <div class="totals-box">
            <div class="total-row"><span>Subtotal:</span><span>$${pricing.subtotal.toFixed(2)} CAD</span></div>
            <div class="total-row"><span>Ontario HST (13%):</span><span>$${pricing.hstTax.toFixed(2)} CAD</span></div>
            <div class="grand-total">
              <span>Grand Total:</span>
              <span style="color: #c9a03c;">$${pricing.grandTotal.toFixed(2)} CAD</span>
            </div>
          </div>

          ${customer.notes ? `
            <div class="section-title">Customer Notes</div>
            <p style="font-size: 13px; background: #fffbeb; border-left: 3px solid #f59e0b; padding: 10px; margin: 0; color: #78350f;">
              ${customer.notes}
            </p>
          ` : ''}
        </div>
        <div class="footer">
          Ktown Auto Spa &middot; 36 Joseph St, Kingston, ON K7K 2H5 &middot; Phone: 647-915-3530<br>
          Crafted by <a href="https://hakilabz.ai" style="color: #c9a03c; text-decoration: none; font-weight: 600;">HakiLabZ</a>..Proudly serving Canadian businesses
        </div>
      </div>
    </body>
    </html>
  `.trim();

  return { plainText, html };
}

/**
 * Dispatch notification to both ktownautomobilespa@gmail.com and gud4notin@hotmail.com
 */
export async function sendBookingNotifications(reservation) {
  const recipients = getNotificationRecipients();
  const { plainText, html } = generateBookingNotification(reservation);
  const subject = `🚨 NEW BOOKING: ${reservation.customer.name} - ${reservation.id} ($${reservation.pricing.grandTotal} CAD)`;

  console.log(`[Mailer] Dispatching booking ${reservation.id} to: ${recipients.join(', ')}`);

  const results = {
    smtp: false,
    web3forms: [],
    recipients,
  };

  // 1. Try Nodemailer SMTP if credentials configured
  try {
    const transporter = createTransporter();
    if (transporter) {
      await transporter.sendMail({
        from: `"Ktown Auto Spa" <${process.env.SMTP_USER || 'ktownautomobilespa@gmail.com'}>`,
        to: recipients.join(', '),
        replyTo: reservation.customer.email,
        subject,
        text: plainText,
        html,
      });
      results.smtp = true;
      console.log('[Mailer] Successfully delivered via SMTP to all recipients.');

      // Send customer confirmation copy if customer email is provided
      if (reservation.customer?.email) {
        try {
          await transporter.sendMail({
            from: `"Ktown Auto Spa" <${process.env.SMTP_USER || 'ktownautomobilespa@gmail.com'}>`,
            to: reservation.customer.email,
            subject: `Booking Confirmed: Ktown Auto Spa (${reservation.id})`,
            text: plainText,
            html,
          });
          console.log(`[Mailer] Customer confirmation delivered to ${reservation.customer.email}`);
        } catch (custErr) {
          console.log('[Mailer] Customer copy error (non-fatal):', custErr.message);
        }
      }
    }
  } catch (smtpErr) {
    console.warn('[Mailer] SMTP dispatch skipped or failed:', smtpErr.message);
  }

  // 2. Dual dispatch via Web3Forms (ensures delivery to both inboxes)
  const web3Key = process.env.WEB3FORMS_ACCESS_KEY || '2e1c3132-7a7a-4c2c-80a5-f8510800fa26';
  for (const email of recipients) {
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          access_key: web3Key,
          subject,
          from_name: 'Ktown Auto Spa Bookings',
          to_email: email,
          replyto: reservation.customer.email,
          message: plainText,
        }),
      });
      const data = await response.json().catch(() => ({}));
      results.web3forms.push({ email, success: response.ok, status: response.status, data });
    } catch (w3Err) {
      results.web3forms.push({ email, success: false, error: w3Err.message });
    }
  }

  return results;
}
