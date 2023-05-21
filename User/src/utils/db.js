// tenemos que traernos dotenv porque tenemos la url que no queremos que se comparta publicamente
const dotenv = require('dotenv'); // Traemos el .env, es lo que permite asignar variables que queremos ocultar como usuarios y contraseñas en .env
dotenv.config();

// Nos traemos la libreria mongoose que es quien va a controlar la DB: MONGO DB.
// Gracias a mongoose creamos los Schemas y permite consultas, etc

const mongoose = require('mongoose');

// nos traemos la MONGO_URI del .env

const MONGO_URI = process.env.MONGO_URI;

/// hacemos la funcion que se exporta y luego importa en el index que va conectar con Mongo

const connect = async () => {
  try {
    const db = await mongoose.connect(MONGO_URI, {
      /// es para hacer que la URL de MONGO se parsee, , es decir, es la transformación de un dato y no al metodo parse de https://keepcoding.io/blog/metodo-parse-de-javascript/
      useNewUrlParser: true,
      useNewUrlParser: true,
      // convertir los caracteres especiales
      useUnifiedTopology: true,
    });

    // AHORA NOS VAMOS A TRAER EL HOST y el NAME de la DB

    const { name, host } = db.connection;

    console.log(
      `Conectada la DB 👌  en el host: ${host} con el nombre: ${name}`
    );
  } catch (error) {
    console.log('No se ha conectado la db❌');
  }
};

module.exports = { connect };
