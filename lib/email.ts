import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Until custom domain is verified, use Resend's default
const FROM = process.env.EMAIL_FROM || "Emma Nails <onboarding@resend.dev>";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://emmanails.vercel.app";

function formatPrice(bani: number) {
  return `${(bani / 100).toFixed(2)} lei`;
}

// ─── SHARED TEMPLATE ──────────────────────────────────────
function emailWrapper(content: string) {
  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<style>
  body { margin: 0; padding: 0; background: #f8f4f6; font-family: 'Helvetica Neue', Arial, sans-serif; }
  .container { max-width: 560px; margin: 0 auto; background: #fff; border-radius: 16px; overflow: hidden; margin-top: 24px; margin-bottom: 24px; }
  .header { background: linear-gradient(135deg, #B76E79 0%, #d0a0a7 100%); padding: 32px; text-align: center; }
  .header h1 { color: #fff; font-size: 24px; margin: 0; font-weight: 300; letter-spacing: 2px; }
  .header p { color: rgba(255,255,255,0.85); font-size: 12px; margin: 6px 0 0; letter-spacing: 3px; text-transform: uppercase; }
  .body { padding: 32px; color: #1a1a1a; }
  .body h2 { font-size: 20px; font-weight: 500; margin: 0 0 8px; }
  .body p { font-size: 14px; line-height: 1.7; color: #555; margin: 0 0 16px; }
  .highlight { background: #fdf2f6; border-radius: 12px; padding: 20px; margin: 20px 0; }
  .highlight p { margin: 4px 0; }
  .items-table { width: 100%; border-collapse: collapse; margin: 16px 0; }
  .items-table th { text-align: left; font-size: 10px; text-transform: uppercase; letter-spacing: 1px; color: #999; padding: 8px 0; border-bottom: 1px solid #eee; }
  .items-table td { font-size: 14px; padding: 10px 0; border-bottom: 1px solid #f5f5f5; }
  .items-table .price { text-align: right; font-weight: 600; }
  .total-row { font-size: 18px; font-weight: 600; color: #B76E79; }
  .btn { display: inline-block; background: #B76E79; color: #fff !important; text-decoration: none; padding: 14px 32px; border-radius: 50px; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 1.5px; margin: 8px 0; }
  .footer { padding: 24px 32px; text-align: center; border-top: 1px solid #f0f0f0; }
  .footer p { font-size: 11px; color: #aaa; margin: 4px 0; }
  .status-badge { display: inline-block; padding: 6px 16px; border-radius: 20px; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; }
</style></head><body>
<div class="container">
  <div class="header">
    <h1>Emma's Nails</h1>
    <p>Open the magic, open the heart</p>
  </div>
  <div class="body">${content}</div>
  <div class="footer">
    <p>Emma Nails — Str. Anton Crihan 9, Iași</p>
    <p><a href="${SITE_URL}" style="color:#B76E79;text-decoration:none;">emmanails.ro</a> · <a href="https://wa.me/40747906311" style="color:#B76E79;text-decoration:none;">WhatsApp</a></p>
  </div>
</div>
</body></html>`;
}

// ─── WELCOME EMAIL ────────────────────────────────────────
export async function sendWelcomeEmail(email: string, name?: string | null) {
  const displayName = name || "dragă clientă";

  try {
    await resend.emails.send({
      from: FROM,
      to: email,
      subject: "Bine ai venit la Emma Nails! 💕",
      html: emailWrapper(`
        <h2>Bine ai venit, ${displayName}! 💕</h2>
        <p>Contul tău Emma Nails a fost creat cu succes. De acum poți comanda produse profesionale și te poți înscrie la cursurile noastre.</p>
        
        <div class="highlight">
          <p><strong>Ce poți face cu contul tău:</strong></p>
          <p>✨ Comandă produse cu livrare în toată România</p>
          <p>📦 Urmărește statusul comenzilor</p>
          <p>🎓 Înscrie-te la cursuri acreditate</p>
          <p>🎟️ Beneficiază de coduri de reducere exclusive</p>
        </div>

        <p style="text-align:center;">
          <a href="${SITE_URL}/produse" class="btn">Descoperă produsele</a>
        </p>

        <p>Dacă ai întrebări, ne poți scrie oricând pe <a href="https://wa.me/40747906311" style="color:#B76E79;">WhatsApp</a>.</p>
        <p>Cu drag,<br><strong>Emma</strong> 💕</p>
      `),
    });
    console.log(`✉️ Welcome email sent to ${email}`);
  } catch (err) {
    console.error("Failed to send welcome email:", err);
  }
}

// ─── ORDER CONFIRMATION EMAIL ─────────────────────────────
interface OrderEmailData {
  orderNumber: string;
  name: string;
  email: string;
  items: Array<{ name: string; price: number; quantity: number }>;
  subtotal: number;
  discount: number;
  discountCode?: string | null;
  shipping: number;
  total: number;
  paymentMethod: string;
  address: string;
  city: string;
  county: string;
}

export async function sendOrderConfirmationEmail(data: OrderEmailData) {
  const paymentLabel = data.paymentMethod === "stripe" ? "Card bancar" : "Ramburs la livrare";

  const itemsHtml = data.items.map((item) => `
    <tr>
      <td>${item.name} ${item.quantity > 1 ? `×${item.quantity}` : ""}</td>
      <td class="price">${formatPrice(item.price * item.quantity)}</td>
    </tr>
  `).join("");

  try {
    await resend.emails.send({
      from: FROM,
      to: data.email,
      subject: `Comandă confirmată #${data.orderNumber} — Emma Nails`,
      html: emailWrapper(`
        <h2>Mulțumim pentru comandă! 🎉</h2>
        <p>Bună ${data.name}, comanda ta a fost înregistrată cu succes.</p>

        <div class="highlight">
          <p><strong>Comandă:</strong> #${data.orderNumber}</p>
          <p><strong>Plată:</strong> ${paymentLabel}</p>
          <p><strong>Adresă:</strong> ${data.address}, ${data.city}, ${data.county}</p>
        </div>

        <table class="items-table">
          <thead><tr><th>Produs</th><th style="text-align:right;">Preț</th></tr></thead>
          <tbody>
            ${itemsHtml}
            <tr>
              <td style="color:#999;">Subtotal</td>
              <td class="price" style="color:#999;">${formatPrice(data.subtotal)}</td>
            </tr>
            ${data.discount > 0 ? `<tr>
              <td style="color:#B76E79;">Discount${data.discountCode ? ` (${data.discountCode})` : ""}</td>
              <td class="price" style="color:#B76E79;">-${formatPrice(data.discount)}</td>
            </tr>` : ""}
            <tr>
              <td style="color:#999;">Livrare</td>
              <td class="price" style="color:#999;">${data.shipping === 0 ? "Gratuită" : formatPrice(data.shipping)}</td>
            </tr>
            <tr>
              <td class="total-row">Total</td>
              <td class="price total-row">${formatPrice(data.total)}</td>
            </tr>
          </tbody>
        </table>

        <p>Vei primi un email când comanda va fi expediată.</p>

        <p style="text-align:center;">
          <a href="${SITE_URL}/cont/comenzi" class="btn">Vezi comanda</a>
        </p>

        <p>Cu drag,<br><strong>Emma</strong> 💕</p>
      `),
    });
    console.log(`✉️ Order confirmation sent to ${data.email} for #${data.orderNumber}`);
  } catch (err) {
    console.error("Failed to send order confirmation:", err);
  }
}

// ─── ORDER STATUS CHANGE EMAIL ────────────────────────────
const STATUS_CONFIG: Record<string, { label: string; color: string; message: string }> = {
  processing: {
    label: "Se procesează",
    color: "#3b82f6",
    message: "Comanda ta este în curs de pregătire. O împachetăm cu grijă!",
  },
  shipped: {
    label: "Expediată",
    color: "#8b5cf6",
    message: "Comanda ta a fost expediată! Va ajunge la tine în 2-5 zile lucrătoare.",
  },
  delivered: {
    label: "Livrată",
    color: "#22c55e",
    message: "Comanda ta a fost livrată cu succes! Sperăm să te bucuri de produse.",
  },
  cancelled: {
    label: "Anulată",
    color: "#ef4444",
    message: "Comanda ta a fost anulată. Dacă ai întrebări, contactează-ne pe WhatsApp.",
  },
};

export async function sendOrderStatusEmail(
  email: string,
  name: string,
  orderNumber: string,
  status: string
) {
  const config = STATUS_CONFIG[status];
  if (!config) return; // Don't send for "pending" or unknown statuses

  try {
    await resend.emails.send({
      from: FROM,
      to: email,
      subject: `Comandă #${orderNumber} — ${config.label}`,
      html: emailWrapper(`
        <h2>Actualizare comandă</h2>
        <p>Bună ${name},</p>

        <div style="text-align:center;margin:24px 0;">
          <span class="status-badge" style="background:${config.color}15;color:${config.color};">
            ${config.label}
          </span>
        </div>

        <div class="highlight">
          <p><strong>Comandă:</strong> #${orderNumber}</p>
          <p>${config.message}</p>
        </div>

        <p style="text-align:center;">
          <a href="${SITE_URL}/cont/comenzi" class="btn">Vezi detalii comandă</a>
        </p>

        <p>Cu drag,<br><strong>Emma</strong> 💕</p>
      `),
    });
    console.log(`✉️ Status email (${status}) sent to ${email} for #${orderNumber}`);
  } catch (err) {
    console.error("Failed to send status email:", err);
  }
}

// ─── CAMPAIGN EMAILS ─────────────────────────────────────

const CAMPAIGN_TEMPLATES: Record<string, (name: string, extra?: string) => { subject: string; html: string }> = {
  reengagement: (name: string) => ({
    subject: "Ne-ai lipsit! ✨ Revino cu un discount special",
    html: emailWrapper(`
      <h2>Bună ${name}! 👋</h2>
      <p>A trecut ceva timp de când ai fost pe la noi și ne-am gândit la tine.</p>
      <p>Avem produse noi și am pregătit ceva special pentru clienții noștri fideli.</p>

      <div class="highlight">
        <p style="text-align:center;font-size:20px;font-weight:600;color:#B76E79;margin:8px 0;">
          10% REDUCERE
        </p>
        <p style="text-align:center;font-size:13px;color:#777;">
          Folosește codul <strong style="color:#1a1a1a;">REVINO10</strong> la următoarea comandă
        </p>
      </div>

      <p style="text-align:center;">
        <a href="${SITE_URL}/produse" class="btn">Vezi produsele noi</a>
      </p>

      <p>Cu drag,<br><strong>Emma</strong> 💕</p>
    `),
  }),

  new_products: (name: string) => ({
    subject: "Produse noi Emma Nails — vezi colecția! 🎀",
    html: emailWrapper(`
      <h2>Bună ${name}!</h2>
      <p>Am adăugat produse noi în magazin și suntem nerăbdătoare să le vezi!</p>

      <div class="highlight">
        <p><strong>✨ Baze rubber noi</strong> — nuanțe fresh pentru sezon</p>
        <p><strong>✨ Geluri UV</strong> — formulă îmbunătățită</p>
        <p><strong>✨ Instrumente premium</strong> — calitate profesională</p>
      </div>

      <p style="text-align:center;">
        <a href="${SITE_URL}/produse" class="btn">Descoperă colecția</a>
      </p>

      <p>Cu drag,<br><strong>Emma</strong> 💕</p>
    `),
  }),

  course_promo: (name: string) => ({
    subject: "Locuri disponibile la cursuri — Înscrie-te acum! 🎓",
    html: emailWrapper(`
      <h2>Bună ${name}!</h2>
      <p>Avem locuri disponibile la cursurile noastre acreditate!</p>

      <div class="highlight">
        <p><strong>🎓 Cursuri cu diplomă</strong> — acreditate ANC</p>
        <p><strong>👩‍🏫 Practică pe model real</strong> — nu pe manechin</p>
        <p><strong>🏆 15+ ani experiență</strong> — cu Emma personal</p>
      </div>

      <p>Locurile sunt limitate — nu rata ocazia de a învăța de la cei mai buni!</p>

      <p style="text-align:center;">
        <a href="${SITE_URL}/academie" class="btn">Vezi cursurile</a>
      </p>

      <p>Cu drag,<br><strong>Emma</strong> 💕</p>
    `),
  }),

  discount: (name: string, extra?: string) => ({
    subject: "Ofertă specială doar pentru tine! 🎁",
    html: emailWrapper(`
      <h2>Bună ${name}!</h2>
      <p>Am pregătit o ofertă specială pentru clienții noștri:</p>

      <div class="highlight">
        <p style="text-align:center;font-size:20px;font-weight:600;color:#B76E79;margin:8px 0;">
          ${extra || "OFERTĂ SPECIALĂ"}
        </p>
        <p style="text-align:center;font-size:13px;color:#777;">
          Oferta este valabilă pentru o perioadă limitată
        </p>
      </div>

      <p style="text-align:center;">
        <a href="${SITE_URL}/produse" class="btn">Profită acum</a>
      </p>

      <p>Cu drag,<br><strong>Emma</strong> 💕</p>
    `),
  }),

  custom: (name: string, extra?: string) => ({
    subject: "Vești de la Emma Nails ✨",
    html: emailWrapper(`
      <h2>Bună ${name}!</h2>
      ${extra || "<p>Avem vești noi pentru tine!</p>"}
      <p style="text-align:center;">
        <a href="${SITE_URL}" class="btn">Vizitează site-ul</a>
      </p>
      <p>Cu drag,<br><strong>Emma</strong> 💕</p>
    `),
  }),
};

export function getCampaignEmail(
  template: string,
  name: string,
  extra?: string
): { subject: string; html: string } {
  const fn = CAMPAIGN_TEMPLATES[template] || CAMPAIGN_TEMPLATES.custom;
  return fn(name, extra);
}

export async function sendCampaignEmail(
  to: string,
  subject: string,
  html: string
): Promise<boolean> {
  try {
    await resend.emails.send({ from: FROM, to, subject, html });
    return true;
  } catch (err) {
    console.error(`Campaign email failed for ${to}:`, err);
    return false;
  }
}
