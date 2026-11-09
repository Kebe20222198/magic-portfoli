/** Case studies. Every figure must be traceable to a run or a public repository. */

export type Tone = "default" | "accent" | "warn";

export interface FlowNode {
  title: string;
  detail?: string;
  tone?: Tone;
}

export interface FlowStage {
  label: string;
  nodes: FlowNode[];
  /** Secondary path leaving the stage (rejection, fallback…). */
  branch?: FlowNode & { label: string };
}

export interface FlowDiagramData {
  title: string;
  description: string;
  control?: { label: string; title: string; detail: string };
  stages: FlowStage[];
  footer?: { label: string; title: string; detail: string };
}

export interface GraphNode {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  title: string;
  lines?: string[];
  tone?: Tone;
}

export interface GraphEdge {
  from: string;
  to: string;
  label?: string;
  dashed?: boolean;
}

export interface GraphDiagramData {
  title: string;
  description: string;
  width: number;
  height: number;
  nodes: GraphNode[];
  edges: GraphEdge[];
}

export interface Decision {
  title: string;
  body: string;
}

export interface ResultRow {
  metric: string;
  value: string;
  context: string;
}

export interface Project {
  slug: string;
  title: string;
  domain: string;
  period: string;
  summary: string;
  highlights: string[];
  stack: string[];
  problem: string[];
  objectives: string[];
  architecture: string[];
  diagram: FlowDiagramData;
  graphs?: GraphDiagramData[];
  features: string[];
  decisions: Decision[];
  results: { rows: ResultRow[]; note: string };
  demo?: { video: string; poster: string; caption: string };
  repository: { url?: string; note?: string };
}

