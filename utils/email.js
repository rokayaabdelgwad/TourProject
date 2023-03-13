const nodemailer = require('nodemailer');
const { options } = require('nodemon/lib/config');

const sendEmail = async(options) => {
  // 1) create a trasporter

  const  smtpConfig = {
    host:process.env.EMAIL_HOST,
      port:process.env.EMAIL_PORT,
      secure: false,
      auth:{
          user:process.env.EMAIL_USERNAME,
          pass:process.env.EMAIL_PASSWORD
      }
      // Activate in gmail "less secoure app" option 
};

const  transporter = nodemailer.createTransport(smtpConfig);
  // const trasporter= nodemailer.createTransport({
  //   host:process.env.EMAIL_HOST,
  //   port:process.env.EMAIL_PORT,
  //   auth:{
  //       user:process.env.EMAIL_USERNAME,
  //       pass:process.env.EMAIL_PASSWORD
  //   }
  //   // Activate in gmail "less secoure app" option 

  // })
  // // 2) Define email options
  
  const mailOptions={
    from:"rokaya abdelgwad <user@gmail.com>",
    to:options.email,
    subject:options.subject,
    text: options.message
  

  }
  // 3) Actually send the email


 await transporter.sendMail(mailOptions)
};

module.exports=sendEmail
