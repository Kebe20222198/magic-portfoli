# Mohamed Kebe — Portfolio

Portfolio de Mohamed Kebe, Data Engineer & AI Engineer, étudiant ingénieur à l'INSEA.

Production : <https://mohamed-kebe-data-ia-software-engin.vercel.app/>

## Stack

Next.js 14 (App Router, pages statiques), TypeScript, Tailwind CSS, next-themes, lucide-react. Tests avec Vitest et React Testing Library.

## Structure

```text
src/
├── app/
│   ├── page.tsx                  # Accueil
│   ├── projects/[slug]/page.tsx  # Études de cas
│   └── resume/page.tsx           # CV (aussi la source du PDF)
├── components/                   # Sections, navigation, diagrammes
└── data/
    ├── portfolio.ts              # Profil, expériences, compétences, formation
    └── projects.ts               # Contenu, diagrammes et résultats des projets
```

## Modifier le contenu

Tous les textes se trouvent dans `src/data/`.

- Un projet se décrit entièrement dans `projects.ts` : une nouvelle entrée crée sa page, son diagramme et son entrée au sitemap.
- Chaque résultat publié doit provenir d'une exécution réelle et préciser ses conditions.
- Le CV téléchargeable est `public/cv/Mohamed-Kebe-CV.pdf`. Il s'obtient en imprimant `/resume` en PDF, ou en remplaçant ce fichier.

## Développement

```bash
npm install
npm run dev     # http://localhost:3000
npm test
npm run build
```

`NEXT_PUBLIC_SITE_URL` permet de remplacer l'URL canonique par défaut, par exemple pour un domaine personnalisé.
