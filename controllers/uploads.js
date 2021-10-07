const { response } = require('express');
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require('../helpers/Actualizar-imagen');
const path = require('path');
const fs = require('fs');

const  fileupload = (req, res = response)=>{


    const tipo = req.params.tipo;
    const id  = req.params.id;



    //validar tipo
    const tiposValidos =['hospitales','medicos','usuarios'];

    if(!tiposValidos.includes(tipo)){
        return res.status(400).json({
                ok:false,
                msg:'no es un medico , usuario o hospital'
        });
    }

        //validar que ecxista un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok:false,
            msg:'no hay ningun archivo'
        });
      }

    
      //procesar la imagen
      const  file = req.files.imagen;
      const nombreCortado = file.name.split('.');
      const extensionArchivo = nombreCortado[nombreCortado.length -1 ];

    const extensionesValidas =['png','jpg','jepg','gif'];

    if(extensionesValidas.includes(extensionArchivo)){

        return res.status(400).json({
            ok:false,
            msg:'no  es una extenxion permitida'
        });

    }

    //generar el ombre del archivo

    const nombrearchivo= `${uuidv4()}.${extensionArchivo}`;

    //path para guardar la imagen

    const path = `./uploads/${tipo}/${nombrearchivo}`;

    //mover imagen

    file.mv(path, function(err) {
        if (err){
            console.log(err);
            return res.status(500).json({
                ok:false,
                msg:'Error al mover la imagen'
            })
        }
        //  return res.status(500).send(err);
        
        //actualizar base de datos

        actualizarImagen(tipo,id,nombrearchivo);
    
        res.json({
            ok:true,
            msg:'Archivo subido',
            nombrearchivo
    });
      });


   
}


const retornaImagen = (req,res = response) =>{

    const tipo = req.params.tipo;
    const foto = req.params.foto;

    const pathImg = path.join(__dirname, `../uploads/${tipo}/${foto}`);


    //imagen por defecto

    if(fs.existsSync(pathImg)){
        res.sendFile(pathImg);

    }else{
        const pathImg = path.join(__dirname, `../uploads/nophoto.jpg`);
        res.sendFile(pathImg);
    }


}

module.exports ={
    fileupload,
    retornaImagen
}