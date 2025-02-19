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

# Degugger avec inspect

Il faut aller dans le débuggage de VS code

Ensuite choisir la configuration `Node.js`

Chosiir `Run Script:debug`

Lancer le debugage

Mettre breakingpoint pour voir les valerus des varaibles au point d'arrêt.

# Utilisation de autocannon

Lancer le serveur

Test pour la page d'accueil
Commande :
`npx autocannon -c 50 -d 10 http://localhost:3009/`
Durée du test : 15 sec (temps moyens sur la page d'acccueil)
Charge : 50 utilisateur simultané car page d'accueil
Latence moyenne de 34.74 ms

Test sur la liste des posts
Commande :
`npx autocannon -c 100 -d 20 http://localhost:3009/posts`
Durée du test : 20 sec (temps moyens)
Charge : 100 utilisateurs simultanés
Latence moyenne de 4122.64 ms

Test sur la liste dun post spécifique
Commande :
`npx autocannon -c 80 -d 15 http://localhost:3009/posts/1`
Durée du test : 15 sec (temps moyens)
Charge : 80 utilisateurs simultanés
Latence moyenne de 83.16 ms

Test sur la création de post
Commande :
`npx autocannon -c 30 -d 10 http://localhost:3009/posts/new`
Durée du test : 10 sec (temps moyens)
Charge : 30 utilisateurs simultanés
Latence moyenne de 21.94 ms

Test sur l'édition d'un post
Commande :
`npx autocannon -c 40 -d 12 http://localhost:3009/posts/1/edit`
Durée du test : 12 sec (temps moyens)
Charge : 40 utilisateurs simultanés
Latence moyenne de 32.09 ms
