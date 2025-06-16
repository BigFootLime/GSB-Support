# TP Noté : Développement d'une Application de Gestion de Tickets pour GSB

## Contexte

Galaxy Swiss Bourdin (GSB) est une entreprise pharmaceutique issue de la fusion entre le géant américain Galaxy et le conglomérat européen Swiss Bourdin. Le département IT de GSB a besoin d'une application mobile pour permettre à ses employés de signaler et suivre les problèmes techniques rencontrés.

L'application "GSB Support" doit permettre aux employés de créer des tickets de support, de les suivre, et aux agents du support technique de les gérer efficacement. L'application doit être développée avec React Native/Expo pour cibler principalement les appareils Android utilisés par l'entreprise.

## Objectifs pédagogiques

- Mettre en pratique les concepts de React Native avec Expo
- Implémenter une navigation complexe avec Expo Router
- Intégrer Firebase pour l'authentification et le stockage des données
- Créer des interfaces mobiles adaptatives avec Flexbox
- Utiliser TypeScript dans un projet React Native

## Prérequis techniques

- React Native avec Expo SDK 50+
- Expo Router 4+
- Firebase (Auth & Firestore)
- TypeScript
- Authentification d'utilisateurs
- Gestion en temps réel des données

## Structure de l'application

### Architecture des dossiers cible

```
/
├── app/
│   ├── (auth)/
│   │   ├── login.tsx
│   │   └── register.tsx
│   ├── (app)/
│   │   ├── _layout.tsx
│   │   ├── index.tsx
│   │   ├── tickets/
│   │   │   ├── index.tsx
│   │   │   ├── [id].tsx
│   │   │   └── create.tsx
│   │   ├── dashboard.tsx
│   │   └── profile.tsx
│   ├── _layout.tsx
│   └── index.tsx
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   └── StatusBadge.tsx
│   ├── tickets/
│   │   ├── TicketCard.tsx
│   │   ├── TicketForm.tsx
│   │   └── TicketFilter.tsx
│   └── layout/
│       ├── Header.tsx
│       ├── TabBar.tsx
│       └── LoadingOverlay.tsx
├── lib/
│   ├── firebase.ts
│   ├── auth.ts
│   └── tickets.ts
├── hooks/
│   ├── useAuth.ts
│   ├── useTickets.ts
│   └── useTicketDetails.ts
├── types/
│   ├── ticket.ts
│   ├── user.ts
│   └── navigation.ts
├── utils/
│   ├── dateFormatter.ts
│   ├── priorityHelpers.ts
│   └── statusHelpers.ts
└── constants/
    ├── colors.ts
    ├── tickets.ts
    └── theme.ts
```

### Structure de la base de données Firebase

#### Collections Firestore

1. **users**
   - `uid`: string (clé primaire)
   - `email`: string
   - `fullName`: string
   - `department`: string
   - `role`: string ('employee', 'support', 'admin')
   - `createdAt`: timestamp
   - `lastLogin`: timestamp
   - `avatarUrl`: string (optionnel)

2. **tickets**
   - `id`: string (auto-généré)
   - `title`: string
   - `description`: string
   - `status`: string ('new', 'assigned', 'in-progress', 'resolved', 'closed')
   - `priority`: string ('low', 'medium', 'high', 'critical')
   - `category`: string ('hardware', 'software', 'network', 'access', 'other')
   - `createdBy`: string (référence à users.uid)
   - `assignedTo`: string (référence à users.uid, optionnel)
   - `createdAt`: timestamp
   - `updatedAt`: timestamp
   - `dueDate`: timestamp (optionnel)
   - `location`: string (optionnel)
   - `deviceInfo`: object (optionnel)

3. **comments**
   - `id`: string (auto-généré)
   - `ticketId`: string (référence à tickets.id)
   - `userId`: string (référence à users.uid)
   - `content`: string
   - `createdAt`: timestamp
   - `attachmentUrl`: string (optionnel)

## Partie 1 : Mise en place du projet et authentification

### Objectifs

- Mettre en place l'environnement de développement avec Expo et TypeScript
- Implémenter l'authentification Firebase
- Créer la structure de navigation avec Expo Router
- Concevoir les écrans d'authentification

### Instructions

1. **Configuration du projet**
   - Créez une nouvelle application Expo avec TypeScript
   - Configurez ESLint et Prettier
   - Installez les dépendances nécessaires (firebase, expo-router, etc.)

2. **Configuration de Firebase**
   - Créez un nouveau projet Firebase
   - Activez l'authentification par email/mot de passe
   - Configurez Firestore Database
   - Intégrez le SDK Firebase dans votre application
   - Créez un fichier de configuration Firebase dans `/lib/firebase.ts`

3. **Types TypeScript**
   - Définissez les interfaces pour les utilisateurs et les tickets
   - Configurez les types pour la navigation avec Expo Router

4. **Authentification**
   - Créez les formulaires de connexion et d'inscription
   - Implémentez un hook `useAuth` pour gérer l'authentification
   - Gérez les états de connexion, déconnexion et erreurs
   - Stockez les informations utilisateur dans Firestore lors de l'inscription

