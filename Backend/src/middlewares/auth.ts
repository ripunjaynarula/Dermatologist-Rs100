import admin from "./initFirebase";

import jwt from "jsonwebtoken";
import sendVerificationMails from "../actions/verificationMail";

const checkAuth = async (req: any, res: any, next: any) => {
  if (req.headers.token) {
    console.log("cjecking")
    admin
      .auth()
      .verifyIdToken(req.headers.token)
      .then((data) => {
        req.body.uid = data.user_id;
        req.body.role = data.role;
        req.body.email = data.email;
        console.log(req.body)
        if (data.role == "patient") {
          if (!data.emailVerified) {
          }
        }
        next();
      })
      .catch((e) => {
        console.log(e);
        return res.sendStatus(403);
      });
  } else {
    return res.sendStatus(403);
  }
};

export default checkAuth;
