import admin from 'firebase-admin'

const serviceAccount = require('../config/fbServieAccountKey');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const checkAuth = async (req: any, res: any, next: any) => {
    if (req.header.authtoken) {
    admin.auth().verifyIdToken(req.headers.authtoken)
        .then(() => {
          next()
        }).catch(() => {
          return res.status(403).send('Unauthorized')
        });
    } 
    
    return res.status(403).send('Unauthorized')
}

export default checkAuth;
