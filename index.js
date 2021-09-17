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

app.get('/',(req,res)=>{

    res.status(400).json({
            ok:true,
            msg:'Hola mundo'
    });

});

app.listen(process.env.PORT, ()=>{

    console.log('Servidor corriendo en puerto'+process.env.PORT);
});