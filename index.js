const express = require('express');
const fileUpload = require('express-fileupload');

//Para leer las variables de entorno
require('dotenv').config();

const cors = require('cors');

const { dbConnection } = require('./database/config');

//Creando el servidor express
const app = express();

//CORS: Configuracion donde se hacepta peticiones
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
    next();
});

//base de datos
dbConnection();

//Midelware
app.use(cors());

//Leer el body
app.use(express.json());

//File upload
app.use(fileUpload());

//Rutas
app.use('/hospitals', require('./routes/hospital.routes'));
app.use('/image', require('./routes/images.routes'));
app.use('/login', require('./routes/auth.routes'));
app.use('/medics', require('./routes/medic.routes'));
app.use('/users', require('./routes/users.routes'));
app.use('/upload', require('./routes/upload.routes'));
app.use('/search', require('./routes/search.routes'));

//Levantando el servidor
app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto: ', process.env.PORT)
});