const {response} =require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const { googleverify } = require('../helpers/google-verify');

const login = async(req,res = response)=>{

    const {email,password} = req.body;



    try {

        //verificar Email
        const usuarioDB = await Usuario.findOne({email});

        if(!usuarioDB){
            return res.status(404).json({
                ok:false,
                msg:'correo no valido'
            });
        }

        //verificar contraseña
        const validPassword = bcrypt.compareSync(password,usuarioDB.password);
        if(!validPassword){
            return res.status(400).json({
                ok:false,
                msg:'pass malo'
            });
        }

        //generar token
        const token  = await generarJWT(usuarioDB.id);

        res.json({
          ok:true,
          token
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error  inesperado'
        });
        
    }

}


const googleSingIn = async(req,res = response) =>{

    const googleToken = req.body.token;
    
    try {
      const {name,email,picture} = await googleverify(googleToken);

      const usuarioDB = await Usuario.findOne({email});
      let usuario;
      if(!usuarioDB){
        // si no existe el usuario
        usuario = new Usuario({
            nombre:name,
            email,
            password:'@@',
            img:picture,
            google:true
        });

      }else{

        //exite usuario
        usuario = usuarioDB;
        usuario.google = true;

      }

      //guardar en db 

      await usuario.save();

      //generar web token
      const token  = await generarJWT(usuario.id);

        res.json({
            ok:true,
            token
    });
        
    } catch (error) {

        res.status(401).json({
            ok:false,
            msg:'token no es correcto'
        });
        
    }    

}

const renewToken = async(req,res = response) =>{

    const uid= req.uid;

    //generar web token
    const token  = await generarJWT(uid);

    //Obtener  usuario por Id
    const usuario = await Usuario.findById(uid);

        res.json({
            ok:true,
            token,
            usuario
            

        });

}
module.exports={
    login,
    googleSingIn,
    renewToken
}