/* ==========================================================================
   SALON CONFIGURATION
   ==========================================================================
   This is the ONLY file that should need to change to reuse this template
   for a different salon. index.html, css/, and js/script.js are written to
   read from this object rather than hardcoding any salon-specific text,
   numbers, or links.

   To re-theme for another salon: edit the values below, replace the files
   in /assets/, and update the three color variables in src/input.css.
   ========================================================================== */

window.SALON_CONFIG = {
  business: {
    name: "Panache The Salon",
    shortName: "Panache",
    tagline: "Internationally certified for makeup, hair & skincare",
    heroSupport: "Refined bridal beauty, hair and skincare, with individualized attention for every client.",
    // Salon's bridal-travel positioning — kept short and specific rather
    // than sounding like a global franchise claim.
    bridalTravelNote: "Traveling globally for brides.",
    description:
      "A premium bridal-focused salon in Peshawar offering internationally certified makeup, hair and skincare services.",
    city: "Peshawar",
    country: "Pakistan",
    addressLines: ["19 A/C Gulmohar Lane", "University Town", "Peshawar, Pakistan 25000"],
    phoneDisplay: "0321 8588811",
    phoneIntl: "923218588811",
    whatsappIntl: "923218588811"
  },

  branding: {
    logo: "assets/logo/panache-logo.png",
    favicon: "assets/logo/favicon.png"
  },

  social: {
    instagram: "https://www.instagram.com/panachepeshawar/",
    facebook: "https://www.facebook.com/156113811197411"
  },

  seo: {
    title: "Panache The Salon — Bridal Makeup, Hair & Skincare in Peshawar",
    description:
      "Panache The Salon in Peshawar: internationally certified bridal makeup, hair styling and skincare. Book your bridal appointment on WhatsApp.",
    keywords: [
      "bridal salon Peshawar",
      "bridal makeup Peshawar",
      "makeup artist Peshawar",
      "beauty salon Peshawar",
      "hair salon Peshawar"
    ],
    canonicalUrl: "https://www.panachethesalon.com/"
  },

  openingHours: [
    { day: "Monday", hours: "11:00 AM – 7:00 PM" },
    { day: "Tuesday", hours: "11:00 AM – 7:00 PM" },
    { day: "Wednesday", hours: "Closed" },
    { day: "Thursday", hours: "11:00 AM – 7:00 PM" },
    { day: "Friday", hours: "11:00 AM – 7:00 PM" },
    { day: "Saturday", hours: "11:00 AM – 7:00 PM" },
    { day: "Sunday", hours: "12:00 AM – 7:00 PM" }
  ],

  expertise: [
    {
      title: "SABS Salon, Karachi",
      detail: "Certified in professional makeup and hair, at one of Pakistan's leading training salons."
    },
    {
      title: "Samer Khouzami Master Class, Dubai",
      detail: "Attended a master class led by celebrity makeup artist Samer Khouzami."
    },
    {
      title: "Thalgo France, Dubai",
      detail: "Certified in facial and body massage technique."
    },
    {
      title: "Natasha Salon, Karachi",
      detail: "Attended beauty master classes at Natasha Salon."
    },
    {
      title: "L'Oréal Professionnel",
      detail: "Certified numerous times for permanent, semi and demi hair colour, ombré, sombré and pony lights."
    },
    {
      title: "X-Tenso & Keratin",
      detail: "Recognised expertise in L'Oréal X-Tenso and keratin treatments in Peshawar."
    }
  ],

  serviceCategories: [
    {
      category: "Bridal",
      services: [
        { name: "Bridal Makeup", description: "Full bridal look, tailored to your features and outfit.", priceType: "contact" },
        { name: "Bridal Hair Styling", description: "Classic or contemporary bridal hairstyling.", priceType: "contact" }
      ]
    },
    {
      category: "Party Makeup",
      services: [
        { name: "Party Makeup", description: "Event-ready makeup for guests and celebrations.", priceType: "starting", price: "Rs. 5,000" }
      ]
    },
    {
      category: "Mehndi",
      services: [
        { name: "Mehndi Makeup", description: "Soft, radiant makeup for mehndi celebrations.", priceType: "contact" }
      ]
    },
    {
      category: "Walima",
      services: [
        { name: "Walima Makeup", description: "Elegant, camera-ready makeup for the walima.", priceType: "contact" }
      ]
    },
    {
      category: "Hair",
      services: [
        { name: "Blow Dry & Styling", description: "Wash, blow dry and finish.", priceType: "starting", price: "Rs. 2,000" },
        { name: "Hair Colour", description: "Permanent, semi and demi colour, ombré and sombré.", priceType: "contact" }
      ]
    },
    {
      category: "Hair Treatments",
      services: [
        { name: "Keratin Treatment", description: "Smoothing keratin treatment.", priceType: "contact" },
        { name: "X-Tenso", description: "L'Oréal X-Tenso straightening.", priceType: "contact" }
      ]
    },
    {
      category: "Facials & Skincare",
      services: [
        { name: "Signature Facial", description: "Deep-cleansing facial for a refreshed complexion.", priceType: "starting", price: "Rs. 3,500" }
      ]
    },
    {
      category: "Waxing",
      services: [
        { name: "Full Arms & Legs", description: "Smooth, long-lasting wax finish.", priceType: "starting", price: "Rs. 2,500" }
      ]
    }
  ],

  // Marked as configurable placeholders — exact inclusions not yet confirmed.
  // "image" points to a file under assets/bridal/ — falls back to a
  // labeled placeholder if the file isn't there yet.
  bridalPackages: [
    {
      name: "Bridal Package",
      description: "A complete bridal look — makeup, hair and draping.",
      includes: ["Bridal makeup", "Hair styling", "Draping assistance"],
      priceType: "contact",
      image: "assets/bridal/bridal-package.jpg",
      isPlaceholder: true
    },
    {
      name: "Walima Package",
      description: "Refined, camera-ready styling for the walima.",
      includes: ["Walima makeup", "Hair styling"],
      priceType: "contact",
      image: "assets/bridal/walima-package.jpg",
      isPlaceholder: true
    },
    {
      name: "Mehndi Package",
      description: "Soft, festive styling for the mehndi.",
      includes: ["Mehndi makeup", "Hair styling"],
      priceType: "contact",
      image: "assets/bridal/mehndi-package.jpg",
      isPlaceholder: true
    }
  ],

  // Ready-made slots — drop matching files into /assets/bridal/ and they'll
  // appear automatically. Add or remove entries as needed; each just needs
  // { src, alt, category }.
  bridalPortfolio: [
    { src: "assets/bridal/portfolio-1.jpg", alt: "Bridal makeup look", category: "Bridal Makeup" },
    { src: "assets/bridal/portfolio-2.jpg", alt: "Bridal makeup look", category: "Bridal Makeup" },
    { src: "assets/bridal/portfolio-3.jpg", alt: "Walima look", category: "Walima" },
    { src: "assets/bridal/portfolio-4.jpg", alt: "Walima look", category: "Walima" },
    { src: "assets/bridal/portfolio-5.jpg", alt: "Mehndi look", category: "Mehndi" },
    { src: "assets/bridal/portfolio-6.jpg", alt: "Bridal hair styling", category: "Hair Styling" },
    { src: "assets/bridal/portfolio-7.jpg", alt: "Bridal hair styling", category: "Hair Styling" },
    { src: "assets/bridal/portfolio-8.jpg", alt: "Before and after bridal transformation", category: "Before & After" }
  ],

  // Same pattern for the general gallery — drop files into /assets/gallery/.
  gallery: [
    { src: "assets/gallery/gallery-1.jpg", alt: "Makeup work", category: "Makeup" },
    { src: "assets/gallery/gallery-2.jpg", alt: "Hair styling work", category: "Hair" },
    { src: "assets/gallery/gallery-3.jpg", alt: "Skincare treatment", category: "Skincare" },
    { src: "assets/gallery/gallery-4.jpg", alt: "Salon interior", category: "Interior" },
    { src: "assets/gallery/gallery-5.jpg", alt: "Bridal work", category: "Bridal" },
    { src: "assets/gallery/gallery-6.jpg", alt: "Before and after", category: "Before & After" },
    { src: "assets/gallery/gallery-7.jpg", alt: "Makeup work", category: "Makeup" },
    { src: "assets/gallery/gallery-8.jpg", alt: "Hair styling work", category: "Hair" }
  ],

  // Real testimonials, as supplied — do not replace with invented quotes.
  testimonials: [
    {
      name: "Hunya Amin",
      isLocalGuide: true,
      reviewCount: 33,
      photoCount: 48,
      rating: 5,
      date: "7 weeks ago",
      text: "Specially recommended for hair services and make up ❤️"
    },
    {
      name: "Faiza Ashraf",
      isLocalGuide: true,
      reviewCount: 10,
      photoCount: 0,
      rating: 5,
      date: "46 weeks ago",
      text: "A beautiful place where personalities are changed"
    },
    {
      name: "Fariha Afzal",
      isLocalGuide: true,
      reviewCount: 9,
      photoCount: 0,
      rating: 5,
      date: "14 Nov 2024",
      text: "Great place for hair transformation"
    },
    {
      name: "pashmina shinwari",
      isLocalGuide: true,
      reviewCount: 18,
      photoCount: 1,
      rating: 5,
      date: "25 Jun 2024",
      text: "The staff is friendly and all the services are excellent. Definitely recommend it!!"
    },
    {
      name: "Abida Fahad",
      isLocalGuide: false,
      reviewCount: 3,
      photoCount: 0,
      rating: 5,
      date: "9 Jun 2024",
      text: "I think she is owner very nice Lady she cut my hair she was so nice and polite she is so hard worker jesa Maine Kaha wesa Kiya or so reasonable she charged"
    },
    {
      name: "Aysha Zahid",
      isLocalGuide: true,
      reviewCount: 13,
      photoCount: 332,
      rating: 5,
      date: "28 Jan 2023",
      text: "Loved their makeup and services. Staff is very cooperative 😍"
    }
  ],
  googleReviewsUrl: ""
};
