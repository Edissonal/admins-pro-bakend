

const {Router} = require('express');
const {login} = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { check } = require('express-validator');

const router = Router();


router.post('/',
[
 check('email',' es obligatorio').isEmail(),
 check('password','password es obligatorio').not().isEmpty(),
 validarCampos
],login);

module.exports = router;