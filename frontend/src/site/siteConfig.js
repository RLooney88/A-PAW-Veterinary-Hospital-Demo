import rawConfig from "./site.config.json";

const FALLBACK_CONFIG = {
  practice: {
    name: "A.P.A.W. Veterinary Hospital and Wellness Center",
    shortName: "A.P.A.W.",
    displayLines: ["A.P.A.W.", "Veterinary Hospital"],
    tagline: "Compassionate, AAHA-accredited veterinary care in Lanham.",
    description: "A full-service veterinary hospital in Lanham caring for dogs, cats, rabbits, ferrets, reptiles, and pocket pets.",
    serviceArea: "Lanham, MD and Prince George’s County",
  },
  brand: {
    logo: "/brand/logo-placeholder.svg",
    logoAlt: "Veterinary practice logo",
    colors: {
      light: "#FDFBF7",
      dark: "#1A2B4C",
      accent: "#C8382E",
      accentLight: "#E8F0EB",
    },
  },
  contact: {
    phone: "(301) 552-3800",
    phoneHref: "tel:+13015523800",
    email: "apawvet@gmail.com",
    address: {
      street: "7601 Good Luck Rd",
      line2: "",
      city: "Lanham",
      state: "MD",
      zip: "20706",
      country: "US",
    },
  },
  hours: [
    ["Monday", "8:00 AM – 5:00 PM"],
    ["Tuesday", "8:00 AM – 5:00 PM"],
    ["Wednesday", "8:00 AM – 5:00 PM"],
    ["Thursday", "8:00 AM – 5:00 PM"],
    ["Friday", "8:00 AM – 5:00 PM"],
    ["Saturday", "Closed"],
    ["Sunday", "Closed"],
  ],
  links: {},
  team: [],
  features: {},
};

function mergeConfig(base, override) {
  const output = { ...base, ...override };
  output.practice = { ...base.practice, ...(override.practice || {}) };
  output.brand = { ...base.brand, ...(override.brand || {}) };
  output.brand.colors = { ...base.brand.colors, ...((override.brand && override.brand.colors) || {}) };
  output.contact = { ...base.contact, ...(override.contact || {}) };
  output.contact.address = { ...base.contact.address, ...((override.contact && override.contact.address) || {}) };
  output.links = { ...base.links, ...(override.links || {}) };
  output.features = { ...base.features, ...(override.features || {}) };
  output.hours = override.hours && override.hours.length ? override.hours : base.hours;
  output.team = override.team || base.team;
  return output;
}

export const siteConfig = mergeConfig(FALLBACK_CONFIG, rawConfig || {});

export const practice = siteConfig.practice;
export const brand = siteConfig.brand;
export const contact = siteConfig.contact;
export const links = siteConfig.links;
export const features = siteConfig.features;
export const hours = siteConfig.hours;
export const team = siteConfig.team;

export function formatAddress(address = contact.address, { multiline = false } = {}) {
  const line1 = [address.street, address.line2].filter(Boolean).join(", ");
  const line2 = [address.city, address.state, address.zip].filter(Boolean).join(" ");
  if (multiline) return [line1, line2].filter(Boolean);
  return [line1, line2].filter(Boolean).join(", ");
}

export function getExternalLinks() {
  return [
    features.storeLink && links.store ? { label: "Online Store", href: links.store } : null,
    features.pharmacyLink && links.pharmacy ? { label: "Pharmacy", href: links.pharmacy } : null,
    features.onlineFormsLink && links.onlineForms ? { label: "Forms", href: links.onlineForms } : null,
  ].filter(Boolean);
}
