/* =====================================================================
   APNA TRAVEL GURU — PACKAGES DATA  (js/packages-data.js)
   =====================================================================
   Packages ka SARA data sirf is file mein hai.
   Naye package ki details aane par sirf is file ko badalna hota hai.

   9 packages bane hue hain. Jiska  live: true  hai wo poora chalta hai.
   Jiska  live: false  hai wo card par "Details coming soon" dikhata hai
   aur click par WhatsApp enquiry khulti hai.

   NAYA PACKAGE LIVE KARNE KE LIYE:
     1. live: false ko live: true karo
     2. plans: [ ... ] bharo (neeche Ujjain ka namuna dekho)
     3. inclusions, exclusions, carry bharo

   PRICE KE ARRAY KA ORDER (har category ke liye 5 numbers):
        [ 2 members, 3 members, 4-5 members, 6-8 members, 9-12 members ]
   Ye price PER PERSON hain.

   Rules: "" quotes rakho, har line ke end mein , rakho, { } [ ] mat hatao.
   ===================================================================== */

const PK_CONFIG = {
  minMembers: 2,
  maxMembers: 12,

  // members slabs ki upar-seema:  2, 3, 4-5, 6-8, 9-12
  slabs: [2, 3, 5, 8, 12],

  // category: card par sirf ek line dikhti hai (price nahi)
  // SAMPLE TEXT: asli hotel / gaadi ke hisaab se badal sakte ho
  tiers: [
    { id: "deluxe",  label: "Deluxe",  note: "Comfortable hotel stay" },
    { id: "premium", label: "Premium", note: "Better hotel with more comfort" },
    { id: "luxury",  label: "Luxury",  note: "Top hotel and a premium experience" },
  ],

  priceNote: "Price includes GST, toll & parking.",

  // "Add meals" option ke saath kya milta hai (popup mein dikhta hai)
  mealsNote: "Dinner included",
};

