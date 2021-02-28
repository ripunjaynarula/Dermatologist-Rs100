import admin from '../middlewares/initFirebase'
 
 
 
const checkAuthStatus = async (req: any) => {


    if (req.headers.token) {
    admin.auth().verifyIdToken(req.headers.token)
    .then((data)=>{
     req.body.uid = data.user_id
    return true;

     }).catch((e) => {
      console.log(e)
      return false;
    });
  } else {
    return false
  }
}

export default {checkAuthStatus};
