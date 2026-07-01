# مستعجل — Moustaadjel

منصة رقمية تربط العملاء (أفراد، محامون، موثقون، خبراء، مؤسسات وإدارات) بالمحضرين القضائيين في الجزائر لإجراء التبليغات والمعاينات وتنفيذ الأحكام بسرعة وشفافية وأمان، مبنية اعتمادًا على نموذج العمل (Business Model Canvas) للمشروع.

Digital platform connecting clients (individuals, lawyers, notaries, experts, companies, administrations) with judicial bailiffs (huissiers de justice) in Algeria for legal notifications, on-site reports, and enforcement, built from the project's Business Model Canvas.

## Stack

- React 19 + Vite + React Router
- Tailwind CSS v4
- No real server: the "backend" is a JSON dataset (`src/data/db.json`) loaded into a React context and persisted to `localStorage`, fully CRUD-able from the UI (including an admin export/import of the raw JSON).
- Custom lightweight i18n context — Arabic (default, RTL) ⇄ French (LTR), toggle in the navbar.

## Features

- Public site: home, about, pricing, huissier directory/search
- Client: submit requests (signification / constat / exécution), urgency levels, track status timeline, chat with the assigned huissier, pay, rate the service
- Huissier: manage incoming/assigned requests, accept/start/complete missions, set mission fee, availability & territorial competence, subscription plans
- Admin: verify/manage huissiers and users, view all requests, configure commission rate & fees, export/import/reset the JSON database

## Getting started

```bash
npm install
npm run dev
```

### Demo accounts

| Role     | Email                     | Password  |
| -------- | -------------------------- | --------- |
| Client   | client@example.com         | 123456    |
| Huissier | huissier@example.com       | 123456    |
| Admin    | admin@moustaajel.dz        | admin123  |

## Build

```bash
npm run build
```
