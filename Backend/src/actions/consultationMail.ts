import nodemailer from 'nodemailer'

const sendConsultationMail = (email: any, url:any, patientName: any, question : any , time : any) => {

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
        subject: 'New Consultation',
        html: `<p>New consultaion request.</p>
        <br/>
        <p>Issue - ${question}</p>
        <br/>
        <p>Name - ${patientName} </p><br/>
        <p>Time - ${time}</p>
<p> 
         <a href="${url}">Click here to accept and start this consultaion.</a></p>`
    };
 
    transporter.sendMail(mailOptions,(error,info)=>{
        if(error){
            return console.log(error);
        }
        console.log(`Verification mail send to ${email}`);
    })

}


export default sendConsultationMail;
