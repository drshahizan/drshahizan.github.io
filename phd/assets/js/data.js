/* =========================================================================
   SITE DATA — edit this file to update the website.
   Kemas kini laman web dengan mengubah fail ini sahaja.
   ========================================================================= */

const REPO = "https://github.com/drshahizan/phd/tree/main/";

const PROFILE = {
  name: "Assoc. Prof. Dr Mohd Shahizan Othman",
  short: "Dr MSO",
  role: "Leader, Intelligent Informatics Research Group (IIRG)",
  affiliation: "Faculty of Computing, Universiti Teknologi Malaysia (UTM)",
  tagline:
    "Supervising PhD and MSc research in data science, artificial intelligence, ontology and semantic systems, and information systems.",
  // Optional: fill in to show on the Contact page (leave "" to hide)
  email: "",
  address: "",
  links: {
    scholar:
      "https://scholar.google.com/citations?hl=en&user=QzgVq24AAAAJ&view_op=list_works&sortby=pubdate",
    linkedin: "https://www.linkedin.com/in/drshahizan/",
    github: "https://github.com/drshahizan",
    material: "https://github.com/drshahizan/research-material",
    issues: "https://github.com/drshahizan/phd/issues",
  },
};

/* students: names exactly as written in STUDENTS below */
const RESEARCH_AREAS = [
  {
    title: "IoT & Network Security",
    students: ["Li Jing"],
    text: "Intrusion detection, attack classification and feature selection with deep transfer learning.",
  },
  {
    title: "Health & Bioinformatics",
    students: ["Rozilawati Dollah @ Md Zain", "Shamini Raja Kumaran", "Xu Deren", "Saleh Dhekre Saber Saleh"],
    text: "Cancer microarray data, infectious-disease and thyroid prediction, biomedical text classification.",
  },
  {
    title: "Ontology & Semantic Systems",
    students: ["Dewi Octaviani", "Bahram Amini Valashani", "Arda Yunianta", "Mahdi Alhaji Musa"],
    text: "Ontology-based recommenders, semantic data integration and knowledge maps.",
  },
  {
    title: "Learning Analytics & EdTech",
    students: ["Abdulaziz Saidu Yalwa", "Adeyemo Sarafa Olasunkanmi", "Qusay Sabah Ishaq Al-Maatouk", "Nur Shamsiah Abdul Rahman", "Waleed Mugahed Ali Al-Rahmi"],
    text: "Learning-style identification, generative-AI adoption and social media for collaborative learning.",
  },
  {
    title: "Information Systems & BI",
    students: ["Zhu Linnan", "Ernie Mazuin Mohd Yusof", "Zhu Caihua"],
    text: "MIS adoption in higher education, business intelligence and cross-border social e-commerce.",
  },
  {
    title: "Applied Machine Learning",
    students: ["Taofik Olasunkanmi Tafa", "Apri Junaidi", "Nur Afrina Binti Mohamad Abdul Ghafar", "Abubakar Sadiq Muahammad"],
    text: "Forecasting, sentiment analysis, image-based disease detection and low-resource machine translation.",
  },
];

/* Publications are in assets/js/publications.js */

/* Students.
   group:  "cs" | "ss" | "proposal" | "msc"
   status: "Graduated" | "Proposal" | "In progress"  (shown as a badge)
   files:  link to shared materials (Drive / SharePoint)
   folder: folder name in this repo (optional)                              */
