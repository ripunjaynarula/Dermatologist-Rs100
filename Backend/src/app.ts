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
import prescriptions from './routes/medicinesRoute/getPrescriptions'
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
import help from './routes/utility/help';
import consultancyNoGateway from './routes/newConsultationNoGateway';
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
import acceptConsultationUserEnd from './routes/acceptConsultationUserEnd'
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
import uploadChatFile from './routes/chat/getFileUploadUrl'
import search from './routes/utility/search'
import settings from './routes/utility/settings'
import addAppointment from './routes/addAppointment'
import paytmPayment from './routes/paytm/payment'
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


const activeUsers = new Set();

io.on('connection',async (socket: any)=>{
    var id = socket.handshake.query.currentChat;
    var id = socket.handshake.query.currentChat;
   socket.join(id);
    console.log(id, "ID")

 
 
    socket.on('send', async (data: any, ) =>{
        var msgData = data.msgData
         let chats: any = await chat.findOne({chatId: msgData.chatId});
        if(chats){
            msgData.timestamp = Date.now()
            chats.updated_at = Date.now() 
            chats.lastMessage =  msgData.text
            chats.messages.push(msgData);
            chats.doctorRead = data.doctorRead
            chats.patientRead = data.patientRead
            try{
                await chats.save();
            }catch(e){
                console.log(e);
            }
        }
        socket.to(id).emit('new-message',msgData);
         io.to(id).emit('update', msgData);
    });

        socket.on('read', async (data: any, ) =>{
         try{
            console.log(data,'SSSSSSSSSSSSSSSSSSSSSS')
            let chats: any = await chat.updateOne({chatId: data.chatId},{$set : data.msg});
          }catch(e){
                console.log(e);
            }
     
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
app.use('/consultancy-no-gateway', checkAuth,consultancyNoGateway)
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

app.use('/get-upload-chatfile', checkAuth,uploadChatFile);
app.use('/search', checkAuth,search);
app.use('/add-appointment', checkAuth,addAppointment);

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
app.use('/accept-consultation-user', checkAuth, acceptConsultationUserEnd)
app.use('/blogs-limit', blogsLimit);
app.use('/prescriptions',checkAuth, prescriptions);

app.use('/settings',checkAuth, settings);

app.use('/paytm-payment',checkAuth, paytmPayment);

app.use('/help', checkAuth,help);

app.use('/video', viewSingleVideo);
app.use('/subscribe',checkAuth, subscribeNotif);
app.use('/service', service);

app.use('/like-video',  likeVideo);
app.use('/like-blog',  likeBlog);

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