5. **Navigation**
   - Configurez la navigation racine pour rediriger vers l'authentification ou l'application
   - Créez une structure de navigation par onglets pour l'application principale
   - Implémentez une navigation par pile pour les écrans de tickets

### Exigences UI/UX

- L'écran de connexion/inscription doit inclure le logo GSB
- Utilisez une palette de couleurs professionnelle (bleu/gris)
- Les formulaires doivent inclure la validation et afficher les erreurs
- Implémentez des transitions fluides entre les écrans
- Assurez-vous que l'application s'adapte à différentes tailles d'écran

### Diagramme de navigation

```
[Login Screen] <---> [Register Screen]
      |
      v
[Dashboard (Tab)]--->[Tickets List (Tab)]--->[Profile (Tab)]
                          |
                          v
                    [Ticket Details]
                          |
                          v
                    [Edit Ticket]
```

## Partie 2 : Gestion des tickets avec Firebase

### Objectifs

- Implémenter le CRUD complet pour les tickets
- Créer des interfaces utilisateur réactives et intuitives
- Mettre en place les requêtes Firebase pour la gestion des données
- Implémenter le filtrage et la recherche de tickets

### Instructions

1. **Modèle de données**
   - Configurez les règles de sécurité Firestore
   - Implémentez les fonctions CRUD pour les tickets
   - Créez des queries optimisées pour les différentes vues

2. **Interface de liste de tickets**
   - Créez une liste de tickets avec filtrage par statut/priorité
   - Implémentez le pull-to-refresh et le chargement pagination
   - Ajoutez une fonction de recherche
   - Utilisez des indicateurs visuels pour les priorités et statuts

3. **Détails et création de tickets**
   - Créez un formulaire de création de ticket
   - Implémentez la vue détaillée d'un ticket
   - Ajoutez la possibilité de modifier le statut d'un ticket
   - Implémentez un système de commentaires

4. **Assignation et suivi**
   - Permettez aux administrateurs d'assigner des tickets
   - Implémentez des notifications pour les mises à jour
   - Ajoutez des statistiques de base sur le tableau de bord

### Exigences techniques

- Utilisez les abonnements en temps réel de Firestore pour les mises à jour
- Implémentez une gestion d'état efficace avec des hooks personnalisés
- Assurez-vous que l'application fonctionne en mode hors ligne
- Utilisez TypeScript correctement pour le typage des données

### Structure des données de tickets

```typescript
interface Ticket {
  id: string;
  title: string;
  description: string;
  status: 'new' | 'assigned' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  category: 'hardware' | 'software' | 'network' | 'access' | 'other';
  createdBy: string;
  assignedTo?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  dueDate?: Timestamp;
  location?: string;
  deviceInfo?: {
    model?: string;
    os?: string;
    version?: string;
  };
}
```

## Partie 3 : Fonctionnalités natives et déploiement

### Objectifs

- Intégrer des fonctionnalités natives (caméra, notifications)
- Optimiser les performances de l'application
- Préparer l'application pour le déploiement

### Instructions

1. **Fonctionnalités natives**
   - Intégrez la caméra pour joindre des photos aux tickets
   - Ajoutez la géolocalisation pour marquer l'emplacement des problèmes
   - Implémentez les notifications push pour les mises à jour de tickets

2. **Stockage et media**
   - Configurez Firebase Storage pour les pièces jointes
   - Implémentez l'upload et le téléchargement d'images
   - Gérez les permissions et les quotas

3. **Préparation au déploiement**
   - Configurez EAS Build pour Android
   - Optimisez les assets et les performances
   - Implémentez des tests basiques
   - Documentez l'application

### Exigences de performance

- L'application doit charger rapidement, même sur des appareils modestes
- La consommation de batterie doit être optimisée
- Les images doivent être redimensionnées avant l'upload
- L'application doit fonctionner avec une connexion lente ou instable

## Livrables attendus

1. Code source complet sur un dépôt Git
2. Documentation de l'architecture technique
3. Application fonctionnelle déployable sur Android
4. Rapport de développement incluant:
   - Choix techniques effectués
   - Difficultés rencontrées et solutions apportées
   - Améliorations futures possibles
   - Captures d'écran des fonctionnalités principales

## Conseils pour réussir

- Commencez par mettre en place l'authentification et la navigation
- Utilisez des composants réutilisables pour maintenir la cohérence
- Testez régulièrement sur des appareils réels, pas seulement sur l'émulateur
- Gérez correctement les erreurs et les états de chargement
- Suivez les bonnes pratiques TypeScript (pas d'utilisation abusive de `any`)
- Optimisez les requêtes Firebase pour éviter les coûts inutiles
- Documentez votre code au fur et à mesure

## Critères d'évaluation

- **Fonctionnalité (40%)**: L'application remplit-elle toutes les exigences?
- **Qualité du code (25%)**: Structure, lisibilité, maintenabilité
- **UI/UX (15%)**: Expérience utilisateur, design, réactivité
- **Performance (10%)**: Vitesse, optimisation, consommation de ressources
- **Documentation (10%)**: Clarté, exhaustivité, pertinence

## Bonus

- Mise en place de tests unitaires
- Implémentation d'un mode sombre
- Support multilingue (français/anglais)
- Tableau de bord analytique pour les administrateurs
- Intégration avec d'autres services GSB
