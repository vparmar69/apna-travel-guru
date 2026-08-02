/* =====================================================================
   APNA TRAVEL GURU — SITE DATA
   =====================================================================
   THIS IS THE ONLY FILE YOU NEED TO EDIT.

   To update prices, packages, images, or contact details:
     1. Edit the values below.
     2. Save the file.
     3. Push to GitHub (or upload again wherever it's hosted).
     4. The live site updates automatically — no other files need to change.

   Rules to keep things from breaking:
     - Keep the quotes "" around text.
     - Keep the commas , at the end of each line.
     - Don't delete the curly braces { } or square brackets [ ].
     - To add a new package, copy one whole { ... } block inside
       PACKAGES, paste it before the closing "]", and edit its values.
     - To remove a package, delete its whole { ... } block (and the
       comma before/after it so the list stays valid).
   ===================================================================== */

// ---------------------------------------------------------------------
// 1. SITE-WIDE SETTINGS — phone numbers, social links, business info
// ---------------------------------------------------------------------
const SITE_CONFIG = {
  brandName: "Apna Travel Guru",
  tagline: "Trusted Travel Partner for Spiritual & Cultural Journeys",

  // Include country code, no + sign, no spaces. Example shown is a placeholder.
  whatsappNumber: "919876543210",
  callNumber: "+919876543210",
  email: "hello@apnatravelguru.com",

  // Pre-filled message sent when someone taps a WhatsApp button
  whatsappDefaultMessage: "Hi Apna Travel Guru! I'd like to know more about your tour packages.",

  officeHours: "Mon – Sun: 9:00 AM – 8:00 PM",
  officeAddress: "Indore, Madhya Pradesh, India",

  // Paste a Google Maps embed URL here (Maps → Share → Embed a map → copy the src link)
  googleMapsEmbedUrl: "https://www.google.com/maps?q=Indore,Madhya+Pradesh&output=embed",

  social: {
    youtube: "https://youtube.com/@apnatravelguru",
    instagram: "https://instagram.com/apnatravelguru",
    facebook: "https://facebook.com/apnatravelguru",
  },

  stats: {
    followers: "80K+",
    followersLabel: "Community",
    views: "10M+",
    viewsLabel: "Views Across Platforms",
    travelers: "500+",
    travelersLabel: "Happy Travelers",
    years: "5+",
    yearsLabel: "Years of Trusted Journeys",
  },
};

