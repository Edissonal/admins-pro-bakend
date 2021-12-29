
const Usuario = require ('../models/usuario');
const { response} = require('express');
const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const getUsuarios  = async(req,res)=>{


    const desde = Number(req.query.desde) || 0;
    console.log(desde);
   
    
       const [usuarios,total]=await  Promise.all([
        Usuario.find({},'nombre email role google')
        .skip(desde)
        .limit(5),
        Usuario.count()
        ]);

    res.status(200).json({
            ok:true,
            usuarios,
            uid:req.uid,
            total
    });

}


const crearusuario  = async (req,res = response)=>{

    const {email,password,nombre} = req.body;





    try {
        
        const existeEmail = await Usuario.findOne({email});

            if(existeEmail){
            return res.status(400).json({
                of:false,
                msg:'correo taya esta '
            });
            }

            const usuario = new Usuario(req.body);
            
            //cambiar pass

        const salt = bcrypt.genSaltSync();

        usuario.password = bcrypt.hashSync(password,salt);

 

        //Guardae usuario

        await usuario.save();

            //generar token
            const token  = await generarJWT(usuario.id);
    
        res.status(200).json({
                ok:true,
                usuario,
                token
        });
    

        
        
    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error inesperado revisar logs '
        });
        
    }

}


const actualizarUsuario = async(req,res = response) =>{

    const uid = req.params.id;
    try {

        const usuarioDb = await Usuario.findById(uid);
        if(!usuarioDb){
            return res.status(404).json({
                ok:false,
                msg:'no Existe un usuario con ese id '
            });
        }


        //Actualizacion
        const {password,google,email,...campos} = req.body;

      /*  if(usuarioDb.email !== email){
            delete campos.email;
        }else{

            const existeEmail = await Usuario.findOne({email});
            if(existeEmail){
                return res.status(400).json({
                    ok:false,
                    msg:'ya esxite un usuario con ese email'
                })

            }
        }*/

        if ( usuarioDb.email !== email ) {

            const existeEmail = await Usuario.findOne({ email });
            if ( existeEmail ) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'
                });
            }
        }
        

        if(!usuarioDb.google){
            campos.email = email;
        }else if(usuarioDb.email !== email){
            return res.status(400).json({
                ok:false,
                msg:'Usuarios de google no pueden cambiar su correo'
            });

        }
       
        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid,campos,{new:true});



        res.json({
            ok:true,
            usuario:usuarioActualizado
        });
        
    } catch (error) {

        res.status(500).json({

            ok:false,
            msg:'Error inesperado'
        });

        console.log('error');
        
    }

   }

   const borrarUsuario = async(req,res = response) =>{

    const uid = req.params.id;

    

    try {
        const usuarioDb = await Usuario.findById(uid);
        if(!usuarioDb){
            return res.status(404).json({
                ok:false,
                msg:'no Existe un usuario con ese id '
            });
        }

        await Usuario.findByIdAndDelete(uid);

        res.status(200).json({
            ok:true,
            msg:'Usuario eliminado'
        });
        
    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        });
        
    }

}

module.exports = {
    getUsuarios,
    crearusuario,
    actualizarUsuario,
    borrarUsuario
}