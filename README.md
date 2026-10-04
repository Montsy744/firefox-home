# 🦊 Firefox Home

> Une page d'accueil Firefox personnalisée, développée avec Vue.js et TypeScript.

Firefox Home est une extension Firefox qui remplace la page **Nouvel onglet** par une interface entièrement personnalisable.

L'objectif du projet est de créer progressivement un véritable **dashboard personnel**, capable de centraliser différents services et informations du quotidien grâce à des API externes.

---

## ✨ Fonctionnalités prévues

Le projet est encore en développement.

### 🏠 Interface

* [ ] Page d'accueil personnalisée
* [ ] Horloge et date
* [ ] Barre de recherche
* [ ] Raccourcis personnalisables
* [ ] Thème clair / sombre
* [ ] Fond personnalisable
* [ ] Animations et transitions

### 🔗 Services externes

L'objectif est de connecter différents services grâce à leurs API :

* [ ] GitHub
* [ ] Spotify
* [ ] YouTube
* [ ] Discord
* [ ] Calendrier
* [ ] Météo
* [ ] Autres services

### 🔔 Notifications

À terme, le Home pourra afficher certaines informations provenant des services connectés :

* [ ] Notifications GitHub
* [ ] Activité Spotify
* [ ] Notifications provenant d'autres services compatibles
* [ ] Compteurs de notifications

### 🔐 Authentification

Pour accéder aux données personnelles des différents services :

* [ ] OAuth 2.0
* [ ] Gestion des tokens
* [ ] Connexion / déconnexion des services
* [ ] Gestion sécurisée des permissions

---

## 🛠️ Technologies utilisées

* **Vue 3**
* **TypeScript**
* **Vite**
* **HTML / CSS**
* **WebExtensions API**
* **Manifest V3**

Les API externes seront ajoutées progressivement au cours du développement.

---

## 📁 Structure du projet

```text
firefox-home/
│
├── public/
│   └── manifest.json
│
├── src/
│   ├── components/
│   ├── services/
│   ├── types/
│   │
│   ├── App.vue
│   ├── main.ts
│   └── style.css
│
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
└── vite.config.ts
```

### `components/`

Contiendra les différents composants de l'interface.

Exemples :

```text
Clock.vue
SearchBar.vue
GithubWidget.vue
SpotifyWidget.vue
```

### `services/`

Contiendra les communications avec les API externes.

```text
github.ts
spotify.ts
weather.ts
```

### `types/`

Contiendra les types TypeScript utilisés par les différents services.

---

# 🚀 Installation

## Prérequis

Avant de commencer, assurez-vous d'avoir installé :

* [Node.js](https://nodejs.org/)
* npm
* Mozilla Firefox
* Git

---

## 📥 Cloner le projet

```bash
git clone https://github.com/Montsy744/firefox-home.git
```

Puis :

```bash
cd firefox-home
```

Installer les dépendances :

```bash
npm install
```

---

# 🧑‍💻 Développement

Pour lancer le serveur de développement Vue :

```bash
npm run dev
```

Cette commande permet de travailler sur l'interface dans un navigateur classique.

Pour construire l'extension Firefox :

```bash
npm run build
```

Le build sera généré dans :

```text
dist/
```

---

# 🦊 Installer temporairement l'extension dans Firefox

Pendant le développement, l'extension peut être chargée directement dans Firefox sans passer par Mozilla Add-ons.

⚠️ **Cette installation est temporaire.**

L'extension sera supprimée de Firefox lorsque le navigateur sera complètement fermé.

## 1. Construire le projet

Depuis la racine du projet :

```bash
npm run build
```

Cela génère le dossier :

```text
dist/
```

---

## 2. Ouvrir la page de débogage de Firefox

Dans Firefox, ouvrir :

```text
about:debugging#/runtime/this-firefox
```

Ou :

**Menu → Outils supplémentaires → Outils de débogage**

---

## 3. Charger l'extension

Cliquer sur :

**Charger un module complémentaire temporaire…**

Puis sélectionner :

```text
dist/manifest.json
```

⚠️ Il faut sélectionner le fichier `manifest.json` situé dans **`dist/`**, et non celui présent dans `public/`.

---

## 4. Tester le nouvel onglet

Ouvrir un nouvel onglet avec :

```text
Ctrl + T
```

Firefox doit maintenant afficher **Firefox Home**.

---

## 🔄 Après une modification

Après avoir modifié le code :

```bash
npm run build
```

Puis retourner dans :

```text
about:debugging#/runtime/this-firefox
```

et recharger l'extension.

---

# ⚠️ Installation temporaire

L'installation via `about:debugging` est uniquement destinée au développement.

Si Firefox est complètement fermé puis relancé, l'extension temporaire n'est plus disponible.

Pour une installation permanente, l'extension devra être **signée par Mozilla** et installée comme une extension Firefox normale.

Cette étape sera réalisée lorsque le projet sera suffisamment avancé.

---

# 🎯 Objectif du projet

L'objectif final est de transformer le nouvel onglet Firefox en un **dashboard personnel intelligent**.

L'idée est de pouvoir ouvrir un nouvel onglet et retrouver immédiatement :

```text
                    🦊 Firefox Home

                         23:42
                   Dimanche 4 octobre


                 🔎 Rechercher...


       GitHub       Spotify       YouTube
       Discord      Gmail         Portfolio


    ┌─────────────────┐   ┌─────────────────┐
    │ 🔔 NOTIFICATIONS│   │ 🎵 SPOTIFY      │
    │                 │   │                 │
    │ GitHub      3   │   │ Now playing...  │
    │ Discord     2   │   │                 │
    └─────────────────┘   └─────────────────┘
```

Le projet a donc vocation à devenir plus qu'une simple page d'accueil : **un espace personnel regroupant les informations et services utilisés quotidiennement.**

---

## 📌 État du projet

🚧 **En développement**

Version actuelle : `1.0.0`

---

## 👨‍💻 Auteur

**Hugo Straseele**

GitHub : [@Montsy744](https://github.com/Montsy744)
