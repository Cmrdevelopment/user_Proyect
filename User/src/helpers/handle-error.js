// Este archivo nos ayuda a controlar los errores y a que podamos lanzarlos correctamente
// Recibe el codigo del error y el mensaje

const setError = (code, message) => {
  const error = new Error();
  error.code = code;
  error.message = message;
  return error;
};
module.exports = setError;
