const moduleNav = document.querySelector(".module-nav");
const topNav = document.querySelector(".top-nav");
document
  .querySelector(".menu")
  ?.addEventListener("click", () => topNav?.classList.toggle("open"));
const pages = [
  ["index.html", "Topic Overview", "overview"],
  ["github.html", "GitHub Fundamentals", "github"],
  ["github-markdown.html", "Markdown and README", "github"],
  ["github-desktop.html", "GitHub Desktop", "github"],
  ["github-pages.html", "GitHub Pages", "github"],
  ["figma.html", "Figma Overview", "figma"],
  ["figma-design-process.html", "Figma Design Process", "figma"],
  ["figma-responsive-components.html", "Responsive Components", "figma"],
  ["figma-prototyping.html", "Interactive Prototyping", "figma"],
  ["figma-collaboration-handoff.html", "Collaboration and Handoff", "figma"],
  ["figma-case-studies.html", "Figma Case Studies", "figma"],
  ["figma-inspiration-malaysia.html", "Inspiration and Malaysia", "figma"],
  ["google-stitch.html", "Stitch Overview", "stitch"],
  ["google-stitch-prompt-design.html", "Prompt Design", "stitch"],
  ["google-stitch-multimodal-canvas.html", "Multimodal Canvas", "stitch"],
  ["google-stitch-iteration.html", "Iteration and Critique", "stitch"],
  [
    "google-stitch-design-system.html",
    "Design Systems and DESIGN.md",
    "stitch",
  ],
  ["google-stitch-to-figma.html", "Stitch to Figma", "stitch"],
  ["google-stitch-export-handoff.html", "Export and Handoff", "stitch"],
  ["google-stitch-case-studies.html", "Stitch Case Studies", "stitch"],
  ["google-vids.html", "Vids Overview", "vids"],
  [
    "google-vids-planning-storyboard.html",
    "Planning and Storyboarding",
    "vids",
  ],
  ["google-vids-scriptwriting.html", "Technical Scriptwriting", "vids"],
  ["google-vids-recording-studio.html", "Recording Studio", "vids"],
  ["google-vids-editing-workflow.html", "Editing Workflow", "vids"],
  ["google-vids-accessibility.html", "Captions and Accessibility", "vids"],
  ["google-vids-ai-assisted-production.html", "AI-Assisted Production", "vids"],
  ["google-vids-export-sharing.html", "Export and Sharing", "vids"],
  ["google-vids-assignment-production.html", "Assignment Production", "vids"],
  ["responsible-practice.html", "Responsible Practice", "practice"],
  ["activity.html", "Integrated Activity", "assessment"],
  ["quiz.html", "Knowledge Check", "assessment"],
  ["submission.html", "Submission", "assessment"],
  ["github-student-pack.html", "Student Developer Pack", "enrichment"],
  ["github-profile-showcase.html", "Profile Showcase", "enrichment"],
  ["developer-roadmaps.html", "Developer Roadmaps", "enrichment"],
  ["github-case-studies.html", "GitHub Case Studies", "enrichment"],
  ["further-learning.html", "Further Learning", "enrichment"],
  ["glossary.html", "Glossary", "reference"],
];
const current = location.pathname.split("/").pop() || "index.html";
if (moduleNav) {
  const groupLabels = {
    overview: "Module Overview",
    github: "GitHub Tools",
    figma: "Figma and Prototyping",
    stitch: "Google Stitch",
    vids: "Google Vids and Video Production",
    practice: "Responsible Practice",
    assessment: "Activities and Assessment",
    enrichment: "Professional Enrichment",
    reference: "Reference",
  };
  let group = "";
  moduleNav.innerHTML = pages
    .map((p, i) => {
      const heading =
        p[2] !== group
          ? ((group = p[2]),
            '<p class="nav-group">' + groupLabels[group] + "</p>")
          : "";
      return (
        heading +
        '<a href="' +
        p[0] +
        '" class="' +
        (current === p[0] ? "active" : "") +
        '"><span>' +
        String(i + 1).padStart(2, "0") +
        "</span>" +
        p[1] +
        "</a>"
      );
    })
    .join("");
}
const position = Math.max(1, pages.findIndex((p) => p[0] === current) + 1);
document.documentElement.style.setProperty(
  "--progress",
  `${(position / pages.length) * 100}%`,
);

