import admin from '../middlewares/initFirebase'
const serviceAccount = require('../../fbServiceAccountKey.json')


 
const changeNameFirebaseAuth = async(req: any, name : string) => {

    admin
  .auth()
  .updateUser(req.body.uid, {
    
    displayName: name,
   })
  .then((userRecord) => {
    // See the UserRecord reference doc for the contents of userRecord.
    console.log('Successfully updated user', userRecord.toJSON());
  })
  .catch((error) => {
    console.log('Error updating user:', error);
  });


   
}


const changeNamePhoneFirebaseAuth = async(req: any, name : string, phone : string) => {

    admin
  .auth()
  .updateUser(req.body.uid, {
        phoneNumber: phone,

    displayName: name,
   })
  .then((userRecord) => {
    // See the UserRecord reference doc for the contents of userRecord.
    console.log('Successfully updated user', userRecord.toJSON());
  })
  .catch((error) => {
    console.log('Error updating user:', error);
  });


   
}



const changeNamePhoneAccessFirebaseAuth = async(req: any, name : string, phone : string, role: string) => {
 
    admin
  .auth()
  .updateUser(req.body.uid, {
        phoneNumber: phone,

    displayName: name,
   })
  .then((userRecord) => {



                        admin
            .auth()
            .setCustomUserClaims(req.body.uid, {
                role
            })
            .then((b) => {

            })
            .catch((error) => {
                console.log('Error updating user:', error);
            }); 





    console.log('Successfully updated user', userRecord.toJSON());
  })
  .catch((error) => {
    console.log('Error updating user:', error);
  });


   
}


const changeEmailVerificationStatus = async(uid: any,) => {
 
       admin
  .auth()
  .updateUser(uid, {
    
    emailVerified: true,
   })
  .then((userRecord) => {
    // See the UserRecord reference doc for the contents of userRecord.
    console.log('Successfully updated user', userRecord.toJSON());
  })
  .catch((error) => {
    console.log('Error updating user:', error);
  });




   
}




const changeNameAccessFirebaseAuth = async(req: any, name : string,  role: string) => {
 
    admin
  .auth()
  .updateUser(req.body.uid, {

    displayName: name,
   })
  .then((userRecord) => {



                        admin
            .auth()
            .setCustomUserClaims(req.body.uid, {
                role
            })
            .then((b) => {

            })
            .catch((error) => {
                console.log('Error updating user:', error);
            }); 





   })
  .catch((error) => {
    console.log('Error updating user:', error);
  });


   
}


const changeProfilePicture = async(req: any, imageUrl : string) => {

    admin
  .auth()
  .updateUser(req.body.uid, {
    
    photoURL: imageUrl,
   })
  .then((userRecord) => {
    // See the UserRecord reference doc for the contents of userRecord.
    console.log('Successfully updated user', userRecord.toJSON());
  })
  .catch((error) => {
    console.log('Error updating user:', error);
  });


   
}



const createDoctor = async(name: string, password : string, email : string, imageUrl : string) => {

try{

   var userRecord =  await  admin
  .auth()
  .createUser( {
    
 email: email,
    emailVerified: true,
     password: password,
    displayName: name,
    photoURL: imageUrl,   
    })



 console.log('Successfully updated user', userRecord.toJSON());

    return {data : userRecord, error : false};
}
 
 catch(e){
   console.log('Error updating user:', e);
    return {data: e, error : true};
 }

   
}

const changeAccess = async(role : string, uid : string)=>{
  admin
            .auth()
            .setCustomUserClaims(uid, {
                role
            })
            .then((b) => {

            })
            .catch((error) => {
                console.log('Error updating user:', error);
            }); 

}

const deleteUser = async(uid : string) =>
{

  try{
var s =    await admin.auth().deleteUser(uid)

  }catch(e)
  {
    console.log(e)
  }

}


export default {changeNameFirebaseAuth, changeNamePhoneFirebaseAuth, changeNamePhoneAccessFirebaseAuth, changeNameAccessFirebaseAuth, changeProfilePicture, changeEmailVerificationStatus, createDoctor, changeAccess, deleteUser};