const PK_PACKAGES = [

  // ===================================================================
  // 1. UJJAIN  — LIVE
  // ===================================================================
  {
    id: "ujjain",
    title: "Ujjain",
    location: "Madhya Pradesh",
    filter: "Spiritual",
    popular: false,
    image: "images/packages/ujjain.jpg",
    tone: "#5a2d0c",
    live: true,

    plans: [
      {
        id: "1n1d",
        label: "1 Night / 1 Day",
        price: {
          deluxe:  [1900, 1500, 1400, 1300, 1200],
          premium: [2500, 2000, 1750, 1600, 1500],
          luxury:  [4000, 3500, 3500, 3000, 2900],
        },
        // Food optional: itna extra per person
        food: { deluxe: 350, premium: 400, luxury: 500 },
        itinerary: [
          {
            day: "Day 1",
            title: "Divine Ujjain Darshan & Sightseeing",
            text:
              "Arrive in Ujjain and begin your spiritual journey with the sacred Mahakaleshwar Jyotirlinga Darshan. Explore the magnificent Mahakal Lok Corridor and seek blessings at Bade Ganeshji Temple.\n\n" +
              "Continue your darshan with visits to Harsiddhi Mata Temple, Kal Bhairav Temple, Mangalnath Temple, Gadkalika Temple and Sandipani Ashram. Later, experience the peaceful spiritual atmosphere of Ram Ghat on the banks of the Shipra River.\n\n" +
              "After completing the sightseeing, check in to your hotel and enjoy a comfortable overnight stay in Ujjain.",
          },
          {
            day: "Day 2",
            title: "Departure",
            text:
              "After breakfast, check out from the hotel and proceed for your drop/onward journey, taking back divine blessings and beautiful memories from Ujjain.",
          },
        ],
      },

      {
        id: "1n2d",
        label: "1 Night / 2 Days",
        price: {
          deluxe:  [2800, 2100, 1800, 1700, 1600],
          premium: [3400, 2600, 2300, 2100, 2000],
          luxury:  [5200, 4700, 3600, 3600, 3500],
        },
        food: { deluxe: 450, premium: 550, luxury: 700 },
        itinerary: [
          {
            day: "Day 1",
            title: "Arrival & Mahakal Darshan",
            text:
              "Arrive in Ujjain and start your spiritual journey with Mahakaleshwar Jyotirlinga Darshan. Visit Mahakal Lok Corridor, Bade Ganeshji Temple and Harsiddhi Mata Temple.\n\n" +
              "Later, visit Ram Ghat and enjoy the serene atmosphere of the Shipra River. Check in to your hotel and relax.\n\n" +
              "Overnight Stay in Ujjain.",
          },
          {
            day: "Day 2",
            title: "Temple Tour & Departure",
            text:
              "After breakfast, proceed for a complete Ujjain temple tour covering Kal Bhairav Temple, Mangalnath Temple, Gadkalika Temple, Sandipani Ashram, Bhartrihari Caves and Siddhavat.\n\n" +
              "After completing the sightseeing, proceed for your drop/onward journey.\n\n" +
              "Tour Ends with divine blessings and unforgettable memories.",
          },
        ],
      },

      {
        // NOTE: aapne "2 Nights / 2 Days" likha tha. Itinerary 3 din ki hai,
        // isliye yahan "2 Nights / 3 Days" rakha hai. Badalna ho to sirf label badlo.
        id: "2n3d",
        label: "2 Nights / 3 Days",
        price: {
          deluxe:  [3400, 2500, 2200, 2100, 2000],
          premium: [4400, 3500, 3300, 3000, 2850],
          luxury:  [7200, 6400, 6200, 6200, 6100],
        },
        food: { deluxe: 700, premium: 800, luxury: 1000 },
        itinerary: [
          {
            day: "Day 1",
            title: "Arrival, Mahakal Darshan & Local Sightseeing",
            text:
              "Arrive in Ujjain and begin your journey with the sacred Mahakaleshwar Jyotirlinga Darshan. Explore Mahakal Lok Corridor and visit Bade Ganeshji Temple and Harsiddhi Mata Temple.\n\n" +
              "Later, visit Ram Ghat and experience the spiritual charm of Ujjain. Check in to your hotel and relax.\n\n" +
              "Overnight Stay in Ujjain.",
          },
          {
            day: "Day 2",
            title: "Complete Ujjain Spiritual Tour",
            text:
              "After breakfast, explore the important spiritual landmarks of Ujjain. Visit Kal Bhairav Temple, Mangalnath Temple, Gadkalika Temple, Sandipani Ashram, Bhartrihari Caves and Siddhavat.\n\n" +
              "Spend the evening at leisure or explore the local markets and spiritual streets of Ujjain.\n\n" +
              "Overnight Stay in Ujjain.",
          },
          {
            day: "Day 3",
            title: "Departure",
            text:
              "After breakfast, check out from the hotel and proceed for your drop/onward journey.\n\n" +
              "End your Ujjain journey with the blessings of Mahakal and cherished spiritual memories.",
          },
        ],
      },
    ],

    // SAMPLE (aapne ye abhi nahi diya): confirm karke badal do
    inclusions: [
      "Hotel stay as per selected category",
      "Daily breakfast",
      "Local sightseeing as per itinerary",
      "Toll, parking & GST",
    ],
    exclusions: [
      "Meals (optional add-on available, dinner included)",
      "Train / flight tickets",
      "Personal expenses",
      "Special darshan or entry tickets, if any",
    ],
    carry: [
      "ID proof",
      "Comfortable footwear",
      "Modest temple attire",
      "Water bottle",
      "Personal medicines",
    ],
  },

  // ===================================================================
  // 2 to 9: COMING SOON (data aane par live: true karenge)
  // ===================================================================
  { id: "ujjain-omkareshwar",  title: "Ujjain + Omkareshwar",  location: "Madhya Pradesh",   filter: "Spiritual",  popular: true,  image: "images/packages/ujjain-omkareshwar.jpg",  tone: "#4a2a12", live: false },
  { id: "kutch",               title: "Kutch (Rann Utsav)",    location: "Gujarat",          filter: "Culture",    popular: true,  image: "images/packages/kutch.jpg",               tone: "#12304d", live: false },
  { id: "mathura-vrindavan",   title: "Mathura + Vrindavan",   location: "Uttar Pradesh",    filter: "Spiritual",  popular: false, image: "images/packages/mathura-vrindavan.jpg",   tone: "#3b2a14", live: false },
  { id: "char-dham",           title: "Char Dham",             location: "Uttarakhand",      filter: "Pilgrimage", popular: false, image: "images/packages/char-dham.jpg",           tone: "#1f3b2d", live: false },
  { id: "kedarnath-badrinath", title: "Kedarnath + Badrinath", location: "Uttarakhand",      filter: "Pilgrimage", popular: true,  image: "images/packages/kedarnath-badrinath.jpg", tone: "#26334d", live: false },
  { id: "kedarnath",           title: "Kedarnath",             location: "Uttarakhand",      filter: "Pilgrimage", popular: false, image: "images/packages/kedarnath.jpg",           tone: "#2d2a4a", live: false },
  { id: "udaipur",             title: "Udaipur",               location: "Rajasthan",        filter: "Heritage",   popular: false, image: "images/packages/udaipur.jpg",             tone: "#4a1f2d", live: false },
  { id: "manali",              title: "Manali",                location: "Himachal Pradesh", filter: "Hills",      popular: false, image: "images/packages/manali.jpg",              tone: "#17404a", live: false },
];
