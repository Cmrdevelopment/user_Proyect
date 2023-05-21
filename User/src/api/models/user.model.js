const mongoose = require('mongoose'); // Gracias a mongoose creamos los Schemas (modelos) y permite consultas
const bcrypt = require('bcrypt'); // Es una libreria para el cifrado de contraseñas
const validator = require('validator'); // es un validador de datos, ya sea email, iban y muchos más https://www.npmjs.com/package/validator

// Sacamos de la libreria la parte de schema para poder definir nuestro modelo de datos
/// Definimos el esqueleto del modelo user
/// 1) Definimos lo primero el TYPE ----> tipo de dato
/// 2) Vamos a definir que este dato sea requerido para crear el modelo REQUIRED

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      validate: [validator.isEmail, 'Email not valid'],
    },
    name: { type: String, required: true, trim: true, unique: true },
    password: {
      type: String,
      required: true,
      trim: true,
      validate: [validator.isStrongPassword],
      minlength: [8, 'Min 8 characters'],
    },
    gender: {
      type: String,
      enum: ['hombre', 'mujer'],
      required: true,
    },
    rol: {
      type: String,
      enum: ['admin', 'user'],
      required: true,
    },
    confirmationCode: {
      // envio de codigos por email
      type: Number,
      required: true,
    },
    check: {
      // true o false, es para verificar los correos con códigos
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true, // Esta propiedad mete la fecha en el que hemos creado el elemento en la DB
  }
);

UserSchema.pre('save', async function (next) {
  try {
    this.password = await bcrypt.hash(this.password, 10); // El hash es la encritación
    next();
  } catch (error) {
    next('Error hashing password', error);
  }
});

// Creamos el modelo con la definicion de datos que se incluye en el schema anterior
const User = mongoose.model('User', UserSchema);

// Exportamos User
module.exports = User;