document.querySelectorAll("pre").forEach((block, index) => {
  const heading =
    block.closest("section")?.querySelector("h3,h4")?.textContent || "";
  const button = document.createElement("button");
  button.type = "button";
  button.className = "copy-code";
  button.textContent = /prompt/i.test(heading) ? "Copy Prompt" : "Copy Code";
  button.setAttribute("aria-label", `${button.textContent} ${index + 1}`);
  button.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(block.innerText);
      const original = button.textContent;
      button.textContent = "Copied!";
      button.classList.add("copied");
      setTimeout(() => {
        button.textContent = original;
        button.classList.remove("copied");
      }, 1800);
    } catch {
      const range = document.createRange();
      range.selectNodeContents(block);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      button.textContent = "Select and copy";
    }
  });
  const toolbar = document.createElement("div");
  toolbar.className = "copy-toolbar";
  toolbar.appendChild(button);
  block.before(toolbar);
});

const learningResources = {
  "github.html": [
    [
      "documentation",
      "Read",
      "Hello World",
      "GitHub Docs",
      "10–15 min",
      "Learn repositories, branches, commits and pull requests through the official beginner tutorial.",
      "https://docs.github.com/en/get-started/start-your-journey/hello-world",
    ],
    [
      "whitepaper",
      "Explore",
      "The State of the Octoverse",
      "GitHub",
      "20–30 min",
      "Examine current evidence about open source, AI and global software-development practice.",
      "https://octoverse.github.com/",
    ],
    [
      "video",
      "Watch",
      "GitHub for beginners",
      "GitHub YouTube",
      "Choose one video",
      "Watch official demonstrations of repositories, collaboration and the GitHub workflow.",
      "https://www.youtube.com/@GitHub",
    ],
  ],
  "github-student-pack.html": [
    [
      "documentation",
      "Read",
      "GitHub Education for students",
      "GitHub Education",
      "10 min",
      "Review student benefits, eligibility and the learning opportunities available through GitHub Education.",
      "https://education.github.com/students",
    ],
    [
      "course",
      "Explore",
      "Student Developer Pack",
      "GitHub Education",
      "15–20 min",
      "Explore professional developer tools and learning experiences included in the pack.",
      "https://education.github.com/pack",
    ],
    [
      "video",
      "Watch",
      "GitHub Education videos",
      "GitHub Education",
      "Choose one video",
      "Watch official student-focused demonstrations and programme updates.",
      "https://www.youtube.com/@GitHubEducation",
    ],
  ],
  "github-profile-showcase.html": [
    [
      "documentation",
      "Read",
      "Managing your profile README",
      "GitHub Docs",
      "10 min",
      "Create a profile README that presents your skills, interests and selected work clearly.",
      "https://docs.github.com/en/account-and-profile/how-tos/profile-customization/managing-your-profile-readme",
    ],
    [
      "article",
      "Explore",
      "About your profile",
      "GitHub Docs",
      "8–10 min",
      "Review the profile elements that help other people understand your activity and projects.",
      "https://docs.github.com/en/account-and-profile/concepts/personal-account-concepts/about-your-profile",
    ],
    [
      "video",
      "Watch",
      "Profile README examples",
      "GitHub YouTube",
      "Choose one video",
      "Observe official examples and adapt only the elements relevant to your professional identity.",
      "https://www.youtube.com/@GitHub/search?query=profile%20README",
    ],
  ],
  "developer-roadmaps.html": [
    [
      "article",
      "Read",
      "Developer Roadmaps",
      "roadmap.sh",
      "15–20 min",
      "Use role-based and skill-based roadmaps to identify a realistic next learning goal.",
      "https://roadmap.sh/",
    ],
    [
      "course",
      "Explore",
      "GitHub Skills",
      "GitHub",
      "30–45 min",
      "Practise GitHub features through guided activities in real repositories.",
      "https://skills.github.com/",
    ],
    [
      "video",
      "Watch",
      "GitHub learning videos",
      "GitHub YouTube",
      "Choose one video",
      "Select an official tutorial that supports the next skill in your personal roadmap.",
      "https://www.youtube.com/@GitHub",
    ],
  ],
  "github-case-studies.html": [
    [
      "article",
      "Read",
      "GitHub customer stories",
      "GitHub",
      "15–20 min",
      "Investigate how organisations use GitHub for collaboration, automation and secure delivery.",
      "https://github.com/customer-stories",
    ],
    [
      "whitepaper",
      "Explore",
      "GitHub Resources",
      "GitHub",
      "20–30 min",
      "Select an industry report or whitepaper connected to software delivery or collaboration.",
      "https://resources.github.com/",
    ],
    [
      "video",
      "Watch",
      "GitHub customer stories",
      "GitHub YouTube",
      "Choose one video",
      "Connect a real organisational example to the practices discussed in Topic 2.",
      "https://www.youtube.com/@GitHub/search?query=customer%20story",
    ],
  ],
  "github-markdown.html": [
    [
      "documentation",
      "Read",
      "Basic writing and formatting syntax",
      "GitHub Docs",
      "15 min",
      "Use headings, lists, links, images, code blocks and other supported Markdown elements.",
      "https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax",
    ],
    [
      "whitepaper",
      "Explore",
      "GitHub Flavored Markdown specification",
      "GitHub",
      "20–30 min",
      "Consult the formal specification when precise Markdown behaviour matters.",
      "https://github.github.com/gfm/",
    ],
    [
      "video",
      "Watch",
      "Markdown on GitHub",
      "GitHub YouTube",
      "Choose one video",
      "Follow an official demonstration and improve one README while watching.",
      "https://www.youtube.com/@GitHub/search?query=Markdown",
    ],
  ],
  "github-desktop.html": [
    [
      "documentation",
      "Read",
      "Getting started with GitHub Desktop",
      "GitHub Docs",
      "15–20 min",
      "Learn how to clone, edit, commit, push and synchronise a repository using the desktop application.",
      "https://docs.github.com/en/desktop/overview/getting-started-with-github-desktop",
    ],
    [
      "article",
      "Explore",
      "Git Handbook",
      "GitHub Resources",
      "20 min",
      "Strengthen your understanding of commits, branches, remotes and distributed version control.",
      "https://docs.github.com/en/get-started/using-git/about-git",
    ],
    [
      "video",
      "Watch",
      "GitHub Desktop videos",
      "GitHub YouTube",
      "Choose one video",
      "Watch an official workflow demonstration before repeating it in your own repository.",
      "https://www.youtube.com/@GitHub/search?query=GitHub%20Desktop",
    ],
  ],
  "github-pages.html": [
    [
      "documentation",
      "Read",
      "GitHub Pages quickstart",
      "GitHub Docs",
      "10–15 min",
      "Publish a basic website and verify its branch, folder and public URL settings.",
      "https://docs.github.com/en/pages/quickstart",
    ],
    [
      "article",
      "Explore",
      "Creating a GitHub Pages site",
      "GitHub Docs",
      "15–20 min",
      "Review publishing sources, entry files, themes and deployment considerations.",
      "https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site",
    ],
    [
      "video",
      "Watch",
      "GitHub Pages videos",
      "GitHub YouTube",
      "Choose one video",
      "Follow a publishing demonstration and compare it with your deployment workflow.",
      "https://www.youtube.com/@GitHub/search?query=GitHub%20Pages",
    ],
  ],
  "figma.html": [
    [
      "course",
      "Read",
      "Figma Design for beginners",
      "Figma Learn",
      "30–45 min",
      "Study frames, Auto Layout, components and prototyping through the official beginner material.",
      "https://help.figma.com/hc/en-us/sections/30880632542743-Figma-Design-for-beginners",
    ],
    [
      "article",
      "Explore",
      "Guide to prototyping in Figma",
      "Figma Help",
      "15–20 min",
      "Connect screens, define interactions and test a realistic user flow.",
      "https://help.figma.com/hc/en-us/articles/360040314193-Guide-to-prototyping-in-Figma",
    ],
    [
      "video",
      "Watch",
      "Figma official videos",
      "Figma YouTube",
      "Choose one video",
      "Watch an official tutorial on Auto Layout, components or prototyping.",
      "https://www.youtube.com/@Figma",
    ],
  ],
  "figma-design-process.html": [
    [
      "course",
      "Read",
      "Figma Design for beginners",
      "Figma Learn",
      "30–45 min",
      "Build a sound foundation in frames, layers, constraints and interface structure.",
      "https://help.figma.com/hc/en-us/sections/30880632542743-Figma-Design-for-beginners",
    ],
    [
      "article",
      "Explore",
      "Figma Resource Library",
      "Figma",
      "15–20 min",
      "Connect research, wireframing, iteration and testing in a repeatable design process.",
      "https://www.figma.com/resource-library/",
    ],
    [
      "video",
      "Watch",
      "Figma design workflow",
      "Figma YouTube",
      "Choose one video",
      "Observe how professional designers move from an idea to a testable design.",
      "https://www.youtube.com/@Figma/search?query=design%20process",
    ],
  ],
  "figma-responsive-components.html": [
    [
      "documentation",
      "Read",
      "Guide to Auto Layout",
      "Figma Help",
      "20 min",
      "Create layouts that adapt when content, spacing or frame size changes.",
      "https://help.figma.com/hc/en-us/articles/360040451373-Guide-to-auto-layout-in-Figma",
    ],
    [
      "documentation",
      "Explore",
      "Create and use variants",
      "Figma Help",
      "15–20 min",
      "Organise related component states in a consistent component set.",
      "https://help.figma.com/hc/en-us/articles/360056440594-Create-and-use-variants",
    ],
    [
      "video",
      "Watch",
      "Auto Layout and components",
      "Figma YouTube",
      "Choose one video",
      "Rebuild one interface card while following an official demonstration.",
      "https://www.youtube.com/@Figma/search?query=auto%20layout%20components",
    ],
  ],
  "figma-prototyping.html": [
    [
      "documentation",
      "Read",
      "Guide to prototyping in Figma",
      "Figma Help",
      "15–20 min",
      "Connect screens, configure interactions and preview a realistic user journey.",
      "https://help.figma.com/hc/en-us/articles/360040314193-Guide-to-prototyping-in-Figma",
    ],
    [
      "documentation",
      "Explore",
      "Accessible prototypes",
      "Figma Help",
      "15 min",
      "Add meaningful labels and navigation so more users can evaluate the prototype.",
      "https://help.figma.com/hc/en-us/articles/7810391964695-Accessible-prototypes-in-Figma",
    ],
    [
      "video",
      "Watch",
      "Interactive prototyping",
      "Figma YouTube",
      "Choose one video",
      "Apply one interaction pattern to the Topic 2 dashboard prototype.",
      "https://www.youtube.com/@Figma/search?query=prototyping",
    ],
  ],
  "figma-collaboration-handoff.html": [
    [
      "documentation",
      "Read",
      "Prepare files for developer handoff",
      "Figma Help",
      "15–20 min",
      "Organise frames, names, assets and annotations so implementation decisions are clear.",
      "https://help.figma.com/hc/en-us/articles/360040521453-Optimize-design-files-for-developer-handoff",
    ],
    [
      "article",
      "Explore",
      "Dev Mode",
      "Figma",
      "15 min",
      "Review how design details, variables, assets and code-oriented information support implementation.",
      "https://www.figma.com/dev-mode/",
    ],
    [
      "video",
      "Watch",
      "Design and development collaboration",
      "Figma YouTube",
      "Choose one video",
      "Compare a professional handoff workflow with your current submission process.",
      "https://www.youtube.com/@Figma/search?query=developer%20handoff",
    ],
  ],
  "figma-case-studies.html": [
    [
      "article",
      "Read",
      "Figma customer stories",
      "Figma",
      "20–30 min",
      "Compare how organisations use shared design systems, collaboration and prototyping at scale.",
      "https://www.figma.com/customers/",
    ],
    [
      "article",
      "Explore",
      "GitHub customer story",
      "Figma",
      "10–15 min",
      "Examine how a large software organisation coordinates design work and reusable systems.",
      "https://www.figma.com/customers/github/",
    ],
    [
      "video",
      "Watch",
      "Figma customer stories",
      "Figma YouTube",
      "Choose one video",
      "Identify one practice that can be adapted to a student team project.",
      "https://www.youtube.com/@Figma/search?query=customer%20story",
    ],
  ],
  "figma-inspiration-malaysia.html": [
    [
      "article",
      "Explore",
      "Figma projects and case studies",
      "Behance",
      "20–30 min",
      "Compare how designers communicate the problem, process, interface decisions and final prototype.",
      "https://www.behance.net/search/projects/figma%20case%20study",
    ],
    [
      "course",
      "Explore",
      "Figma Community",
      "Figma",
      "20–30 min",
      "Inspect reusable UI kits, design systems, wireframes and prototype resources before adapting them responsibly.",
      "https://www.figma.com/community",
    ],
    [
      "documentation",
      "Read",
      "Malaysia Government Design System",
      "MYDS",
      "20–30 min",
      "Study Malaysian components, patterns, accessibility guidance and implementation examples.",
      "https://design.digital.gov.my/",
    ],
  ],
  "google-stitch.html": [
    [
      "article",
      "Read",
      "Design UI using AI with Stitch",
      "Google Blog",
      "10 min",
      "Understand how natural-language instructions support interface creation and iteration.",
      "https://blog.google/technology/google-labs/stitch-ai-ui-design/",
    ],
    [
      "whitepaper",
      "Explore",
      "From idea to app with Stitch",
      "Google Developers Blog",
      "12–15 min",
      "Examine the prompt-to-interface workflow and the transition from design to frontend code.",
      "https://developers.googleblog.com/en/stitch-a-new-way-to-design-uis/",
    ],
    [
      "video",
      "Watch",
      "Google Labs demonstrations",
      "Google Labs YouTube",
      "Choose one video",
      "Watch an official product demonstration before writing and refining your own prompt.",
      "https://www.youtube.com/@GoogleLabs/search?query=Stitch",
    ],
  ],
  "google-stitch-prompt-design.html": [
    [
      "article",
      "Read",
      "Design UI using AI with Stitch",
      "Google Blog",
      "10 min",
      "Study how prompts and visual references can guide interface generation.",
      "https://blog.google/technology/google-labs/stitch-ai-ui-design/",
    ],
    [
      "documentation",
      "Explore",
      "Stitch: a new way to design UIs",
      "Google Developers Blog",
      "12–15 min",
      "Compare prompt structure, iteration and interface export in the official workflow.",
      "https://developers.googleblog.com/en/stitch-a-new-way-to-design-uis/",
    ],
    [
      "video",
      "Watch",
      "Google Labs Stitch demonstrations",
      "Google Labs YouTube",
      "Choose one video",
      "Observe how prompt specificity changes the generated interface.",
      "https://www.youtube.com/@GoogleLabs/search?query=Stitch",
    ],
  ],
  "google-stitch-multimodal-canvas.html": [
    [
      "article",
      "Read",
      "Introducing the new Stitch design canvas",
      "Google Blog",
      "10–15 min",
      "Review the current AI-native canvas, multimodal context and design-agent workflow.",
      "https://blog.google/technology/google-labs/stitch-ai-ui-design/",
    ],
    [
      "documentation",
      "Explore",
      "From idea to interface with Stitch",
      "Google Developers Blog",
      "12–15 min",
      "See how text and image inputs can be combined when developing an interface.",
      "https://developers.googleblog.com/en/stitch-a-new-way-to-design-uis/",
    ],
    [
      "video",
      "Watch",
      "Stitch product demonstrations",
      "Google Labs YouTube",
      "Choose one video",
      "Identify the inputs, constraints and outputs used in an official demonstration.",
      "https://www.youtube.com/@GoogleLabs/search?query=Stitch",
    ],
  ],
  "google-stitch-iteration.html": [
    [
      "article",
      "Read",
      "Iterating with Stitch",
      "Google Blog",
      "10–15 min",
      "Examine agent-assisted refinement, design critique and canvas-based iteration.",
      "https://blog.google/technology/google-labs/stitch-ai-ui-design/",
    ],
    [
      "documentation",
      "Explore",
      "Stitch UI design workflow",
      "Google Developers Blog",
      "12–15 min",
      "Connect prompt revision with visual comparison and design decision-making.",
      "https://developers.googleblog.com/en/stitch-a-new-way-to-design-uis/",
    ],
    [
      "video",
      "Watch",
      "Google Labs design demonstrations",
      "Google Labs YouTube",
      "Choose one video",
      "Record one example of a useful design critique and the resulting revision.",
      "https://www.youtube.com/@GoogleLabs/search?query=Stitch",
    ],
  ],
  "google-stitch-design-system.html": [
    [
      "article",
      "Read",
      "Stitch and AI-native software design",
      "Google Blog",
      "10–15 min",
      "Learn how DESIGN.md and reusable design context support consistency.",
      "https://blog.google/technology/google-labs/stitch-ai-ui-design/",
    ],
    [
      "documentation",
      "Explore",
      "Material Design foundations",
      "Google",
      "20–30 min",
      "Use established guidance for colour, typography, layout and interaction decisions.",
      "https://m3.material.io/foundations",
    ],
    [
      "video",
      "Watch",
      "Design systems with Google Design",
      "Google Design YouTube",
      "Choose one video",
      "Relate reusable tokens and components to the Stitch design-system activity.",
      "https://www.youtube.com/@GoogleDesign/search?query=design%20systems",
    ],
  ],
  "google-stitch-to-figma.html": [
    [
      "documentation",
      "Read",
      "Stitch: a new way to design UIs",
      "Google Developers Blog",
      "12–15 min",
      "Review the official path from generated interface to Figma and frontend code.",
      "https://developers.googleblog.com/en/stitch-a-new-way-to-design-uis/",
    ],
    [
      "article",
      "Explore",
      "Google I/O developer tools announcement",
      "Google Developers Blog",
      "15 min",
      "Place Stitch within the wider design-to-development workflow announced by Google.",
      "https://developers.googleblog.com/en/google-io-2025-100-things-google-announced/",
    ],
    [
      "video",
      "Watch",
      "Figma components and prototyping",
      "Figma YouTube",
      "Choose one video",
      "Refine imported screens into components and a testable prototype.",
      "https://www.youtube.com/@Figma/search?query=components%20prototyping",
    ],
  ],
  "google-stitch-export-handoff.html": [
    [
      "documentation",
      "Read",
      "Stitch design-to-code workflow",
      "Google Developers Blog",
      "12–15 min",
      "Understand the export options and the checks required before development.",
      "https://developers.googleblog.com/en/stitch-a-new-way-to-design-uis/",
    ],
    [
      "documentation",
      "Explore",
      "Prepare files for developer handoff",
      "Figma Help",
      "15–20 min",
      "Organise frames, names, assets and annotations before implementation.",
      "https://help.figma.com/hc/en-us/articles/360040521453-Optimize-design-files-for-developer-handoff",
    ],
    [
      "video",
      "Watch",
      "Design and development collaboration",
      "Figma YouTube",
      "Choose one video",
      "Compare your handoff checklist with a professional workflow.",
      "https://www.youtube.com/@Figma/search?query=developer%20handoff",
    ],
  ],
  "google-stitch-case-studies.html": [
    [
      "article",
      "Read",
      "Stitch AI-native design canvas",
      "Google Blog",
      "10–15 min",
      "Use current product capabilities as evidence when evaluating each case study.",
      "https://blog.google/technology/google-labs/stitch-ai-ui-design/",
    ],
    [
      "article",
      "Explore",
      "Figma Community",
      "Figma",
      "20–30 min",
      "Compare dashboard and service-interface patterns before developing an original Malaysian concept.",
      "https://www.figma.com/community",
    ],
    [
      "documentation",
      "Explore",
      "Malaysia Government Design System",
      "MYDS",
      "20–30 min",
      "Apply Malaysian public-sector components, accessibility guidance and design patterns.",
      "https://design.digital.gov.my/",
    ],
  ],
  "google-vids.html": [
    [
      "article",
      "Read",
      "Google Vids product overview",
      "Google Workspace",
      "10 min",
      "Review AI-assisted creation, recording, editing, collaboration and sharing features.",
      "https://workspace.google.com/products/vids/",
    ],
    [
      "documentation",
      "Explore",
      "Get started with Google Vids",
      "Google Workspace Learning Center",
      "15–25 min",
      "Use the official learning path to plan, create, edit and share a short technical video.",
      "https://support.google.com/a/users/answer/14731773?hl=en",
    ],
    [
      "video",
      "Watch",
      "Vids on Vids",
      "Google Workspace YouTube",
      "Choose one video",
      "Watch the official instructional series and apply one production technique.",
      "https://www.youtube.com/@GoogleWorkspace/search?query=Vids%20on%20Vids",
    ],
  ],
  "google-vids-planning-storyboard.html": [
    [
      "documentation",
      "Read",
      "Plan your video with AI",
      "Google Docs Editors Help",
      "10–15 min",
      "Review the official planning workflow, then compare it with the assignment storyboard.",
      "https://support.google.com/docs/answer/15067819?hl=en",
    ],
    [
      "article",
      "Explore",
      "Google Vids product overview",
      "Google Workspace",
      "10 min",
      "Connect planning choices with the available creation, recording and collaboration features.",
      "https://workspace.google.com/products/vids/",
    ],
    [
      "video",
      "Watch",
      "Vids on Vids",
      "Google Workspace YouTube",
      "Choose one video",
      "Observe how an official tutorial structures scenes and supporting visuals.",
      "https://www.youtube.com/@GoogleWorkspace/search?query=Vids%20on%20Vids",
    ],
  ],
  "google-vids-scriptwriting.html": [
    [
      "documentation",
      "Read",
      "Create voiceovers with AI",
      "Google Docs Editors Help",
      "10–15 min",
      "Learn how scripts support voiceovers, recorded narration and generated media.",
      "https://support.google.com/docs/answer/15070345?hl=en",
    ],
    [
      "documentation",
      "Explore",
      "Convert Slides to Google Vids",
      "Google Docs Editors Help",
      "10–15 min",
      "Review how presentation content becomes scenes and editable narration.",
      "https://support.google.com/docs/answer/15577408?hl=en",
    ],
    [
      "video",
      "Watch",
      "Google Vids script tutorials",
      "Google Workspace YouTube",
      "Choose one video",
      "Compare the tutorial narration with the Problem–Process–Evidence structure.",
      "https://www.youtube.com/@GoogleWorkspace/search?query=Google%20Vids%20script",
    ],
  ],
  "google-vids-recording-studio.html": [
    [
      "documentation",
      "Read",
      "Record video or audio clips",
      "Google Docs Editors Help",
      "10–15 min",
      "Review screen, camera and microphone recording options before rehearsing the demo route.",
      "https://support.google.com/docs/answer/14956207?hl=en",
    ],
    [
      "documentation",
      "Explore",
      "Record a presentation with Google Vids",
      "Google Docs Editors Help",
      "10 min",
      "Learn how a Slides presentation can be captured and edited in Google Vids.",
      "https://support.google.com/docs/answer/17570752?hl=en",
    ],
    [
      "video",
      "Watch",
      "Google Vids recording tutorials",
      "Google Workspace YouTube",
      "Choose one video",
      "Apply one recording technique to the SCST1133 project walkthrough.",
      "https://www.youtube.com/@GoogleWorkspace/search?query=Google%20Vids%20record",
    ],
  ],
  "google-vids-editing-workflow.html": [
    [
      "documentation",
      "Read",
      "Trim video and audio transcripts",
      "Google Docs Editors Help",
      "10 min",
      "Remove filler words and long pauses through supported transcript-based editing.",
      "https://support.google.com/docs/answer/16357485?hl=en",
    ],
    [
      "documentation",
      "Explore",
      "Format video, audio and images",
      "Google Docs Editors Help",
      "15 min",
      "Review timing, volume, position, animation and media formatting controls.",
      "https://support.google.com/docs/answer/14923154?hl=en",
    ],
    [
      "video",
      "Watch",
      "Google Vids editing tutorials",
      "Google Workspace YouTube",
      "Choose one video",
      "Compare an official editing demonstration with the six-stage workflow.",
      "https://www.youtube.com/@GoogleWorkspace/search?query=Google%20Vids%20editing",
    ],
  ],
  "google-vids-accessibility.html": [
    [
      "documentation",
      "Read",
      "Use Google Vids with a screen reader",
      "Google Docs Editors Help",
      "15–20 min",
      "Understand keyboard and screen-reader considerations within the Google Vids interface.",
      "https://support.google.com/docs/answer/15003436?hl=en",
    ],
    [
      "documentation",
      "Explore",
      "Add captions in Google Vids",
      "Google Docs Editors Help",
      "10–15 min",
      "Generate, review and present captions that support accessible viewing.",
      "https://support.google.com/docs/answer/14953386?hl=en",
    ],
    [
      "article",
      "Read",
      "Web Content Accessibility Guidelines",
      "W3C",
      "20–30 min",
      "Relate readable text, contrast and alternatives to established accessibility principles.",
      "https://www.w3.org/WAI/standards-guidelines/wcag/",
    ],
  ],
  "google-vids-ai-assisted-production.html": [
    [
      "documentation",
      "Read",
      "Use AI to generate video clips",
      "Google Docs Editors Help",
      "15–20 min",
      "Review supported inputs, output formats, limits and responsible use considerations.",
      "https://support.google.com/docs/answer/16143507?hl=en",
    ],
    [
      "article",
      "Explore",
      "Google Vids product overview",
      "Google Workspace",
      "10 min",
      "Examine Gemini-assisted creation, voiceovers, avatars and transcript-based editing.",
      "https://workspace.google.com/products/vids/",
    ],
    [
      "video",
      "Watch",
      "Google Vids AI tutorials",
      "Google Workspace YouTube",
      "Choose one video",
      "Identify where human verification is required in an AI-assisted workflow.",
      "https://www.youtube.com/@GoogleWorkspace/search?query=Google%20Vids%20AI",
    ],
  ],
  "google-vids-export-sharing.html": [
    [
      "documentation",
      "Read",
      "Get started with Google Vids",
      "Google Docs Editors Help",
      "15–20 min",
      "Review sharing roles, Drive export, MP4 download and YouTube output options.",
      "https://support.google.com/docs/answer/15082958?hl=en",
    ],
    [
      "documentation",
      "Explore",
      "Share files from Google Drive",
      "Google Drive Help",
      "10 min",
      "Set Viewer access and verify that the submitted link works as intended.",
      "https://support.google.com/drive/answer/2494822?hl=en",
    ],
    [
      "video",
      "Watch",
      "Google Vids sharing tutorials",
      "Google Workspace YouTube",
      "Choose one video",
      "Follow an official export or sharing demonstration before final submission.",
      "https://www.youtube.com/@GoogleWorkspace/search?query=Google%20Vids%20share%20export",
    ],
  ],
  "google-vids-assignment-production.html": [
    [
      "documentation",
      "Read",
      "Google Vids learning path",
      "Google Workspace Learning Center",
      "20–30 min",
      "Consolidate planning, creation, editing and sharing before producing the assignment video.",
      "https://support.google.com/a/users/answer/14731773?hl=en",
    ],
    [
      "article",
      "Explore",
      "Google Vids product overview",
      "Google Workspace",
      "10 min",
      "Verify which production features are available for the account being used.",
      "https://workspace.google.com/products/vids/",
    ],
    [
      "video",
      "Watch",
      "Vids on Vids",
      "Google Workspace YouTube",
      "Choose one video",
      "Select one official technique to improve the final SCST1133 walkthrough.",
      "https://www.youtube.com/@GoogleWorkspace/search?query=Vids%20on%20Vids",
    ],
  ],
  "activity.html": [
    [
      "documentation",
      "Read",
      "About pull requests",
      "GitHub Docs",
      "12–15 min",
      "Review how proposed changes are discussed, checked and merged.",
      "https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests",
    ],
    [
      "article",
      "Explore",
      "GitHub Projects documentation",
      "GitHub Docs",
      "15–20 min",
      "Organise issues and pull requests using tables, boards and adaptable project views.",
      "https://docs.github.com/en/issues/planning-and-tracking-with-projects/learning-about-projects/about-projects",
    ],
    [
      "video",
      "Watch",
      "Collaboration workflow videos",
      "GitHub YouTube",
      "Choose one video",
      "Observe a branch, pull-request and review workflow before completing the integrated activity.",
      "https://www.youtube.com/@GitHub/search?query=pull%20request",
    ],
  ],
};

