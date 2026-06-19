# DatePicker Component

Un composant DatePicker réutilisable en React qui remplace le plugin jQuery `dateTimePicker`.

## Fonctionnalités

- ✅ Sélecteur de date avec calendrier interactif
- ✅ Support de deux formats: `MM/DD/YYYY` et `YYYY-MM-DD`
- ✅ Navigation mois/année
- ✅ Gestion de l'état React simple
- ✅ Styled avec Tailwind CSS
- ✅ Accessible et responsive

## Installation

```bash
npm install
```

## Utilisation

```tsx
import { DatePicker } from './components/DatePicker/DatePicker';

function MyComponent() {
  const [date, setDate] = useState('');

  return (
    <DatePicker
      value={date}
      onChange={setDate}
      format="MM/DD/YYYY"
      label="Select Date"
      placeholder="MM/DD/YYYY"
    />
  );
}
```

## Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `value` | `string` | - | Valeur actuelle de la date |
| `onChange` | `(value: string) => void` | - | Callback appelé quand la date change |
| `format` | `'MM/DD/YYYY' \| 'YYYY-MM-DD'` | `'MM/DD/YYYY'` | Format d'affichage de la date |
| `label` | `string` | - | Label du champ (optionnel) |
| `placeholder` | `string` | `'MM/DD/YYYY'` | Placeholder du champ |
| `disabled` | `boolean` | `false` | Désactiver le champ |
| `id` | `string` | - | ID HTML du champ |

## Performance

Ce composant remplace le plugin jQuery `jquery.datetimepicker` qui était causant des ralentissements. Le composant React:
- Réduit les manipulations DOM
- Élimine les dépendances jQuery inutiles
- Améliore le temps de chargement et la performance globale

## Architecture

- Composant fonctionnel React avec hooks
- État local avec `useState`
- Logique de calendrier pure JavaScript
- Styling avec Tailwind CSS classes

## Améliorations futures

- [ ] Support des plages de dates
- [ ] Localization (i18n)
- [ ] Animation des transitions
- [ ] Mobile-friendly gestures
