import nodemailer from 'nodemailer'

const sendMail = async  (to: any, subject:any, html: any, from : any) => {

    let transporter=nodemailer.createTransport({
        host:'smtp.hostinger.com',
        port:587,
        secure:false,
        auth:{
            user: process.env.MAIL,
            pass: process.env.MAIL_PASS
        },
        tls:{
            rejectUnauthorized:false
        }
    });

    let mailOptions = { 
        from: from, 
        to: to,
        subject: subject,
        html: html
    };
 console.log(mailOptions)
    try{
            var m = await transporter.sendMail(mailOptions)
        console.log(m)
        return true
    }catch(e)
    {
        console.log(e)
        return false
    } 
}


export default sendMail;
