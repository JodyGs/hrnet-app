# HRnet React App

Migration de l'application HRnet de jQuery vers React avec amélioration des performances et stabilité.

## 🎯 Objectif

Convertir l'ancienne application jQuery HRnet en une application React moderne avec:
- ✅ 100% React, 0% jQuery
- ✅ Composants réutilisables et modulaires
- ✅ TypeScript pour la sécurité des types
- ✅ Styling avec Tailwind CSS
- ✅ Amélioration des performances
- ✅ DatePicker React personnalisé (remplace jQuery plugin)

## 🚀 Démarrage

### Installation

```bash
npm install
```

### Développement

```bash
npm run dev
```

L'application sera disponible sur `http://localhost:5173`

### Build

```bash
npm run build
```

## 📁 Structure du projet

```
src/
├── components/
│   └── DatePicker/              # Composant DatePicker réutilisable
│       ├── DatePicker.tsx
│       └── README.md
├── pages/
│   ├── CreateEmployee.tsx       # Page de création d'employé
│   └── EmployeeList.tsx         # Page de liste des employés
├── services/
│   └── employeeService.ts       # Service de gestion des employés
├── hooks/
│   └── useLocalStorage.ts       # Hook pour localStorage
├── data/
│   └── states.ts               # Données des états
├── App.tsx                     # Composant principal
└── main.tsx                    # Point d'entrée

```

## 🎨 Fonctionnalités

### Page Création d'Employé
- Formulaire complet avec validation
- DatePicker personnalisé (remplace jQuery dateTimePicker)
- Sélecteurs d'état et département
- Sauvegarde dans localStorage
- Modal de confirmation

### Page Liste des Employés
- Tableau avec tri interactif
- Recherche par mots-clés
- Suppression d'employés
- Styling responsive

## 🔄 Conversions des Plugins jQuery

### DatePicker ✅
- **Avant:** jQuery dateTimePicker plugin
- **Après:** Composant React `DatePicker.tsx`
- **Avantages:** 
  - Moins de dépendances externes
  - Meilleure performance
  - Code React natif

### Modal ✅
- **Avant:** jQuery.modal
- **Après:** Composant React avec état local
- **Avantage:** Intégration React simple

### SelectMenu (États & Département) ✅
- **Avant:** jQuery UI SelectMenu
- **Après:** `<select>` HTML natif avec Tailwind styling
- **Avantage:** Moins lourd, plus accessible

### DataTable ✅
- **Avant:** Plugin jQuery DataTable
- **Après:** Tableau React personnalisé avec tri et recherche
- **Avantage:** Plus performant, moins de dépendances

## 💾 Gestion d'État

L'application utilise:
- **useState** pour l'état local des composants
- **localStorage** pour la persistance des données

Pour changer vers Context API ou Redux:
```tsx
// À implémenter selon les besoins
```

## 🎯 Performance

Les performances sont améliorées par:
- ✅ Moins de dépendances jQuery
- ✅ DOM manipulations optimisées avec React
- ✅ Code modulaire et code-splitting possible
- ✅ Build léger avec Vite

### Benchmarks

À venir (voir tests Lighthouse)

## 📝 Conventions de Code

- **Composants:** Fonctionnels avec hooks uniquement
- **Fichiers:** kebab-case pour dossiers, PascalCase pour composants
- **Documentation:** JSDoc sur chaque composant
- **Styling:** Tailwind CSS classes

## 🧪 Tests

Pour ajouter des tests:

```bash
npm install --save-dev vitest @testing-library/react
```

## 📦 Publication sur npm

Le composant DatePicker peut être publié sur npm:

```bash
# Configuration à faire
npm publish
```

## 🤝 Contribution

1. Fork le projet
2. Crée une branche feature
3. Commit tes changements
4. Push vers la branche
5. Ouvre une Pull Request

## 📄 Licence

MIT

## 🙋 Questions?

Voir la documentation du composant DatePicker: [DatePicker README](./src/components/DatePicker/README.md)
