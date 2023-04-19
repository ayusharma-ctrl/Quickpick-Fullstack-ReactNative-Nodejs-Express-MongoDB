import { createTransport } from "nodemailer";


export const sendMail = async(email,subjectLine,message) => {

    var transport = createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS
        }
      });


      await transport.sendMail({
        from: process.env.MAIL_USER,
        to: email,
        subject: subjectLine,
        text: message
      })

}