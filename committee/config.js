/* =========================================================================
   CONFIG — edit this file to add/modify conferences.
   After deploying the Google Apps Script, paste its Web App URL below.
   ========================================================================= */
window.APP_CONFIG = {
  // Paste your Google Apps Script Web App URL here (ends with /exec).
  // Leave empty to run in DEMO mode (nothing is saved).
  SCRIPT_URL: "https://script.google.com/macros/s/AKfycbykGuZgHz8loeCutbUZRF_wlRdO8B5-b-7hugXRbB_vZYkd6arpEiaDz8Cn1pUw0VjJuQ/exec",

  organizer: "AiScholar",
  contactEmail: "", // optional, e.g. "committee@yourdomain.org"

  // Academic titles, ranked. Higher rank = more senior.
  titles: [
    { value: "Professor",           label: "Professor",            rank: 3 },
    { value: "Associate Professor", label: "Associate Professor",  rank: 2 },
    { value: "Dr",                  label: "Dr (PhD holder: Assistant Professor / Senior Lecturer / Lecturer / Researcher)", rank: 1 }
  ],

  // Role eligibility (minimum title rank required).
  roles: {
    "General Chair":                      { minRank: 3, requirement: "Professor only" },
    "Publication Chair":                  { minRank: 2, requirement: "Associate Professor and above",
                                            note: "For first-time applicants, priority is given to overseas experts whose research interests align with the conference." },
    "Technical Program Chair":            { minRank: 2, requirement: "Associate Professor and above" },
    "Technical Program Committee Member": { minRank: 1, requirement: "Professor, Associate Professor or Dr" }
  },

  conferences: [
    {
      id: "ICBIS2027",
      short: "ICBIS 2027",
      edition: "6th",
      name: "The 6th Blockchain, Artificial Intelligence and Intelligent Information Systems",
      date: "May 28–30, 2027",
      location: "Shanghai, China",
      website: "https://www.ic-bis.net/",
      accent: "#2f6f5e",
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
      short: "ICAIFE 2027",
      edition: "4th",
      name: "The 4th International Conference on Artificial Intelligence and Future Education",
      date: "June 25–27, 2027",
      location: "Tokyo, Japan",
      website: "https://www.icaife.net/",
      accent: "#a2452f",
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
    intro: "To respect your time, your involvement is primarily advisory, high-level and highly flexible. The AiScholar organizing team takes full responsibility for operational and administrative work, including submission management, peer-review coordination, registration, publication formatting and day-to-day author correspondence.",
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
