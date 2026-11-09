/** Identity, career and skills content. Project case studies live in ./projects. */

export interface ExperienceEntry {
  company: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  bullets: string[];
  projectSlug?: string;
}

export interface EducationEntry {
  institution: string;
  degree: string;
  location: string;
  period?: string;
  note?: string;
}

export interface SkillGroup {
  category: string;
  items: string[];
  /** What this group of tools is used to build. */
  purpose?: string;
  /** Slugs of the case studies where this group was put into practice. */
  usedIn?: string[];
}

export interface JourneyStep {
  place: string;
  period: string;
  detail: string;
}

export interface FieldNote {
  project: string;
  projectSlug: string;
  title: string;
  symptom: string;
  cause: string;
  fix: string;
}

export interface OtherWork {
  title: string;
  context: string;
  description: string;
  link?: { label: string; url: string };
}

export interface Involvement {
  role: string;
  organization: string;
  period: string;
  description: string;
}

export const personalInfo = {
  name: "Mohamed Kebe",
  headline: "Data Engineer & AI Engineer",
  affiliation: "Engineering Student at INSEA",
  pitch:
    "Je conçois des architectures de données distribuées et des systèmes d'intelligence artificielle, de l'ingestion des données jusqu'à leur exploitation analytique et leur intégration dans des applications intelligentes.",
  school: "Étudiant ingénieur à l'INSEA",
  seeking: "Recherche de stage PFE",
  seekingDetail: "Data Engineering ou AI Engineering",
  location: "Rabat, Maroc",
  email: "mkebe2022@gmail.com",
  github: "https://github.com/Kebe20222198",
  githubLabel: "github.com/Kebe20222198",
  linkedin: "https://www.linkedin.com/in/mohamed-kebe-1b79b1280/",
  linkedinLabel: "linkedin.com/in/mohamed-kebe",
  portrait: "/images/portrait.jpg",
  cvPage: "/resume",
  cvFile: "/cv/Mohamed-Kebe-CV.pdf",
};

export const manifesto =
  "Je ne me limite pas à utiliser des technologies. Je conçois des architectures et je les construis de bout en bout, de la donnée brute jusqu'au système intelligent qui s'en sert.";

export const journey: JourneyStep[] = [
  { place: "Conakry", period: "2018 – 2021", detail: "Baccalauréat Sciences Mathématiques, major de promotion" },
  { place: "El Jadida", period: "2022 – 2024", detail: "DEUG Mathématiques et Informatique Appliquée" },
  { place: "Rabat", period: "INSEA · HCP 2025", detail: "Cycle ingénieur Data & Software, premier stage en data" },
  { place: "Tunisie, à distance", period: "2026", detail: "Stage AI Engineering chez 3LM Solutions" },
  { place: "Votre équipe ?", period: "Prochaine étape", detail: "Stage PFE en Data Engineering ou AI Engineering" },
];

export const fieldNotes: FieldNote[] = [
  {
    project: "CEG",
    projectSlug: "cognitive-execution-graph",
    title: "Mon propre benchmark m'a donné tort.",
    symptom: "À la première exécution, CEG ne respectait la contrainte de qualité dans aucun scénario : 0,72 livré pour 0,75 exigé.",
    cause: "Le moteur ne vérifiait la qualité minimale qu'après l'exécution, jamais au moment de choisir un modèle.",
    fix: "Seuls les modèles capables d'atteindre le minimum sont désormais comparés. L'évaluation a corrigé le système au lieu de seulement le valider.",
  },
  {
    project: "Lakehouse",
    projectSlug: "nyc-taxi-lakehouse",
    title: "Quelques zones ralentissaient tout le job.",
    symptom: "Sur douze mois de trajets, une poignée de tâches Spark restaient loin derrière les autres.",
    cause: "Un déséquilibre des données : les zones denses comme JFK et Midtown concentraient une grande partie des lignes.",
    fix: "Salage des clés sur ces zones pour répartir la charge, puis Adaptive Query Execution pour gérer le reste.",
  },
  {
    project: "CEG",
    projectSlug: "cognitive-execution-graph",
    title: "Le simulateur ne m'avait pas tout dit.",
    symptom: "Sur de vrais fournisseurs, des appels échouaient alors que tout passait en simulation.",
    cause: "Le pare-feu de Groq refusait l'identifiant par défaut du client HTTP Python, et les modèles Llama prévus avaient été retirés.",
    fix: "Client corrigé, catalogue de modèles mis à jour, et publication des limites : le petit modèle local n'a pas tenu sur le pipeline de calcul.",
  },
];

