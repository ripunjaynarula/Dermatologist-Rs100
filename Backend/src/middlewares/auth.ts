import admin from 'firebase-admin'

const serviceAccount = require('../config/fbServieAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const checkAuth = async (req: any, res: any, next: any) => {


  
  if (req.headers.token) {
    admin.auth().verifyIdToken(req.headers.token)
    .then((data)=>{

console.log(data)

      req.body.uid = data.user_id
      next();
    }).catch((e) => {
      console.log(e)
      return res.sendStatus(403);
    });
  } else {
    return res.sendStatus(403)
  }
}

export default checkAuth;
