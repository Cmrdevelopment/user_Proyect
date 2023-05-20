// Está función genera un código random entre el 100000 y el 999999 para generar la contraseña

const randomCode = () => {
  let code = Math.floor(Math.random() * (999999 - 100000) + 100000);
  return code;
};

// exporto la función a user.controllers.js
module.exports = randomCode;