export const about: string[] = [
  "Je suis élève ingénieur en Data & Software Engineering à l'INSEA, à Rabat. Mon travail porte sur deux types de systèmes qui se complètent : les plateformes qui rendent la donnée fiable à grande échelle, et les applications qui s'appuient sur cette donnée pour raisonner et agir.",
  "Côté données, j'ai construit un Lakehouse complet sur les courses de taxis new-yorkais : ingestion idempotente, traitements PySpark, quarantaine des enregistrements invalides, modèle dimensionnel dbt et orchestration Airflow. Mon stage au Haut-Commissariat au Plan m'a confronté au traitement de bases statistiques nationales.",
  "Côté IA, j'ai conçu pendant mon stage chez 3LM Solutions le Cognitive Execution Graph, une couche déclarative pour exécuter des workflows LLM sous contraintes de coût, de latence et de qualité. J'ai aussi développé des pipelines RAG et des modèles de machine learning appliqués à la finance.",
  "Sur chaque projet, je prends en charge la conception comme l'implémentation : cadrer le problème, arbitrer l'architecture, écrire le code, puis mesurer ce qui fonctionne et documenter ce qui reste limité. Je travaille aussi en équipe : chez Wonkhaï, je coordonne cinq développeurs selon une approche agile.",
];

export const experiences: ExperienceEntry[] = [
  {
    company: "3LM Solutions",
    role: "AI Engineering Internship",
    period: "Juillet – Septembre 2026",
    location: "Télétravail · Tunisie",
    summary: "Conception et développement du Cognitive Execution Graph (CEG).",
    bullets: [
      "Architecture déclarative décrivant des tâches cognitives indépendamment des modèles et des frameworks.",
      "Compilation de graphes de tâches vers des moteurs d'exécution.",
      "Orchestration de workflows avec choix du modèle selon le coût, la latence et la qualité.",
      "Évaluation des LLM sur le coût, la latence, la qualité et la robustesse.",
    ],
    projectSlug: "cognitive-execution-graph",
  },
  {
    company: "Haut-Commissariat au Plan (HCP)",
    role: "Data Engineering & Statistics Internship",
    period: "Juillet – Août 2025",
    location: "Rabat, Maroc",
    summary: "Travaux sur des données statistiques nationales.",
    bullets: [
      "Nettoyage et traitement de grands jeux de données statistiques.",
      "Préparation et transformation des données.",
      "Feature engineering.",
      "Exploitation de données statistiques nationales.",
    ],
  },
];

export const skills: SkillGroup[] = [
  {
    category: "Data Engineering",
    purpose: "des pipelines distribués et rejouables, de la donnée brute au modèle dimensionnel testé.",
    usedIn: ["nyc-taxi-lakehouse"],
    items: ["PySpark", "Apache Spark", "Delta Lake", "Medallion Architecture", "ETL/ELT", "Apache Airflow", "dbt", "Data Quality", "Kimball"],
  },
  {
    category: "AI & Machine Learning",
    purpose: "des modèles prédictifs entraînés et évalués sur des données financières et textuelles.",
    usedIn: ["ml-financial-backtesting"],
    items: ["Python", "Scikit-learn", "XGBoost", "Random Forest", "NLP", "Transformers", "FinBERT", "Time Series"],
  },
  {
    category: "Generative AI",
    purpose: "des workflows d'agents et des pipelines documentaires, mesurés sur le coût, la latence et la qualité.",
    usedIn: ["cognitive-execution-graph", "agentic-rag-mcp"],
    items: ["LLM", "RAG", "Agentic AI", "LangGraph", "MCP", "Qdrant", "Prompt Engineering", "LLM Evaluation"],
  },
  {
    category: "Databases & Storage",
    purpose: "le bon moteur selon l'usage : stockage objet, analytique, relationnel, cache ou recherche vectorielle.",
    usedIn: ["nyc-taxi-lakehouse", "agentic-rag-mcp"],
    items: ["PostgreSQL", "DuckDB", "MinIO", "MongoDB", "Redis", "Qdrant"],
  },
  {
    category: "Software Engineering",
    purpose: "des services conteneurisés, testés et livrés avec intégration continue.",
    usedIn: ["nyc-taxi-lakehouse", "cognitive-execution-graph", "agentic-rag-mcp"],
    items: ["Python", "SQL", "FastAPI", "Docker", "Docker Compose", "Git", "CI/CD", "Linux", "React"],
  },
  {
    category: "Cloud & Déploiement",
    purpose: "des systèmes conçus pour passer d'un poste local au cloud sans réécriture.",
    usedIn: ["nyc-taxi-lakehouse"],
    items: ["Stockage objet compatible S3", "Architectures cloud-native", "Services serverless (Neon, Upstash)", "Vercel", "GitHub Actions"],
  },
  {
    category: "Collaboration & Méthodes",
    purpose: "coordonner une équipe de cinq développeurs, travailler par itérations et rendre les choix techniques compréhensibles par tous.",
    items: ["Méthodes agiles", "Travail en équipe", "Lead technique", "Documentation d'architecture", "Vulgarisation technique"],
  },
];

