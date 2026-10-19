import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isVercel = Boolean(process.env.VERCEL);
const EMAIL_CONFIG_FILE = isVercel
  ? path.join('/tmp', 'ktown_email_config.json')
  : path.join(__dirname, './data/email_config.json');

let inMemoryEmailConfig = {};

export function getStoredEmailConfig() {
  try {
    if (fs.existsSync(EMAIL_CONFIG_FILE)) {
      const raw = fs.readFileSync(EMAIL_CONFIG_FILE, 'utf-8');
      return { ...inMemoryEmailConfig, ...JSON.parse(raw || '{}') };
    }
  } catch {
    // Fallback to in-memory
  }
  return inMemoryEmailConfig;
}

export function saveStoredEmailConfig(newConfig) {
  const merged = { ...getStoredEmailConfig(), ...newConfig, updatedAt: new Date().toISOString() };
  inMemoryEmailConfig = merged;
  try {
    const dir = path.dirname(EMAIL_CONFIG_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(EMAIL_CONFIG_FILE, JSON.stringify(merged, null, 2));
  } catch (err) {
    console.warn('[Mailer] Stored config fallback to memory:', err.message);
  }
  return merged;
}

/**
 * Default notification recipients as specified by the business:
 * 1. ktownautomobilespa@gmail.com (Shop primary email)
 * 2. gud4notin@hotmail.com (Secondary owner/manager notification email)
 */
export function getNotificationRecipients() {
  const stored = getStoredEmailConfig();
  const rawList = stored.shopNotificationEmails || process.env.SHOP_NOTIFICATION_EMAILS || '';
  const envRecipients = rawList
    ? rawList.split(',').map(e => e.trim()).filter(Boolean)
    : [];

  const defaults = ['ktownautomobilespa@gmail.com', 'gud4notin@hotmail.com'];
  const all = [...defaults, ...envRecipients];
  return Array.from(new Set(all));
}

/**
 * Resolve effective email credentials from runtime admin settings or environment variables
 */
export function getEffectiveEmailSettings() {
  const stored = getStoredEmailConfig();

  const smtpUser = (stored.smtpUser || process.env.SMTP_USER || process.env.GMAIL_USER || 'ktownautomobilespa@gmail.com').trim();
  const rawPass = (stored.smtpPass || process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD || '').trim();
  // Strip spaces from 16-char Google App Passwords (e.g. "abcd efgh ijkl mnop" -> "abcdefghijklmnop")
  const isPlaceholderPass = !rawPass || rawPass === 'your_gmail_app_password' || rawPass.includes('your_');
  const smtpPass = isPlaceholderPass ? '' : rawPass.replace(/\s+/g, '');

  const smtpHost = (stored.smtpHost || process.env.SMTP_HOST || (smtpUser.endsWith('@gmail.com') ? 'smtp.gmail.com' : 'smtp-mail.outlook.com')).trim();
  const smtpPort = Number(stored.smtpPort || process.env.SMTP_PORT || (smtpHost.includes('gmail') ? 465 : 587));
  const smtpSecure = stored.smtpSecure !== undefined
    ? Boolean(stored.smtpSecure)
    : (process.env.SMTP_SECURE !== undefined ? process.env.SMTP_SECURE !== 'false' : smtpPort === 465);

  const rawResendKey = (stored.resendApiKey || process.env.RESEND_API_KEY || '').trim();
  const resendApiKey = rawResendKey && !rawResendKey.includes('your_') ? rawResendKey : '';
  const resendFrom = (stored.resendFrom || process.env.RESEND_FROM_EMAIL || 'K-Town Auto Spa <bookings@ktownautospa.ca>').trim();

  const rawWeb3Key = (stored.web3formsKey || process.env.WEB3FORMS_ACCESS_KEY || '').trim();
  const web3formsKey = rawWeb3Key && rawWeb3Key !== '2e1c3132-7a7a-4c2c-80a5-f8510800fa26' ? rawWeb3Key : '';

  return {
    smtpHost,
    smtpPort,
    smtpSecure,
    smtpUser,
    smtpPass,
    smtpConfigured: Boolean(smtpUser && smtpPass),
    resendApiKey,
    resendFrom,
    resendConfigured: Boolean(resendApiKey),
    web3formsKey,
    web3formsConfigured: Boolean(web3formsKey),
    recipients: getNotificationRecipients(),
  };
}

/**
 * Configure Nodemailer transport if SMTP credentials are provided
 */
function createTransporter() {
  const settings = getEffectiveEmailSettings();
  if (!settings.smtpConfigured) {
    return null;
  }

  if (settings.smtpUser.includes('@gmail.com') && (!settings.smtpHost || settings.smtpHost === 'smtp.gmail.com')) {
    return nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: settings.smtpUser,
        pass: settings.smtpPass,
      },
    });
  }

  return nodemailer.createTransport({
    host: settings.smtpHost,
    port: settings.smtpPort,
    secure: settings.smtpSecure,
    auth: {
      user: settings.smtpUser,
      pass: settings.smtpPass,
    },
  });
}

