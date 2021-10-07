const express = require('express');
const { dbConnection } = require('./database/config');
require ('dotenv').config();
const cors = require('cors');



//crear el servidor express

const app = express();

//configurar cors 
app.use(cors());

//Base de datos
dbConnection();

console.log(process.env);

//rutas

//Lectura del Body
app.use(express.json());

//Rutas
app.use('/api/usuarios',require('./routes/usuarios'));
app.use('/api/hospitales',require('./routes/hospitales'));
app.use('/api/medicos',require('./routes/medicos'));
app.use('/api/login',require('./routes/auth'));
app.use('/api/todo',require('./routes/busquedas'));
app.use('/api/upload',require('./routes/uploads'));
app.listen(process.env.PORT, ()=>{

    console.log('Servidor corriendo en puerto'+process.env.PORT);
});