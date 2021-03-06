# iti-network


## Démarrage
- `WINDOWS SEULEMENT`: exécuter `npm install -g webpack webpack-dev-server typescript`
- exécuter `npm install` pour installer les modules
- exécuter `npm start` pour lancer le serveur de développement
- lancer le serveur node iti-network-server
- ouvrir chrome à l'adresse [`http://localhost:3000`](http://localhost:3000)

## Outils
- installer le plugin chrome [augury](https://chrome.google.com/webstore/detail/augury/elgalmkoelokbchhkhacckoklkejnhcd)
- installer le plugin (VS CODE) [angular2-snipet](https://marketplace.visualstudio.com/items?itemName=johnpapa.Angular2)
- installer le plugin (VS CODE) [angular2-snipet](https://plugins.jetbrains.com/idea/plugin/8395-angular-2-typescript-live-templates)

## TP

### Login

#### Level I

1. Faire le formulaire de login                                             OK
2. Rendre username et le mot de passe obligatoire                           OK
3. Rediriger l'utilisateur sur /                                            OK

#### Level II

4. Afficher les messages d'erreurs de validation pour chaque champs         OK
5. Afficher un message si le login à échoué                                 OK

### Register

#### Level I

1. Faire le formulaire pour l'ajout d'un user                                    OK
2. Rendre username et le mot de passe obligatoire                                OK
3. En cas de succès, rediriger l'utilisateur sur /login                          OK

#### Level II
4. Afficher les messages d'erreurs de validation  pour chaque champs            OK
5. Gérer les username déjà utilisés                                             OK


### Channel

#### Level I

1. Afficher la liste des channels dans le menu                                    OK
2. Pouvoir créer un nouveau channel                                               OK       
3. Naviguer sur un channel au clic dans le menu                                   OK

#### Level II

4. Sélectionner par défaut le premier channel de la liste                       OK       
5. Ajouter les nouveaux channels dynamiquement                                  OK

### Post 

### Level I

1. Afficher les postes reçues pour le channel courant                             OK
2. Afficher l'auteur des messages                                                 OK
3. Afficher la date du postes                                                     OK
4. Insérer les nouveaux postes reçues via WebSocket                               OK             
5. Afficher une image si le message contient une url vers une image               OK
6. Afficher une video si le message contient une url vers une vidéo               OK
        (https://www.html5rocks.com/en/tutorials/video/basics/devstories.mp4)
7. Afficher le player de youtube si le message contient un lien youtube         !!! marche pas !!!
8. Ajouter le bouton like                                                         OK

### Level II
9. Retirer les urls des messages parsés pour ne restituer que son contenu 

### Level III
10. Pouvoir parser plusieurs type de contenus dans un seul poste
11. Remplacer les liens http par des balises <a>...</a>.

### Commentaires

### Level I
1. Pouvoir commenter un poste                                                    OK
2. Afficher les commentaires d'un poste                                          OK
3. Afficher l'auteur du commentaires                                             OK
4. Insérer les nouveaux commentaires reçues via WebSocket                        OK

### Level II
5. Parser les commentaires comme les postes : extraire les images, vidéos...     OK

### Activités et notifications 

### Level I
1. Créer un NotificationService                                                             OK
2. Lister les activités dans le menu à droite                                               OK
3. Ajouter une activté lors d'un nouveau poste via le NotificationService                   OK
4. Ajouter une activté lors d'un commentaire sur un poste via le NotificationService        OK
5. Ajouter une activté lorsqu'un membre se connecte via le NotificationService              OK
6. Ajouter une activité lors d'un like via le NotificationService                           OK
7. Ajouter une activité lors de l'ajout d'un channel via le NotificationService             OK

### Level II
8. Afficher une popup de notification avec [angular2-notifications](https://github.com/flauc/angular2-notifications)
9. Persister les activités dans le [localStorage](https://developer.mozilla.org/fr/docs/Web/API/Window/localStorage)

### Level III
10. utiliser [angular2-notifications](https://github.com/flauc/angular2-notifications) pour afficher des notifications avec chrome
11. Si l'activité concerne un poste (nouveau poste, commentaire sur un poste, like d'un poste) rendre l'activité clicable. 
Le clic doit rediriger sur le bon channel et scroller jusqu'au poste concerné


### Reminder

- Tous les composants ajoutés doivent être réexportés dans src/app/components/index.ts
- les composants créer (via snipet) ne doivent pas avoir de moduleId
- documentation [angular](https://angular.io/docs/ts/latest/)
- tous services créé doit être ajouter au providers dans src/app/app.module.ts