function getPaymentMethodLabel(payment) {
  const method = payment?.method;
  if (method === 'card_stripe') return 'Credit Card (Stripe Online)';
  if (method === 'etransfer') return 'Interac e-Transfer (ktownautomobilespa@gmail.com)';
  if (method === 'cash') return 'Cash (Pay in Shop at Drop-off)';
  return 'Pay at Drop-off (In Shop)';
}

function getPaymentBadgeInfo(payment) {
  if (payment?.status === 'paid') {
    return {
      text: payment?.method === 'card_stripe' ? 'PAID ONLINE (STRIPE)' : `PAID (${(payment?.receivedVia || payment?.method || 'CONFIRMED').toUpperCase()})`,
      bg: '#dcfce7',
      color: '#166534',
    };
  }
  if (payment?.method === 'etransfer') {
    return {
      text: 'INTERAC E-TRANSFER (PENDING)',
      bg: '#fef3c7',
      color: '#92400e',
    };
  }
  if (payment?.method === 'cash') {
    return {
      text: 'CASH AT DROP-OFF',
      bg: '#dbeafe',
      color: '#1e40af',
    };
  }
  return {
    text: 'PAY AT DROP-OFF (PENDING)',
    bg: '#fef3c7',
    color: '#92400e',
  };
}

/**
 * Generate formatted plain-text and HTML notification templates for the SHOP OWNER
 */
