const {Router} = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();
const {getUsuarios,crearusuario,actualizarUsuario,borrarUsuario} = require ('../controllers/usuarios');
const { validarJWT, validarADMIN_ROLE, validarADMIN_ROLE_o_MismoUsuario } = require('../middlewares/validar-jwt');

router.get('/',validarJWT,getUsuarios);

router.post('/',
[
    check('nombre','nombre obligatorio').not().isEmpty(),
    check('password','password obligatorio').not().isEmpty(),
    check('email','correo obligatorio').isEmail(),
    validarCampos

],crearusuario);


router.put('/:id',
    [
    validarJWT, 
    validarADMIN_ROLE_o_MismoUsuario,
    validarADMIN_ROLE,
    check('nombre','nombre obligatorio').not().isEmpty(),
    check('email','correo obligatorio').isEmail(),
    check('role','el rol es obligatorio').not().isEmpty(),
    validarCampos,

   
],actualizarUsuario);

router.delete('/:id',
        [    validarJWT, 
            validarADMIN_ROLE,
            borrarUsuario,
        ]);



module.exports = router;