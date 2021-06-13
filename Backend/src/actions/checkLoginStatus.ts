import admin from '../middlewares/initFirebase'
 
 
 
const checkAuthStatus = async (req: any) => {


    if (req.headers.token) {
try{
      var data = await admin.auth().verifyIdToken(req.headers.token)
  req.body.uid = data.user_id
 req.body.role = data.role
      return true;

}

    catch(e)
    {
         
      return false;
    }
  } else {
    return false
  }
}

export default {checkAuthStatus};