const STUDENTS = [
  // ---- PhD: Computer Science
  { group: "cs", name: "Li Jing", title: "Optimized Attack Classification Framework for Internet of Things Security using Feature Selection and Deep Transfer Learning", status: "Thesis", files: "https://drive.google.com/drive/folders/1g4wGs4y9ujc9mF6vrTuz7Lu06eLKdplk?usp=drive_link", folder: "li-jing" },
  { group: "cs", name: "Rozilawati Dollah @ Md Zain", title: "An Ontology Based Model for Biomedical Text Classification", status: "Thesis", files: "https://drive.google.com/drive/folders/1APai56aIMEQsKdmOIu_BH1AkxalGYt8E?usp=sharing" },
  { group: "cs", name: "Shamini Raja Kumaran", title: "Enhanced Classification Techniques Based on Gene Manipulation for Cancer Microarray Data", status: "Thesis", files: "https://drive.google.com/drive/u/1/folders/1KSCWtVWZLUPAeNP7MnLD9zCCC8-OBCe8" },
  { group: "cs", name: "Dewi Octaviani", title: "Semantic Model for Mining E-Learning Usage with Ontology and Meaningful Learning Characteristics", status: "Thesis", files: "https://drive.google.com/drive/u/1/folders/12XNQQwF1JDdHW1MThDk29k6a3zY9-BHA" },
  { group: "cs", name: "Bahram Amini Valashani", title: "An Ontology-Based Recommender System using Scholar’s Background Knowledge", status: "Thesis", files: "https://drive.google.com/drive/folders/1jjsasglgeFg_yv6_CVxuAQtgFDFJ0uWF?usp=drive_link" },
  { group: "cs", name: "Arda Yunianta", title: "Ontology-Based Semantic Heterogeneous Data Integration Framework for Learning Environment", status: "Thesis", files: "https://drive.google.com/drive/folders/119DWjJGSCM73sVaZkvAN9U6EmhgZhcZP?usp=sharing" },
  { group: "cs", name: "Xu Deren", title: "Blended Ensemble Model for Prediction of Infectious Diseases", status: "Thesis", note: "Co-supervised", files: "https://drive.google.com/drive/folders/1kut5WDTxWWgsj3opcptZId9oBd2OM9Jt?usp=sharing", folder: "deren" },

  // ---- PhD: Social Science
  { group: "ss", name: "Zhu Linnan", title: "A User Related Determinant Model In Management Information System For China Higher Education", status: "Thesis", files: "https://liveutm-my.sharepoint.com/:f:/g/personal/shahizan_live_utm_my/IgDIaQT26thFSqJpkh95bkNzAS2afwt_rbISst-70wUFuTQ?e=udi8mu", folder: "zhulinnan" },
  { group: "ss", name: "Ernie Mazuin Mohd Yusof", title: "Individual Level Determinants Model for Benefit Use of Business Intelligence in Malaysia Manufacturing Organizations", status: "Thesis", files: "https://drive.google.com/drive/u/1/folders/1qqIaFnxY4lwsh6BDsrFc45x8EtlGEYNK" },
  { group: "ss", name: "Qusay Sabah Ishaq Al-Maatouk", title: "Social Media Utilization Model for the Improvement of Academic Performance at Malaysian Higher Education Institutions", status: "Thesis", files: "https://drive.google.com/drive/u/1/folders/1SHAcOKLpVSQZKovQ2PAdsDQ0To48E56E" },
  { group: "ss", name: "Nur Shamsiah Abdul Rahman", title: "A Model of Behaviour Intention Factors on Social Media Use for Collaborative Learning Affecting Teaching and Learning", status: "Thesis", files: "https://drive.google.com/drive/u/1/folders/160y6aoEfS5oWdrOfNFCti4t9ojT0Mbke" },
  { group: "ss", name: "Waleed Mugahed Ali Al-Rahmi", title: "The Impact of Social Media Use in Collaborative Learning Towards Learning Performance Among Research Students", status: "Thesis", files: "https://drive.google.com/drive/u/1/folders/1Hvq5NpT-XriLs3M9hL6_-TBGfWIsqbWg" },
  { group: "ss", name: "Mahdi Alhaji Musa", title: "Knowledge Map, Enterprise Ontology and Lean for enhancing Business Process Re-Engineering in Healthcare", status: "Thesis", files: "https://drive.google.com/drive/u/1/folders/1-vs8WWvx4l9K4QHpYEcO2CDv24RiDZz3" },

  // ---- PhD: Proposal
  { group: "proposal", name: "Abdulaziz Saidu Yalwa", title: "Modelling Students’ Continuance Intention to Use Generative AI in Higher Education", status: "Proposal", files: "https://liveutm-my.sharepoint.com/:b:/g/personal/shahizan_live_utm_my/IQD_e2wuo2wNSrGBtDUIs6pSAb10jn553yjRjg-ETNjW1bc?e=5WXsYv", folder: "abdulaziz" },
  { group: "proposal", name: "Adeyemo Sarafa Olasunkanmi", title: "Enhanced Learning Styles Identification Using Ensemble Deep Learning Techniques With Multimodal Data", status: "Proposal", files: "https://liveutm-my.sharepoint.com/:b:/g/personal/shahizan_live_utm_my/IQDem1bre8qsQZyfZTYIvFGeAaC9Kx5y44p_drI2YQon8ew?e=3boxnV" },
  { group: "proposal", name: "Taofik Olasunkanmi Tafa", title: "Optimised Multimodal Approach For Neural Machine Translation Of Low-Resource Languages", status: "Proposal", files: "https://drive.google.com/drive/folders/1Xe3yXLhAHg-QSPNPu6KV3OHM_g6lq5HC?usp=drive_link" },
  { group: "proposal", name: "Apri Junaidi", title: "Enhancing Rice Leaf Disease Detection: A Comprehensive Approach to Image Noise Reduction, Multi-Object Identification, and Small Object Detection", status: "Proposal", files: "https://liveutm-my.sharepoint.com/:b:/g/personal/shahizan_live_utm_my/IQDdX5OxItUfSaMLxx0ecBbiAbF-mc1CpI1tmx4bAoy9WLA?e=4aZmSv" },
  { group: "proposal", name: "Zhu Caihua", title: "A Model of Customer Stickiness for Cross-Border Social E-Commerce Platform in China", status: "Proposal", files: "https://drive.google.com/drive/folders/1kmzNFoCldFtzBWCJZ8DoRQENwYTQWBsl?usp=drive_link", folder: "zhu-chaihua" },
  { group: "proposal", name: "Zhu Linnan", title: "Investigating User Factors in Management Information System Adoption and Implementation in Higher Education Institutions", status: "Proposal", files: "https://drive.google.com/drive/folders/138Pj_MnAxx2Q-CVd36ks9HtUE0DbM40N?usp=sharing", folder: "zhulinnan" },
  { group: "proposal", name: "Li Jing", title: "Enhanced Attack Detection and Classification Techniques Based on Feature Manipulation of IOT Data for IOT Security", status: "Proposal", files: "https://drive.google.com/drive/u/1/folders/1htEHWofGPdG0_bB_OxUMkcLycj0pf5DZ", folder: "li-jing" },
  { group: "proposal", name: "Saleh Dhekre Saber Saleh", title: "A Predictive Analysis Framework of Thyroid Disease Using Machine Learning Approaches", status: "Proposal", files: "https://drive.google.com/drive/u/1/folders/128OOMGs6TJEXIsu1Xetfx19ZKxeekUXS", folder: "dhekre" },

  // ---- MSc Data Science
  { group: "msc", name: "Nur Afrina Binti Mohamad Abdul Ghafar", title: "Cooking Oil Price Forecasting Using SARIMA and LSTM in Malaysia", status: "Project", files: "https://drive.google.com/drive/folders/1mXXjKQLtTxGbJWc_3y46TWzW_oQSeHSD?usp=drive_link" },
  { group: "msc", name: "Abubakar Sadiq Muahammad", title: "Sentiment Analysis and Rating Prediction for an E-Commerce Platforms in Malaysia using CNN and LSTM", status: "Project", files: "https://drive.google.com/drive/folders/1qWTab1CFhBv_eBgr2tHIYP-ma-8tIt2b?usp=drive_link" },
];

