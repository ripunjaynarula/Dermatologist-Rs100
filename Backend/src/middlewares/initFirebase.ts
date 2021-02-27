import admin from 'firebase-admin'
const serviceAccount = require('../config/fbServiceAccountKey.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

export default admin;
