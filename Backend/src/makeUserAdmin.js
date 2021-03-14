var admin = require("firebase-admin");



const serviceAccount = require('./config/fbServiceAccountKey.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

admin.auth().getUserByEmail("sarthak2singhal@gmail.com")
    .then(function(userRecord) {
        // See the UserRecord reference doc for the contents of userRecord.
        console.log("Successfully fetched user data:", userRecord.toJSON());


        admin
            .auth()
            .setCustomUserClaims(userRecord.uid, {
                role: "admin"
            })
            .then((b) => {
                console.log("UPDATED ROLE")
            })
            .catch((error) => {
                console.log('Error updating user:', error);
            });



    })
    .catch(function(error) {
        console.log("Error fetching user data:", error);
    });