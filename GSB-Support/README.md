# 📲 GSB Support

Application mobile de support technique pour les employés de **Galaxy Swiss Bourdin (GSB)**.  
Permet de **créer, visualiser et suivre des tickets** en temps réel.

## ✨ Fonctionnalités principales

- 🔐 Authentification Firebase (inscription, connexion, logout)
- 📝 Création de tickets avec :
  - Titre
  - Description
  - Priorité (Faible, Moyenne, Haute, Critique)
  - Catégorie (Hardware, Software, Réseau, Autre)
  - Date d’intervention souhaitée
- 🎨 UI professionnelle (bleu/gris), responsive
- 📋 Visualisation des tickets par statut : Nouveaux, En cours, Résolus
- 📁 Détail complet d’un ticket avec animation de transition
- 📦 Stockage des données via **Firebase Firestore**
- 📷 Ajout d’images avec `expo-image-picker` *(à venir)*
- 🔔 Toasts de validation/erreur intégrés (`react-native-toast-message`)
- 🧭 Navigation fluide avec Expo Router (`Tabs`, `Stack`, `Modal`)
- 📱 Compatible Android (iOS à venir)

## 🧱 Stack technique

| Frontend | Backend / BDD | Outils |
|----------|----------------|--------|
| React Native + Expo | Firebase Auth + Firestore | VSCode |
| TypeScript || Expo Router |
| React Hook Form + Zod | | React Query *(prochainement)* |

## 📁 Structure du projet

```
GSB-Support/
├── app/                # Routes Expo Router
│   ├── (auth)/         # Login / Register
│   ├── (tabs)/         # Dashboard / Tickets (via Tabs)
│   └── ticket/[id].tsx # Détail d’un ticket
├── components/
│   ├── ui/             # Composants réutilisables (Input, Button, Card, Badge)
│   └── tickets/        # TicketForm, CustomPicker, etc.
├── hooks/              # useAuth, useTickets
├── lib/                # firebase.ts, zod schemas, etc.
├── types/              # Types globaux
└── app.config.ts       # Config Expo
```

## 🚀 Lancer le projet

### 1. Cloner le repo

```bash
git clone https://github.com/BigFootLime/GSB-Support.git
cd GSB-Support
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Lancer l’app Expo

```bash
npx expo start
```

> 📱 Testé avec Expo Go sur Android

## 🛠 Configuration Firebase

Crée un projet Firebase, puis configure :

- 🔐 **Authentication** > Email/Password
- 🔥 **Firestore Database** > En mode test (dev)
- ☁️ **Storage** *(optionnel pour les images)*

Dans `lib/firebase.ts`, place ta config Firebase :

```ts
export const firebaseConfig = {
  apiKey: '...',
  authDomain: '...',
  projectId: '...',
  storageBucket: '...',
  messagingSenderId: '...',
  appId: '...'
};
```

## 🧪 À venir

- [ ] Upload d’images dans les tickets (📷)
- [ ] Notifications push pour les mises à jour
- [ ] Dashboard admin pour suivi global
- [ ] Filtres par utilisateur
- [ ] Auth multi-rôle (Utilisateur / Admin)

## 👨‍💻 Développé par

**Keenan Martin**  
Développeur Full Stack chez **Croix Rousse Précision**  
📍 Caluire-et-Cuire, France

## 📝 Licence

Ce projet est un prototype interne destiné à la gestion du support technique GSB.  
Licence privée. Ne pas redistribuer sans autorisation.