if (current !== "further-learning.html" && learningResources[current]) {
  const lessonNav = document.querySelector(".lesson-nav");
  const resourceSection = document.createElement("section");
  resourceSection.className = "page-resources";
  resourceSection.setAttribute("aria-labelledby", "additional-resources-title");
  resourceSection.innerHTML = `<div class="section-title"><span class="resource-logo github">+</span><div><p>Read, explore and watch</p><h3 id="additional-resources-title">Additional learning resources</h3></div></div><div class="resource-grid">${learningResources[current].map((r) => `<article class="resource-card"><span class="resource-type ${r[0]}">${r[1]}</span><h4>${r[2]}</h4><p>${r[5]}</p><div class="resource-meta"><span>${r[3]}</span><span>${r[4]}</span></div><a href="${r[6]}" target="_blank" rel="noopener">Open official resource →</a></article>`).join("")}</div><p class="resource-note">Open external resources in a new tab. Check the interface and publication date because digital tools continue to evolve.</p>`;
  lessonNav?.before(resourceSection);
}

const tracker = document.getElementById("evidence-tracker");
if (tracker) {
  const key = "scst1133-topic02-evidence";
  let saved = JSON.parse(localStorage.getItem(key) || "[]");
  const boxes = [...tracker.querySelectorAll("input")];
  boxes.forEach((b, i) => {
    b.checked = !!saved[i];
    b.addEventListener("change", () => {
      saved = boxes.map((x) => x.checked);
      localStorage.setItem(key, JSON.stringify(saved));
      update();
    });
  });
  function update() {
    const done = boxes.filter((x) => x.checked).length;
    document.getElementById("tracker-progress").textContent =
      done + " of " + boxes.length + " evidence items completed.";
  }
  update();
}
const zoomImages = [...document.querySelectorAll(".zoomable-image")];
if (zoomImages.length) {
  const dlg = document.createElement("dialog");
  dlg.className = "image-lightbox";
  dlg.innerHTML =
    '<button type="button" aria-label="Close full-size image">×</button><img alt="">';
  document.body.appendChild(dlg);
  const open = (i) => {
    dlg.querySelector("img").src = i.src;
    dlg.querySelector("img").alt = i.alt;
    dlg.showModal();
  };
  zoomImages.forEach((i) => {
    i.title = "Click to view full size";
    i.onclick = () => open(i);
    i.onkeydown = (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        open(i);
      }
    };
  });
  dlg.querySelector("button").onclick = () => dlg.close();
  dlg.onclick = (e) => {
    if (e.target === dlg) dlg.close();
  };
}
const search = document.getElementById("glossary-search");
if (search)
  search.addEventListener("input", () => {
    let n = 0;
    document.querySelectorAll("#glossary-table tbody tr").forEach((r) => {
      const ok = r.textContent
        .toLowerCase()
        .includes(search.value.toLowerCase());
      r.hidden = !ok;
      if (ok) n++;
    });
    document.getElementById("glossary-empty").hidden = n !== 0;
  });