/** Shown on the resume only: real skills outside the Data & AI positioning. */
export const additionalSkills: SkillGroup[] = [
  { category: "Autres technologies", items: ["C", "Rust", "Elixir", "Node.js", "NATS", "MySQL", "PostGIS", "Streamlit", "Power BI"] },
  { category: "Langues", items: ["Français", "Anglais"] },
];

export const education: EducationEntry = {
  institution: "Institut National de Statistique et d'Économie Appliquée (INSEA)",
  degree: "Formation en Data & Software Engineering",
  location: "Rabat, Maroc",
};

/** Full academic history, shown on the resume. */
export const educationHistory: EducationEntry[] = [
  { ...education, degree: "Cycle d'ingénieur — Data & Software Engineering", period: "En cours" },
  {
    institution: "Université Chouaib Doukkali — Faculté des Sciences",
    degree: "DEUG — Mathématiques et Informatique Appliquée",
    location: "El Jadida, Maroc",
    period: "2022 – 2024",
  },
  {
    institution: "Institution Sainte Marie",
    degree: "Baccalauréat Sciences Mathématiques",
    location: "Conakry, Guinée",
    period: "2018 – 2021",
    note: "Major de promotion, top 40 national.",
  },
];

export const otherWork: OtherWork[] = [
  {
    title: "Wonkhaï — Super-App Platform",
    context: "Co-fondateur & Lead Architect · depuis février 2026",
    description: "Plateforme multiservices sur une architecture microservices orientée événements, en Elixir et Rust, avec PostgreSQL/PostGIS et NATS.",
  },
  {
    title: "Plateforme e-commerce avec assistant IA",
    context: "Mission client · en cours · Laravel",
    description: "Boutique en ligne, back-office complet et assistant IA intégré, avec paiements en ligne et Mobile Money, et intégrations de messagerie.",
  },
  {
    title: "Dio ERP",
    context: "React · Spring Boot · PostgreSQL",
    description: "ERP multi-entités pour l'industrie cosmétique et agroalimentaire : finance, stocks, production, ventes et livraisons.",
    link: { label: "GitHub", url: "https://github.com/Kebe20222198/Dio" },
  },
  {
    title: "L'architecture des Transformers",
    context: "Exposé académique · INSEA · mai 2026",
    description: "Étude du fonctionnement interne des Transformers : self-attention, multi-head attention, encodeur-décodeur.",
    link: { label: "PDF", url: "/Rapports/transformer2.pdf" },
  },
  {
    title: "Expense Tracker",
    context: "Express · Neon · Upstash",
    description: "Suivi des dépenses avec API Express, PostgreSQL serverless et limitation des requêtes.",
    link: { label: "GitHub", url: "https://github.com/Kebe20222198/Expense-Tracker" },
  },
  {
    title: "Grammar Checker",
    context: "C · GTK3 · décembre 2025",
    description: "Simulation, analyse et minimisation d'automates finis (DFA/NFA) avec interface graphique.",
  },
  {
    title: "Reverse Engineering — Watiqa.ma",
    context: "2TUP · UML · avril 2026",
    description: "Rétro-ingénierie d'une plateforme de documents administratifs et spécification de l'architecture cible.",
  },
  {
    title: "Serre agricole connectée",
    context: "IoT · 2026",
    description: "Acquisition de mesures environnementales, traitement embarqué et supervision.",
  },
];

export const involvement: Involvement[] = [
  {
    role: "Trésorier",
    organization: "Association des Stagiaires et Étudiants Guinéens au Maroc (ASEGUIM)",
    period: "2025 – 2026",
    description: "Gestion du budget, des cotisations et du financement des activités de l'association.",
  },
  {
    role: "Membre — Cellule communication",
    organization: "Forum GENI Entreprises",
    period: "2026",
    description: "Organisation du forum de recrutement réunissant des écoles d'ingénieurs marocaines.",
  },
  {
    role: "Membre actif",
    organization: "Club INSEA Innovation Edge",
    period: "2025",
    description: "Organisation d'événements et d'ateliers sur l'innovation technologique et l'entrepreneuriat.",
  },
];
