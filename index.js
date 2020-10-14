const express = require('express');

//Para leer las variables de entorno
require('dotenv').config();

const cors = require('cors');

const { dbConnection } = require('./database/config');

//Creando el servidor express
const app = express();

//base de datos
dbConnection();

//Midelware
app.use(cors());

//Leer el body
app.use(express.json());

//Rutas
app.use('/users', require('./routes/users.routes'));
app.use('/login', require('./routes/auth.routes'))

//Levantando el servidor
app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto: ', process.env.PORT)
});