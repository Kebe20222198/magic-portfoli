import { Github, Linkedin, Mail, Database, Server, Layers, FileText, Globe, Cpu, Box } from "lucide-react";
import {
  siPython, siC, siRust, siElixir,
  siPostgresql, siMysql, siMongodb, siRedis, siDocker,
  siReact, siNodedotjs, siFastapi, siApacheairflow,
  siNumpy, siPandas, siStreamlit,
  siHtml5,
} from "simple-icons";

export interface SocialLink {
  name: string;
  url: string;
  icon: any;
}

export interface PersonalInfo {
  name: string;
  role: string;
  bio: string[];
  photoUrls: [string, string];
  socialLinks: SocialLink[];
  contactGrid: { icon: any; text: string; url?: string }[];
}

export interface NewsItem {
  id: string;
  date: string;
  status?: "upcoming" | "published" | "award";
  description: string;
  link?: string;
}

export interface Project {
  id: string;
  title: string;
  coverImage: string;
  badges: string[];
  description: string;
  links: { label: string; url: string }[];
}

export interface EducationEntry {
  degree: string;
  institution: string;
  location: string;
  year: string;
  gpa?: string;
  description: string;
  advisor?: string;
  logoUrl?: string;
}

export interface ExperienceEntry {
  role: string;
  company: string;
  location: string;
  year: string;
  description: string;
  bullets?: string[];
  logoUrl?: string;
}

export interface TeachingEntry {
  role: string;
  institution: string;
  location: string;
  year: string;
  course?: string;
  courses?: { name: string; semester: string }[];
  description?: string;
  score?: string;
  award?: string;
}

export interface PublicationEntry {
  title: string;
  authors: string;
  conference: string;
  year: string;
  description: string;
  links: { label: string; url: string }[];
  awards?: string[];
}

export interface SkillCategory {
  category: string;
  items: SkillItem[];
}

export interface SkillItem {
  name: string;
  iconPath?: string;
  hex?: string;
  lucideIcon?: any;
  emoji?: string;
}

export interface ResumeData {
  education: EducationEntry[];
  experience: ExperienceEntry[];
  teaching: TeachingEntry[];
  publications: PublicationEntry[];
  skills: SkillCategory[];
}

// ─── Personal Info ───────────────────────────────────────────────────────────
export const personalInfo: PersonalInfo = {
  name: "Mohamed Kebe",
  role: "Software · Data Engineering · Intelligence Artificielle",
  bio: [
    "Élève-ingénieur en Data & IA Engineering à l'INSEA, à la croisée du software, de la data et de l'intelligence artificielle.",
    "Je conçois des applications et des architectures de données, des systèmes distribués aux pipelines analytiques scalables.",
    "Je développe des solutions en NLP et RAG, et j'explore l'IA agentique pour transformer les besoins métier en workflows intelligents.",
    "Co-fondateur & Lead Architect de Wonkhaï, où je construis une plateforme multiservices fondée sur des architectures orientées événements.",
  ],
  photoUrls: [
    "/images/profil.png",
    "/images/profil.png",
  ],
  socialLinks: [
    { name: "GitHub", url: "https://github.com/Kebe20222198", icon: Github },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/mohamed-kebe-1b79b1280/", icon: Linkedin },
    { name: "Email", url: "mailto:mkebe2022@gmail.com", icon: Mail },
  ],
  contactGrid: [
    { icon: Mail, text: "mkebe2022@gmail.com", url: "mailto:mkebe2022@gmail.com" },
    { icon: Globe, text: "Rabat, Maroc" },
    { icon: FileText, text: "CV / Resume", url: "/resume" },
    { icon: Github, text: "github.com/Kebe20222198", url: "https://github.com/Kebe20222198" },
    { icon: Linkedin, text: "linkedin.com/in/mohamed-kebe", url: "https://www.linkedin.com/in/mohamed-kebe-1b79b1280/" },
  ],
};

