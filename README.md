# Mohamed Kebe — Portfolio Personnel (Data Engineering & IA)

Ce projet est le portfolio professionnel de **Mohamed Kebe**, Élève-Ingénieur en **Data & IA Engineering** à l'**INSEA** (Rabat, Maroc). Conçu avec une esthétique haut de gamme, minimaliste et développeur-first, il intègre deux thèmes soignés (Light et Dark) inspirés de portfolios de référence.

## 🔗 Liens Utiles
- **Dépôt GitHub** : [github.com/Kebe20222198/magic-portfoli](https://github.com/Kebe20222198/magic-portfoli)
- **E-mail de contact** : [mkebe2022@gmail.com](mailto:mkebe2022@gmail.com)

---

## 🎨 Design & Esthétique

Le design a été repensé pour allier minimalisme, technicité et élégance :

- **Typographie Monospace Globale** : Utilisation uniforme de la police d'écriture **Space Mono** (Google Fonts) pour renforcer le style technique typique des profils d'ingénieurs.
- **Light Mode Épuré** : Inspiré de *salimdiallo.com*. Un arrière-plan blanc pur épuré, rehaussé d'une fine grille de points radiale (`dot grid`) et de tons de gris et pierre neutres (neutral/stone) pour éviter toute distraction colorée.
- **Dark Mode Bleu Nuit** : Inspiré de *alexkarpekov.com*. Une transition vers une palette bleu nuit élégante et profonde (`#0b1120` pour le fond principal, `#060b16` pour les cartes et en-têtes, et `#0d1628` pour les bordures).
- **Animations Fluidifiées (Framer Motion)** :
  - **Révélation Progressive de la Biographie** : Les lignes clés de la biographie se dévoilent l'une après l'autre de manière séquentielle lors du chargement de la page et restent fixes sur l'écran.
  - **Effet de Révélation d'En-tête (`blur-reveal`)** : Le titre principal et le tag d'établissement s'animent avec un fondu et un glissement vertical associés à un léger flou artistique à l'apparition.
  - **Menu de Sous-titres Échelonné (`staggered`)** : Les trois compétences phares sous le titre principal (Data Engineering · Architectures Distribuées · IA) s'affichent les unes après les autres.
  - **Indicateur de Statut Pulsé** : Un voyant vert d'activité animé par effet de pulsation.

---

## 🛠️ Stack Technique

- **Framework** : Next.js 14 (App Router)
- **Langage** : TypeScript
- **Styling** : Tailwind CSS (avec variables CSS locales pour les thèmes)
- **Animations** : Framer Motion
- **Icônes** : Lucide React & Simple Icons (pour les logos technologiques)
- **Arrière-plans** : TsParticles (grille de points animée douce uniquement en mode sombre)

---

## 📂 Structure du Projet

```bash
magic-portfolio/
├── public/                 # Médias statiques (photos de profil, logos des écoles, etc.)
│   └── Rapports/           # Documents PDF académiques (exposés, projets)
├── src/
│   ├── app/                # Pages & routage Next.js App Router
│   │   ├── resume/         # Page du CV en ligne (/resume)
│   │   ├── globals.css     # Charte graphique CSS globale et thèmes
│   │   └── page.tsx        # Page d'accueil (Hero, Actualités, Projets)
│   ├── components/         # Composants React modulaires (Navbar, HeroSection, etc.)
│   └── data/
│       └── portfolio.ts    # Base de données centralisée du portfolio (tous les textes et liens)
├── cv_data_engineer.md     # Curriculum Vitæ mis à jour au format Markdown pour GitHub
└── tailwind.config.ts      # Configuration des couleurs et tokens Tailwind CSS
```

---

## ⚙️ Configuration & Personnalisation

Toutes les données du site sont centralisées dans un seul fichier pour faciliter la mise à jour des informations :

👉 **Fichier de configuration des données** : [`src/data/portfolio.ts`](file:///d:/magic-portfolio/src/data/portfolio.ts)

Pour modifier vos informations, il vous suffit d'éditer ce fichier :
- **`personalInfo`** : Votre nom, votre rôle, votre biographie (sous forme de tableau pour la révélation progressive), vos liens sociaux et coordonnées.
- **`news`** : Vos dernières actualités chronologiques.
- **`projects`** : La liste de vos projets mis en avant sur la page d'accueil.
- **`resumeData`** :
  - `education` (Études) : Vos diplômes (INSEA, Université Chouaib Doukkali, Institution Sainte Marie) avec leurs logos.
  - `experience` (Expériences & Projets) : Vos stages professionnels (dont le stage en tête au **HCP**) et vos projets d'ingénierie majeurs.
  - `teaching` (Vie Associative) : Vos responsabilités associatives (ex. Trésorier ASEGUIM, membre Forum GENI).
  - `publications` (Publications & Travaux) : Vos exposés en classe (ex. Exposé sur l'architecture des Transformers avec lien direct vers le PDF dans `public/Rapports/transformer2.pdf`).
  - `skills` (Compétences) : Vos langages de programmation, bases de données, compétences cloud/backend et langues étrangères.

---

## 🚀 Démarrage Local

**1. Cloner le projet**
```bash
git clone https://github.com/Kebe20222198/magic-portfoli.git
cd magic-portfolio
```

**2. Installer les dépendances**
```bash
npm install
```

**3. Lancer le serveur de développement**
```bash
npm run dev
```
Le site sera alors accessible localement sur [http://localhost:3000](http://localhost:3000) (ou 3001 si le port est occupé).

**4. Compiler pour la production**
```bash
npm run build
```

---

## 📜 Licence

Ce projet est personnel et réservé à un usage privé pour la présentation du portfolio de Mohamed Kebe. Tous droits réservés.