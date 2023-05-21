const { isAuth, isAuthAdmin } = require('../../middleware/auth.middleware');
const { upload } = require('../../middleware/files.middleware');
const {
  register,
  registerSlow,
  sendCode,
  registerWithRedirect,
  login,
  changePassword,
  sendPassword,
  modifyPassword,
  update,
  deleteUser,
} = require('../controllers/user.controllers');

// Hacemos la constante y configuramos las routes de la aplicación, 2 formas: 1 linea ó 2 lineas
// 1ª forma
//const UserRoutes = require('express').Router();

// 2ª forma
// Traemos la libreria para hacer el servidor web, hacer peticiones al HTTP, se utiliza para crear api y para manejar las rutas
const express = require('express');
// Aquí estamos configurando el routes de la aplicación
const UserRoutes = express.Router();

UserRoutes.get('/register', upload.single('image'), registerWithRedirect);
UserRoutes.post('/register', upload.single('image'), registerSlow);
UserRoutes.get('/forgotpassword', changePassword);
UserRoutes.post('/login', login);
UserRoutes.patch('/changepassword', [isAuth], modifyPassword);
UserRoutes.patch('/update/update', [isAuth], upload.single('image'), update);
UserRoutes.delete('/', [isAuth], deleteUser);

//!---------------- REDIRECT-------------------------------

UserRoutes.get('/register/sendMail/:id', sendCode);
UserRoutes.get('/sendPassword/:id', sendPassword);
module.exports = UserRoutes;
