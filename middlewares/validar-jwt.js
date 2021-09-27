const jwt = require('jsonwebtoken');


const validarJWT=(req,res,next)=>{

//lerr el token 


    const token = req.header('x-token');
    console.log(token);
    
    if(!token){
        return res.status(401).json({
                ok:false,
                msg:'no Hay token en la peticion'
        });

    }


  try {
      
    const {uid} = jwt.verify(token, process.env.JWT_SECRET);
    req.uid = uid;
    
    next();

  } catch (error) {
      return res.status(401).json({
        ok:false,
        msg:'Token invalido'
      });
      
  }
}

module.exports={
    validarJWT
}