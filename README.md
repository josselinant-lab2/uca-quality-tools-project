## Utilisation de Prettier

Les règles à respecter :
-4 espaces pour les indentations
-Point-virgule à la fin de chaque ligne
-Double quotes pour les chaînes de caractères - Pas de virgule à la fin des objets et des tableaux - Largeur de 180 caractères

### Configuration de Prettier

La configuration de Prettier se trouve dans le fichier `.prettierrc`

## Script de formatage

Un script de formatage a été ajouté dans package.json

## Configuration de l'IDE pour le formatage automatique

Pour configurer VS code pour le formatage nous avons suivis ces étapes :

    -Installation de l'extension Prettier
    -Configurer Prettier comme formateur par défaut
    -Activer le formatage automatique lors de l'enregistrement
    -Configurer les paramètres de l'espace de travail

## Utilisation d'ESLint

ESLint permet d'avoir une analyse statique du code pour corriger de potentielles erreurs.
Pour le lancer sur le code source du projet (dossier `src/`), il faut exécuter une de ces commandes :

```sh
npm run lint
```
ou
```sh
npm run lint:fix
```

La première commande affiche les erreurs et warnings alors que la seconde tentera en plus de corriger certains problèmes (par exemple: des points virgules manquants)

### Configuration d'ESLint

La configuration se base sur la configuration générale d'ESLint pour le Javascript et le TypeScript mais permet aussi d'ajouter de nouvelles règles.
La configuration peut être modifié depuis le fichier `eslint.config.mjs` pour ajouter ou modifier des règles personnalisés.

### Mise en place sur l'IDE

Pour avoir les erreurs directement intégrées dans votre IDE, il faut :
1. Installer un plugin/extension sur votre IDE (pour VSCode: [extension ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint))
2. Installer les dépendances du projet : `npm install`
3. Configurer votre plugin/extension pour l'adapter à votre besoin (par exemple, sur VSCode si vous voulez qu'ESLint puisse modifier vos fichiers, changez le paramètre `eslint.format.enable`)

Une fois ces étapes faites vous devriez avoir des indicateurs directement sur votre IDE de potentiels problèmes.