// ─── News ─────────────────────────────────────────────────────────────────────
export const news: NewsItem[] = [
  {
    id: "news-nyc-taxi-platform",
    date: "2026",
    status: "published",
    description: "Conception d'une plateforme Lakehouse pour analyser jusqu'à 40 millions de courses Yellow Taxi par an : pipeline Spark orchestré par Airflow, qualité des données, Delta Lake et modèles analytiques dbt.",
    link: "https://github.com/Kebe20222198/taxi-data-platform",
  },
  {
    id: "news-ceg",
    date: "2026",
    status: "published",
    description: "Conception de CEG, un framework agnostique qui transforme une déclaration d'objectif, de contraintes et de sous-tâches en graphe agentique. Le Runtime Decision Engine choisit un modèle par étape ; un même plan fonctionne sur LangGraph, CrewAI ou Python. Le CLI, l'API FastAPI et le Studio React permettent de valider, visualiser et tracer les workflows. Les démos actuelles utilisent des exécuteurs simulés, avec un point d'extension prévu pour les fournisseurs LLM.",
    link: "https://github.com/Kebe20222198/CEG",
  },
  {
    id: "news-transformer",
    date: "MAI 2026",
    status: "published",
    description: "Présentation académique sur l'architecture interne des modèles Transformers (Self-Attention, Multi-Head Attention et structures Encodeur-Décodeur).",
    link: "/Rapports/transformer2.pdf",
  },
  {
    id: "1",
    date: "MAI 2026",
    status: "published",
    description: "Développement d'une plateforme de backtesting quantitatif combinant des modèles de prévision, du machine learning et l'analyse NLP du sentiment des actualités financières.",
  },
  {
    id: "2",
    date: "MAI 2026",
    status: "published",
    description: "Développement d'un assistant RAG qui recherche dans les documents de l'utilisateur avec retrieval hybride, reranking et génération par LLM. Chaque réponse est accompagnée de ses sources pour rester vérifiable.",
    link: "https://github.com/Kebe20222198/assistant-chatbot-support-client",
  },
  {
    id: "3",
    date: "AVRIL 2026",
    status: "published",
    description: "Conception d'un ERP multi-entités pour les secteurs cosmétique et agroalimentaire : finance, actifs, stocks, production, ventes et livraisons, avec traçabilité stricte et séparation des responsabilités.",
    link: "https://github.com/Kebe20222198/Dio",
  },
  {
    id: "4",
    date: "FÉV 2026",
    status: "published",
    description: "Co-fondation de Wonkhaï — super-app (mobilité, marketplace, fintech) pilotée par une architecture de microservices événementiels.",
  },
  {
    id: "5",
    date: "2026",
    description: "Représentation et logistique au Forum GENI Entreprises, le principal salon de recrutement d'ingénieurs au Maroc.",
  },
  {
    id: "6",
    date: "2026",
    description: "Conception d'une serre agricole intelligente IoT avec supervision en temps réel et automatisation des capteurs environnementaux.",
  },
];

