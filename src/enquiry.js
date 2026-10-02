import { artist, channels } from "./site.js";

export function digits(value) {
  return String(value || "").replace(/\D/g, "");
}

export function channelReady(channel) {
  if (channel === "instagram") return Boolean(artist.workHandle);
  if (channel === "whatsapp") return digits(artist.whatsapp).length >= 11;
  if (channel === "text") return digits(artist.phone).length >= 11;
  if (channel === "email") return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(artist.email || "");
  return false;
}

export function contactsPending() {
  return !["whatsapp", "text", "email"].every(channelReady);
}

export function buildEnquiry(data) {
  const lines = [
    `Hi ${artist.name}, I saw your work and would like to connect.`,
    "",
    `Name: ${data.name}`,
    `Occasion: ${data.occasion}`,
    data.date ? `Event date: ${data.date}` : null,
    data.area ? `Venue area: ${data.area}` : null,
    `Found you via: ${data.source}`,
    `Please reply on: ${data.channelLabel}`,
    data.replyTo ? `My contact: ${data.replyTo}` : null,
    "",
    data.message,
  ];
  return lines.filter((line) => line !== null && line !== undefined).join("\n");
}

export function validate(data) {
  if (!data.name) return `Add your name so ${artist.firstName} knows who is writing.`;
  if (!data.occasion) return "Choose the occasion.";
  if (!data.message) return "Tell him the look you want.";
  if (data.channel === "email" && data.replyTo && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.replyTo)) {
    return "Check the email address.";
  }
  if (!channelReady(data.channel)) {
    return `${channels[data.channel].label} is not listed yet. Choose Instagram and message @${artist.workHandle}.`;
  }
  return "";
}

export function channelHref(channel, text) {
  const encoded = encodeURIComponent(text);
  if (channel === "instagram") return `https://ig.me/m/${artist.workHandle}`;
  if (channel === "whatsapp") return `https://wa.me/${digits(artist.whatsapp)}?text=${encoded}`;
  if (channel === "text") {
    const phone = String(artist.phone).startsWith("+") ? artist.phone : `+${digits(artist.phone)}`;
    return `sms:${phone}?&body=${encoded}`;
  }
  const subject = encodeURIComponent(`Booking enquiry for ${artist.brand}`);
  return `mailto:${artist.email}?subject=${subject}&body=${encoded}`;
}

export function helpText(channel, copied) {
  const paste = copied ? " Paste the copied note if the app opens blank." : " Copy the note below into the app.";
  if (channel === "instagram") return `Instagram should be open on a chat with @${artist.workHandle}.${paste}`;
  if (channel === "whatsapp") return `WhatsApp should be open with your enquiry.${paste}`;
  if (channel === "text") return `Your messages app should be open with the text ready.${paste}`;
  return `Your email app should be open, addressed to ${artist.email}.${paste}`;
}

export function openChannel(channel, text) {
  const href = channelHref(channel, text);
  if (channel === "text" || channel === "email") {
    window.location.href = href;
    return;
  }
  window.open(href, "_blank", "noopener");
}