export function generateBookingNotification(reservation) {
  const { id, customer = {}, appointment = {}, items = [], pricing = {}, payment = {}, status = 'confirmed', couponCode } = reservation;
  const now = new Date().toLocaleString('en-CA', { timeZone: 'America/Toronto' });

  const subtotal = Number(pricing.subtotal || 0);
  const discountAmount = Number(pricing.discountAmount || 0);
  const hstTax = Number(pricing.hstTax || 0);
  const cardFee = Number(pricing.cardFee || 0);
  const grandTotal = Number(pricing.grandTotal || 0);

  const paymentMethodLabel = getPaymentMethodLabel(payment);
  const badge = getPaymentBadgeInfo(payment);

  const itemListText = items.length
    ? items
        .map(i => `  • ${i.title} (${i.vehicleLabel || 'Standard'}): $${Number(i.totalPrice ?? i.basePrice ?? 0).toFixed(2)} CAD${i.addons && i.addons.length ? ` [Add-ons: ${i.addons.map(a => `${a.title} (+$${a.price})`).join(', ')}]` : ''}`)
        .join('\n')
    : '  • Automotive Detailing Appointment';

  const itemListHtml = items.length
    ? items
        .map(i => `
          <li style="margin-bottom: 10px; padding-bottom: 8px; border-bottom: 1px solid #f1f5f9;">
            <strong>${i.title}</strong> <span style="color: #64748b;">(${i.vehicleLabel || 'Standard'})</span> — <span style="color: #b48a28; font-weight: 800;">$${Number(i.totalPrice ?? i.basePrice ?? 0).toFixed(2)} CAD</span>
            ${i.addons && i.addons.length ? `<div style="font-size: 12px; color: #64748b; margin-top: 3px;">+ Add-ons: ${i.addons.map(a => `${a.title} ($${a.price})`).join(', ')}</div>` : ''}
          </li>
        `).join('')
    : '<li>Automotive Detailing Service</li>';

  const plainText = `
🚨 NEW BOOKING RECEIVED - K-TOWN AUTO SPA
==================================================
Reservation Reference: ${id}
Booking Status: ${String(status).toUpperCase()}
Submitted At: ${now}

CUSTOMER INFORMATION:
- Name: ${customer.name || 'Guest'}
- Phone: ${customer.phone || 'Not provided'}
- Email: ${customer.email || 'Not provided'}
- Vehicle: ${[customer.vehicleYear, customer.vehicleMake, customer.vehicleModel].filter(Boolean).join(' ') || 'Not specified'}
- Preferred Date: ${appointment.date || 'TBD'}
- Preferred Time Slot: ${appointment.slot || 'TBD'}
- Drop-off Location: 36 Joseph St, Kingston, ON K7K 2H5

SERVICES BOOKED:
${itemListText}

PRICING BREAKDOWN:
- Subtotal: $${subtotal.toFixed(2)} CAD${discountAmount > 0 ? `\n- Coupon Discount (${couponCode || 'PROMO'}): -$${discountAmount.toFixed(2)} CAD` : ''}
- Ontario HST (13%): $${hstTax.toFixed(2)} CAD${cardFee > 0 ? `\n- Card Processing Fee (3%): +$${cardFee.toFixed(2)} CAD` : ''}
- Grand Total: $${grandTotal.toFixed(2)} CAD
- Payment Method: ${paymentMethodLabel}
- Payment Status: ${String(payment.status || 'pending').toUpperCase()}

SPECIAL INSTRUCTIONS:
${customer.notes ? customer.notes : 'None provided'}
==================================================
K-Town Auto Spa | 36 Joseph St, Kingston, ON | 647-915-3530
  `.trim();

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 20px; color: #1e293b; }
        .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.06); }
        .header { background: #0a1e42; padding: 24px; text-align: center; border-bottom: 3px solid #c9a03c; }
        .header h1 { color: #ffffff; font-size: 20px; margin: 0; letter-spacing: 0.5px; }
        .header p { color: #f0d590; font-size: 13px; margin: 6px 0 0; text-transform: uppercase; font-weight: 700; }
        .content { padding: 24px; }
        .section-title { font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #64748b; font-weight: 700; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; margin: 20px 0 12px; }
        .info-table { width: 100%; border-collapse: collapse; font-size: 14px; }
        .info-table td { padding: 6px 4px; vertical-align: top; }
        .info-label { font-size: 11px; color: #64748b; text-transform: uppercase; display: block; }
        .info-value { font-weight: 600; color: #0f172a; }
        .services-list { list-style: none; padding: 0; margin: 0; font-size: 14px; }
        .totals-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px; margin-top: 20px; }
        .total-row { display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 6px; color: #475569; }
        .grand-total { display: flex; justify-content: space-between; font-size: 18px; font-weight: 800; color: #0f172a; border-top: 1px dashed #cbd5e1; padding-top: 8px; margin-top: 6px; }
        .footer { background: #f1f5f9; padding: 16px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="header">
          <h1>🚨 NEW BOOKING RESERVATION</h1>
          <p>K-Town Auto Spa &middot; Reference: ${id}</p>
        </div>
        <div class="content">
          <div style="margin-bottom: 14px;">
            <span style="display: inline-block; padding: 5px 12px; border-radius: 9999px; font-size: 12px; font-weight: 800; background: ${badge.bg}; color: ${badge.color};">${badge.text}</span>
            <span style="font-size: 12px; color: #64748b; float: right; margin-top: 4px;">${now}</span>
          </div>

          <div class="section-title">Customer Details</div>
          <table class="info-table">
            <tr>
              <td style="width: 50%;">
                <span class="info-label">Customer Name</span>
                <span class="info-value">${customer.name || 'Guest'}</span>
              </td>
              <td style="width: 50%;">
                <span class="info-label">Phone Number</span>
                <span class="info-value"><a href="tel:${customer.phone || ''}" style="color: #0284c7; text-decoration: none;">${customer.phone || 'N/A'}</a></span>
              </td>
            </tr>
            <tr>
              <td>
                <span class="info-label">Email Address</span>
                <span class="info-value"><a href="mailto:${customer.email || ''}" style="color: #0284c7; text-decoration: none;">${customer.email || 'N/A'}</a></span>
              </td>
              <td>
                <span class="info-label">Vehicle</span>
                <span class="info-value">${[customer.vehicleYear, customer.vehicleMake, customer.vehicleModel].filter(Boolean).join(' ') || 'Not specified'}</span>
              </td>
            </tr>
          </table>

          <div class="section-title">Appointment Schedule</div>
          <table class="info-table">
            <tr>
              <td style="width: 50%;">
                <span class="info-label">Drop-off Date</span>
                <span class="info-value" style="color: #b48a28; font-weight: 800;">${appointment.date || 'TBD'}</span>
              </td>
              <td style="width: 50%;">
                <span class="info-label">Arrival Time Window</span>
                <span class="info-value">${appointment.slot || 'TBD'}</span>
              </td>
            </tr>
            <tr>
              <td colspan="2">
                <span class="info-label">Payment Method</span>
                <span class="info-value">${paymentMethodLabel}</span>
              </td>
            </tr>
          </table>

          <div class="section-title">Services Booked</div>
          <ul class="services-list">
            ${itemListHtml}
          </ul>

          <div class="totals-box">
            <div class="total-row"><span>Subtotal:</span><span>$${subtotal.toFixed(2)} CAD</span></div>
            ${discountAmount > 0 ? `<div class="total-row" style="color: #16a34a; font-weight: 700;"><span>Coupon Discount (${couponCode || 'PROMO'}):</span><span>-$${discountAmount.toFixed(2)} CAD</span></div>` : ''}
            <div class="total-row"><span>Ontario HST (13%):</span><span>$${hstTax.toFixed(2)} CAD</span></div>
            ${cardFee > 0 ? `<div class="total-row"><span>Card Processing Surcharge (3%):</span><span>+$${cardFee.toFixed(2)} CAD</span></div>` : ''}
            <div class="grand-total">
              <span>Grand Total:</span>
              <span style="color: #b48a28;">$${grandTotal.toFixed(2)} CAD</span>
            </div>
          </div>

          ${customer.notes ? `
            <div class="section-title">Customer Notes / Special Requests</div>
            <p style="font-size: 13px; background: #fffbeb; border-left: 3px solid #f59e0b; padding: 10px; margin: 0; color: #78350f;">
              ${customer.notes}
            </p>
          ` : ''}
        </div>
        <div class="footer">
          K-Town Auto Spa &middot; 36 Joseph St, Kingston, ON K7K 2H5 &middot; Phone: 647-915-3530<br>
          Crafted by <a href="https://hakilabz.ai" style="color: #b48a28; text-decoration: none; font-weight: 600;">HakiLabZ</a>
        </div>
      </div>
    </body>
    </html>
  `.trim();

  return { plainText, html };
}

/**
 * Generate dedicated Customer Confirmation & Receipt Email
 */
export function generateCustomerConfirmationEmail(reservation) {
  const { id, customer = {}, appointment = {}, items = [], pricing = {}, payment = {}, couponCode } = reservation;

  const subtotal = Number(pricing.subtotal || 0);
  const discountAmount = Number(pricing.discountAmount || 0);
  const hstTax = Number(pricing.hstTax || 0);
  const cardFee = Number(pricing.cardFee || 0);
  const grandTotal = Number(pricing.grandTotal || 0);
  const vehicleStr = [customer.vehicleYear, customer.vehicleMake, customer.vehicleModel].filter(Boolean).join(' ') || 'Your Vehicle';

  const itemListText = items.length
    ? items
        .map(i => `  • ${i.title} (${i.vehicleLabel || 'Standard'}): $${Number(i.totalPrice ?? i.basePrice ?? 0).toFixed(2)} CAD${i.addons && i.addons.length ? ` [Add-ons: ${i.addons.map(a => `${a.title} (+$${a.price})`).join(', ')}]` : ''}`)
        .join('\n')
    : '  • Automotive Detailing Service';

  const itemListHtml = items.length
    ? items
        .map(i => `
          <li style="margin-bottom: 10px; padding-bottom: 8px; border-bottom: 1px solid #f1f5f9;">
            <strong>${i.title}</strong> <span style="color: #64748b;">(${i.vehicleLabel || 'Standard'})</span> — <span style="color: #0a1e42; font-weight: 800;">$${Number(i.totalPrice ?? i.basePrice ?? 0).toFixed(2)} CAD</span>
            ${i.addons && i.addons.length ? `<div style="font-size: 12px; color: #64748b; margin-top: 3px;">+ Add-ons: ${i.addons.map(a => `${a.title} ($${a.price})`).join(', ')}</div>` : ''}
          </li>
        `).join('')
    : '<li>Automotive Detailing Service</li>';

  let paymentInstructionsText = '';
  let paymentInstructionsHtml = '';

  if (payment?.method === 'etransfer') {
    paymentInstructionsText = `
NEXT STEP — INTERAC E-TRANSFER INSTRUCTIONS:
  • Recipient Name: K-Town Auto Spa
  • Send e-Transfer To: ktownautomobilespa@gmail.com
  • Amount: $${grandTotal.toFixed(2)} CAD
  • Message / Note: Please include Booking Ref ${id}
  (Auto-deposit is enabled — no security question required.)`;

    paymentInstructionsHtml = `
      <div style="margin-top: 18px; padding: 16px; background: #ecfdf5; border: 1.5px solid #10b981; border-radius: 10px; color: #065f46; font-size: 13.5px; line-height: 1.55;">
        <div style="font-weight: 800; font-size: 14px; color: #047857; margin-bottom: 6px;">
          📱 Next Step: Complete Your Interac e-Transfer
        </div>
        <div>&bull; <strong>Recipient:</strong> K-Town Auto Spa</div>
        <div>&bull; <strong>Send To Email:</strong> <a href="mailto:ktownautomobilespa@gmail.com" style="color: #047857; font-weight: 700;">ktownautomobilespa@gmail.com</a></div>
        <div>&bull; <strong>Amount:</strong> <strong>$${grandTotal.toFixed(2)} CAD</strong></div>
        <div>&bull; <strong>Message / Note:</strong> Include Reference <strong>${id}</strong></div>
        <div style="font-size: 12px; color: #047857; margin-top: 6px;">
          Auto-deposit is enabled. Once received, our team will mark your reservation verified.
        </div>
      </div>
    `;
  } else if (payment?.method === 'cash') {
    paymentInstructionsText = `
PAYMENT INSTRUCTIONS — CASH IN SHOP:
  • Amount Due at Drop-off: $${grandTotal.toFixed(2)} CAD (Cash)
  • Location: 36 Joseph St, Kingston, ON K7K 2H5`;

    paymentInstructionsHtml = `
      <div style="margin-top: 18px; padding: 16px; background: #eff6ff; border: 1.5px solid #3b82f6; border-radius: 10px; color: #1e3a8a; font-size: 13.5px; line-height: 1.55;">
        <div style="font-weight: 800; font-size: 14px; color: #1d4ed8; margin-bottom: 6px;">
          💵 Payment at Drop-off (Cash in Shop)
        </div>
        <div>&bull; Please bring <strong>$${grandTotal.toFixed(2)} CAD</strong> in cash when dropping off your vehicle.</div>
        <div>&bull; <strong>Shop Location:</strong> 36 Joseph St, Kingston, ON K7K 2H5</div>
      </div>
    `;
  } else if (payment?.method === 'card_stripe' && payment?.status === 'paid') {
    paymentInstructionsText = `
PAYMENT STATUS — PAID ONLINE VIA STRIPE:
  • Amount Paid: $${grandTotal.toFixed(2)} CAD
  • Your official payment receipt is confirmed.`;

    paymentInstructionsHtml = `
      <div style="margin-top: 18px; padding: 14px 16px; background: #f0fdf4; border: 1.5px solid #22c55e; border-radius: 10px; color: #14532d; font-size: 13.5px;">
        <strong>✅ Paid Online via Stripe ($${grandTotal.toFixed(2)} CAD)</strong> — Thank you! Your payment has been verified.
      </div>
    `;
  }

  const plainText = `
Hi ${customer.name || 'Valued Customer'},

Thank you for booking with K-Town Auto Spa! Your appointment is confirmed.

BOOKING SUMMARY:
==================================================
Reservation Reference: ${id}
Drop-off Date: ${appointment.date || 'TBD'}
Arrival Window: ${appointment.slot || 'TBD'}
Shop Location: 36 Joseph St, Kingston, ON K7K 2H5
Vehicle: ${vehicleStr}

SERVICES SELECTED:
${itemListText}

RECEIPT & TOTALS:
- Subtotal: $${subtotal.toFixed(2)} CAD${discountAmount > 0 ? `\n- Coupon Discount (${couponCode || 'PROMO'}): -$${discountAmount.toFixed(2)} CAD` : ''}
- Ontario HST (13%): $${hstTax.toFixed(2)} CAD${cardFee > 0 ? `\n- Card Processing Fee (3%): +$${cardFee.toFixed(2)} CAD` : ''}
- Total: $${grandTotal.toFixed(2)} CAD
- Payment Option: ${getPaymentMethodLabel(payment)}
${paymentInstructionsText}

Need to reschedule or have questions?
Call or WhatsApp us at 647-915-3530 or reply directly to this email.

We look forward to taking care of your vehicle!
K-Town Auto Spa
36 Joseph St, Kingston, ON K7K 2H5
https://www.ktownautospa.ca
  `.trim();

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 20px; color: #1e293b; }
        .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 14px rgba(10,30,66,0.08); }
        .header { background: linear-gradient(135deg, #0a1e42 0%, #12305f 100%); padding: 28px 24px; text-align: center; border-bottom: 3px solid #c9a03c; }
        .header h1 { color: #ffffff; font-size: 22px; margin: 0; letter-spacing: 0.5px; text-transform: uppercase; }
        .header p { color: #f0d590; font-size: 13px; margin: 6px 0 0; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; }
        .content { padding: 26px 24px; }
        .section-title { font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #64748b; font-weight: 700; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; margin: 22px 0 12px; }
        .summary-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 16px; }
        .summary-row { display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; }
        .summary-row:last-child { border-bottom: none; }
        .services-list { list-style: none; padding: 0; margin: 0; font-size: 14px; }
        .totals-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px; margin-top: 16px; }
        .total-row { display: flex; justify-content: space-between; font-size: 13.5px; margin-bottom: 6px; color: #475569; }
        .grand-total { display: flex; justify-content: space-between; font-size: 18px; font-weight: 800; color: #0a1e42; border-top: 1px dashed #cbd5e1; padding-top: 8px; margin-top: 6px; }
        .footer { background: #0a1e42; color: #cbd5e1; padding: 20px; text-align: center; font-size: 12px; line-height: 1.6; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="header">
          <h1>✅ Booking Confirmed</h1>
          <p>K-Town Auto Spa &middot; Ref #${id}</p>
        </div>
        <div class="content">
          <p style="margin: 0 0 16px; font-size: 15px; line-height: 1.55; color: #334155;">
            Hi <strong>${customer.name || 'Valued Customer'}</strong>,<br>
            Thank you for choosing <strong>K-Town Auto Spa</strong>! We have reserved your appointment slot at our heated indoor studio.
          </p>

          <div class="summary-box">
            <div class="summary-row">
              <span style="color: #64748b;">Reservation Reference:</span>
              <strong style="color: #b48a28; font-family: monospace; font-size: 15px;">${id}</strong>
            </div>
            <div class="summary-row">
              <span style="color: #64748b;">Scheduled Date &amp; Time:</span>
              <strong style="color: #0f172a;">${appointment.date || 'TBD'} at ${appointment.slot || 'TBD'}</strong>
            </div>
            <div class="summary-row">
              <span style="color: #64748b;">Shop Address:</span>
              <strong style="color: #0f172a;">36 Joseph St, Kingston, ON K7K 2H5</strong>
            </div>
            <div class="summary-row">
              <span style="color: #64748b;">Vehicle:</span>
              <strong style="color: #0f172a;">${vehicleStr}</strong>
            </div>
            <div class="summary-row">
              <span style="color: #64748b;">Payment Method:</span>
              <strong style="color: #0f172a;">${getPaymentMethodLabel(payment)}</strong>
            </div>
          </div>

          ${paymentInstructionsHtml}

          <div class="section-title">Booked Services &amp; Packages</div>
          <ul class="services-list">
            ${itemListHtml}
          </ul>

          <div class="totals-box">
            <div class="total-row"><span>Subtotal:</span><span>$${subtotal.toFixed(2)} CAD</span></div>
            ${discountAmount > 0 ? `<div class="total-row" style="color: #16a34a; font-weight: 700;"><span>Promo Discount (${couponCode || 'PROMO'}):</span><span>-$${discountAmount.toFixed(2)} CAD</span></div>` : ''}
            <div class="total-row"><span>Ontario HST (13%):</span><span>$${hstTax.toFixed(2)} CAD</span></div>
            ${cardFee > 0 ? `<div class="total-row"><span>Online Card Fee (3%):</span><span>+$${cardFee.toFixed(2)} CAD</span></div>` : ''}
            <div class="grand-total">
              <span>Total Amount:</span>
              <span style="color: #b48a28;">$${grandTotal.toFixed(2)} CAD</span>
            </div>
          </div>

          <p style="margin: 22px 0 0; font-size: 13px; color: #64748b; line-height: 1.5; text-align: center;">
            Need to adjust your time or have questions before drop-off?<br>
            Call or WhatsApp us at <a href="tel:+16479153530" style="color: #0284c7; font-weight: 700; text-decoration: none;">647-915-3530</a> or simply reply to this email.
          </p>
        </div>
        <div class="footer">
          <strong style="color: #f0d590;">K-TOWN AUTO SPA</strong><br>
          36 Joseph St, Kingston, ON K7K 2H5 &middot; 647-915-3530<br>
          Authorized System X &amp; Nano-Brite Installer &middot; Auto-Brite Certified
        </div>
      </div>
    </body>
    </html>
  `.trim();

  return { plainText, html };
}

/**
 * Send a single email message via SMTP (primary) or Resend API (secondary)
 */
async function deliverEmail({ to, subject, text, html, replyTo }) {
  const settings = getEffectiveEmailSettings();
  const toList = Array.isArray(to) ? to : [to];
  const validTo = toList.map(e => String(e || '').trim()).filter(e => e.includes('@'));

  if (validTo.length === 0) {
    return { delivered: false, error: 'No valid recipient email address' };
  }

  // 1. Try Nodemailer SMTP
  const transporter = createTransporter();
  if (transporter) {
    try {
      const info = await transporter.sendMail({
        from: `"K-Town Auto Spa" <${settings.smtpUser}>`,
        to: validTo.join(', '),
        replyTo: replyTo || settings.smtpUser,
        subject,
        text,
        html,
      });
      return { delivered: true, provider: 'smtp', messageId: info.messageId };
    } catch (smtpErr) {
      console.warn(`[Mailer] SMTP error for ${validTo.join(', ')}:`, smtpErr.message);
      // Continue to Resend fallback if configured
      if (!settings.resendConfigured) {
        return { delivered: false, provider: 'smtp', error: smtpErr.message };
      }
    }
  }

  // 2. Try Resend HTTP API if configured
  if (settings.resendConfigured) {
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${settings.resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: settings.resendFrom,
          to: validTo,
          reply_to: replyTo || 'ktownautomobilespa@gmail.com',
          subject,
          text,
          html,
        }),
      });
      const data = await response.json().catch(() => ({}));
      if (response.ok) {
        return { delivered: true, provider: 'resend', id: data.id };
      }
      return { delivered: false, provider: 'resend', error: data.message || `HTTP ${response.status}` };
    } catch (resErr) {
      return { delivered: false, provider: 'resend', error: resErr.message };
    }
  }

  return {
    delivered: false,
    provider: 'none',
    error: 'No outgoing email credentials configured (set SMTP_PASS / Gmail App Password or RESEND_API_KEY in .env or Admin Portal -> Email Settings).',
  };
}

/**
 * Dispatch booking notifications to:
 * 1. Shop Owners (ktownautomobilespa@gmail.com, gud4notin@hotmail.com)
 * 2. Customer (reservation.customer.email)
 */
export async function sendBookingNotifications(reservation) {
  const recipients = getNotificationRecipients();
  const ownerContent = generateBookingNotification(reservation);
  const customerContent = generateCustomerConfirmationEmail(reservation);

  const ownerSubject = `🚨 NEW BOOKING: ${reservation.customer?.name || 'Guest'} - ${reservation.id} ($${Number(reservation.pricing?.grandTotal || 0).toFixed(2)} CAD)`;
  const customerSubject = `Booking Confirmed: K-Town Auto Spa — Ref #${reservation.id} (${reservation.appointment?.date || ''})`;

  console.log(`[Mailer] Dispatching booking ${reservation.id} to owners (${recipients.join(', ')}) and customer (${reservation.customer?.email || 'none'})`);

  const results = {
    ownerEmail: null,
    customerEmail: null,
    smtp: false,
    recipients,
    customerRecipient: reservation.customer?.email || null,
    configurationWarning: null,
  };

  // 1. Send Owner Notification Email
  const ownerResult = await deliverEmail({
    to: recipients,
    subject: ownerSubject,
    text: ownerContent.plainText,
    html: ownerContent.html,
    replyTo: reservation.customer?.email || 'ktownautomobilespa@gmail.com',
  });
  results.ownerEmail = ownerResult;

  // 2. Send Customer Confirmation & Receipt Email
  if (reservation.customer?.email && reservation.customer.email.includes('@')) {
    const custResult = await deliverEmail({
      to: reservation.customer.email,
      subject: customerSubject,
      text: customerContent.plainText,
      html: customerContent.html,
      replyTo: 'ktownautomobilespa@gmail.com',
    });
    results.customerEmail = custResult;
  }

  results.smtp = Boolean(ownerResult.delivered || results.customerEmail?.delivered);

  if (!ownerResult.delivered) {
    results.configurationWarning = ownerResult.error;
  }

  return results;
}

/**
 * Send status update emails when owner marks paid, reschedules, or cancels a booking
 */
export async function sendStatusUpdateNotification(reservation, action) {
  const { id, customer = {}, appointment = {}, pricing = {} } = reservation;
  const grandTotal = Number(pricing.grandTotal || 0).toFixed(2);
  const recipients = getNotificationRecipients();

  let subject = '';
  let heading = '';
  let bodyMessage = '';

  if (action === 'mark_etransfer_paid' || action === 'mark_cash_paid' || action === 'mark_paid') {
    subject = `Payment Verified: K-Town Auto Spa Booking #${id}`;
    heading = '✅ Payment Received & Verified';
    bodyMessage = `We have received and verified your payment of $${grandTotal} CAD for Booking Reference #${id}. Your appointment on ${appointment.date} at ${appointment.slot} at 36 Joseph St, Kingston is all set!`;
  } else if (action === 'reschedule') {
    subject = `Appointment Rescheduled: K-Town Auto Spa Booking #${id}`;
    heading = '📅 Your Appointment Has Been Rescheduled';
    bodyMessage = `Your K-Town Auto Spa appointment (Ref #${id}) has been updated to ${appointment.date} at ${appointment.slot} at 36 Joseph St, Kingston, ON.`;
  } else if (action === 'cancel') {
    subject = `Booking Cancelled: K-Town Auto Spa Ref #${id}`;
    heading = 'Booking Cancelled';
    bodyMessage = `Your reservation #${id} at K-Town Auto Spa has been cancelled.${reservation.cancellationReason ? ` Reason: ${reservation.cancellationReason}` : ''} If you would like to rebook, visit www.ktownautospa.ca or call 647-915-3530.`;
  } else {
    return null;
  }

  const text = `Hi ${customer.name || 'Customer'},\n\n${bodyMessage}\n\nReservation Ref: ${id}\nDate & Time: ${appointment.date} at ${appointment.slot}\nLocation: 36 Joseph St, Kingston, ON K7K 2H5\nPhone: 647-915-3530\n\nThank you,\nK-Town Auto Spa`;
  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 560px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
      <div style="background: #0a1e42; color: #ffffff; padding: 20px 24px; border-bottom: 3px solid #c9a03c;">
        <h2 style="margin: 0; font-size: 18px;">${heading}</h2>
        <p style="margin: 4px 0 0; color: #f0d590; font-size: 12px; text-transform: uppercase;">K-Town Auto Spa &middot; Ref #${id}</p>
      </div>
      <div style="padding: 22px 24px; color: #1e293b; font-size: 14.5px; line-height: 1.6;">
        <p>Hi <strong>${customer.name || 'Valued Customer'}</strong>,</p>
        <p>${bodyMessage}</p>
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px 14px; margin-top: 14px; font-size: 13.5px;">
          <div><strong>Reference:</strong> ${id}</div>
          <div><strong>Date &amp; Time:</strong> ${appointment.date} &middot; ${appointment.slot}</div>
          <div><strong>Location:</strong> 36 Joseph St, Kingston, ON K7K 2H5</div>
          <div><strong>Contact:</strong> 647-915-3530</div>
        </div>
      </div>
    </div>
  `;

  const results = {};
  if (customer.email && customer.email.includes('@')) {
    results.customer = await deliverEmail({
      to: customer.email,
      subject,
      text,
      html,
      replyTo: 'ktownautomobilespa@gmail.com',
    });
  }
  results.owner = await deliverEmail({
    to: recipients,
    subject: `[Shop Copy] ${subject} (${customer.name || 'Customer'})`,
    text,
    html,
    replyTo: customer.email || 'ktownautomobilespa@gmail.com',
  });
  return results;
}

/**
 * Send a test email to verify SMTP / Resend configuration
 */
export async function sendTestNotificationEmail(testCustomerEmail) {
  const sampleReservation = {
    id: 'KT-TEST99',
    status: 'confirmed',
    customer: {
      name: 'Test Customer',
      phone: '647-915-3530',
      email: testCustomerEmail || getNotificationRecipients()[0],
      vehicleYear: '2026',
      vehicleMake: 'Porsche',
      vehicleModel: '911 GT3',
      notes: 'Automated diagnostic test booking from K-Town Auto Spa Admin Portal.',
    },
    appointment: {
      date: new Date().toISOString().split('T')[0],
      slot: '10:00 AM',
    },
    items: [
      {
        title: 'Complete Detail — Gold Package',
        vehicleLabel: 'Sedan',
        basePrice: 279,
        totalPrice: 279,
        addons: [],
      },
    ],
    pricing: {
      subtotal: 279,
      discountAmount: 0,
      netSubtotal: 279,
      hstTax: 36.27,
      cardFee: 0,
      grandTotal: 315.27,
      currency: 'CAD',
    },
    payment: {
      method: 'etransfer',
      status: 'pending_etransfer',
    },
  };

  return sendBookingNotifications(sampleReservation);
}
