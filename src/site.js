export const artist = {
  name: "Ayush Singh",
  firstName: "Ayush",
  brand: "Aayush Makeovers",
  city: "Lucknow",
  workHandle: "aayushmakeovers",
  personalHandle: "ayush_singh_1009",
  whatsapp: "917380495883",
  phone: "+917380495883",
  email: "",
};

export const workUrl = `https://www.instagram.com/${artist.workHandle}/`;
export const personalUrl = `https://www.instagram.com/${artist.personalHandle}/`;
export const workDm = `https://ig.me/m/${artist.workHandle}`;
export const phoneDisplay = "+91 73804 95883";
export const whatsappUrl =
  `https://wa.me/${artist.whatsapp}?text=` +
  encodeURIComponent("Hi Ayush Singh, I saw your ad and would like to book makeup in Lucknow.");

export const looks = [
  ["01", "North Indian bridal", "Warm skin, defined eyes, a glow that holds through pheras."],
  ["02", "Bengali bridal", "Red-led colour, a clean brow, and jewellery that stays the hero."],
  ["03", "Muslim bridal", "Soft shimmer, polished skin, and a finish made for evening light."],
  ["04", "Engagement & roka", "Lighter coverage, a fresher mouth, still unmistakably dressed up."],
  ["05", "Party & family", "Matching glam for sisters, mothers, and the wedding party."],
];

export const services = [
  {
    title: "Party makeup for family",
    detail: "Sisters, mothers, and guests who want to sit in the same frame.",
    price: "From ₹3,500",
    unit: "per person",
  },
  {
    title: "Engagement makeup",
    detail: "Roka and engagement glam, including a paid trial if you want to test the look.",
    price: "From ₹6,000",
  },
  {
    title: "Bridal makeup",
    detail: "Wedding or reception. Skin, eyes, and setting chosen for a long function day.",
    price: "From ₹15,000",
    unit: "per function",
  },
  {
    title: "Outstation",
    detail: "Travel outside Lucknow, quoted per function.",
    price: "From ₹12,000",
    unit: "per function",
  },
];

export const occasions = [
  "Bridal — wedding",
  "Bridal — reception",
  "Engagement / roka",
  "Mehendi",
  "Party or family makeup",
  "Trial",
  "Something else",
];

export const sources = [
  "Instagram ad",
  "Facebook ad",
  "Instagram profile",
  "Google",
  "A friend or family",
  "Somewhere else",
];

export const channels = {
  instagram: {
    label: "Instagram",
    button: "Continue on Instagram",
    replyLabel: "Your Instagram handle",
    placeholder: "@yourhandle",
    type: "text",
    autoComplete: "username",
    hint: `@${artist.workHandle}`,
  },
  whatsapp: {
    label: "WhatsApp",
    button: "Continue on WhatsApp",
    replyLabel: "Your WhatsApp number",
    placeholder: "98xxxxxxxx",
    type: "tel",
    autoComplete: "tel",
    hint: "+91 73804 95883",
  },
  text: {
    label: "Text",
    button: "Continue to text",
    replyLabel: "Your mobile number",
    placeholder: "98xxxxxxxx",
    type: "tel",
    autoComplete: "tel",
    hint: "Text +91 73804 95883",
  },
  email: {
    label: "Email",
    button: "Continue to email",
    replyLabel: "Your email",
    placeholder: "you@email.com",
    type: "email",
    autoComplete: "email",
    hint: "Opens a ready-to-send mail",
  },
};