const qf = document.getElementById("topic-quiz");
if (qf) {
  qf.addEventListener("submit", (e) => {
    e.preventDefault();
    let score = 0,
      answered = 0;
    const items = [...qf.querySelectorAll(".quiz-question")];
    items.forEach((q) => {
      const p = q.querySelector("input:checked"),
        f = q.querySelector(".quiz-feedback");
      q.classList.remove("correct", "incorrect");
      if (!p) {
        f.textContent = "Select an answer.";
        return;
      }
      answered++;
      const ok = +p.value === +q.dataset.answer;
      if (ok) {
        score++;
        q.classList.add("correct");
        f.textContent = "Correct. " + q.dataset.feedback;
      } else {
        q.classList.add("incorrect");
        f.textContent = "Review: " + q.dataset.feedback;
      }
    });
    const r = document.getElementById("quiz-result"),
      total = +qf.dataset.total;
    r.hidden = false;
    r.innerHTML =
      "<strong>" +
      score +
      " / " +
      total +
      "</strong><span>" +
      (answered < total
        ? "Complete every question for a full result."
        : score >= 10
          ? "Excellent understanding."
          : score >= 7
            ? "Good progress—review the feedback."
            : "Review the core pathway and try again.") +
      "</span>";
    r.scrollIntoView({ behavior: "smooth", block: "center" });
  });
  qf.addEventListener("reset", () =>
    setTimeout(() => {
      qf.querySelectorAll(".quiz-question").forEach((q) => {
        q.classList.remove("correct", "incorrect");
        q.querySelector(".quiz-feedback").textContent = "";
      });
      document.getElementById("quiz-result").hidden = true;
    }, 0),
  );
}
