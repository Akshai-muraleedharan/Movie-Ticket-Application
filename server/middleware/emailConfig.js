import nodemailer from 'nodemailer'


const emailAccount = process.env.MAIL_ACCOUNT;
const emailPassword = process.env.MAIL_PASSWORD;



 
  export const sendEmail = async ( adminEmail,to,subject,html) => {
    try{
        console.log(adminEmail,to,subject,html)
const transporter = nodemailer.createTransport({
    host:'smtp.gmail.com',
    port:465,
  
    auth: {
      user:  adminEmail || emailAccount ,
      pass: emailPassword,
    },
  });
        const mailOptions = {
            from: adminEmail || emailAccount ,
            to: to,
            subject: `${subject} , MOVIE TICKET`,
            html: `<p>${html}</p>`
          };

          
      const info =    await  transporter.sendMail(mailOptions);
        console.log(info)
            return { success: true, messageId: info.messageId };
    }catch(error){
      
        return { success: false, error: error.message };
    }
  }