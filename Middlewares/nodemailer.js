const nodemailer = require('nodemailer')

const mailer = (email, otp) => {
    
    try {
      var transporter = nodemailer.createTransport({
        service: ' gmail ',
        port: 587,
        secure: false,
        auth: {
          user: 'web.sgtbimit@gmail.com',
          pass: process.env.Emailer_Password
        }
      });
      var mailOptions = {
        from: ' web.sgtbimit@gmail.com ',
        to: `<${email}>`,
        subject: ' Sent the Otp for password Change ',
        text: `${otp} is your One-Time Password (OTP) to complete reset your password.`,
      };
  
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('email sent ' + info.response);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  module.exports = mailer