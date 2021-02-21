import admin from 'firebase-admin'

const serviceAccount = require('../config/fbServiceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const checkAuth = async (req: any, res: any, next: any) => {
  if (req.body.tok) {
    admin.auth().verifyIdToken(req.body.tok)
    .then(()=>{
      next();
    }).catch((e) => {
      console.log(e)
      return res.send({status: false});
    });
  } else {
    return res.send({status: false})
  }
}

export default checkAuth;