export const projects: Project[] = [
  {
    slug: "nyc-taxi-lakehouse",
    title: "Modern Data Lakehouse — NYC Yellow Taxi",
    domain: "Data Engineering",
    period: "2026",
    summary:
      "Un Lakehouse Medallion de bout en bout, de l'ingestion des fichiers publics à un modèle dimensionnel prêt pour l'analyse, conçu pour être rejoué sans effet de bord.",
    highlights: [
      "~3,5 M de trajets par mois traités avec PySpark",
      "0,65 % d'enregistrements rejetés et isolés en quarantaine",
      "70 tests automatisés, 100 % de réussite",
    ],
    stack: ["PySpark", "Delta Lake", "MinIO", "Apache Airflow 3", "dbt", "DuckDB", "PostgreSQL"],
    problem: [
      "Les courses de taxis jaunes de New York sont publiées chaque mois en fichiers Parquet : environ 3,5 millions de trajets par mois, avec des durées négatives, des montants nuls, des zones inconnues et des doublons.",
      "Charger ces fichiers directement dans des tableaux de bord propage ces erreurs jusqu'aux décisions. Un simple script ne suffit pas non plus : une relance après échec ne doit ni dupliquer des lignes ni corrompre l'historique.",
    ],
    objectives: [
      "Séparer strictement données brutes, données fiabilisées et données analytiques.",
      "Rendre chaque mois rejouable avec un résultat identique.",
      "Isoler les enregistrements invalides sans perdre leur motif de rejet.",
      "Fournir un modèle dimensionnel testé et directement exploitable.",
      "Reproduire localement, sur une machine de 16 Go, une architecture portable vers le cloud.",
    ],
    architecture: [
      "Un ingesteur Python dépose chaque fichier mensuel dans la couche Bronze sur MinIO, après comparaison de son empreinte SHA-256. Les jobs PySpark appliquent ensuite cinq règles de qualité : les lignes valides sont dédupliquées et écrites en Silver au format Delta Lake, les autres partent en quarantaine avec leur motif de rejet.",
      "La couche Gold pré-agrège les indicateurs par zone et par heure. dbt construit au-dessus un schéma en étoile Kimball, exécuté sur DuckDB. Airflow 3 orchestre l'ensemble mois par mois, et PostgreSQL conserve les métriques de chaque exécution.",
    ],
    diagram: {
      title: "Flux de données du Lakehouse",
      description:
        "Les fichiers publics traversent les couches Bronze, Silver et Gold sur MinIO, les enregistrements invalides sont déviés en quarantaine, puis dbt construit le modèle analytique. Airflow orchestre chaque étape et PostgreSQL conserve les métriques d'exécution.",
      control: {
        label: "Orchestration",
        title: "Apache Airflow 3 — DAG mensuel",
        detail: "ingest → bronze_to_silver → quality_checks → silver_to_gold → dbt_run → dbt_test → notify",
      },
      stages: [
        {
          label: "Ingestion",
          nodes: [
            { title: "NYC TLC", detail: "Parquet mensuels, référentiels" },
            { title: "Ingesteur Python", detail: "Empreinte SHA-256" },
          ],
        },
        {
          label: "Bronze",
          nodes: [{ title: "MinIO · s3a://bronze", detail: "Données brutes immuables" }],
        },
        {
          label: "Silver",
          nodes: [
            { title: "PySpark", detail: "5 règles qualité, déduplication" },
            { title: "Delta Lake", detail: "Transactions ACID", tone: "accent" },
          ],
          branch: { label: "Rejets", title: "Quarantaine (DLQ)", detail: "Lignes + reject_reason", tone: "warn" },
        },
        {
          label: "Gold",
          nodes: [{ title: "Delta Lake", detail: "Agrégats zone × heure", tone: "accent" }],
        },
        {
          label: "Modélisation",
          nodes: [{ title: "dbt + DuckDB", detail: "Schéma en étoile Kimball, tests" }],
        },
        {
          label: "Exploitation",
          nodes: [{ title: "Marts analytiques", detail: "Streamlit, Metabase" }],
        },
      ],
      footer: {
        label: "Observabilité",
        title: "PostgreSQL · pipeline_runs",
        detail: "Durée, volumes traités, taux de rejet et statut de chaque exécution",
      },
    },
    graphs: [
      {
        title: "Modèle dimensionnel Kimball",
        description:
          "La table de faits fct_trips, au grain d'un trajet, est reliée aux dimensions dim_date, dim_zone et dim_payment_type. La dimension des zones est utilisée pour le départ et l'arrivée.",
        width: 720,
        height: 300,
        nodes: [
          { id: "fct", x: 250, y: 60, w: 180, h: 180, title: "fct_trips", lines: ["grain : 1 trajet", "date, zones, paiement", "montants, pourboire", "distance, durée"], tone: "accent" },
          { id: "date", x: 10, y: 30, w: 170, h: 84, title: "dim_date", lines: ["grain : 1 jour", "calendrier, fériés"] },
          { id: "pay", x: 10, y: 186, w: 170, h: 84, title: "dim_payment_type", lines: ["grain : 1 mode", "carte, espèces…"] },
          { id: "zone", x: 540, y: 108, w: 170, h: 84, title: "dim_zone", lines: ["grain : 1 zone TLC", "borough, aéroport"] },
        ],
        edges: [
          { from: "date", to: "fct", label: "date" },
          { from: "pay", to: "fct", label: "paiement" },
          { from: "zone", to: "fct", label: "départ, arrivée" },
        ],
      },
    ],
    features: [
      "Architecture Medallion Bronze, Silver, Gold sur stockage objet compatible S3.",
      "Cinq règles de qualité : durée, distance, montant, cohérence du mois et validité des zones.",
      "Quarantaine (DLQ) traçable, avec arrêt automatique du pipeline au-delà de 20 % de rejet.",
      "Déduplication par hash SHA-256 sur les colonnes fonctionnelles.",
      "Modélisation dimensionnelle Kimball avec dbt et DuckDB.",
      "Orchestration mensuelle et backfill avec Airflow 3.",
      "Métriques d'exécution centralisées dans PostgreSQL.",
    ],
    decisions: [
      {
        title: "Idempotence à chaque couche",
        body: "Le contrôle SHA-256 évite de recharger un fichier identique, replaceWhere remplace atomiquement la seule partition du mois dans Delta Lake, et dbt applique une stratégie delete+insert. Relancer un mois produit le même état, sans doublon.",
      },
      {
        title: "Delta Lake plutôt que Parquet seul",
        body: "Sans transaction, un job interrompu laisse une partition partiellement écrite sur le stockage objet. Delta Lake apporte l'atomicité et une intégration directe avec Spark 3.5, sans catalogue externe à exploiter en local.",
      },
      {
        title: "MinIO plutôt qu'un disque local",
        body: "Le code utilise dès le départ l'API S3 et le connecteur S3A : le développement local reste gratuit, tout en conservant les contraintes d'un vrai stockage objet.",
      },
      {
        title: "Quarantaine plutôt que suppression",
        body: "Les lignes rejetées sont conservées avec leur motif, ce qui permet d'analyser la dérive de qualité. Un seuil de 20 % arrête le pipeline quand le problème vient de la source et non de quelques lignes isolées.",
      },
      {
        title: "DuckDB et PostgreSQL, chacun à sa place",
        body: "DuckDB exécute les transformations analytiques sans serveur, y compris en intégration continue. PostgreSQL gère ce qui exige des connexions concurrentes persistantes, comme le suivi des exécutions.",
      },
      {
        title: "Tenir sur 16 Go de RAM",
        body: "Côté plateforme, des limites mémoire par conteneur et max_active_runs=1. Côté Spark, un schéma explicite, l'élagage de partitions, un broadcast join sur les zones et Adaptive Query Execution.",
      },
    ],
    results: {
      rows: [
        { metric: "Volume traité", value: "~3,5 M", context: "trajets par mois" },
        { metric: "Taux de rejet", value: "0,65 %", context: "enregistrements invalides isolés, pour un seuil d'arrêt de 20 %" },
        { metric: "Tests automatisés", value: "70", context: "100 % de réussite" },
      ],
      note: "Mesures issues du pipeline batch exécuté localement sur les données publiques NYC TLC.",
    },
    repository: { url: "https://github.com/Kebe20222198/taxi-data-platform" },
  },
  {
    slug: "cognitive-execution-graph",
    title: "Cognitive Execution Graph (CEG)",
    domain: "AI Engineering",
    period: "Juillet – Septembre 2026",
    summary:
      "Une couche déclarative, à la manière de SQL pour les bases de données : on décrit ce qu'un workflow d'agents doit accomplir et sous quelles contraintes, le moteur décide comment l'exécuter.",
    highlights: [
      "Un même plan exécuté sur LangGraph, CrewAI et Python",
      "Choix du modèle par étape selon coût, latence et qualité",
      "Évalué en simulation puis sur Gemini, Groq et Ollama",
    ],
    stack: ["Python", "LangGraph", "LLM", "DAG", "FastAPI", "React"],
    problem: [
      "Les frameworks d'agents obligent à décrire dans le même code ce qu'un workflow doit accomplir et comment l'exécuter : framework, modèle de chaque étape, gestion des erreurs.",
      "Changer de framework ou de fournisseur revient alors à réécrire le workflow, tandis que les contraintes de budget, de délai et de qualité ne sont ni déclarées ni garanties.",
    ],
    objectives: [
      "Décrire une tâche cognitive indépendamment des modèles, des frameworks et de l'infrastructure.",
      "Compiler un graphe abstrait vers plusieurs moteurs d'exécution.",
      "Choisir le modèle de chaque étape sous contraintes de coût, de latence et de qualité.",
      "Refuser avant exécution un plan dont les contraintes sont impossibles à tenir.",
      "Rendre chaque décision traçable et chaque expérience reproductible.",
    ],
    architecture: [
      "L'auteur déclare une CognitiveTask : objectif, sous-tâches, dépendances, outils autorisés et contraintes. Le planificateur la valide et produit un CEGGraph, un DAG indépendant de tout moteur.",
      "Le Runtime Decision Engine choisit ensuite un modèle pour chaque étape. Le graphe est compilé vers LangGraph, CrewAI ou un moteur Python sans framework, et les nœuds sont exécutés par des exécuteurs interchangeables : simulés par défaut, ou de vrais modèles chez Gemini, Groq et Ollama. Le CLI, l'API FastAPI et le Studio React exposent plans, traces et décisions.",
    ],
    diagram: {
      title: "De la déclaration à l'exécution",
      description:
        "Une tâche déclarée est planifiée en graphe, chaque étape reçoit un modèle sous contraintes, puis le graphe est compilé vers un moteur interchangeable. Un plan impossible est refusé et les échecs d'exécution déclenchent des stratégies de repli.",
      stages: [
        {
          label: "Déclaration",
          nodes: [{ title: "CognitiveTask", detail: "Objectif, sous-tâches, contraintes, outils" }],
        },
        {
          label: "Planification",
          nodes: [{ title: "Planificateur", detail: "Validation, CEGGraph (DAG)", tone: "accent" }],
          branch: { label: "Si impossible", title: "Plan refusé", detail: "Avant toute exécution", tone: "warn" },
        },
        {
          label: "Décision",
          nodes: [{ title: "Runtime Decision Engine", detail: "Modèle par étape : coût, latence, qualité", tone: "accent" }],
          branch: { label: "Si échec", title: "Fallback", detail: "Retry, escalation, degradation, skip, abort", tone: "warn" },
        },
        {
          label: "Compilation",
          nodes: [
            { title: "LangGraph" },
            { title: "CrewAI" },
            { title: "Python" },
          ],
        },
        {
          label: "Exécuteurs",
          nodes: [
            { title: "Simulé", detail: "Déterministe, par défaut" },
            { title: "Gemini · Groq · Ollama", detail: "Modèles réels" },
          ],
        },
      ],
      footer: {
        label: "Observabilité",
        title: "CLI · API FastAPI · Studio React",
        detail: "Plan, EXPLAIN, traces, décisions et fallbacks de chaque exécution",
      },
    },
    graphs: [
      {
        title: "Exemple de plan compilé : tri de tickets de support",
        description:
          "lire_tickets alimente classer et detecter_urgences. Les deux étapes alimentent rediger_synthese. L'étape escalader ne s'exécute que si des urgences sont détectées.",
        width: 640,
        height: 300,
        nodes: [
          { id: "read", x: 225, y: 10, w: 190, h: 60, title: "lire_tickets", lines: ["outil : ticketing_api"] },
          { id: "cls", x: 40, y: 120, w: 190, h: 60, title: "classer" },
          { id: "urg", x: 410, y: 120, w: 190, h: 60, title: "detecter_urgences", lines: ["gamme : quality"], tone: "accent" },
          { id: "sum", x: 40, y: 230, w: 190, h: 60, title: "rediger_synthese" },
          { id: "esc", x: 410, y: 230, w: 190, h: 60, title: "escalader", lines: ["outil : pager"], tone: "warn" },
        ],
        edges: [
          { from: "read", to: "cls" },
          { from: "read", to: "urg" },
          { from: "cls", to: "sum" },
          { from: "urg", to: "sum" },
          { from: "urg", to: "esc", label: "run_if urgences", dashed: true },
        ],
      },
    ],
    features: [
      "Déclaration Python d'objectifs, de sous-tâches, de dépendances et de contraintes.",
      "Planificateur déterministe et compilation vers trois moteurs.",
      "Sélection dynamique du modèle selon le coût, la latence et la qualité.",
      "Cinq stratégies de fallback : retry, escalation, degradation, skip et abort.",
      "Optimiseur appris qui corrige ses estimations à partir des exécutions observées.",
      "EXPLAIN avant exécution : plan, coût et latence minimaux.",
      "Connexion à de vrais modèles chez Gemini, Groq et Ollama.",
      "CLI, API FastAPI et Studio React pour suivre graphes et traces.",
    ],
    decisions: [
      {
        title: "Séparer le quoi du comment",
        body: "Le découpage reprend celui de SQL : requête déclarative, planificateur, optimiseur par coût, moteur d'exécution et EXPLAIN. Le plan ne dépend d'aucun framework, ce qui rend les moteurs réellement interchangeables.",
      },
      {
        title: "Garantir les contraintes ou refuser",
        body: "Une contrainte de budget ou de latence est tenue pendant l'exécution, sinon le plan est refusé avant de commencer. Un moteur qui ne sait pas honorer une fonctionnalité la refuse au lieu de l'ignorer.",
      },
      {
        title: "Compter les échecs dans le coût",
        body: "Un appel LLM raté coûte quand même et prend du temps. Le coût et la latence d'une étape incluent donc ses appels ratés, ce qui permet de pénaliser un modèle bon marché mais peu fiable.",
      },
      {
        title: "Un simulateur déterministe pour évaluer",
        body: "Le simulateur attribue aux modèles une qualité cachée, différente de leurs notes déclarées. Les expériences sont reproductibles à l'identique et testent la capacité de CEG à corriger un a priori erroné.",
      },
      {
        title: "Un défaut trouvé par le benchmark",
        body: "La première exécution a montré que la qualité minimale n'était vérifiée qu'après coup : aucune configuration ne la respectait. Elle est désormais prise en compte dès le choix du modèle, et les résultats publiés sont postérieurs à cette correction.",
      },
    ],
    results: {
      rows: [
        { metric: "Portabilité entre frameworks", value: "6 / 6", context: "pipelines aux résultats identiques sur LangGraph, CrewAI et Python · simulé" },
        { metric: "Optimiseur appris : coût", value: "−27 %", context: "face à l'optimiseur statique, qualité équivalente · 40 exécutions, simulé" },
        { metric: "Optimiseur appris : appels ratés", value: "−91 %", context: "face à l'optimiseur statique · 40 exécutions, simulé" },
        { metric: "Scénarios de contraintes respectés", value: "4 / 4", context: "aucun workflow à modèle fixe n'y parvient · 40 exécutions par cas, simulé" },
        { metric: "Portabilité entre fournisseurs", value: "15 / 15", context: "exécutions terminées sur Gemini, Groq et Ollama, sans modifier la déclaration · modèles réels" },
        { metric: "Écart de qualité entre fournisseurs", value: "5,5 %", context: "note d'un juge LLM, 5 exécutions par fournisseur · modèles réels" },
        { metric: "Tests automatisés", value: "472", context: "suite pytest de la version évaluée" },
      ],
      note: "Les résultats simulés décrivent le comportement de CEG face à des modèles dont la qualité diffère de leur réputation, pas une comparaison de modèles du marché. Sur modèles réels, les échantillons sont petits : ils indiquent une tendance et ne constituent pas une mesure statistique. Sur un pipeline de calcul plus exigeant, le petit modèle local via Ollama s'est montré insuffisant : 2 exécutions terminées sur 12, toutes deux erronées. Tous les résultats sont publiés dans le dépôt.",
    },
    demo: {
      video: "/videos/ceg-demo.mp4",
      poster: "/images/projects/ceg-studio-poster.jpg",
      caption:
        "Présentation de 27 secondes incluant une capture réelle du Studio CEG. Les gains affichés proviennent des benchmarks simulés du projet.",
    },
    repository: { url: "https://github.com/Kebe20222198/CEG" },
  },
  {
    slug: "agentic-rag-mcp",
    title: "Agentic RAG Pipeline & MCP Architecture",
    domain: "AI Engineering",
    period: "Mai 2026",
    summary:
      "Un pipeline qui transforme des documents non structurés en connaissances interrogeables, exploitées par des agents et servies en streaming.",
    highlights: [
      "Ingestion documentaire par web scraping et OCR",
      "Recherche vectorielle et hybride avec Qdrant",
      "Agents LangGraph, MCP et API FastAPI en streaming",
    ],
    stack: ["Python", "Qdrant", "LangGraph", "MCP", "FastAPI", "Docker"],
    problem: [
      "Les connaissances d'une organisation sont dispersées entre pages web et documents non structurés, parfois scannés. Un LLM seul n'y a pas accès et ne peut pas justifier ses réponses.",
      "Répondre de façon fiable suppose une chaîne complète : collecter et structurer ces contenus, retrouver les bons passages, puis laisser un agent les exploiter avec des outils bien délimités.",
    ],
    objectives: [
      "Structurer et indexer des documents non structurés.",
      "Combiner recherche vectorielle et recherche par mots-clés.",
      "Orchestrer des agents capables d'utiliser des outils.",
      "Exposer les réponses dans une API adaptée à un usage interactif.",
    ],
    architecture: [
      "Le pipeline d'ingestion collecte les contenus par web scraping et OCR, les structure puis les indexe dans Qdrant. La recherche combine similarité vectorielle et correspondance lexicale.",
      "LangGraph orchestre les agents, qui accèdent à leurs outils via le Model Context Protocol. Les réponses du LLM sont diffusées en streaming par une API FastAPI, et l'ensemble est conteneurisé avec Docker.",
    ],
    diagram: {
      title: "Du document à la réponse",
      description:
        "Les documents collectés par scraping et OCR sont indexés dans Qdrant. Les agents LangGraph interrogent cet index et leurs outils via MCP, puis FastAPI diffuse la réponse en streaming.",
      stages: [
        {
          label: "Collecte",
          nodes: [
            { title: "Web scraping", detail: "Pages et contenus en ligne" },
            { title: "OCR", detail: "Documents scannés" },
          ],
        },
        {
          label: "Ingestion",
          nodes: [{ title: "Pipeline ETL", detail: "Structuration, indexation" }],
        },
        {
          label: "Recherche",
          nodes: [{ title: "Qdrant", detail: "Vectorielle et hybride", tone: "accent" }],
        },
        {
          label: "Agents",
          nodes: [
            { title: "LangGraph", detail: "Orchestration des agents", tone: "accent" },
            { title: "MCP", detail: "Accès aux outils" },
          ],
        },
        {
          label: "Service",
          nodes: [{ title: "FastAPI", detail: "Réponses LLM en streaming" }],
        },
      ],
      footer: {
        label: "Déploiement",
        title: "Docker",
        detail: "Conteneurisation des services",
      },
    },
    features: [
      "Pipeline d'ingestion documentaire de bout en bout.",
      "Web scraping et OCR pour les sources non structurées.",
      "Recherche vectorielle et hybride avec Qdrant.",
      "Orchestration d'agents avec LangGraph.",
      "Architecture MCP pour l'accès aux outils.",
      "API FastAPI avec streaming.",
      "Conteneurisation Docker.",
    ],
    decisions: [
      {
        title: "Recherche hybride",
        body: "La similarité vectorielle capte le sens d'une question, mais peut manquer un identifiant ou un terme exact. Combiner les deux approches couvre ces cas.",
      },
      {
        title: "MCP comme frontière des outils",
        body: "Passer par un protocole standard sépare la logique des agents de l'implémentation des outils : chacun peut évoluer sans modifier l'autre.",
      },
      {
        title: "Streaming côté API",
        body: "La génération d'une réponse prend plusieurs secondes. La diffuser progressivement rend l'attente acceptable dans une interface interactive.",
      },
    ],
    results: {
      rows: [],
      note: "Aucune métrique de performance n'est publiée pour ce projet à ce jour.",
    },
    repository: {
      url: "https://github.com/Kebe20222198/assistant-chatbot-support-client",
      note: "Ce dépôt public contient le socle RAG : scraping, ingestion, recherche hybride dans Qdrant, reranking et API FastAPI. Les briques LangGraph, MCP et OCR n'y sont pas publiées.",
    },
  },
  {
    slug: "ml-financial-backtesting",
    title: "Machine Learning Financial Backtesting Platform",
    domain: "Machine Learning",
    period: "Mai 2026",
    summary:
      "Une plateforme qui combine données de marché, sentiment des actualités financières et modèles prédictifs pour évaluer des stratégies de trading dans un environnement de backtesting.",
    highlights: [
      "Pipeline de données financières et textuelles",
      "Analyse de sentiment avec NLP et FinBERT",
      "Évaluation de stratégies par backtesting",
    ],
    stack: ["Python", "Machine Learning", "NLP", "FinBERT"],
    problem: [
      "Un modèle prédictif qui paraît performant sur un jeu de test ne constitue pas une stratégie : seule une simulation dans le temps permet d'évaluer ce qu'il produirait réellement.",
      "Les actualités portent par ailleurs une information absente des séries de prix, mais sous une forme textuelle qu'il faut convertir en variables exploitables.",
    ],
    objectives: [
      "Construire un pipeline commun aux données financières et textuelles.",
      "Transformer le sentiment des actualités en variables explicatives.",
      "Entraîner des modèles prédictifs sur ces variables.",
      "Évaluer les stratégies qui en découlent dans un environnement de backtesting.",
    ],
    architecture: [
      "Les données financières et textuelles sont ingérées et nettoyées dans un même pipeline. Le feature engineering produit des variables de marché, enrichies par les scores de sentiment que FinBERT calcule sur les actualités.",
      "Ces variables alimentent les modèles prédictifs, dont les signaux sont rejoués dans l'environnement de backtesting pour évaluer les stratégies de trading.",
    ],
    diagram: {
      title: "De la donnée brute à l'évaluation",
      description:
        "Les données financières et textuelles sont prétraitées, enrichies par le sentiment FinBERT, utilisées par les modèles prédictifs, puis évaluées dans l'environnement de backtesting.",
      stages: [
        {
          label: "Sources",
          nodes: [
            { title: "Données financières" },
            { title: "Données textuelles", detail: "Actualités financières" },
          ],
        },
        {
          label: "Préparation",
          nodes: [{ title: "Prétraitement", detail: "Ingestion, nettoyage" }],
        },
        {
          label: "Variables",
          nodes: [
            { title: "Feature engineering" },
            { title: "FinBERT", detail: "Score de sentiment", tone: "accent" },
          ],
        },
        {
          label: "Modèles",
          nodes: [{ title: "Modèles prédictifs", detail: "Génération des signaux" }],
        },
        {
          label: "Évaluation",
          nodes: [{ title: "Backtesting", detail: "Stratégies de trading", tone: "accent" }],
        },
      ],
    },
    features: [
      "Pipeline de données financières et textuelles.",
      "Prétraitement et feature engineering.",
      "Analyse de sentiment avec NLP et FinBERT.",
      "Modèles prédictifs.",
      "Évaluation de stratégies de trading en backtesting.",
    ],
    decisions: [
      {
        title: "FinBERT plutôt qu'un modèle de sentiment généraliste",
        body: "Le vocabulaire financier a ses propres connotations. Un Transformer spécialisé sur ce domaine est mieux adapté pour interpréter ces textes.",
      },
      {
        title: "Évaluer des stratégies, pas seulement des modèles",
        body: "La qualité d'une prédiction ne dit pas ce que rapporterait son utilisation. Le backtesting place donc l'évaluation au niveau de la stratégie.",
      },
    ],
    results: {
      rows: [],
      note: "Aucun résultat de performance n'est publié pour ce projet à ce jour.",
    },
    repository: { note: "Le code de ce projet n'est pas publié." },
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
