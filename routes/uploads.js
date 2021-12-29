const {Router} = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const {fileupload,retornaImagen} = require('../controllers/uploads');
const expressfileUpload = require('express-fileupload');

const router = Router();
router.use(expressfileUpload());
const { validarJWT } = require('../middlewares/validar-jwt');

router.put('/:tipo/:id',validarJWT,fileupload);
router.get('/:tipo/:foto',retornaImagen);




module.exports = router;