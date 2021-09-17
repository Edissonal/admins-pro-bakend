const mongoose = require('mongoose');

const dbConnection = async() =>{

   
   try {

    await mongoose.connect(process.env.DB_CNN);

    console.log('DB Online');
       
   } catch (error) {
       console.log(error);
       throw new Error('Error ala Hora  de iniciar la Db ver logs');
   } 
    return true;
}


module.exports ={

    dbConnection

   }
   