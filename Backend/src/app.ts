require('dotenv').config()
require('./models/dbinit');

import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser'
import patientSignup from './routes/patientSignup'
import adminRouter from './routes/admin';
import verifyRouter from './routes/verify';
import checkVerificationRouter from './routes/checkVerification';
import getActiveConsultationRouter from './routes/getActiveConsultation';
import cors from 'cors'
import checkAuth from './middlewares/auth'
import newConsultancyRouter from './routes/newConsultancy';
import newProfileRouter from './routes/addNewProfile';
import getProfiles from './routes/getProfiles';
import doctorLogin from './routes/doctorLogin';
import addBlog from '../src/routes/blogs/addBlog'
import blogs from './models/blog';
const app = express();

const port = process.env.PORT
const session_secret: any = process.env.SESSION_SECRET

app.use('/admin',adminRouter);
app.use(cors())
declare module 'express-session' {
    export interface SessionData {
        token: string;
    }
}
app.use(session({ secret: session_secret, saveUninitialized: true, resave: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/patientSignup', patientSignup);
app.use('/verify', verifyRouter);
app.use('/checkVerification', checkVerificationRouter);
app.use('/getActiveConsultation',checkAuth, getActiveConsultationRouter);
app.use('/newConsultancy', checkAuth, newConsultancyRouter);
app.use('/addNewProfile', checkAuth, newProfileRouter);
app.use('/getProfiles',checkAuth, getProfiles);
app.use('/doctorLogin', doctorLogin);




app.use('/add-blog', checkAuth, addBlog);





app.get('/', (req, res) => {
    return res.send('Hello world!');
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});