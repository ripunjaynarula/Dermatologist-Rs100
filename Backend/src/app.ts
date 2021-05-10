require('dotenv').config()
require('./models/dbinit');

import express from 'express';
import http from 'http';
import session from 'express-session';
import bodyParser from 'body-parser'
import patientSignup from './routes/patientSignup'
import login from './routes/login'
import webPush from 'web-push';
import path from 'path';
import adminRouter from './routes/admin';
import verifyRouter from './routes/verify';
 import getActiveConsultationRouter from './routes/getActiveConsultation';
import cors from 'cors'
import checkAuth from './middlewares/auth'
import newConsultancyRouter from './routes/newConsultancy';
import newProfileRouter from './routes/addNewProfile';
import getProfiles from './routes/getProfiles';
import addBlog from './routes/blogs/addBlog'
import delBlog from './routes/blogs/deleteBlog'
import getRandomBlogsAndVideos from './routes/blogs/blogsAndVideos'
import viewBlogs from './routes/blogs/viewBlogs'
import viewBlog from './routes/blogs/viewBlog'
import allVideos from './routes/videos/viewVideosPublic'
import myVideos from './routes/videos/viewVideosPrivate'
import delVideo from './routes/videos/deleteVideo'
import service from './routes/sendServiceWorker'

import addPrescription from './routes/medicinesRoute/add'
import searchMed from './routes/medicinesRoute/search'

import checkConsultationStatus from './routes/checkConsultationStatus';
import profilePictureUpload from './routes/profile/getProfilePictureUploadUrl'
import profilePictureDoctorSave from './routes/profile/saveDoctorProfileImage'
import profilePicturePatientSave from './routes/profile/savePatientProfileImage'
import updatePatientProfile from './routes/profile/updatePatientProfile'
import updateDoctorProfile from './routes/profile/updateDoctorProfile'
import addYtVideo from './routes/videos/addVideo'
import viewPatientProfile from './routes/profile/viewPatientProfile'
import viewDocProfilePvt from './routes/profile/viewDoctorProfilePrivate'
import resendEmail from './routes/resendVerificationMail'

import viewDoctorProfile from './routes/profile/viewDoctorProfile'
import verifyDocLogin from './routes/verifyDocLogin';
import docDetailsRouter from './routes/getDocDetails';
import adminLogin from './routes/adminLogin';
import verifyAdmin from './routes/verifyAdmin';
import viewSingleVideo from './routes/videos/viewVideoSingle';
import likeVideo from './routes/videos/likeVideo';
import subscribeNotif from './routes/subscribe';
import razorpayRoute from './routes/razorpay';
import acceptConsultations from './routes/acceptConsultation';
import getChats from './routes/getChats';
import getChatById from './routes/getChatById'
import chat from './models/chat'
import archive from './routes/archive';
import doctorSignup from './routes/doctorSignup';
import myBlogs from './routes/blogs/myBlogs';
import blogsLimit from './routes/blogs/limitBlogs';
import getImageUploadUrl from './routes/getImageUploadUrl';
import cancelConsultationRouter from './routes/cancelConsultation';
import likeBlog from './routes/blogs/blogLike';

const app = express();
const server = http.createServer(app);

const io = require('socket.io')(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
    }
  });

const port: any = process.env.PORT
const session_secret: any = process.env.SESSION_SECRET

app.use('/admin',adminRouter);
app.use(cors())
declare module 'express-session' {
    export interface SessionData {
        token: string;
    }
}
app.use(express.static(path.join(__dirname, "client")));
app.use(session({ secret: session_secret, saveUninitialized: true, resave: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



io.on('connection', (socket: any)=>{
    const id = socket.handshake.query.currentChat;
    socket.join(id);
    console.log(id)
    socket.on('send', async (msgData: any, ) =>{
        let chats: any = await chat.findOne({chatId: id});
        if(chats){
            msgData.timestamp = Date.now()
            chats.updated_at = Date.now()
            chats.lastMessage =  msgData.text
             chats.messages.push(msgData);
            try{
                 await chats.save();
             }catch(e){
                console.log(e);
            }
        }
        socket.to(id).emit('new-message',msgData);
        io.to(id).emit('update', msgData);
    });
});

const publicVapidKey: any = process.env.WEB_PUSH_PUBLIC;
const privateVapidKey: any = process.env.WEB_PUSH_PRIVATE;

webPush.setVapidDetails(
  "mailto:cr7shivanshsharma@gmail.com",
   publicVapidKey,
   privateVapidKey
);

app.use('/patientSignup', patientSignup);
app.use('/login', login);

app.use('/verify', verifyRouter);


app.use('/myvideos',checkAuth, myVideos);
app.use('/delete-video',checkAuth, delVideo);
app.use('/getActiveConsultation',checkAuth, getActiveConsultationRouter);
app.use('/newConsultancy', checkAuth, newConsultancyRouter);
app.use('/addNewProfile', checkAuth, newProfileRouter);
app.use('/getProfiles',checkAuth, getProfiles);
app.use('/verifyDoc', verifyDocLogin);

app.use('/get-image-upload-url', checkAuth, getImageUploadUrl);

app.use('/get-profile-upload-url', checkAuth, profilePictureUpload);
app.use('/save-patient-profile-image', checkAuth, profilePicturePatientSave);
app.use('/save-doctor-profile-image', checkAuth, profilePictureDoctorSave);
app.use('/update-patient-profile', checkAuth, updatePatientProfile);
app.use('/update-doctor-profile', checkAuth, updateDoctorProfile);
app.use('/add-blog', checkAuth, addBlog);
app.use('/add-video', checkAuth, addYtVideo);
app.use('/patient-profile', checkAuth, viewPatientProfile);
app.use('/my-profile', checkAuth, viewDocProfilePvt);
app.use('/search-med', checkAuth, searchMed);
app.use('/add-prescription', checkAuth, addPrescription);
app.use('/resend-verification', checkAuth,resendEmail);


app.use('/doctor-profile',  viewDoctorProfile);
app.use('/getDocDetails', docDetailsRouter);
app.use('/adminLogin', adminLogin);
app.use('/verifyAdmin', verifyAdmin);
app.use('/doctorSignup', doctorSignup);
app.use('/get-sidebar', getRandomBlogsAndVideos);
app.use('/blogs', viewBlogs);
app.use('/blog', viewBlog);
app.use('/videos', allVideos);

app.use('/my-blogs',checkAuth, myBlogs);
app.use('/delete-blog',checkAuth, delBlog);

app.use('/blogs-limit', blogsLimit);



app.use('/video', viewSingleVideo);
app.use('/subscribe',checkAuth, subscribeNotif);
app.use('/service', service);

app.use('/like-video', checkAuth, likeVideo);
app.use('/like-blog', checkAuth, likeBlog);

app.use('/razorpay', checkAuth, razorpayRoute);
app.use('/acceptConsultation', acceptConsultations);
app.use('/getChatData', checkAuth, getChats);
app.use('/getChatById', checkAuth,getChatById);
app.use('/getConsultationStatus',checkAuth, checkConsultationStatus);
app.use('/toggleArchive', checkAuth, archive);
app.use('/cancelConsultation', checkAuth, cancelConsultationRouter);


server.listen(port, () => {
    console.log(`Express server listening on port ${port}`);
});
