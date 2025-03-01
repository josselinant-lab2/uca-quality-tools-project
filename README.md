# Projet de configuration d'un environnement de dev 

Le but de ce projet a été de partir d'un projet expressJS développé en JavaScript puis d'y ajouter des outils et autres bonnes pratiques pour avoir un environnement qui permet aux développeurs d'être le plus efficace possible.

Ce projet a été dévelopé par OULAHAL Bilal et ANTONY Josselin (groupe B1).

## Table des matières

- [Commit linting](#commit-linting)
- [Prettier](#prettier)
  - [Utilisation de Prettier](#utilisation-de-prettier)
- [ESLint](#eslint)
  - [Configuration d'ESLint](#configuration-deslint)
  - [Mise en place sur l'IDE](#mise-en-place-sur-lide)
- [TypeScript](#typescript)
- [Debugging (VS Code only)](#debugging-vs-code-only)
- [Autocannon](#autocannon)
- [Tests unitaires](#tests-unitaires)
- [Tests end-to-end](#tests-end-to-end)
- [Sentry](#sentry)
- [Pipeline GitHub Actions](#pipeline-github-actions)

## Commit linting

**CommitLint** et **Husky** ont été utilisé pour s'asurer que les noms de commit suivent cette syntaxe : 
```
<type>(<scope>): <description>
```
`type` et `description` sont obligatoires tandis que le `scope` est optionel. Les règles du linter sont basés sur la configuration conventionnel de Commitlint et peuvent être personnalisés depuis le fichier `.commitlintrc.ts`

Husky a comme rôle de lancer la vérification de CommitLint grâce au fichier `.husky/commit-msg`.

## Prettier

**Prettier** a été intégré pour s'assurer que le code soit homogène et lisible.
Les règles à respecter sont : 
- 4 espaces pour les indentations
- Point-virgule à la fin de chaque ligne
- Double quotes pour les chaînes de caractères
- Pas de virgule à la fin des objets et des tableaux
- Largeur de 180 caractères

> La configuration de Prettier peut être modifié depuis le fichier `.prettierrc` .

### Utilisation de Prettier

Prettier peut être executé pour modifier tous les fichiers grâce à cette commande :
```sh
npm run format
```

Prettier peut aussi être directement utilisé dans l'IDE pour formater à chaque sauvegarde d'un fichier.

Pour configurer VS code, veuillez suivre ces étapes :

- Installation de l'extension Prettier (pour VSCode: [extension Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode))
- Configurer Prettier comme formateur par défaut (étape faite par défaut grâce au fichier `.vscode/settings.json`)
- Activer le formatage automatique lors de l'enregistrement (étape faite par défaut grâce au fichier `.vscode/settings.json`)
- Configurer les paramètres de l'espace de travail

## ESLint

ESLint permet d'avoir une analyse statique du code pour corriger de potentielles erreurs.
Pour le lancer sur le code source du projet (dossier `src/`), veuillez exécuter une de ces commandes :

```sh
npm run lint
```

ou

```sh
npm run lint:fix
```

La première commande affiche les erreurs et warnings alors que la seconde tentera en plus de corriger certains problèmes (par exemple: des points virgules manquants).

### Configuration d'ESLint

La configuration du projet se base sur la configuration générale d'ESLint pour le Javascript et le TypeScript mais permet aussi d'ajouter de nouvelles règles.

La configuration peut être modifiée depuis le fichier `eslint.config.mjs` pour ajouter ou modifier des règles personnalisés.

### Mise en place sur l'IDE

Pour avoir les erreurs directement intégrées dans votre IDE, il faut :

1. Installer un plugin/extension sur votre IDE (pour VSCode: [extension ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint))
2. Installer les dépendances du projet :

```sh
npm install
```

3. Configurer votre plugin/extension pour l'adapter à votre besoin (par exemple, sur VSCode si vous voulez qu'ESLint puisse modifier vos fichiers, changez le paramètre `eslint.format.enable`)

Une fois ces étapes faites vous devriez avoir des indicateurs directement sur votre IDE de potentiels problèmes.

## TypeScript

Le projet a été converti en TypeScript pour faciliter l'analyse du code et le debugging depuis l'IDE. Il est intégré dans l'entiereté des autres outis utilisés sur le projet.

Des scripts npm ont été ajoutés pour exploiter TypeScript :

```sh
npm run tsc:build
```
Permet de créer un dossier `.output/` qui contient le code source transpilé en JavaScript.

```sh
npm run tsc:check
```
Permet de vérifier le typage du code source.

```sh
npm run dev
```
Permet de lancer le projet à l'aide de `nodemon` pour rester à l'écoute de changement dans le code source.

> La configuration de TypeScript peut être modifié depuis le fichier `tsconfig.json`.
>
> La configuration actuelle de `nodemon` est adapté à TypeScript et peut être modifié depuis le fichier `package.json`.


## Debugging (VS Code only)

Pour débugger le projet, il est possible d'utiliser le débuggeur de VS Code. Pour cela, il faut :

- S'assurer que le fichier `.vscode/launch.json` est bien présent (config personnalisé du débuggeur)
- Placer des points d'arrêts sur des fichiers
- Aller dans la section **Run and Debug**
- Sélectionner la configuration  `Node.js` -> `Launch with TypeScript`
- Démarrer le débuggeur

## Autocannon

**Autocannon** est un outil qui permet de mesurer la rapidité des routes du serveur et d'obtenir un rapport. Pour faire cela, il faut **lancer le serveur** puis exécuter autocannon avec la route à tester et la ccharge à appliquer.

### Test pour la page d'accueil

- Commande :

```sh
npx autocannon -c 50 -d 10 http://localhost:3009/
```

ou

```
npm run test:charge -- -c 50 -d 10 http://localhost:3009/
```

- Durée du test : 15 sec (temps moyens sur la page d'acccueil)
- Charge : 50 utilisateur simultané car page d'accueil
- Latence moyenne de 34.74 ms

### Test sur la liste des posts

- Commande :

```sh
npx autocannon -c 100 -d 20 http://localhost:3009/posts
```

ou

```
npm run test:charge -- -c 100 -d 20 http://localhost:3009/posts
```

- Durée du test : 20 sec (temps moyens)
- Charge : 100 utilisateurs simultanés
- Latence moyenne de 4122.64 ms

### Test sur la liste d'un post spécifique

- Commande :

```sh
npx autocannon -c 80 -d 15 http://localhost:3009/posts/1
```

ou

```
npm run test:charge -- -c 80 -d 15 http://localhost:3009/posts/1
```

Durée du test : 15 sec (temps moyens)
Charge : 80 utilisateurs simultanés
Latence moyenne de 83.16 ms

### Test sur la création de post

- Commande :

```sh
npx autocannon -c 30 -d 10 http://localhost:3009/posts/new
```

ou

```sh
npm run test:charge -- -c 40 -d 12 http://localhost:3009/posts/1/edit
```

- Durée du test : 10 sec (temps moyens)
- Charge : 30 utilisateurs simultanés
- Latence moyenne de 21.94 ms

### Test sur l'édition d'un post

- Commande :

```sh
npx autocannon -c 40 -d 12 http://localhost:3009/posts/1/edit
```

ou

```sh
npm run test:charge -- -c 40 -d 12 http://localhost:3009/posts/1/edit
```

- Durée du test : 12 sec (temps moyens)
- Charge : 40 utilisateurs simultanés
- Latence moyenne de 32.09 ms

## Tests unitaires

**Vitest** est utilisé pour les tests unitaires. Les tests se trouvent dans le dossier `test/unit/`.

> La configuration de Vitest peut être modifié depuis le fichier `vitest.config.ts`

Pour lancer les tests, veuillez exécuter cette commande :
```sh
npm run test:unit
```

Si vous souhaitez lancer les tests en mode **watch**, exécutez cette commande :
```sh
npm run test:unit-watch
```

## Tests end-to-end

**Playwright** est utilisé pour les tests end-to-end. Les tests se trouvent dans le dossier `test/e2e/`.

> La configuration de Playwright peut être modifié depuis le fichier `playwright.config.ts`

Pour lancer les tests, veuillez exécuter cette commande :
```sh
npm run test:e2e
```

Si vous souhaitez lancer les tests depuis une interface graphique, exécutez cette commande :
```sh
npm run test:e2e-ui
```

Vous pouvez aussi obtenir le rapport des tests avec cette commande :
```sh
npm run test:e2e-report
```

## Sentry

**Sentry** est utilisé pour permettre d'obtenir des logs complets d'erreurs.

### Connexion au compte Sentry du projet

Aller sur le site de [Sentry](https://sentry.io/welcome/) puis connectez vous avec ces identifants :

**Identifiant** : josselinantony16@gmail.com

**Mot de passe** : #Dunkerdox.42

À partir de là vous aurez accès aux logs d'erreurs.

### Configuration de Sentry

Le fichier `instrument.ts` permet d'initialiser le SDK et de configurer Sentry pour ce projet. On doit y voir une clé DSN que l'on récupère lors de la création du projet sur Sentry.

> Pour tester Sentry, une erreur est automatiquement renvoyé dans le cas où on envoye une requête GET sur cette route : http://localhost:3009/debug-sentry (penser à lancer le serveur).
> Cette route est définie dans le fichier `index.ts`.
>
> Une fois l'erreur reçue, allez sur la page Sentry du projet pour avoir des infos détaillées sur l'erreur.

## Pipeline GitHub Actions

Le projet a été configuré pour qu'à chaque modification faite sur les branches **main** ou **develop** du dépôt distant, une pipeline soit lancée pour s'assurer qu'il n'y ait pas d'erreurs avec le linter ou les tests. 

> Les tests e2e ne fonctionnent pas à 100%. Des erreurs sont présentes dans les fichiers testant l'ajout et modification de posts.
>
> Pour ne pas bloquer toute la pipeline, nous avons décidé de temporairement autoriser la pipeline à continuer même en cas d'erreur (grâce à `continue-on-error: true`)
