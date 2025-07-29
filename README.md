---

# ⚡ Démarrer avec Vite + React – `tsuniv-client`

Ce projet constitue le frontend de **TS_Univ**, la plateforme de gestion des logements universitaires, développé avec **Vite**, **React**, et **Tailwind CSS** pour une performance optimale.

---

## 🗂️ Structure du projet `tsuniv-client`
```
tsuniv-client/
├── public/               # Fichiers statiques (index.html, favicon, etc.)
├── src/
│   ├── assets/           # Images, icônes et autres fichiers média
│   ├── components/       # Composants réutilisables (Button, Card, Input...)
│   ├── pages/            # Vues/pages principales (HomePage, LoginPage, DashboardPage...)
│   ├── services/         # Fonctions pour interagir avec Supabase/API
│   ├── contexts/         # Stores React via Context API (ex : AuthContext)
│   ├── hooks/            # Hooks personnalisés (useAuth, useFetch, etc.)
│   ├── utils/            # Fonctions utilitaires (formatage, validation, etc.)
│   ├── App.js            # Composant racine de l'app
│   └── index.js          # Point d'entrée principal (ReactDOM)
├── package.json          # Dépendances, scripts, configurations
├── README.md             # Documentation du projet
└── .env.example          # Variables d'environnement d'exemple (ex: API_URL, SUPABASE_KEY)
```

---

## ⚙️ Installation & Lancement

### 🔧 Prérequis

- Node.js ≥ 18
- npm ou yarn

### 📦 Installer les dépendances

```bash
npm install
```

### 🚀 Lancer le serveur en développement

```bash
npm run dev
```

👉 Accès à l’app sur [http://localhost:5173](http://localhost:5173)

> ✅ Vite recharge automatiquement le code  
> 📉 Les erreurs apparaissent dans la console

---

## 🏗️ Build pour la production

```bash
npm run build
```

Cela génère une version optimisée dans le dossier `dist/`.

---

## 🔍 Scripts additionnels

- `npm run preview` : Lance un serveur local pour visualiser le build
- `npm run lint` : Vérifie la qualité du code (si ESLint est configuré)
- `npm run format` : Formate le code avec Prettier (si intégré)

---

## 📘 Ressources utiles

- [Documentation Vite](https://vitejs.dev/guide/)
- [Documentation React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/docs/installation)
- [Supabase](https://supabase.com/docs)
- [Daisyui](https://daisyui.com)
-[React-router](https://reactrouter.com/)

---
