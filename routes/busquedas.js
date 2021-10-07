const {Router} = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();
const {geTodo,geTDocumentosColeccion} = require ('../controllers/busquedas');
const { validarJWT } = require('../middlewares/validar-jwt');

router.get('/:busqueda',validarJWT,geTodo);
router.get('/coleccion/:tabla/:busqueda',validarJWT,geTDocumentosColeccion);

module.exports=router;