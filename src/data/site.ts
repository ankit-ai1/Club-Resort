export const site = {
  name: "Club Platinum Resort",
  tagline: "Where thrill meets tranquility",
  address: "Assauda Turn, Delhi–Rohtak Road, Bahadurgarh, Haryana",
  phones: ["+91 84476 93142", "+91 96438 31517", "+91 87005 70533"],
  whatsapp: "919873919103",
  email: "clubplatinumresort@gmail.com",
  mapEmbed:
    "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d27988.45823427268!2d76.84983400000002!3d28.732774000000003!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xa65e9a9bf26d32e3!2sThe%20Club%20Platinum%20Resort!5e0!3m2!1sen!2sin!4v1605339297041!5m2!1sen!2sin",
  social: {
    facebook: "https://www.facebook.com/clubplatinumresort",
    twitter: "https://twitter.com/TheClubPlatinum",
    linkedin: "https://www.linkedin.com/company/club-platinum-resort/",
    instagram: "https://www.instagram.com/clubplatinumresort/",
    youtube: "https://www.youtube.com/channel/UCszquGX3JKyEd4lfMtcwY8Q",
  },
};

export const nav = [
  { label: "Home", href: "/" },
  {
    label: "Experiences",
    href: "/water-park",
    children: [
      { label: "Water Park", href: "/water-park" },
      { label: "Amusement Park", href: "/amusement-park" },
      { label: "Adventure Park", href: "/adventure-park" },
      { label: "Rooms & Suites", href: "/rooms" },
    ],
  },
  {
    label: "Occasions",
    href: "/corporate",
    children: [
      { label: "Corporate Retreats", href: "/corporate" },
      { label: "School & College", href: "/school-college" },
      { label: "Family & Friends", href: "/family-friends" },
      { label: "Dining & Banquets", href: "/dining" },
    ],
  },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

// Reliable, high-quality imagery (Unsplash). Swap freely with your own resort photos.
export const img = {
  heroPool:
    "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1920&q=80",
  waterSlides:
    "https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=1600&q=80",
  wavePool:
    "https://images.unsplash.com/photo-1502904550040-7534597429ae?auto=format&fit=crop&w=1600&q=80",
  amusement:
    "https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?auto=format&fit=crop&w=1600&q=80",
  ferrisWheel:
    "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=1600&q=80",
  adventure:
    "https://images.unsplash.com/photo-1516939884455-1445c8652f83?auto=format&fit=crop&w=1600&q=80",
  zipline:
    "https://images.unsplash.com/photo-1622260614153-03223fb72052?auto=format&fit=crop&w=1600&q=80",
  roomDeluxe:
    "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1600&q=80",
  roomSuite:
    "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1600&q=80",
  roomBed:
    "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1600&q=80",
  dining:
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80",
  food:
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=80",
  banquet:
    "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1600&q=80",
  conference:
    "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80",
  corporate:
    "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1600&q=80",
  school:
    "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80",
  family:
    "https://images.unsplash.com/photo-1541532713592-79a0317b6b77?auto=format&fit=crop&w=1600&q=80",
  poolAerial:
    "https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=1920&q=80",
  resortNight:
    "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1600&q=80",
  spa:
    "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=80",
  cocktail:
    "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1600&q=80",
  splash:
    "https://images.unsplash.com/photo-1560090995-01632a28895b?auto=format&fit=crop&w=1600&q=80",
  kids:
    "https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&w=1600&q=80",
};

export const stats = [
  { value: "12", label: "Acres of landscaped escape" },
  { value: "20+", label: "Water & amusement rides" },
  { value: "50k+", label: "Happy guests every year" },
  { value: "4.6", label: "Average guest rating" },
];

export const experiences = [
  {
    slug: "water-park",
    title: "Water Park",
    tag: "Splash",
    excerpt:
      "Twisting flumes, a roaring wave pool and lazy rivers engineered for pure adrenaline and easy afternoons alike.",
    image: img.waterSlides,
  },
  {
    slug: "amusement-park",
    title: "Amusement Park",
    tag: "Play",
    excerpt:
      "Unlimited rides that spin, soar and swing — from gentle carousels for little ones to full-throttle thrillers.",
    image: img.amusement,
  },
  {
    slug: "adventure-park",
    title: "Adventure Park",
    tag: "Dare",
    excerpt:
      "Test your nerve on rope courses, ziplines and climbing walls set across our green, open-air playground.",
    image: img.adventure,
  },
  {
    slug: "rooms",
    title: "Rooms & Suites",
    tag: "Stay",
    excerpt:
      "Contemporary rooms with plush bedding and modern fittings — the calm counterpoint to a day of thrills.",
    image: img.roomDeluxe,
  },
];

export const occasions = [
  {
    slug: "corporate",
    title: "Corporate Retreats",
    image: img.corporate,
    points: ["Offsites & team outings", "Residential conferences", "Leisure & incentive stays"],
  },
  {
    slug: "school-college",
    title: "School & College",
    image: img.school,
    points: ["Supervised group picnics", "Water park + meals + stay", "Custom day packages"],
  },
  {
    slug: "family-friends",
    title: "Family & Friends",
    image: img.family,
    points: ["Weekend day outings", "Water park + buffet + stay", "Celebration packages"],
  },
];

export const testimonials = [
  {
    quote:
      "An effortless blend of thrill and calm. The team handled our 200-person offsite flawlessly and everyone left buzzing.",
    name: "Ridhima Kapoor",
    role: "People & Culture Lead, Northline Tech",
  },
  {
    quote:
      "We came for the water park and stayed for the hospitality. Clean, green and genuinely relaxing — a rare combination.",
    name: "Arjun Mehta",
    role: "Weekend guest",
  },
  {
    quote:
      "Our college picnic for 300 students ran like clockwork. Safe, well-organised and packed with things to do.",
    name: "Prof. S. Nair",
    role: "Faculty Coordinator",
  },
];

export const blogPosts = [
  {
    slug: "best-day-outing-near-delhi",
    title: "The Best Day Outing Near Delhi NCR (That Isn't a Mall)",
    date: "April 16, 2026",
    readMins: 5,
    image: img.poolAerial,
    excerpt:
      "Trade the traffic and the food courts for a green escape barely an hour from the city. Here's how to plan the perfect one-day reset.",
  },
  {
    slug: "monsoon-splash-guide",
    title: "Monsoon at the Water Park: A Local's Splash Guide",
    date: "March 2, 2026",
    readMins: 4,
    image: img.splash,
    excerpt:
      "Warm rain, shorter queues and the wave pool at its moody best. Why the shoulder season might be the smartest time to visit.",
  },
  {
    slug: "corporate-offsite-checklist",
    title: "Planning a Corporate Offsite: A Simple Checklist",
    date: "February 12, 2026",
    readMins: 6,
    image: img.conference,
    excerpt:
      "From AV to après-meeting activities, a field-tested list to make your next residential offsite the one people talk about.",
  },
];

export const amenities = [
  "Free parking",
  "Locker rooms & showers",
  "Lifeguards on duty",
  "Multi-cuisine dining",
  "Kids' splash zone",
  "First-aid & medical",
  "Wheelchair access",
  "Air-conditioned banquets",
];
