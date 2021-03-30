require('dotenv').config()
require('./models/dbinit');

import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser'
import patientSignup from './routes/patientSignup'
import login from './routes/login'
import webPush from 'web-push';
import path from 'path';

import adminRouter from './routes/admin';
import verifyRouter from './routes/verify';
import checkVerificationRouter from './routes/checkVerification';
import getActiveConsultationRouter from './routes/getActiveConsultation';
import cors from 'cors'
import checkAuth from './middlewares/auth'
import newConsultancyRouter from './routes/newConsultancy';
import newProfileRouter from './routes/addNewProfile';
import getProfiles from './routes/getProfiles';
import addBlog from '../src/routes/blogs/addBlog'
import getRandomBlogsAndVideos from './routes/blogs/blogsAndVideos'
import viewBlogs from './routes/blogs/viewBlogs'

import blogs from './models/blog';
import profilePictureUpload from './routes/profile/getProfilePictureUploadUrl'
import profilePictureDoctorSave from './routes/profile/saveDoctorProfileImage'
import profilePicturePatientSave from './routes/profile/savePatientProfileImage'
import updatePatientProfile from './routes/profile/updatePatientProfile'
import updateDoctorProfile from './routes/profile/updateDoctorProfile'
import addYtVideo from './routes/videos/addVideo'
import viewPatientProfile from './routes/profile/viewPatientProfile'
import viewDoctorProfile from './routes/profile/viewDoctorProfile'
import verifyDocLogin from './routes/verifyDocLogin';
import docDetailsRouter from './routes/getDocDetails';
import adminLogin from './routes/adminLogin';
import doctorSignup from './routes/doctorSignup';
import verifyAdmin from './routes/verifyAdmin';
import viewSingleVideo from './routes/videos/viewVideoSingle';
import likeVideo from './routes/videos/likeVideo';


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
app.use('/login', login);

app.use('/verify', verifyRouter);
 app.use('/getActiveConsultation',checkAuth, getActiveConsultationRouter);
app.use('/newConsultancy', checkAuth, newConsultancyRouter);
app.use('/addNewProfile', checkAuth, newProfileRouter);
app.use('/getProfiles',checkAuth, getProfiles);
app.use('/verifyDoc', verifyDocLogin);
app.use('/get-profile-upload-url', checkAuth, profilePictureUpload);
app.use('/save-patient-profile-image', checkAuth, profilePicturePatientSave);
app.use('/save-doctor-profile-image', checkAuth, profilePictureDoctorSave);
app.use('/update-patient-profile', checkAuth, updatePatientProfile);
app.use('/update-doctor-profile', checkAuth, updateDoctorProfile);
app.use('/add-blog', checkAuth, addBlog);
app.use('/add-video', checkAuth, addYtVideo);
app.use('/patient-profile', checkAuth, viewPatientProfile);
app.use('/doctor-profile',  viewDoctorProfile);
app.use('/getDocDetails', docDetailsRouter);
app.use('/adminLogin', adminLogin);
app.use('/verifyAdmin', verifyAdmin);
app.use('/doctorSignup', doctorSignup);
app.use('/get-sidebar', getRandomBlogsAndVideos);
app.use('/blogs', viewBlogs);
app.use('/video', viewSingleVideo);
app.use('/like-video', checkAuth, likeVideo);




app.get('/', (req, res) => {
    return res.send('Hello world!');
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});