// ─── Projects ─────────────────────────────────────────────────────────────────
export const projects: Project[] = [
  {
    id: "proj-nyc-taxi-platform",
    title: "NYC Yellow Taxi — Data Lakehouse",
    coverImage: "/images/projects/nyc-taxi-lakehouse.png",
    badges: ["Data Engineering", "Spark · Airflow · dbt", "Delta Lake · MinIO"],
    description:
      "Plateforme analytique de bout en bout pour les données Yellow Taxi de New York, conçue pour un volume annuel de 35 à 40 millions de courses. Pipeline idempotent en architecture médaillon, contrôles qualité avec quarantaine, modélisation dimensionnelle et suivi des exécutions.",
    links: [{ label: "GitHub", url: "https://github.com/Kebe20222198/taxi-data-platform" }],
  },
  {
    id: "proj-ceg",
    title: "CEG — Cognitive Execution Graph",
    coverImage: "/images/projects/cognitive-execution-graph.png",
    badges: ["Agentic AI Framework", "LangGraph · CrewAI · Python", "FastAPI · React Studio"],
    description:
      "CEG est un framework agnostique pour déclarer l'objectif métier, les sous-tâches, les outils autorisés et les contraintes d'un workflow agentique. Son planificateur compile cette déclaration en graphe ; son Runtime Decision Engine choisit les modèles par étape selon coût, latence et qualité. Le même plan s'exécute avec LangGraph, CrewAI ou Python. CLI, API FastAPI et Studio React fournissent validation, visualisation du graphe et traces. Le prototype utilise aujourd'hui des exécuteurs déterministes simulés, avec un point d'extension prévu pour les fournisseurs LLM.",
    links: [{ label: "GitHub", url: "https://github.com/Kebe20222198/CEG" }],
  },
  {
    id: "proj-1",
    title: "Wonkhaï — Super-App Platform",
    coverImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop",
    badges: ["Fév 2026 – Présent", "Co-Founder & Lead Architect"],
    description:
      "Plateforme multiservices (mobilité, commerce de détail, fintech) conçue sur une architecture microservices orientée événements (EDA) ultra-performante en Elixir et Rust. Modélisation de bases de données géospatiales et distribuées PostgreSQL/PostGIS et orchestration des flux asynchrones via NATS.",
    links: [{ label: "GitHub", url: "https://github.com/Kebe20222198" }],
  },
  {
    id: "proj-2",
    title: "Assistant documentaire RAG — Support Client",
    coverImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
    badges: ["RAG hybride", "Reranking", "Réponses sourcées"],
    description:
      "Assistant de support qui répond à partir des documents fournis : récupération hybride, reranking et génération LLM avec sources traçables pour vérifier chaque réponse.",
    links: [{ label: "GitHub", url: "https://github.com/Kebe20222198/assistant-chatbot-support-client" }],
  },
  {
    id: "proj-3",
    title: "Plateforme de Backtesting & Trading",
    coverImage: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop",
    badges: ["Mai 2026", "ML & NLP"],
    description:
      "Environnement de simulation quantitative et d'évaluation de portefeuilles financiers. Intégration de modèles de séries temporelles ARIMA/SARIMA pour la modélisation prédictive et d'architectures Transformers NLP pour l'évaluation en temps réel du sentiment des flux d'actualités financières.",
    links: [],
  },
  {
    id: "proj-4",
    title: "Expense Tracker — Suivi des dépenses",
    coverImage: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    badges: ["Full-stack", "Express · Neon", "Rate limiting · Upstash"],
    description:
      "Application de suivi des dépenses avec API Express, stockage PostgreSQL serverless via Neon et limitation des requêtes avec Upstash Redis pour protéger les endpoints.",
    links: [{ label: "GitHub", url: "https://github.com/Kebe20222198/Expense-Tracker" }],
  },
  {
    id: "proj-5",
    title: "Grammar Checker — Automates Finis",
    coverImage: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=400&fit=crop",
    badges: ["Déc 2025", "C & GTK3"],
    description:
      "Moteur de validation syntaxique développé en C. Modélisation mathématique et implémentation de graphes sous forme de listes d'adjacence pour simuler, parser et minimiser des automates finis déterministes et non déterministes (DFA/NFA) avec interface graphique GTK3.",
    links: [],
  },
  {
    id: "proj-6",
    title: "Dio ERP — Industrie & Production",
    coverImage: "https://images.unsplash.com/photo-1567789884554-0b844b597180?w=800&h=400&fit=crop",
    badges: ["React · Spring Boot", "PostgreSQL", "ERP multi-entités"],
    description:
      "ERP modulaire destiné aux activités cosmétiques et agroalimentaires, couvrant finance, actifs, stocks, production, ventes, livraisons et tâches avec séparation des responsabilités et traçabilité multi-entités.",
    links: [{ label: "GitHub", url: "https://github.com/Kebe20222198/Dio" }],
  },
  {
    id: "proj-7",
    title: "Reverse Engineering — Watiqa.ma",
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop",
    badges: ["Avril 2026", "Analyse & UML"],
    description:
      "Rétro-ingénierie et modélisation logicielle d'une plateforme gouvernementale de documents administratifs. Application du processus unifié 2TUP (Two-Track Unified Process) et spécification rigoureuse de l'architecture cible via diagrammes UML.",
    links: [],
  },
  {
    id: "proj-8",
    title: "Serre Agricole Connectée (IoT)",
    coverImage: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=400&fit=crop",
    badges: ["2026", "Projet IoT"],
    description:
      "Système embarqué IoT de monitoring de serres agricoles. Acquisition de métriques environnementales multiples, traitement embarqué temps réel sur microcontrôleur et dashboard de supervision réactif pour l'aide à la décision.",
    links: [],
  },
];

