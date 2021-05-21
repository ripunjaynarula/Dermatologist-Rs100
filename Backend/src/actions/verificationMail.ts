import nodemailer from 'nodemailer'

const sendVerificationMails = (email: any, token: string) => {

    let transporter=nodemailer.createTransport({
        host:'smtp.hostinger.com',
        port:587,
        secure:false,
        auth:{
            user: process.env.MAIL_ID,
            pass: process.env.MAIL_PASS
        },
        tls:{
            rejectUnauthorized:false
        }
    });

    let mailOptions = {
        from: `"Hello" ${process.env.MAIL_ID}`, 
        to: email,
        subject: 'Mediac Verification',
        html: `<p>Thank you for registering with Mediac. <a href="${process.env.API_URL}verify?token=${token}">Click here to verify your account.</a></p>`
    };
 
    transporter.sendMail(mailOptions,(error,info)=>{
        if(error){
            return console.log(error);
        }
        console.log(`Verification mail send to ${email}`);
    })

}


export default sendVerificationMails;
