//! creamos el servidor web
// instalar esto npm i bcrypt cloudinary cors dotenv express jsonwebtoken mongoose multer multer-storage-cloudinary nodemailer validator
// instalar dependencias de desarrollo: npm -D i eslint eslint-config-prettier jest nodemon prettier supertest

const { configCloudinary } = require('./src/middleware/files.middleware'); // es donde almacenamos las imagenes
const { connect } = require('./src/utils/db'); // es la conexión de la Base de Datos
const express = require('express'); // libreria para hacer el servidor web, hacer peticiones al HTTP, se utiliza para crear api y para manejar las rutas
const dotenv = require('dotenv'); // Traemos el .env, es lo que permite asignar variables que queremos ocultar como usuarios y contraseñas en .env
dotenv.config();

// ------ TRAERNOS EL PORT
const BASE_URL = process.env.BASE_URL;

//! conectamos con la base de datos
// ------ CREAR EL SERVER WEB, CONECTAR LA DB  y configurar cloudinary
connect();
const app = express();
configCloudinary();
const PORT = process.env.PORT;

//! configurar las cors QUE SON LOS LIMITES AL ACCESO DE NUESTRA API, debe estar debajo de crear el servidor
const cors = require('cors');

app.use(
  cors({
    origin: '*',
    credentials: true,
  })
);

//! limitaciones en la recepcion y envio de datos en 5mb
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ limit: '5mb', extended: true }));

//! -----ROUTES-----------
// nos las importamos aquí y viene de user.model porque es index quien las consume
const UserRoutes = require('./src/api/routes/user.routes');
// Está es la ruta general
app.use('/api/v1/users', UserRoutes);

//! Cuando no se mete ninguna routa
app.use('*', (req, res, next) => {
  const error = new Error('Route not found');
  error.status = 404;
  return next(error);
});

//! ERROR 500 DEL SERVER
app.use((error, req, res) => {
  return res
    .status(error.status || 500)
    .json(error.message || 'Unexpected error');
});

//! ---- ESCUCHAMOS EN EL PORT LA BASE DE DATOS ------ VAMOS A ESCUCHAR EL SERVIDOR WEB EN SU PUERTO CORRESPONDIENT
app.disable('x-powered-by');
app.listen(PORT, () => {
  console.log(`Listening on PORT ${BASE_URL}${PORT}`);
});
