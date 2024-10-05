import nodemailer from 'nodemailer'


const emailAccount = process.env.MAIL_ACCOUNT;
const emailPassword = process.env.MAIL_PASSWORD;



 
  export const sendEmail = async (to,subject,html) => {
    try{
        
const transporter = nodemailer.createTransport({
    host:'smtp.gmail.com',
    port:465,
  
    auth: {
      user:emailAccount ,
      pass: emailPassword,
    },
  });
        const mailOptions = {
            from: emailAccount ,
            to: to,
            subject: `${subject} , MOVIE TICKET`,
            html: `<p>${html}</p>`
          };

          
         await  transporter.sendMail(mailOptions);
           console.log(to)
            return { success: true, messageId: info.messageId };
    }catch(error){
      
        return { success: false, error: error.message };
    }
  }