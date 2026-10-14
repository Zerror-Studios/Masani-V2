export const siteConfig = {
  name: "Navjote Ceremony",
  description: "Join us for the auspicious occasion of the NAVJOTE Ceremony. RSVP and find event details here.",
  url: "https://www.masaninavjote.com",
  locale: "en_IN",
  language: "en-IN",
  ogImage: "/og.png",
  keywords: [
    "NAVJOTE",
    "Navjote",
    "Ceremony",
    "Parsi",
    "Zoroastrian",
    "RSVP",
    "Event"
  ],
  contact: {
    phone: "",
    email: "",
  },
  address: {
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "IN",
  },
  socials: {
    facebook: "",
    instagram: "",
    twitter: "",
    linkedin: "",
  },
};

export const siteRoutes = [
  {
    path: "/",
    label: "Home",
    title: "WALKER ZAL MASANI",
    description: "Welcome to the NAVJOTE Ceremony event page. RSVP here.",
    priority: 1,
  },
  {
    path: "/about",
    label: "About",
    title: "About the Ceremony",
    description: "Learn more about the NAVJOTE Ceremony and its significance.",
    priority: 0.8,
  },
  {
    path: "/contact",
    label: "Contact",
    title: "Contact Us",
    description: "Get in touch for any queries regarding the NAVJOTE Ceremony.",
    priority: 0.7,
  },
];