// ---------------------------------------------------------------------
// 2. TOUR PACKAGES
// ---------------------------------------------------------------------
// image: path to a photo inside the /images/packages folder.
//        Recommended size: 800x600px, JPG, under 300KB.
// tiers: Standard / Premium / Luxury, each with two plan durations.
const PACKAGES = [
  {
    id: "ujjain-omkareshwar",
    icon: "🛕",
    title: "Ujjain + Omkareshwar",
    subtitle: "Mahakaleshwar Jyotirlinga & Omkareshwar Darshan",
    image: "images/packages/ujjain-omkareshwar.jpg",
    duration: "2 Days / 2 Nights",
    group: "4 Persons",
    startingPrice: 2469,
    youtubeReelUrl: "https://youtube.com/shorts/REPLACE_WITH_REEL_ID",
    instagramReelUrl: "https://instagram.com/reel/REPLACE_WITH_REEL_ID",
    youtubeThumbnail: "images/packages/ujjain-yt-thumb.jpg",
    instagramThumbnail: "images/packages/ujjain-ig-thumb.jpg",
    highlights: [
      "Mahakaleshwar Bhasma Aarti darshan",
      "Omkareshwar Jyotirlinga temple visit",
      "Kal Bhairav Temple",
      "Narmada Ghat boat ride",
    ],
    tiers: {
      standard: {
        label: "Standard",
        plans: {
          "2D3N": { duration: "2 Days / 3 Nights", price2: 3969, price4: 2469 },
          "3D4N": { duration: "3 Days / 4 Nights", price2: 4969, price4: 3169 },
        },
        hotel: "3-star hotel, AC rooms, near temple",
        transport: "AC vehicle, all transfers included",
        inclusions: ["Hotel stay", "Daily breakfast", "All transfers", "Temple darshan assistance", "Toll & parking"],
        exclusions: ["Lunch & dinner", "Personal expenses", "Entry tickets (if any)", "Travel insurance"],
        thingsToCarry: ["Comfortable footwear", "Modest temple attire", "ID proof", "Personal medication"],
      },
      premium: {
        label: "Premium",
        plans: {
          "2D3N": { duration: "2 Days / 3 Nights", price2: 5469, price4: 3469 },
          "3D4N": { duration: "3 Days / 4 Nights", price2: 6969, price4: 4469 },
        },
        hotel: "4-star hotel, AC rooms, breakfast included",
        transport: "AC vehicle with experienced local guide",
        inclusions: ["Hotel stay", "Breakfast & dinner", "All transfers", "Local guide", "VIP darshan assistance", "Toll & parking"],
        exclusions: ["Lunch", "Personal expenses", "Travel insurance"],
        thingsToCarry: ["Comfortable footwear", "Modest temple attire", "ID proof", "Personal medication"],
      },
      luxury: {
        label: "Luxury",
        plans: {
          "2D3N": { duration: "2 Days / 3 Nights", price2: 7969, price4: 5469 },
          "3D4N": { duration: "3 Days / 4 Nights", price2: 9969, price4: 6969 },
        },
        hotel: "5-star / heritage property, premium rooms",
        transport: "Premium AC vehicle, dedicated guide",
        inclusions: ["Hotel stay", "All meals", "All transfers", "Dedicated guide", "Priority darshan", "Toll & parking"],
        exclusions: ["Personal expenses", "Travel insurance"],
        thingsToCarry: ["Comfortable footwear", "Modest temple attire", "ID proof", "Personal medication"],
      },
    },
  },

  {
    id: "kutch-rann-utsav",
    icon: "🏜️",
    title: "Kutch (Rann Utsav)",
    subtitle: "White Rann, Tent City & Rann Utsav Festival",
    image: "images/packages/kutch-rann-utsav.jpg",
    duration: "2 Days / 2 Nights",
    group: "4 Persons",
    startingPrice: 2469,
    youtubeReelUrl: "https://youtube.com/shorts/REPLACE_WITH_REEL_ID",
    instagramReelUrl: "https://instagram.com/reel/REPLACE_WITH_REEL_ID",
    youtubeThumbnail: "images/packages/kutch-yt-thumb.jpg",
    instagramThumbnail: "images/packages/kutch-ig-thumb.jpg",
    highlights: [
      "White Rann sunset point",
      "Tent City stay experience",
      "Rann Utsav cultural performances",
      "Kutch handicraft villages",
    ],
    tiers: {
      standard: {
        label: "Standard",
        plans: {
          "2D3N": { duration: "2 Days / 3 Nights", price2: 3969, price4: 2469 },
          "3D4N": { duration: "3 Days / 4 Nights", price2: 4969, price4: 3169 },
        },
        hotel: "Standard Swiss tents, shared facilities",
        transport: "AC vehicle, all transfers included",
        inclusions: ["Tent stay", "Daily breakfast", "All transfers", "White Rann entry", "Toll & parking"],
        exclusions: ["Lunch & dinner", "Personal expenses", "Camel/ATV rides", "Travel insurance"],
        thingsToCarry: ["Warm clothing (desert nights are cold)", "Comfortable footwear", "ID proof", "Sunscreen"],
      },
      premium: {
        label: "Premium",
        plans: {
          "2D3N": { duration: "2 Days / 3 Nights", price2: 5469, price4: 3469 },
          "3D4N": { duration: "3 Days / 4 Nights", price2: 6969, price4: 4469 },
        },
        hotel: "Deluxe AC tents with attached washroom",
        transport: "AC vehicle with experienced local guide",
        inclusions: ["Tent stay", "Breakfast & dinner", "All transfers", "Local guide", "Cultural show access", "Toll & parking"],
        exclusions: ["Lunch", "Camel/ATV rides", "Personal expenses"],
        thingsToCarry: ["Warm clothing", "Comfortable footwear", "ID proof", "Sunscreen"],
      },
      luxury: {
        label: "Luxury",
        plans: {
          "2D3N": { duration: "2 Days / 3 Nights", price2: 7969, price4: 5469 },
          "3D4N": { duration: "3 Days / 4 Nights", price2: 9969, price4: 6969 },
        },
        hotel: "Premium AC tents, private washroom, front-row Rann view",
        transport: "Premium AC vehicle, dedicated guide",
        inclusions: ["Tent stay", "All meals", "All transfers", "Dedicated guide", "Camel cart ride", "Toll & parking"],
        exclusions: ["Personal expenses", "Travel insurance"],
        thingsToCarry: ["Warm clothing", "Comfortable footwear", "ID proof", "Sunscreen"],
      },
    },
  },

  {
    id: "banaras-ayodhya",
    icon: "🛕",
    title: "Banaras + Ayodhya",
    subtitle: "Kashi Vishwanath, Ganga Aarti & Ram Mandir",
    image: "images/packages/banaras-ayodhya.jpg",
    duration: "2 Days / 2 Nights",
    group: "4 Persons",
    startingPrice: 2469,
    youtubeReelUrl: "https://youtube.com/shorts/REPLACE_WITH_REEL_ID",
    instagramReelUrl: "https://instagram.com/reel/REPLACE_WITH_REEL_ID",
    youtubeThumbnail: "images/packages/banaras-yt-thumb.jpg",
    instagramThumbnail: "images/packages/banaras-ig-thumb.jpg",
    highlights: [
      "Kashi Vishwanath Temple darshan",
      "Evening Ganga Aarti at Dashashwamedh Ghat",
      "Ram Mandir Ayodhya darshan",
      "Boat ride on the Ganges",
    ],
    tiers: {
      standard: {
        label: "Standard",
        plans: {
          "2D3N": { duration: "2 Days / 3 Nights", price2: 3969, price4: 2469 },
          "3D4N": { duration: "3 Days / 4 Nights", price2: 4969, price4: 3169 },
        },
        hotel: "3-star hotel, AC rooms, near ghats",
        transport: "AC vehicle, all transfers included",
        inclusions: ["Hotel stay", "Daily breakfast", "All transfers", "Ganga Aarti viewing", "Toll & parking"],
        exclusions: ["Lunch & dinner", "Boat ride charges", "Personal expenses", "Travel insurance"],
        thingsToCarry: ["Comfortable footwear", "Modest temple attire", "ID proof", "Personal medication"],
      },
      premium: {
        label: "Premium",
        plans: {
          "2D3N": { duration: "2 Days / 3 Nights", price2: 5469, price4: 3469 },
          "3D4N": { duration: "3 Days / 4 Nights", price2: 6969, price4: 4469 },
        },
        hotel: "4-star hotel, AC rooms, breakfast included",
        transport: "AC vehicle with experienced local guide",
        inclusions: ["Hotel stay", "Breakfast & dinner", "All transfers", "Local guide", "Boat ride included", "Toll & parking"],
        exclusions: ["Lunch", "Personal expenses", "Travel insurance"],
        thingsToCarry: ["Comfortable footwear", "Modest temple attire", "ID proof", "Personal medication"],
      },
      luxury: {
        label: "Luxury",
        plans: {
          "2D3N": { duration: "2 Days / 3 Nights", price2: 7969, price4: 5469 },
          "3D4N": { duration: "3 Days / 4 Nights", price2: 9969, price4: 6969 },
        },
        hotel: "5-star / riverside heritage property",
        transport: "Premium AC vehicle, dedicated guide",
        inclusions: ["Hotel stay", "All meals", "All transfers", "Dedicated guide", "Private boat ride", "Priority darshan", "Toll & parking"],
        exclusions: ["Personal expenses", "Travel insurance"],
        thingsToCarry: ["Comfortable footwear", "Modest temple attire", "ID proof", "Personal medication"],
      },
    },
  },
];

// ---------------------------------------------------------------------
// 3. CUSTOMER REVIEWS
// ---------------------------------------------------------------------
const REVIEWS = [
  {
    name: "Priya Sharma",
    location: "Indore",
    rating: 5,
    photo: "images/reviews/priya.jpg",
    text: "Everything was planned so well — from the hotel to the temple darshan timings. Felt like traveling with people who actually cared, not just a booking agent.",
  },
  {
    name: "Rohit Verma",
    location: "Bhopal",
    rating: 5,
    photo: "images/reviews/rohit.jpg",
    text: "We saw their reels for months before finally booking the Kutch trip. It matched exactly what was shown — no surprises, no hidden costs. Highly recommend.",
  },
  {
    name: "Anjali & Family",
    location: "Ujjain",
    rating: 5,
    photo: "images/reviews/anjali.jpg",
    text: "Traveling with elderly parents is stressful, but the team handled everything patiently. The Banaras Ayodhya trip was smooth from start to end.",
  },
];

// ---------------------------------------------------------------------
// 4. HERO SECTION IMAGE
// ---------------------------------------------------------------------
const HERO_IMAGE = "images/hero/hero-background.jpg";
