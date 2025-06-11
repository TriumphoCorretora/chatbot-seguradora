const admin = require('firebase-admin');

const serviceAccount = require('./firebase-config.json'); // você deve obter esse arquivo no Firebase Console

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://<SEU-PROJETO>.firebaseio.com'
});

const db = admin.firestore();

module.exports = { db };