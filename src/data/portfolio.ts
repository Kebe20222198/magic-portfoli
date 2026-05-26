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
  role: "Élève-Ingénieur | Data Engineering & Systèmes Distribués",
  bio: [
    "Élève-Ingénieur en Data & IA Engineering à l'INSEA.",
    "Concepteur d'architectures de données et de pipelines scalables.",
    "Passionné par les systèmes distribués et le traitement de données temps réel.",
    "Co-fondateur & Lead Architect de la plateforme Wonkhaï.",
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
    { icon: FileText, text: "CV / Resume", url: "#" },
    { icon: Github, text: "github.com/Kebe20222198", url: "https://github.com/Kebe20222198" },
    { icon: Linkedin, text: "linkedin.com/in/mohamed-kebe", url: "https://www.linkedin.com/in/mohamed-kebe-1b79b1280/" },
  ],
};

// ─── News ─────────────────────────────────────────────────────────────────────
export const news: NewsItem[] = [
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
    description: "Lancement d'une plateforme de backtesting financier quantitatif combinant prévisions ARIMA/SARIMA et sentiment de marché (NLP via Transformers).",
    link: "#",
  },
  {
    id: "2",
    date: "MAI 2026",
    status: "published",
    description: "Déploiement d'un assistant RAG de niveau production optimisé avec Qdrant Vector DB et Cohere Reranker.",
    link: "#",
  },
  {
    id: "3",
    date: "AVRIL 2026",
    status: "published",
    description: "Architecture et livraison d'un système ERP modulaire de gestion de cabinet médical conteneurisé (Docker, PHP, MySQL).",
    link: "#",
  },
  {
    id: "4",
    date: "FÉV 2026",
    status: "upcoming",
    description: "Co-fondation de Wonkhaï — super-app (mobilité, marketplace, fintech) pilotée par une architecture de microservices événementiels.",
    link: "#",
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
    title: "Chatbot RAG — Support Client",
    coverImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
    badges: ["Mai 2026", "Production-ready"],
    description:
      "Assistant conversationnel de niveau production basé sur une architecture Retrieval-Augmented Generation (RAG). Implémentation du pipeline de traitement textuel (chunking, vectorisation et indexation sous Qdrant Vector DB) et optimisation des requêtes via FastAPI et Cohere Reranker.",
    links: [{ label: "GitHub", url: "https://github.com/Kebe20222198/assistant-chatbot-support-client" }],
  },
  {
    id: "proj-3",
    title: "Plateforme de Backtesting & Trading",
    coverImage: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop",
    badges: ["Mai 2026", "ML & NLP"],
    description:
      "Environnement de simulation quantitative et d'évaluation de portefeuilles financiers. Intégration de modèles de séries temporelles ARIMA/SARIMA pour la modélisation prédictive et d'architectures Transformers NLP pour l'évaluation en temps réel du sentiment des flux d'actualités financières.",
    links: [{ label: "GitHub", url: "#" }],
  },
  {
    id: "proj-4",
    title: "Expense Tracker — Application Full-Stack",
    coverImage: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    badges: ["Jan 2026", "Mobile & API"],
    description:
      "Application mobile de gestion financière personnelle. Développement du backend Node.js/Express sécurisé par Clerk, avec implémentation de requêtes analytiques complexes sous PostgreSQL pour l'agrégation et la visualisation des flux budgétaires.",
    links: [{ label: "GitHub", url: "#" }],
  },
  {
    id: "proj-5",
    title: "Grammar Checker — Automates Finis",
    coverImage: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=400&fit=crop",
    badges: ["Déc 2025", "C & GTK3"],
    description:
      "Moteur de validation syntaxique développé en C. Modélisation mathématique et implémentation de graphes sous forme de listes d'adjacence pour simuler, parser et minimiser des automates finis déterministes et non déterministes (DFA/NFA) avec interface graphique GTK3.",
    links: [{ label: "GitHub", url: "#" }],
  },
  {
    id: "proj-6",
    title: "Système de Gestion de Cabinet Médical",
    coverImage: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=400&fit=crop",
    badges: ["Avril 2026", "Lead Developer"],
    description:
      "Système d'information médical structuré en monolithe modulaire. Automatisation complète du suivi clinique, du dossier médical et du cycle de prise de rendez-vous sous MySQL, avec conteneurisation et déploiement local via Docker Compose.",
    links: [{ label: "GitHub", url: "#" }],
  },
  {
    id: "proj-7",
    title: "Reverse Engineering — Watiqa.ma",
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop",
    badges: ["Avril 2026", "Analyse & UML"],
    description:
      "Rétro-ingénierie et modélisation logicielle d'une plateforme gouvernementale de documents administratifs. Application du processus unifié 2TUP (Two-Track Unified Process) et spécification rigoureuse de l'architecture cible via diagrammes UML.",
    links: [{ label: "GitHub", url: "#" }],
  },
  {
    id: "proj-8",
    title: "Serre Agricole Connectée (IoT)",
    coverImage: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=400&fit=crop",
    badges: ["2026", "Projet IoT"],
    description:
      "Système embarqué IoT de monitoring de serres agricoles. Acquisition de métriques environnementales multiples, traitement embarqué temps réel sur microcontrôleur et dashboard de supervision réactif pour l'aide à la décision.",
    links: [{ label: "GitHub", url: "#" }],
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
      role: "Développeur — Chatbot RAG",
      company: "Projet Personnel",
      location: "Remote",
      year: "Mai 2026",
      description:
        "Conception et mise en production d'une infrastructure d'IA générative contextuelle RAG (Retrieval-Augmented Generation).",
      bullets: [
        "Développement de pipelines ETL textuels complexes : segmentation, vectorisation d'embeddings et indexation sous Qdrant Vector DB.",
        "Optimisation de la recherche sémantique hybride par l'intégration d'un modèle de classement (Cohere Reranker).",
        "Exposition de services asynchrones via FastAPI avec inférence à très faible latence sur l'infrastructure Groq.",
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
      company: "Système de Gestion de Cabinet Médical",
      location: "INSEA, Rabat",
      year: "Avril 2026",
      description:
        "Conception et déploiement d'un progiciel modulaire de gestion clinique et de dossiers patients.",
      bullets: [
        "Modélisation du schéma conceptuel global et écriture de procédures stockées optimisées sous MySQL.",
        "Conteneurisation et automatisation de l'environnement de déploiement multi-conteneurs via Docker Compose.",
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
        { name: "Arabe", emoji: "🇲🇦" },
      ],
    },
  ],
};
