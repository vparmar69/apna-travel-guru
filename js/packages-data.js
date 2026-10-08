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
  // 4 to 9: COMING SOON (data aane par live: true karenge)
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
  { id: "mathura-vrindavan",   title: "Mathura + Vrindavan",   location: "Uttar Pradesh",    filter: "Spiritual",  popular: false, image: "images/packages/mathura-vrindavan.jpg",   tone: "#3b2a14", live: false },
  { id: "char-dham",           title: "Char Dham",             location: "Uttarakhand",      filter: "Pilgrimage", popular: false, image: "images/packages/char-dham.jpg",           tone: "#1f3b2d", live: false },
  { id: "kedarnath-badrinath", title: "Kedarnath + Badrinath", location: "Uttarakhand",      filter: "Pilgrimage", popular: true,  image: "images/packages/kedarnath-badrinath.jpg", tone: "#26334d", live: false },
  { id: "kedarnath",           title: "Kedarnath",             location: "Uttarakhand",      filter: "Pilgrimage", popular: false, image: "images/packages/kedarnath.jpg",           tone: "#2d2a4a", live: false },
  { id: "udaipur",             title: "Udaipur",               location: "Rajasthan",        filter: "Heritage",   popular: false, image: "images/packages/udaipur.jpg",             tone: "#4a1f2d", live: false },
  { id: "manali",              title: "Manali",                location: "Himachal Pradesh", filter: "Hills",      popular: false, image: "images/packages/manali.jpg",              tone: "#17404a", live: false },
];
