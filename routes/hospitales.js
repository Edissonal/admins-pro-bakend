const {Router} = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const {getHospitales,
       crearHospital,
       ActualizarHospital,
       borrarHospital} = require('../controllers/hospitales');

const router = Router();
const { validarJWT } = require('../middlewares/validar-jwt');

router.get('/',getHospitales);

router.post('/',
[
  validarJWT,
  check('nombre','el nombre de hospital es necesario').not().isEmpty(),
  validarCampos
  
],crearHospital);


router.put('/:id',
    [  
      validarJWT,
      check('nombre','el nombre de hospital es necesario').not().isEmpty(),
	  check('hospital','el id de medico es necesario').not().isMongoId(),
      validarCampos
],ActualizarHospital);

router.delete('/:id',
            validarJWT, 
            borrarHospital,
              );



module.exports = router;