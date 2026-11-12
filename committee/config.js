/* =========================================================================
   CONFIG — the only file you normally need to edit.
   ========================================================================= */
window.APP_CONFIG = {
  // Google Apps Script Web App URL (ends with /exec). Empty = demo mode.
  SCRIPT_URL: "https://script.google.com/macros/s/AKfycbykGuZgHz8loeCutbUZRF_wlRdO8B5-b-7hugXRbB_vZYkd6arpEiaDz8Cn1pUw0VjJuQ/exec",

  site: {
    name: "Call for Committee Members",
    tagline: "International Conferences 2027",
    year: 2026
  },

  // Shown in the footer.
  owner: {
    name: "Prof. Madya Ts. Dr. Mohd Shahizan bin Othman"
  },

  // Visitor badge (same style as drshahizan.github.io).
  visitorBadge: {
    img: "https://api.visitorbadge.io/api/visitors?path=https%3A%2F%2Fgithub.com%2Fdrshahizan&labelColor=%23697689&countColor=%23555555&style=plastic",
    link: "https://visitorbadge.io/status?path=https%3A%2F%2Fgithub.com%2Fdrshahizan",
    alt: "Bilangan pelawat laman"
  },

  // Academic titles, ranked. Higher rank = more senior.
  titles: [
    { value: "Professor",           label: "Professor",           rank: 3 },
    { value: "Associate Professor", label: "Associate Professor", rank: 2 },
    { value: "Dr",                  label: "Dr (PhD holder: Assistant Professor / Senior Lecturer / Lecturer / Researcher)", short: "Dr", rank: 1 }
  ],

  // Role eligibility (minimum title rank required).
  roles: {
    "General Chair": {
      minRank: 3, requirement: "Professor only",
      summary: "Provides overall academic leadership and represents the conference."
    },
    "Publication Chair": {
      minRank: 2, requirement: "Associate Professor and above",
      summary: "Advises on publication quality and proceedings.",
      note: "For first-time applicants, priority is given to overseas experts whose research interests align with the conference."
    },
    "Technical Program Chair": {
      minRank: 2, requirement: "Associate Professor and above",
      summary: "Advises on the technical programme, tracks and review standards."
    },
    "Technical Program Committee Member": {
      minRank: 1, requirement: "Professor, Associate Professor or Dr",
      summary: "Offers academic advice within one or more conference tracks."
    }
  },

  conferences: [
    {
      id: "ICBIS2027",
      page: "icbis-2027.html",
      short: "ICBIS 2027",
      edition: "6th",
      name: "The 6th Blockchain, Artificial Intelligence and Intelligent Information Systems",
      date: "May 28–30, 2027",
      city: "Shanghai",
      country: "China",
      website: "https://www.ic-bis.net/",
      tracks: [
        "Fundamentals and Ecosystem of Blockchain",
        "Intelligent Information System",
        "Artificial Intelligence and Computational Science"
      ],
      positions: [
        { role: "General Chair", slots: 1 },
        { role: "Publication Chair", slots: 2 },
        { role: "Technical Program Chair", slots: 2 },
        { role: "Technical Program Committee Member", slots: 5 }
      ]
    },
    {
      id: "ICAIFE2027",
      page: "icaife-2027.html",
      short: "ICAIFE 2027",
      edition: "4th",
      name: "The 4th International Conference on Artificial Intelligence and Future Education",
      date: "June 25–27, 2027",
      city: "Tokyo",
      country: "Japan",
      website: "https://www.icaife.net/",
      tracks: [
        "Learning Analytics and Educational Data Mining",
        "Technology-Enhanced Learning",
        "Artificial Intelligence Enhanced Special Education",
        "Artificial Intelligence Applications and Innovations in Education"
      ],
      positions: [
        { role: "Technical Program Committee Member", slots: 10 }
      ]
    }
  ],

  roleDescription: {
    intro: "To respect your time, your involvement is primarily advisory, high-level and highly flexible. The organizing team takes full responsibility for operational and administrative work, including submission management, peer-review coordination, registration, publication formatting and day-to-day author correspondence.",
    asks: [
      "Offer academic advice on the overall conference development",
      "Support conference visibility within your academic network (optional)",
      "Recommend peer scholars for committee participation (optional)"
    ],
    benefits: [
      "Discounted paper submission fees for you and your students",
      "Certificate of appreciation",
      "Registration fee waiver for conference participation"
    ]
  }
};