// ─── Resume Data ──────────────────────────────────────────────────────────────
export const resumeData: ResumeData = {
  // ── Formations ──
  education: [
    {
      degree: "Cycle d'Ingénieur — Data & IA Engineering",
      institution: "Institut National de Statistique et d'Économie Appliquée (INSEA)",
      location: "Rabat, Maroc",
      year: "En cours",
      description: "Bases de données, Big Data, machine learning et architectures distribuées.",
      logoUrl: "/images/insea-logo.png",
    },
    {
      degree: "DEUG — Mathématiques et Informatique Appliquée",
      institution: "Université Chouaib Doukkali — Faculté des Sciences",
      location: "El Jadida, Maroc",
      year: "2022 – 2024",
      description: "Algorithmique, structures de données complexes et mathématiques appliquées.",
      logoUrl: "/images/chouaib-dukkali-logo.png",
    },
    {
      degree: "Baccalauréat Sciences Mathématiques",
      institution: "Institution Sainte Marie",
      location: "Conakry, Guinée",
      year: "2018 – 2021",
      description: "Major de promotion (1er) et classé dans le top 40 national.",
      logoUrl: "/images/sainte-marie-logo.png",
    },
  ],

  // ── Projets & Expériences ──
  experience: [
    {
      role: "Stagiaire — Découverte Professionnelle",
      company: "Haut Commissariat au Plan (HCP)",
      location: "Rabat, Maroc",
      year: "Juillet 2025",
      description:
        "Stage d'immersion professionnelle axé sur la découverte des outils statistiques et l'initiation aux processus de gestion, d'analyse et de traitement de données.",
      logoUrl: "/images/hcp-logo.png",
    },
    {
      role: "Data Engineer — NYC Yellow Taxi Lakehouse",
      company: "Projet personnel",
      location: "Rabat, Maroc",
      year: "2026",
      description:
        "Conception d'un pipeline analytique pour les données NYC Yellow Taxi, de l'ingestion jusqu'aux marts décisionnels.",
      bullets: [
        "Orchestration des traitements Spark avec Airflow et stockage en architecture médaillon sur MinIO et Delta Lake.",
        "Ajout de contrôles de qualité, d'une zone de quarantaine et de transformations dbt pour le modèle analytique.",
      ],
    },
    {
      role: "Concepteur — Cognitive Execution Graph (CEG)",
      company: "Projet personnel",
      location: "Rabat, Maroc",
      year: "2026",
      description:
        "Création d'un framework déclaratif et agnostique pour planifier et exécuter des workflows agentiques sous contraintes.",
      bullets: [
        "Planification d'objectifs et de sous-tâches sous forme de graphes, avec choix de modèle selon coût, latence et qualité.",
        "Support de backends LangGraph, CrewAI et Python, avec CLI, API FastAPI et Studio React pour visualiser et tracer les exécutions.",
        "Les démonstrations actuelles s'appuient sur des exécuteurs simulés ; les fournisseurs LLM se branchent via l'interface Executor.",
      ],
    },
    {
      role: "Co-Founder & Lead Architect",
      company: "Wonkhaï — Super-App Platform",
      location: "Rabat, Maroc",
      year: "Fév 2026 – Présent",
      description:
        "Co-fondation et direction de l'ingénierie logicielle et système d'une super-app intégrant de la mobilité urbaine, du commerce en ligne et des services de paiement.",
      bullets: [
        "Conception de l'architecture microservices orientée événements (EDA) hautement concurrente en Elixir et Rust.",
        "Modélisation et optimisation des schémas de bases de données relationnelles et spatiales (PostgreSQL + PostGIS) sous haute charge transactionnelle.",
        "Orchestration des flux asynchrones inter-services via le bus de messagerie NATS et gestion d'une équipe de 5 développeurs.",
      ],
    },
    {
      role: "Développeur — Assistant RAG",
      company: "Projet Personnel",
      location: "Remote",
      year: "Mai 2026",
      description:
        "Développement d'un assistant documentaire RAG combinant recherche hybride, reranking et génération de réponses avec sources vérifiables.",
      bullets: [
        "Mise en place d'une récupération hybride des passages documentaires et d'une étape de reranking avant génération.",
        "Production de réponses sourcées afin de permettre à l'utilisateur de vérifier les informations récupérées.",
      ],
    },
    {
      role: "Développeur — Plateforme de Backtesting & Trading",
      company: "Projet Personnel",
      location: "Remote",
      year: "Mai 2026",
      description:
        "Développement d'un système d'analyse prédictive et de simulation pour l'évaluation quantitative de portefeuilles financiers.",
      bullets: [
        "Implémentation de modèles de séries temporelles ARIMA/SARIMA pour la prévision de tendances de marché.",
        "Extraction de signaux sémantiques par classification de sentiments de flux d'actualités financières via Transformers NLP.",
        "Conception d'une console interactive réactive avec Streamlit pour l'exploration de backtests et de scénarios financiers.",
      ],
    },
    {
      role: "Lead Developer",
      company: "Dio ERP — Industrie cosmétique & agroalimentaire",
      location: "INSEA, Rabat",
      year: "Avril 2026",
      description:
        "Conception d'un ERP multi-entités couvrant les opérations financières, les stocks, la production, les ventes et les livraisons.",
      bullets: [
        "Structuration des modules métier avec traçabilité des opérations et séparation des responsabilités.",
      ],
    },
  ],

  // ── Vie Associative ──
  teaching: [
    {
      role: "Trésorier",
      institution: "Association des Stagiaires et Étudiants Guinéens au Maroc (ASEGUIM)",
      location: "Rabat, Maroc — Ambassade de la République de Guinée",
      year: "2025 – 2026",
      description:
        "Pilotage financier et budgétaire de l'association. Gestion rigoureuse de la trésorerie (suivi des cotisations, subventions institutionnelles) pour le financement d'activités culturelles et académiques pour plus de 1 200 étudiants.",
    },
    {
      role: "Membre — Cellule Communication",
      institution: "Forum GENI Entreprises",
      location: "Maroc",
      year: "2026",
      description:
        "Organisation médiatique et logistique du plus grand forum de recrutement d'ingénieurs au Maroc, coordonnant la synergie entre de grandes écoles (INSEA, INPT, ENSIAS, EMI).",
    },
    {
      role: "Membre Actif",
      institution: "Club INSEA Innovation Edge",
      location: "INSEA, Rabat",
      year: "2025",
      description:
        "Animation de l'écosystème entrepreneurial étudiant par l'organisation de hackathons et d'ateliers techniques axés sur les technologies émergentes.",
    },
  ],

  // ── Publications ──
  publications: [
    {
      title: "Exposé Académique — L'Architecture des Transformers",
      authors: "Mohamed Kebe",
      conference: "INSEA Rabat",
      year: "Mai 2026",
      description:
        "Étude et présentation technique sur le fonctionnement interne des architectures de Transformers. Analyse détaillée des mécanismes d'attention, de l'auto-attention (Self-Attention) et des étapes d'encodage/décodage.",
      links: [{ label: "Consulter le PDF", url: "/Rapports/transformer2.pdf" }],
    },
  ],

  // ── Compétences Techniques ──
  skills: [
    {
      category: "Langages",
      items: [
        { name: "Python", iconPath: siPython.path, hex: siPython.hex },
        { name: "SQL", lucideIcon: Database },
        { name: "C", iconPath: siC.path, hex: siC.hex },
        { name: "Rust", iconPath: siRust.path, hex: siRust.hex },
        { name: "Elixir", iconPath: siElixir.path, hex: siElixir.hex },
        { name: "Node.js", iconPath: siNodedotjs.path, hex: siNodedotjs.hex },
      ],
    },
    {
      category: "Data & ML",
      items: [
        { name: "Pandas", iconPath: siPandas.path, hex: siPandas.hex },
        { name: "NumPy", iconPath: siNumpy.path, hex: siNumpy.hex },
        { name: "ML / NLP", lucideIcon: Cpu },
        { name: "ARIMA / SARIMA", lucideIcon: Layers },
        { name: "Streamlit", iconPath: siStreamlit.path, hex: siStreamlit.hex },
        { name: "Apache Airflow", iconPath: siApacheairflow.path, hex: siApacheairflow.hex },
        { name: "Power BI", lucideIcon: Layers },
      ],
    },
    {
      category: "Bases de données",
      items: [
        { name: "PostgreSQL", iconPath: siPostgresql.path, hex: siPostgresql.hex },
        { name: "MySQL", iconPath: siMysql.path, hex: siMysql.hex },
        { name: "MongoDB", iconPath: siMongodb.path, hex: siMongodb.hex },
        { name: "Redis", iconPath: siRedis.path, hex: siRedis.hex },
        { name: "Qdrant (Vector DB)", lucideIcon: Database },
        { name: "PostGIS", lucideIcon: Globe },
      ],
    },
    {
      category: "Backend & DevOps",
      items: [
        { name: "FastAPI", iconPath: siFastapi.path, hex: siFastapi.hex },
        { name: "Docker", iconPath: siDocker.path, hex: siDocker.hex },
        { name: "Microservices", lucideIcon: Server },
        { name: "NATS", lucideIcon: Box },
        { name: "React Native", iconPath: siReact.path, hex: siReact.hex },
        { name: "HTML / CSS", iconPath: siHtml5.path, hex: siHtml5.hex },
      ],
    },
    {
      category: "Langues",
      items: [
        { name: "Français", emoji: "🇫🇷" },
        { name: "Anglais", emoji: "🇬🇧" },
      ],
    },
  ],
};
