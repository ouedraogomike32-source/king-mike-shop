# KING MIKE — Guide de mise en ligne

## 1. Créer la base de données (Firebase — gratuit)

1. Va sur https://console.firebase.google.com et connecte-toi avec un compte Google.
2. Clique sur "Ajouter un projet", donne-lui un nom, continue jusqu'à la fin.
3. Menu de gauche → Firestore Database → Créer une base de données → mode production → choisis une région proche.
4. Paramètres du projet (roue crantée) → Général → "Vos applications" → icône </> (Web) → donne un surnom → Enregistrer.
5. Copie les valeurs du firebaseConfig affiché.
6. Ouvre src/firebase.js et remplace les "REMPLACE_MOI" par tes vraies valeurs.

### Règles Firestore (pour démarrer)
Firestore → Règles → remplace par :

rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}

## 2. Mettre le site en ligne (Vercel — gratuit)

1. Va sur https://vercel.com, connecte-toi avec ton compte GitHub.
2. "Add New" → "Project" → choisis ce repository.
3. Laisse les réglages par défaut → Deploy.
4. Tu obtiens une adresse du type king-mike.vercel.app.
