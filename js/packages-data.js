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

// Helper: din ka itinerary likhne ke liye. pkDay("Day 1", "Title", "para 1", "para 2", ...)
const pkDay = (day, title, ...paras) => ({ day: day, title: title, text: paras.join("\n\n") });

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

  // "Add meals" option ke saath kya milta hai (popup mein dikhta hai).
  // Add meals nahi chuna to na breakfast, na dinner (price mein shamil nahi).
  mealsNote: "Breakfast & dinner included",
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
      "Local sightseeing as per itinerary",
      "Toll, parking & GST",
    ],
    exclusions: [
      "Meals: breakfast & dinner (optional add-on available)",
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
  // Baaki packages: COMING SOON (data aane par live: true karenge)
  // ===================================================================
  // ===================================================================
  // 2. UJJAIN + OMKARESHWAR  — LIVE
  // ===================================================================
  {
    id: "ujjain-omkareshwar",
    title: "Ujjain + Omkareshwar",
    location: "Madhya Pradesh",
    filter: "Spiritual",
    popular: true,
    image: "images/packages/ujjain-omkareshwar.jpg",
    tone: "#4a2a12",
    live: true,

    // SAMPLE (aapne ye nahi diya): confirm karke badal do
    exclusions: [
      "Train / flight tickets",
      "Personal expenses",
      "Entry tickets or special darshan, if any",
    ],
    carry: ["ID proof", "Comfortable footwear", "Modest temple attire", "Water bottle", "Personal medicines"],

    plans: [
      {
        id: "1n2d",
        label: "1 Night / 2 Days",
        meals: "1 Dinner & 2 Breakfasts",
        price: {
          deluxe:  [3600, 2600, 2100, 2000, 1800],
          premium: [4000, 3200, 2400, 2300, 2100],
          luxury:  [6000, 5000, 4500, 4300, 4100],
        },
        food: { deluxe: 350, premium: 450, luxury: 500 },
        inclusions: ["1 Night hotel stay", "Pickup from Ujjain", "Drop at Ujjain", "Private sightseeing", "Ujjain & Omkareshwar sightseeing", "Toll, parking & GST"],
        itinerary: [
          pkDay("Day 1", "Ujjain Arrival & Complete Temple Darshan",
            "Arrive in Ujjain and begin your spiritual journey with the sacred Mahakaleshwar Jyotirlinga Darshan. Visit Bade Ganeshji Temple, Harsiddhi Mata Temple and explore the magnificent Mahakal Lok Corridor.",
            "Continue your temple tour with visits to Kal Bhairav Temple, Mangalnath Temple, Gadkalika Temple and Sandipani Ashram. Later, spend some peaceful time at Ram Ghat on the banks of the Shipra River.",
            "After completing the sightseeing, check in to your hotel and relax.",
            "Overnight Stay in Ujjain."),
          pkDay("Day 2", "Omkareshwar Excursion & Departure",
            "After an early breakfast, proceed for a full-day excursion to Omkareshwar.",
            "Visit the sacred Omkareshwar Jyotirlinga and Mamleshwar Temple. Explore the beautiful Narmada River Ghats and visit the famous Shani Mandir.",
            "After completing the sightseeing, return to Ujjain and proceed for your drop/onward journey.",
            "Tour Ends with divine blessings and beautiful memories."),
        ],
      },

      {
        id: "2n2d",
        label: "2 Nights / 2 Days",
        meals: "2 Dinners & 2 Breakfasts",
        price: {
          deluxe:  [4100, 3000, 2500, 2300, 2100],
          premium: [4900, 4200, 3100, 2900, 2700],
          luxury:  [8200, 6000, 6800, 6500, 6200],
        },
        food: { deluxe: 700, premium: 800, luxury: 1000 },
        inclusions: ["2 Nights hotel stay", "Pickup from Ujjain", "Drop at Ujjain", "Private sightseeing", "Ujjain & Omkareshwar sightseeing", "Toll, parking & GST"],
        itinerary: [
          pkDay("Day 1", "Ujjain Temple Tour",
            "Arrive in Ujjain and start your spiritual journey with Mahakaleshwar Jyotirlinga Darshan. Visit Bade Ganeshji Temple, Harsiddhi Mata Temple and the iconic Mahakal Lok Corridor.",
            "Continue your sightseeing with Kal Bhairav Temple, Mangalnath Temple, Gadkalika Temple and Sandipani Ashram. Later, visit Ram Ghat and experience the spiritual atmosphere of the Shipra River.",
            "Check in to the hotel and relax.",
            "Overnight Stay in Ujjain."),
          pkDay("Day 2", "Omkareshwar Jyotirlinga Tour & Departure",
            "After breakfast, proceed to Omkareshwar for a divine temple excursion.",
            "Visit Omkareshwar Jyotirlinga, Mamleshwar Temple, Narmada River Ghats and Shani Mandir.",
            "After completing the sightseeing, return to Ujjain and proceed for your drop/onward journey.",
            "Tour Ends with divine blessings and memorable experiences."),
        ],
      },

      {
        id: "2n3d",
        label: "2 Nights / 3 Days",
        meals: "2 Dinners & 3 Breakfasts",
        price: {
          deluxe:  [5500, 3900, 3200, 3000, 2700],
          premium: [6400, 5100, 3800, 2600, 2400],
          luxury:  [9700, 7000, 8000, 7800, 7500],
        },
        food: { deluxe: 800, premium: 950, luxury: 1200 },
        inclusions: ["2 Nights hotel stay", "Pickup from Ujjain", "Drop at Ujjain", "Private sightseeing", "Ujjain, Omkareshwar & Indore sightseeing", "Toll, parking & GST"],
        itinerary: [
          pkDay("Day 1", "Ujjain Spiritual & Temple Tour",
            "Arrive in Ujjain and begin your journey with the sacred Mahakaleshwar Jyotirlinga Darshan. Visit Bade Ganeshji Temple, Harsiddhi Mata Temple and explore the magnificent Mahakal Lok Corridor.",
            "Continue to Kal Bhairav Temple, Mangalnath Temple, Gadkalika Temple and Sandipani Ashram. Later, visit Ram Ghat and enjoy the peaceful atmosphere of the Shipra River.",
            "Check in to your hotel and relax.",
            "Overnight Stay in Ujjain."),
          pkDay("Day 2", "Omkareshwar Jyotirlinga & Narmada Darshan",
            "After breakfast, proceed for a full-day excursion to Omkareshwar.",
            "Seek blessings at Omkareshwar Jyotirlinga and Mamleshwar Temple. Explore the Narmada River Ghats and visit Shani Mandir.",
            "After sightseeing, return to Ujjain.",
            "Overnight Stay in Ujjain."),
          pkDay("Day 3", "Indore City Tour & Departure",
            "After breakfast, proceed towards Indore for a city sightseeing tour.",
            "Visit the famous Khajrana Ganesh Temple, explore the historic Rajwada Palace and visit Lal Bagh Palace. Continue to Annapurna Temple and enjoy local food and shopping at Chappan Dukan.",
            "Later, visit the Indore Zoo before proceeding for your drop/onward journey.",
            "Tour Ends with wonderful memories of Ujjain, Omkareshwar & Indore."),
        ],
      },

      {
        id: "3n4d",
        label: "3 Nights / 4 Days",
        meals: "3 Dinners & 4 Breakfasts",
        price: {
          deluxe:  [7300, 5400, 4500, 4200, 3900],
          premium: [8500, 7300, 5400, 5100, 4900],
          luxury:  [13000, 9000, 11300, 11000, 10500],
        },
        food: { deluxe: 1000, premium: 1200, luxury: 1500 },
        inclusions: ["3 Nights hotel stay", "Pickup from Ujjain", "Drop at Ujjain", "Private sightseeing", "Ujjain, Omkareshwar, Maheshwar & Indore sightseeing", "Toll, parking & GST"],
        itinerary: [
          pkDay("Day 1", "Ujjain Temple & Spiritual Tour",
            "Arrive in Ujjain and begin your spiritual journey with Mahakaleshwar Jyotirlinga Darshan. Visit Bade Ganeshji Temple, Harsiddhi Mata Temple and explore the grand Mahakal Lok Corridor.",
            "Continue to Kal Bhairav Temple, Mangalnath Temple, Gadkalika Temple and Sandipani Ashram. Later, visit Ram Ghat on the banks of the Shipra River.",
            "Check in to the hotel and relax.",
            "Overnight Stay in Ujjain."),
          pkDay("Day 2", "Omkareshwar Jyotirlinga Tour",
            "After breakfast, proceed to Omkareshwar for a full-day spiritual excursion.",
            "Visit Omkareshwar Jyotirlinga, Mamleshwar Temple, Narmada River Ghats and Shani Mandir.",
            "Return to Ujjain after completing the sightseeing.",
            "Overnight Stay in Ujjain."),
          pkDay("Day 3", "Maheshwar Heritage & Narmada Tour",
            "After breakfast, proceed towards the historic town of Maheshwar.",
            "Explore the magnificent Maheshwar Fort, visit Ahilyabai Fort & Palace and spend time at the beautiful Narmada Ghats. Later, visit the scenic Sahastradhara.",
            "After sightseeing, return to Ujjain.",
            "Overnight Stay in Ujjain."),
          pkDay("Day 4", "Indore Sightseeing & Departure",
            "After breakfast, proceed towards Indore.",
            "Visit Khajrana Ganesh Temple, Rajwada Palace, Lal Bagh Palace and Annapurna Temple. Enjoy local food and shopping at Chappan Dukan and visit Indore Zoo.",
            "After completing the sightseeing, proceed for your drop/onward journey.",
            "Tour Ends with beautiful memories and divine blessings."),
        ],
      },

      {
        id: "4n5d",
        label: "4 Nights / 5 Days",
        meals: "4 Dinners & 5 Breakfasts",
        price: {
          deluxe:  [9300, 6600, 5600, 5300, 4900],
          premium: [10900, 9200, 6800, 6500, 6200],
          luxury:  [17000, 12500, 14500, 14200, 13500],
        },
        food: { deluxe: 1300, premium: 1600, luxury: 2000 },
        inclusions: ["4 Nights hotel stay", "Pickup from Ujjain", "Drop at Ujjain", "Private sightseeing", "Ujjain, Omkareshwar, Maheshwar, Indore & Nalkheda sightseeing", "Toll, parking & GST"],
        itinerary: [
          pkDay("Day 1", "Ujjain Temple Darshan",
            "Arrive in Ujjain and begin your spiritual journey with Mahakaleshwar Jyotirlinga Darshan. Visit Bade Ganeshji Temple, Harsiddhi Mata Temple and explore Mahakal Lok Corridor.",
            "Continue your temple tour with Kal Bhairav Temple, Mangalnath Temple, Gadkalika Temple and Sandipani Ashram. Later, visit Ram Ghat and experience the spiritual charm of the Shipra River.",
            "Check in to the hotel and relax.",
            "Overnight Stay in Ujjain."),
          pkDay("Day 2", "Omkareshwar Jyotirlinga & Narmada Darshan",
            "After breakfast, proceed for an excursion to Omkareshwar.",
            "Visit Omkareshwar Jyotirlinga, Mamleshwar Temple, Narmada River Ghats and Shani Mandir.",
            "Return to Ujjain after completing the sightseeing.",
            "Overnight Stay in Ujjain."),
          pkDay("Day 3", "Maheshwar Heritage Tour",
            "After breakfast, proceed towards Maheshwar.",
            "Explore the historic Maheshwar Fort, Ahilyabai Fort & Palace and the beautiful Narmada Ghats. Later, visit the scenic Sahastradhara.",
            "Return to Ujjain after sightseeing.",
            "Overnight Stay in Ujjain."),
          pkDay("Day 4", "Indore City Sightseeing",
            "After breakfast, proceed towards Indore.",
            "Visit Khajrana Ganesh Temple, Rajwada Palace, Lal Bagh Palace and Annapurna Temple. Enjoy shopping and local delicacies at Chappan Dukan and visit Indore Zoo.",
            "Return to Ujjain after completing the sightseeing.",
            "Overnight Stay in Ujjain."),
          pkDay("Day 5", "Nalkheda Baglamukhi Temple & Departure",
            "After breakfast, proceed towards Nalkheda for a spiritual visit to the famous Maa Baglamukhi Temple.",
            "Spend time seeking blessings at the temple before beginning your return journey.",
            "After completing the visit, proceed for your drop/onward journey.",
            "Tour Ends with divine blessings and unforgettable memories."),
        ],
      },
    ],
  },
  // ===================================================================
  // 3. KUTCH (RANN UTSAV)  — LIVE
  // ===================================================================
  {
    id: "kutch",
    title: "Kutch (Rann Utsav)",
    location: "Gujarat",
    filter: "Culture",
    popular: true,
    image: "images/packages/kutch.jpg",
    tone: "#12304d",
    live: true,

    // Dhordo (White Rann) ka khana package mein shamil hai.
    // Bhuj ke din ka khana "Add meals" option se (extra) milta hai.
    inclusions: [
      "Accommodation on twin sharing basis",
      "Dinner & breakfast at Dhordo (White Rann) resort",
      "Private AC vehicle (Sedan / SUV / Tempo Traveller as per group size)",
      "All hotel taxes included",
    ],
    exclusions: [
      "White Desert entry permit / direct applicable fees",
      "Monument, museum, guide & activity entry tickets",
      "Rail / flight / bus tickets & travel insurance",
      "Personal expenses (laundry, tips, extra meals, etc.)",
    ],
    // SAMPLE (aapne ye nahi diya): confirm karke badal do
    carry: ["ID proof", "Warm clothing for the evenings", "Comfortable footwear", "Sunscreen & sunglasses", "Personal medicines"],

    plans: [
      {
        id: "1n2d",
        label: "1 Night / 2 Days",
        price: {
          deluxe:  [6400, 5000, 4500, 4250, 4000],
          premium: [8500, 6500, 6400, 6000, 5500],
          luxury:  [10000, 8000, 7500, 7200, 6500],
        },
        itinerary: [
          pkDay("Day 1", "White Rann & Dhordo (Dinner)",
            "Arrival & Transfer: Pick-up from Bhuj Railway Station / Airport and drive to White Rann, Dhordo.",
            "Check-in: Check-in at resort / traditional Bhunga or tent accommodation near White Rann.",
            "Evening: Visit White Rann to enjoy the amazing sunset view.",
            "Activities (Direct Payment): Camel Ride, Camel Cart Ride, Horse Ride, Motor Paragliding, ATV Bike Ride.",
            "Night: Enjoy Cultural & Musical Folk Programme at the resort. Overnight stay near White Rann – Dhordo."),
          pkDay("Day 2", "Kala Dungar & Bhuj (Breakfast)",
            "Morning: Breakfast and check-out from resort.",
            "Sightseeing: Visit Kala Dungar (Black Hill).",
            "Bhuj Return: Visit Bhuj Rakshak Van, Aina Mahal, Prag Mahal, Swaminarayan Temple, and Smritivan Memorial.",
            "Departure: Drop at Bhuj Railway Station / Airport. Tour ends with sweet memories."),
        ],
      },

      {
        id: "2n3d",
        label: "2 Nights / 3 Days",
        meals: "Bhuj meals (1 day)",
        price: {
          deluxe:  [9000, 7300, 6600, 5900, 5600],
          premium: [12000, 9500, 9500, 9100, 8500],
          luxury:  [14800, 11900, 12500, 10500, 9500],
        },
        food: { deluxe: 300, premium: 400, luxury: 500 },
        itinerary: [
          pkDay("Day 1", "White Rann & Dhordo (Dinner)",
            "Pick-up from Bhuj & transfer to Dhordo.",
            "Check-in at resort and relax.",
            "Evening visit to White Rann for sunset & activities.",
            "Enjoy Cultural Program & overnight stay near Rann."),
          pkDay("Day 2", "Kala Dungar & Bhuj City (Breakfast + Dinner)",
            "Breakfast & check-out. Visit Kala Dungar (Black Hill).",
            "Drive to Bhuj: Aina Mahal, Prag Mahal, Kutch Museum, Swaminarayan Temple & Bhujodi Village (Hira Laxmi Park & Vande Mataram Memorial).",
            "Overnight stay at Bhuj hotel."),
          pkDay("Day 3", "Mandvi Beach & Departure (Breakfast)",
            "Breakfast & check-out.",
            "Mandvi Visit: Mandvi Beach, Vijay Vilas Palace, 72 Jinalaya & Shyamji Krishna Varma Memorial.",
            "Drop at Bhuj Railway Station / Airport / Bus Stop."),
        ],
      },

      {
        id: "3n4d",
        label: "3 Nights / 4 Days",
        meals: "Bhuj meals (2 days)",
        price: {
          deluxe:  [12000, 9700, 9500, 8800, 8400],
          premium: [15500, 13800, 13500, 12400, 11900],
          luxury:  [19600, 15900, 16600, 14800, 14000],
        },
        food: { deluxe: 600, premium: 800, luxury: 1000 },
        itinerary: [
          pkDay("Day 1", "White Rann & Dhordo (Dinner)",
            "Pick-up from Bhuj & transfer to Dhordo.",
            "Evening White Rann sunset visit, handicraft market & Cultural Show.",
            "Overnight stay near White Rann."),
          pkDay("Day 2", "Road to Heaven & Dholavira (Breakfast + Dinner)",
            "Visit Kala Dungar Dattatreya Temple.",
            "Drive through scenic Road To Heaven to reach Dholavira (UNESCO World Heritage Site & Museum).",
            "Return to Bhuj for overnight stay."),
          pkDay("Day 3", "Bhuj City Sightseeing (Breakfast + Dinner)",
            "Full day Bhuj: Smritivan, Aina Mahal, Prag Mahal, Kutch Museum, Swaminarayan Temple & Bhujodi Village.",
            "Local Kutch handicraft shopping. Overnight stay at Bhuj."),
          pkDay("Day 4", "Mandvi & Departure (Breakfast)",
            "Excursion to Mandvi: Vijay Vilas Palace, Shyamji Krishna Varma Memorial, 72 Jinalaya & Mandvi Beach.",
            "Drop at Bhuj Railway Station / Airport."),
        ],
      },

      {
        id: "4n5d",
        label: "4 Nights / 5 Days",
        meals: "Bhuj meals (3 days)",
        price: {
          deluxe:  [15500, 12000, 10500, 9750, 9400],
          premium: [19200, 16000, 16600, 15300, 14900],
          luxury:  [24500, 19900, 21900, 18800, 17500],
        },
        food: { deluxe: 900, premium: 1200, luxury: 1500 },
        itinerary: [
          pkDay("Day 1", "White Rann & Dhordo (Dinner)",
            "Pick-up from Bhuj, transfer to Dhordo, evening White Rann sunset & Cultural Show. Overnight stay at Rann."),
          pkDay("Day 2", "Kala Dungar & Dholavira (Breakfast + Dinner)",
            "Visit Kala Dungar, drive on Road to Heaven & explore Dholavira Site & Museum. Return to Bhuj for overnight stay."),
          pkDay("Day 3", "Bhuj City Sightseeing (Breakfast + Dinner)",
            "Visit Smritivan, Science Center, Aina Mahal, Prag Mahal, Kutch Museum & Bhujodi Village. Overnight stay at Bhuj."),
          pkDay("Day 4", "Western Kutch to Mandvi (Breakfast + Dinner)",
            "Visit Koteshwar Temple, Mata No Madh, Narayan Sarovar & Umiya Dham Vandhay.",
            "Drive to Mandvi for overnight stay."),
          pkDay("Day 5", "Mandvi Sightseeing & Departure (Breakfast)",
            "Visit 72 Jinalaya, Mandvi Beach, Vijay Vilas Palace & Shyamji Krishna Varma Library.",
            "Drop at Bhuj Railway Station / Airport."),
        ],
      },
    ],
  },
  // ===================================================================
  // 4. MATHURA + VRINDAVAN — LIVE
  // ===================================================================
  {
    id: "mathura-vrindavan",
    title: "Mathura + Vrindavan",
    location: "Uttar Pradesh",
    filter: "Spiritual",
    popular: false,
    image: "images/packages/mathura-vrindavan.jpg",
    tone: "#3b2a14",
    live: true,

    // SAMPLE (aapne ye nahi diya): confirm karke badal do
    inclusions: [
      "Hotel stay in Vrindavan as per selected category",
      "Private vehicle for pickup, drop and sightseeing",
      "Sightseeing as per itinerary",
      "Toll, parking & GST",
    ],
    exclusions: [
      "Train / flight tickets",
      "Temple, monument and entry tickets, if any",
      "Personal expenses",
    ],
    carry: ["ID proof", "Comfortable footwear", "Modest temple attire", "Water bottle", "Personal medicines"],

    plans: [
      {
        id: "1n2d",
        label: "1 Night / 2 Days",
        price: {
          deluxe:  [3650, 2800, 2500, 2100, 1800],
          premium: [4100, 3100, 3000, 2700, 2400],
          luxury:  [4500, 3600, 3500, 3200, 2900],
        },
        food: { deluxe: 450, premium: 600, luxury: 700 },
        itinerary: [
          pkDay("Day 1", "Mathura Pickup – Vrindavan Sightseeing – Overnight Stay",
            "Pickup from Mathura Railway Station and transfer to Vrindavan. After hotel check-in and freshening up, proceed for Vrindavan sightseeing in the following sequence: Banke Bihari Temple → Radha Vallabh Temple → Radha Raman Temple → ISKCON Temple → Nidhivan → Prem Mandir. In the evening, enjoy the beautiful light and sound atmosphere at Prem Mandir (subject to timings). Return to the hotel for an overnight stay in Vrindavan."),
          pkDay("Day 2", "Vrindavan – Barsana – Mathura Sightseeing – Railway Station Drop",
            "After breakfast, check out from the hotel and proceed to Barsana for darshan at Shri Radha Rani Temple. After darshan, drive to Mathura and visit Shri Krishna Janmabhoomi Temple → Dwarkadhish Temple → Vishram Ghat. After completing the sightseeing, transfer to Mathura Railway Station for departure."),
        ],
      },

      {
        id: "2n3d",
        label: "2 Nights / 3 Days",
        price: {
          deluxe:  [5500, 4300, 3400, 3200, 2900],
          premium: [6200, 4800, 4500, 4300, 3900],
          luxury:  [6600, 6000, 6500, 4500, 4200],
        },
        food: { deluxe: 700, premium: 1000, luxury: 1200 },
        itinerary: [
          pkDay("Day 1", "Arrival at Mathura – Vrindavan Sightseeing",
            "Upon arrival at Mathura Railway Station, meet our driver and proceed to Vrindavan. After hotel check-in and freshening up, visit the famous temples of Vrindavan, including Banke Bihari Temple, ISKCON Temple, Radha Raman Temple, Radha Vallabh Temple, Nidhivan, and Prem Mandir. After completing the sightseeing, return to the hotel for an overnight stay in Vrindavan."),
          pkDay("Day 2", "Barsana – Nandgaon – Govardhan Parikrama",
            "After breakfast, proceed to Barsana for darshan at Shri Radha Rani Temple. Later, visit Nandgaon and seek blessings at Nand Bhawan. Continue to Govardhan for Govardhan Parikrama and visit the famous religious sites along the route, including Radha Kund and Kusum Sarovar. After completing the sightseeing, return to the hotel for an overnight stay in Vrindavan."),
          pkDay("Day 3", "Mathura – Gokul Sightseeing – Departure",
            "After breakfast, check out from the hotel and proceed for Mathura sightseeing, including Shri Krishna Janmabhoomi Temple, Dwarkadhish Temple, and Vishram Ghat. Later, visit Gokul and explore the sacred places associated with Lord Krishna's childhood, including Raman Reti, Gokulnath Temple, and Chintaharan Mahadev Temple. After completing the sightseeing, proceed to Mathura Railway Station for drop-off, marking the end of your memorable Braj Darshan tour."),
        ],
      },

      {
        id: "3n4d",
        label: "3 Nights / 4 Days",
        price: {
          deluxe:  [7700, 5700, 4800, 4500, 4100],
          premium: [8300, 6200, 5999, 5500, 5100],
          luxury:  [8800, 7000, 6700, 6500, 6100],
        },
        food: { deluxe: 1100, premium: 1500, luxury: 1800 },
        itinerary: [
          pkDay("Day 1", "Arrival at Mathura – Vrindavan Sightseeing",
            "Upon arrival at Mathura Railway Station, meet our driver and transfer to Vrindavan. After hotel check-in and freshening up, proceed to visit the famous temples of Vrindavan, including Banke Bihari Temple, ISKCON Temple, Radha Raman Temple, Radha Vallabh Temple, Nidhivan, and Prem Mandir. After completing the sightseeing, return to the hotel for an overnight stay in Vrindavan."),
          pkDay("Day 2", "Barsana – Nandgaon – Govardhan Sightseeing",
            "After breakfast, proceed to Barsana for darshan at the famous Shri Radha Rani Temple. Later, visit Nandgaon and explore Nand Bhawan, associated with the childhood of Lord Krishna. Continue to Govardhan for Govardhan Parikrama and visit the sacred sites of Radha Kund and Kusum Sarovar. After completing the sightseeing, return to the hotel for an overnight stay in Vrindavan."),
          pkDay("Day 3", "Mathura – Gokul Sightseeing",
            "After breakfast, proceed for Mathura sightseeing and visit Shri Krishna Janmabhoomi Temple, Dwarkadhish Temple, and Vishram Ghat. Later, visit Gokul, where Lord Krishna spent his childhood, and explore Raman Reti, Gokulnath Temple, and Chintaharan Mahadev Temple. After completing the sightseeing, return to the hotel for an overnight stay in Vrindavan."),
          pkDay("Day 4", "Vrindavan – Agra Sightseeing – Departure",
            "After breakfast, check out from the hotel and proceed to Agra for sightseeing. Visit the world-famous Taj Mahal, the magnificent Agra Fort, and Mehtab Bagh (subject to time availability). After completing the sightseeing, proceed for drop-off at Agra Railway Station or your preferred departure point, marking the end of your memorable Braj and Agra tour."),
        ],
      },
    ],
  },
  // ===================================================================
  // 5. CHAR DHAM — LIVE
  // ===================================================================
  {
    id: "char-dham",
    title: "Char Dham",
    location: "Uttarakhand",
    filter: "Pilgrimage",
    popular: false,
    image: "images/packages/char-dham.jpg",
    tone: "#1f3b2d",
    live: true,

    inclusions: [
      "Transportation as per the selected package",
      "Hotel accommodation as per the itinerary",
      "Sightseeing at the destinations mentioned in the itinerary",
    ],
    exclusions: [
      "Kedarnath meals: guests arrange their own",
      "Pony, palki/doli and helicopter tickets",
      "Local transfers (as applicable) and personal expenses",
    ],
    // SAMPLE (aapne ye nahi diya): confirm karke badal do
    carry: ["Original ID proof (Aadhaar)", "Warm clothes & thermals", "Rain jacket / poncho", "Comfortable trekking shoes", "Torch & power bank", "Personal medicines"],
    notes: [
      "Breakfast and dinner are included only if you select the meals add-on.",
      "Meals at Kedarnath are not included and must be arranged by guests at their own expense.",
      "Pony, palki/doli, helicopter tickets, local transfers and personal expenses are chargeable separately unless specifically included in the package.",
      "Temple Darshan and sightseeing are subject to weather, road conditions, temple timings and local administration guidelines.",
      "En-route sightseeing depends on available time and route conditions.",
      "All distances and travel times are approximate and may vary depending on traffic and weather.",
      "The itinerary may be adjusted due to weather conditions, road closures or other circumstances beyond our control.",
    ],

    plans: [
      {
        id: "9n10d",
        label: "9 Nights / 10 Days",
        meals: "Breakfast & dinner (not at Kedarnath)",
        price: {
          deluxe:  [30000, 28000, 27000, 25000, 22500],
          premium: [34500, 32000, 30500, 28000, 25700],
          luxury:  [41000, 38000, 36500, 33000, 30000],
        },
        food: { deluxe: 2700, premium: 3600, luxury: 4500 },
        itinerary: [
          pkDay("Day 1", "Arrival at Haridwar/Dehradun – Transfer to Barkot",
            "Upon arrival at Haridwar Railway Station or Dehradun Airport, meet our driver and begin your scenic journey towards Barkot. Enjoy beautiful views of the mountains, lush valleys and rivers along the way. Upon arrival, check in to the hotel and relax.",
            "Overnight Stay: Barkot"),
          pkDay("Day 2", "Barkot – Yamunotri Darshan – Barkot",
            "After breakfast, drive to Jankichatti/Phoolchatti, the starting point of the Yamunotri trek. Proceed towards Yamunotri Temple on foot or hire a pony/palki at an additional cost.",
            "Upon reaching the temple, seek the blessings of Goddess Yamuna. You may also visit Surya Kund and Divya Shila, subject to local conditions and accessibility. After Darshan, return to Jankichatti and drive back to Barkot.",
            "Overnight Stay: Barkot"),
          pkDay("Day 3", "Barkot to Uttarkashi",
            "After breakfast, check out from the hotel and drive towards Uttarkashi. Enjoy the scenic Himalayan route along the way. Upon arrival, visit the revered Kashi Vishwanath Temple, dedicated to Lord Shiva. Later, check in to the hotel and relax.",
            "Overnight Stay: Uttarkashi"),
          pkDay("Day 4", "Uttarkashi – Gangotri Darshan – Uttarkashi",
            "Early in the morning, depart for Gangotri Temple. En route, pass through the beautiful Harsil Valley, known for its mountain scenery, forests and river views. You may also stop at Gangnani, subject to route conditions and available time.",
            "Upon arrival in Gangotri, seek the blessings of Goddess Ganga and enjoy the spiritual atmosphere near the Bhagirathi River. After Darshan, return to Uttarkashi.",
            "Overnight Stay: Uttarkashi"),
          pkDay("Day 5", "Uttarkashi to Guptkashi",
            "After breakfast, check out from the hotel and begin your journey towards Guptkashi. Enjoy the picturesque landscapes, mountain roads and beautiful river valleys of Uttarakhand en route.",
            "Upon arrival in Guptkashi, visit the revered Ardh Narishwar Temple, subject to arrival time. Check in to the hotel and relax.",
            "Overnight Stay: Guptkashi"),
          pkDay("Day 6", "Guptkashi – Sonprayag – Kedarnath",
            "After an early breakfast, drive towards Sonprayag. From there, proceed to Gaurikund using local transport arrangements and begin the trek to Kedarnath Temple.",
            "You can trek on foot or opt for pony/palki services at an additional cost. Helicopter services may also be available with advance booking and subject to weather and operational conditions.",
            "Upon reaching Kedarnath, attend Darshan of Baba Kedarnath Ji and experience the divine atmosphere of this sacred Jyotirlinga.",
            "Overnight Stay: Kedarnath",
            "Meals: Guests must arrange their own meals at Kedarnath."),
          pkDay("Day 7", "Kedarnath Darshan – Return to Guptkashi",
            "Early in the morning, attend Darshan of Baba Kedarnath Ji and participate in the morning rituals, subject to temple timings. After Darshan, begin your return trek towards Gaurikund.",
            "Upon reaching Gaurikund, continue by vehicle to Sonprayag and transfer back to Guptkashi. Check in to the hotel and relax after the trek.",
            "Overnight Stay: Guptkashi"),
          pkDay("Day 8", "Guptkashi – Omkareshwar Temple – Pipalkoti/Joshimath",
            "After breakfast, check out from the hotel and proceed towards Ukhimath to visit the sacred Omkareshwar Temple, the winter seat associated with Lord Kedarnath. Spend some time exploring the temple and experiencing its spiritual significance.",
            "Later, continue your journey towards Pipalkoti/Joshimath through the scenic Himalayan region. Upon arrival, check in to the hotel and relax.",
            "Overnight Stay: Pipalkoti/Joshimath"),
          pkDay("Day 9", "Pipalkoti/Joshimath – Badrinath Darshan – Mana Village – Return",
            "After breakfast, visit Narsingh Temple in Joshimath, if staying nearby and time permits. Later, proceed towards Badrinath via the beautiful Himalayan route.",
            "Upon arrival, visit the sacred Badrinath Temple, dedicated to Lord Vishnu. You may also visit Tapt Kund, subject to local conditions and temple regulations.",
            "After Darshan, proceed to Mana Village and explore its famous attractions, subject to accessibility and available time:",
            "• Vyas Gufa: A sacred cave associated with Maharishi Ved Vyasa.",
            "• Ganesh Gufa: A religious site associated with Lord Ganesha.",
            "• Bheem Pul: A natural rock formation and bridge over the Saraswati River.",
            "• Saraswati River: Enjoy the beautiful views of the river and surrounding mountains.",
            "After sightseeing, return to Pipalkoti/Joshimath for dinner and overnight stay.",
            "Overnight Stay: Pipalkoti/Joshimath"),
          pkDay("Day 10", "Pipalkoti/Joshimath – Haridwar/Dehradun Drop",
            "After breakfast, check out from the hotel and begin your return journey towards Haridwar or Dehradun. Enjoy the scenic mountain views and beautiful landscapes of Uttarakhand along the way.",
            "Upon arrival, you will be dropped off at the designated railway station, airport or agreed location. Your sacred Char Dham Yatra concludes with the divine blessings of Yamunotri, Gangotri, Kedarnath and Badrinath.",
            "Tour Ends: Haridwar/Dehradun"),
        ],
      },
    ],
  },
  // ===================================================================
  // 6. KEDARNATH + BADRINATH — LIVE
  // ===================================================================
  {
    id: "kedarnath-badrinath",
    title: "Kedarnath + Badrinath",
    location: "Uttarakhand",
    filter: "Pilgrimage",
    popular: true,
    image: "images/packages/kedarnath-badrinath.jpg",
    tone: "#26334d",
    live: true,

    exclusions: [
      "Kedarnath meals: guests arrange their own",
      "Pony, palki/doli and helicopter tickets",
      "Personal expenses",
    ],
    // SAMPLE (aapne ye nahi diya): confirm karke badal do
    carry: ["Original ID proof (Aadhaar)", "Warm clothes & thermals", "Rain jacket / poncho", "Comfortable trekking shoes", "Torch & power bank", "Personal medicines"],

    plans: [
      {
        id: "4n5d",
        label: "4 Nights / 5 Days",
        meals: "Breakfast & dinner (not at Kedarnath)",
        price: {
          deluxe:  [12500, 9500, 9000, 8000, 7500],
          premium: [15700, 12000, 11000, 10300, 9500],
          luxury:  [18000, 15800, 14500, 14300, 13500],
        },
        food: { deluxe: 900, premium: 1200, luxury: 1500 },
        inclusions: [
          "Transportation as per the selected package",
          "Hotel accommodation at Sitapur/Phata and Pipalkoti",
          "One-night accommodation at Kedarnath",
          "Sightseeing at destinations mentioned in the itinerary",
        ],
        notes: [
          "Breakfast and dinner are included only if you select the meals add-on.",
          "Meals at Kedarnath are not included and must be arranged by guests at their own expense.",
          "Pony, palki/doli, helicopter tickets and other personal expenses are chargeable separately.",
          "Local transfers between Sonprayag and Gaurikund are subject to local transport regulations.",
          "En-route sightseeing and photo stops are subject to traffic, weather, road conditions and available time.",
          "Mana Village sightseeing is subject to accessibility and local restrictions.",
          "Temple Darshan and trekking are subject to weather conditions and local administration guidelines.",
          "Day 3 involves the Kedarnath return trek followed by a long drive to Pipalkoti. Departure timing and travel arrangements should be planned carefully.",
          "All distances and travel times are approximate and may vary depending on road conditions.",
        ],
        itinerary: [
          pkDay("Day 1", "Haridwar to Sitapur/Phata",
            "Upon arrival at Haridwar, meet our representative and begin your scenic journey towards Sitapur/Phata. En route, pass through Rishikesh and enjoy the beautiful mountain landscapes along the way. Depending on the route and available time, you may stop at Devprayag, the sacred confluence of the Alaknanda and Bhagirathi rivers.",
            "Upon arrival at Sitapur/Phata, check in to the hotel and relax. The evening is free for leisure and preparation for the Kedarnath pilgrimage.",
            "Overnight Stay: Sitapur/Phata",
            "Meals: Breakfast & dinner included only with the meals add-on, as per the itinerary."),
          pkDay("Day 2", "Sitapur/Phata to Kedarnath",
            "After an early breakfast, drive towards Sonprayag and proceed to Gaurikund using local transport arrangements. From Gaurikund, begin the trek to Kedarnath Temple on foot, enjoying the scenic Himalayan landscapes and views of the Mandakini Valley.",
            "Pony, palki/doli and helicopter services may be available at an additional cost, subject to availability and applicable permissions. Upon reaching Kedarnath, check in to your accommodation and relax.",
            "Overnight Stay: Kedarnath",
            "Meals: Guests must arrange their own meals at Kedarnath."),
          pkDay("Day 3", "Early Morning Kedarnath Darshan – Return to Sitapur/Phata – Pipalkoti",
            "Early in the morning, proceed for the sacred Darshan of Baba Kedarnath Ji and seek the blessings of Lord Shiva. After Darshan, begin your return trek towards Gaurikund. Continue to Sonprayag and transfer back to Sitapur/Phata.",
            "After reaching Sitapur/Phata, continue your journey towards Pipalkoti. Enjoy scenic mountain views and the beautiful landscapes of the Garhwal region along the way. Upon arrival in Pipalkoti, check in to the hotel and relax.",
            "Overnight Stay: Pipalkoti",
            "Meals: Breakfast & dinner included only with the meals add-on, as per the itinerary."),
          pkDay("Day 4", "Pipalkoti to Badrinath – Temple Darshan & Mana Village – Return to Pipalkoti",
            "After breakfast, depart for Badrinath via Joshimath. Enjoy the beautiful Himalayan scenery and views of the Alaknanda Valley during the drive.",
            "Upon arrival, visit the sacred Badrinath Temple, dedicated to Lord Vishnu, for Darshan. You may also visit Tapt Kund, subject to local conditions and temple regulations.",
            "Later, proceed to Mana Village, known for its traditional Himalayan culture and scenic surroundings. Explore the following attractions, subject to accessibility and available time:",
            "• Mana Village: Explore the traditional Himalayan village.",
            "• Vyas Gufa: A sacred cave associated with Maharishi Ved Vyasa.",
            "• Ganesh Gufa: A religious site associated with Lord Ganesha.",
            "• Bhim Pul: A natural rock bridge over the Saraswati River.",
            "• Saraswati River Viewpoint: Enjoy the spectacular mountain and river views.",
            "After sightseeing, return to Pipalkoti for dinner and overnight stay.",
            "Overnight Stay: Pipalkoti",
            "Meals: Breakfast & dinner included only with the meals add-on, as per the itinerary."),
          pkDay("Day 5", "Pipalkoti to Haridwar",
            "After breakfast, check out from the hotel and begin your return journey towards Haridwar. Enjoy scenic views of the Alaknanda River, mountain valleys and the beautiful landscapes of Uttarakhand along the way.",
            "Continue via Rishikesh towards Haridwar. Upon arrival, your spiritual journey concludes with the divine blessings of Baba Kedarnath Ji and Shri Badrinath Ji and wonderful memories of the Himalayas.",
            "Tour Ends: Haridwar",
            "Meals: Breakfast included only with the meals add-on."),
        ],
      },

      {
        id: "5n6d",
        label: "5 Nights / 6 Days",
        meals: "Breakfast & dinner (not at Kedarnath)",
        price: {
          deluxe:  [14250, 11100, 9500, 8500, 8500],
          premium: [17500, 15000, 14000, 12800, 11500],
          luxury:  [21000, 19800, 18000, 17300, 16000],
        },
        food: { deluxe: 1200, premium: 1600, luxury: 2000 },
        inclusions: [
          "Transportation as per the selected package",
          "Hotel accommodation at Sitapur/Phata and Pipalkoti",
          "One-night accommodation at Kedarnath",
          "Sightseeing at the destinations mentioned in the itinerary",
        ],
        notes: [
          "Breakfast and dinner are included only if you select the meals add-on.",
          "Meals at Kedarnath are not included and must be arranged by guests at their own expense.",
          "Pony, palki/doli, helicopter tickets and personal expenses are chargeable separately.",
          "Sightseeing en route and photo stops are subject to time, traffic, weather and road conditions.",
          "Local transfers between Sonprayag and Gaurikund are subject to local transport regulations.",
          "Mana Village sightseeing is subject to accessibility, local restrictions and available time.",
          "Temple Darshan is subject to temple timings, weather and local administration guidelines.",
          "Travel times and distances are approximate and may vary depending on road conditions.",
        ],
        itinerary: [
          pkDay("Day 1", "Haridwar to Sitapur/Phata",
            "Upon arrival at Haridwar, meet our representative and begin your scenic journey towards Sitapur/Phata. Enjoy beautiful mountain views along the way, passing through Rishikesh, Devprayag and Srinagar (subject to route and time availability). Devprayag is famous for the sacred confluence of the Alaknanda and Bhagirathi rivers, which form the River Ganga.",
            "Upon arrival at Sitapur/Phata, check in to the hotel and relax. The evening is free for leisure and preparation for the Kedarnath pilgrimage.",
            "Overnight Stay: Sitapur/Phata",
            "Meals: Breakfast & dinner included only with the meals add-on, as per the itinerary."),
          pkDay("Day 2", "Sitapur/Phata to Kedarnath",
            "After an early breakfast, drive towards Sonprayag and continue to Gaurikund as per local transport arrangements. Begin your trek from Gaurikund to Kedarnath Temple on foot. During the trek, enjoy the breathtaking Himalayan landscapes and views of the Mandakini Valley.",
            "Pony, palki/doli and helicopter services may be available at an additional cost, subject to availability and applicable permissions. Upon reaching Kedarnath, check in to your accommodation and prepare for the sacred Darshan.",
            "Overnight Stay: Kedarnath",
            "Meals: Guests must arrange their own meals at Kedarnath."),
          pkDay("Day 3", "Kedarnath Darshan & Return to Sitapur/Phata",
            "Early in the morning, proceed for the sacred Darshan of Baba Kedarnath Ji. After Darshan, spend some time experiencing the spiritual atmosphere around the temple, subject to available time and local conditions.",
            "Later, begin your return trek towards Gaurikund. From there, continue to Sonprayag and transfer back to Sitapur/Phata. Upon arrival, check in to the hotel and relax after the trek.",
            "Overnight Stay: Sitapur/Phata",
            "Meals: Breakfast & dinner included only with the meals add-on, as per the itinerary."),
          pkDay("Day 4", "Sitapur/Phata to Pipalkoti",
            "After breakfast, check out from the hotel and depart for Pipalkoti. Enjoy a scenic drive through the Garhwal Himalayas, passing through beautiful valleys and riverside landscapes.",
            "En route, enjoy views of the Alaknanda River and the surrounding mountain scenery. Depending on the route, traffic and available time, brief stops may be possible at scenic viewpoints along the way.",
            "Upon arrival in Pipalkoti, check in to the hotel and relax.",
            "Overnight Stay: Pipalkoti",
            "Meals: Breakfast & dinner included only with the meals add-on, as per the itinerary."),
          pkDay("Day 5", "Pipalkoti to Badrinath – Temple Darshan & Mana Village",
            "After breakfast, depart for Badrinath via Joshimath. En route, enjoy the beautiful Himalayan scenery and views of the Alaknanda Valley. Subject to time and route conditions, you may enjoy brief stops at scenic viewpoints near Joshimath.",
            "Upon arrival in Badrinath, proceed for Darshan at the sacred Badrinath Temple, dedicated to Lord Vishnu. You may also visit Tapt Kund, subject to local conditions and temple regulations.",
            "Later, visit Mana Village, known for its cultural heritage and location near the Indo-Tibetan border. Explore the following attractions, subject to accessibility and available time:",
            "• Mana Village: Explore the traditional Himalayan village.",
            "• Vyas Gufa: A sacred cave associated with Maharishi Ved Vyasa.",
            "• Ganesh Gufa: A religious site associated with Lord Ganesha.",
            "• Bhim Pul: A natural rock bridge over the Saraswati River.",
            "• Saraswati River Viewpoint: Enjoy the dramatic mountain scenery and river views.",
            "After sightseeing, return to Pipalkoti for dinner and overnight stay.",
            "Overnight Stay: Pipalkoti",
            "Meals: Breakfast & dinner included only with the meals add-on, as per the itinerary."),
          pkDay("Day 6", "Pipalkoti to Haridwar",
            "After breakfast, check out from the hotel and begin your return journey towards Haridwar.",
            "En route, enjoy the scenic views of the Alaknanda River and the beautiful Himalayan valleys. Depending on the route, traffic and available time, brief photo stops may be possible at suitable viewpoints.",
            "Continue your journey through the Garhwal region towards Rishikesh and Haridwar. Upon arrival, your spiritual journey concludes with the divine blessings of Baba Kedarnath Ji and Shri Badrinath Ji.",
            "Tour Ends: Haridwar",
            "Meals: Breakfast included only with the meals add-on."),
        ],
      },
    ],
  },
  // ===================================================================
  // 7. KEDARNATH — LIVE
  // ===================================================================
  {
    id: "kedarnath",
    title: "Kedarnath",
    location: "Uttarakhand",
    filter: "Pilgrimage",
    popular: false,
    image: "images/packages/kedarnath.jpg",
    tone: "#2d2a4a",
    live: true,

    exclusions: [
      "Kedarnath meals: guests arrange their own",
      "Pony and palki/doli",
      "Personal expenses",
    ],
    // SAMPLE (aapne ye nahi diya): confirm karke badal do
    carry: ["Original ID proof (Aadhaar)", "Warm clothes & thermals", "Rain jacket / poncho", "Comfortable trekking shoes", "Torch & power bank", "Personal medicines"],

    plans: [
      {
        id: "3n4d",
        label: "3 Nights / 4 Days",
        meals: "Breakfast & dinner (not at Kedarnath)",
        price: {
          deluxe:  [9900, 7100, 6100, 5499, 4900],
          premium: [12400, 10400, 10200, 8400, 7500],
          luxury:  [14000, 12500, 12500, 10500, 9500],
        },
        food: { deluxe: 900, premium: 1200, luxury: 1500 },
        inclusions: [
          "Transportation as per the selected package",
          "Hotel accommodation at Guptkashi/Sitapur",
          "Accommodation at Kedarnath as per the selected package",
        ],
        notes: [
          "Breakfast and dinner are included only if you select the meals add-on.",
          "Meals at Kedarnath are not included and must be arranged by guests at their own expense, regardless of the package selected.",
          "Pony, palki/doli, and other personal expenses are chargeable separately.",
          "Travel times and distances are approximate and may vary depending on road and weather conditions.",
          "The Kedarnath trek is subject to weather conditions and local administration guidelines.",
        ],
        itinerary: [
          pkDay("Day 1", "Dehradun/Haridwar to Guptkashi",
            "After breakfast, depart from Dehradun/Haridwar for Guptkashi (approx. 240 km, 7–8 hours). Upon arrival, check in to the hotel and relax. Enjoy dinner at the hotel and overnight stay in Guptkashi.",
            "Meals: Breakfast & dinner (included only with the meals add-on)."),
          pkDay("Day 2", "Guptkashi to Kedarnath",
            "After breakfast, drive to Gaurikund (approx. 4 km), the starting point of the Kedarnath trek. Begin your trek to Kedarnath Temple on foot. Pony or palki/doli services are available at an additional cost. Upon arrival, check in to your accommodation and prepare for the divine experience of Baba Kedarnath Ji.",
            "Overnight Stay: Kedarnath",
            "Meals: Guests must arrange their own meals at Kedarnath, irrespective of the package selected."),
          pkDay("Day 3", "Kedarnath Darshan & Return to Guptkashi/Sitapur",
            "Early in the morning, proceed for the sacred Darshan of Baba Kedarnath Ji and seek the blessings of Lord Shiva. After Darshan, trek back to Gaurikund and continue by vehicle to Sitapur/Guptkashi. Upon arrival, check in to the hotel and relax.",
            "Overnight Stay: Sitapur/Guptkashi",
            "Meals: Dinner included only with the meals add-on."),
          pkDay("Day 4", "Guptkashi to Dehradun/Haridwar",
            "After breakfast, check out from the hotel and depart for Dehradun/Haridwar (approx. 340 km, 9–10 hours). The tour concludes with the divine blessings of Baba Kedarnath Ji and wonderful memories of your spiritual journey.",
            "Meals: Breakfast included only with the meals add-on."),
        ],
      },

      {
        id: "4n5d",
        label: "4 Nights / 5 Days",
        meals: "Breakfast & dinner (not at Kedarnath)",
        price: {
          deluxe:  [12250, 8850, 7650, 6800, 6200],
          premium: [16500, 13600, 13200, 12500, 12000],
          luxury:  [19000, 16200, 15700, 15000, 14000],
        },
        food: { deluxe: 900, premium: 1200, luxury: 1500 },
        inclusions: [
          "Transportation as per the selected package",
          "Hotel accommodation in Guptkashi/Sitapur",
          "Accommodation for 2 nights in Kedarnath",
        ],
        notes: [
          "Breakfast and dinner are included only if you select the meals add-on.",
          "Meals at Kedarnath are not included and must be arranged by guests at their own expense.",
          "Pony, palki/doli, and other personal expenses are chargeable separately.",
          "Travel times and distances are approximate and may vary depending on road and weather conditions.",
          "The Kedarnath trek and Darshan are subject to weather conditions and local administration guidelines.",
        ],
        itinerary: [
          pkDay("Day 1", "Dehradun/Haridwar to Guptkashi",
            "Depart from Dehradun/Haridwar and drive towards Guptkashi (approx. 240 km, 7–8 hours). Upon arrival, check in to the hotel and relax. Enjoy dinner at the hotel and overnight stay in Guptkashi.",
            "Overnight Stay: Guptkashi",
            "Meals: Breakfast & dinner included only with the meals add-on, as per the itinerary."),
          pkDay("Day 2", "Guptkashi to Kedarnath",
            "After breakfast, drive to Gaurikund (approx. 4 km), the starting point of the Kedarnath trek. Begin your trek to Kedarnath Temple on foot. Pony or palki/doli services are available at an additional cost. Upon arrival, check in to your accommodation and relax.",
            "Overnight Stay: Kedarnath",
            "Meals: Guests must arrange their own meals at Kedarnath."),
          pkDay("Day 3", "Kedarnath Darshan & Overnight Stay",
            "Early in the morning, proceed for the sacred Darshan of Baba Kedarnath Ji and seek the blessings of Lord Shiva. After Darshan, return to your accommodation and spend the rest of the day at leisure, enjoying the peaceful spiritual atmosphere of Kedarnath.",
            "Overnight Stay: Kedarnath",
            "Meals: Guests must arrange their own meals at Kedarnath."),
          pkDay("Day 4", "Kedarnath to Guptkashi/Sitapur",
            "After breakfast, check out from your accommodation and begin the return trek towards Gaurikund. Upon reaching Gaurikund, continue by vehicle to Guptkashi/Sitapur. Check in to the hotel and relax after the trek.",
            "Overnight Stay: Guptkashi/Sitapur",
            "Meals: Dinner included only with the meals add-on."),
          pkDay("Day 5", "Guptkashi to Dehradun/Haridwar",
            "After breakfast, check out from the hotel and depart for Dehradun/Haridwar. The journey concludes with the divine blessings of Baba Kedarnath Ji and wonderful memories of your spiritual trip.",
            "Meals: Breakfast included only with the meals add-on."),
        ],
      },
    ],
  },
  { id: "udaipur",             title: "Udaipur",               location: "Rajasthan",        filter: "Heritage",   popular: false, image: "images/packages/udaipur.jpg",             tone: "#4a1f2d", live: false },
  { id: "manali",              title: "Manali",                location: "Himachal Pradesh", filter: "Hills",      popular: false, image: "images/packages/manali.jpg",              tone: "#17404a", live: false },
];
