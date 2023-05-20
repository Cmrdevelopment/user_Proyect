const dotenv = require('dotenv'); // Traemos el .env, el usuario y contraseña. Es lo que permite asignar variables que queremos ocultar como usuarios y contraseñas en .env
const nodemailer = require('nodemailer'); // Libreria para el envio de correos

dotenv.config();

const sendEmail = (userEmail, name, confirmationCode) => {
  setTestEmailSend(false);
  const email = process.env.EMAIL;
  const password = process.env.PASSWORD;

  // Creamos un transporter para traernos usuario y contraseña
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: email,
      pass: password,
    },
  });

  const mailOptions = {
    from: email,
    to: userEmail,
    subject: 'Confirmation code',
    text: `tu codigo es ${confirmationCode}, gracias por confiar en nosotros ${name}`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      setTestEmailSend(false);
    } else {
      console.log('Email sent: ' + info.response);
      setTestEmailSend(true);
    }
  });
};

module.exports = sendEmail;
