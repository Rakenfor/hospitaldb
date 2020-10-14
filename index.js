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

//Rutas
app.get('/', (req, res) => {
    res.json({
        ok: true,
        message: 'Hola mundo'
    })
});

app.get('/message', (req, res) => {
    res.status(400).json({
        ok: true,
        messaje: 'Esta es una peticion hacia otra ruta we'
    })
});

//Levantando el servidor
app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto: ', process.env.PORT)
});