/* Current students — from UTM GSMS (List of Students and Assessors),
   session 2026/2027 semester 1. level: "PhD" | "Master" */
const CURRENT_SESSION = "2026/2027 · Semester 1";
const CURRENT_STUDENTS = [
  { name: "Apri Junaidi", country: "Indonesia", level: "PhD" },
  { name: "Saleh Dhekre Saber Saleh", country: "Iraq", level: "PhD" },
  { name: "Abdulaziz Saidu Yalwa", country: "Nigeria", level: "PhD" },
  { name: "Taofik Olasunkanmi Tafa", country: "Nigeria", level: "PhD" },
  { name: "Sarafa Olasunkanmi Adeyemo", country: "Nigeria", level: "PhD" },
  { name: "Alex James", country: "India", level: "PhD" },
  { name: "Lahib Nidhal Dawd Al-Yousuf", country: "Iraq", level: "PhD" },
  { name: "Mazliana binti Mustapa", country: "Malaysia", level: "PhD" },
  { name: "Hashmeya Mahmood Mohamed Barakat", country: "Bahrain", level: "PhD" },
  { name: "Jaafar Almoadhen", country: "Bahrain", level: "PhD" },
  { name: "Rishma Fathima binti Basher", country: "Malaysia", level: "PhD" },
  { name: "Sara Ahmed J. Almezal", country: "Bahrain", level: "PhD" },
  { name: "Mohamed Eiamin Mohamed Ali Elkanzi", country: "Bahrain", level: "PhD" },
  { name: "Israk Entisar", country: "Bangladesh", level: "Master" },
  { name: "Pan Tong", country: "China", level: "PhD", folder: "pan-tong" },
  { name: "Ancy Sara Cheriyan", country: "India", level: "PhD" },
  { name: "Zhu Caihua", country: "China", level: "PhD", folder: "zhu-chaihua" },
  { name: "Yang Xiulun", country: "China", level: "PhD" },
  { name: "Rabab Hasan Ali Yusuf Alshjjar", country: "Bahrain", level: "PhD", folder: "rabab" },
  { name: "Xu Zhanghua", country: "Singapore", level: "PhD" },
];

const FLAGS = { Indonesia: "🇮🇩", Iraq: "🇮🇶", Nigeria: "🇳🇬", India: "🇮🇳", Malaysia: "🇲🇾", Bahrain: "🇧🇭", Bangladesh: "🇧🇩", China: "🇨🇳", Singapore: "🇸🇬" };

const GROUPS = [
  { id: "all", label: "All" },
  { id: "cs", label: "PhD · Computer Science" },
  { id: "ss", label: "PhD · Social Science" },
  { id: "proposal", label: "PhD · Proposal" },
  { id: "msc", label: "MSc Data Science" },
];

/* Student workspaces and shared folders in this repository */
const WORKSPACES = [
  { name: "Chapter 2 – Literature Review guide", folder: "chapter2" },
  { name: "Abdulaziz – Chapters 1–4 drafts", folder: "abdulaziz" },
  { name: "Dhekre – code, data & SLR", folder: "dhekre" },
  { name: "Xu Deren – thesis & viva slides", folder: "deren" },
  { name: "Zhu Linnan – viva notes", folder: "zhulinnan" },
  { name: "Li Jing – comments & agreements", folder: "li-jing" },
  { name: "Pan Tong – PRISMA", folder: "pan-tong" },
  { name: "Rabab – article notes", folder: "rabab" },
  { name: "Zhu Caihua", folder: "zhu-chaihua" },
];
