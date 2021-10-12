const {Router} = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const {getMedico,
        crearMedico,
        ActualizarMedico,
        borrarMedico} = require('../controllers/medicos');

const router = Router();
const { validarJWT } = require('../middlewares/validar-jwt');

router.get('/',getMedico);

router.post('/',

 
[
  validarJWT,
  check('nombre','el nombre de medico es necesario').not().isEmpty(),
  check('hospital','el Hospital Id debe ser valido').isMongoId(),
  validarCampos

  

],crearMedico);


router.put('/:id',
    [  
      validarJWT,
      check('nombre','el nombre de medico es necesario').not().isEmpty(),
      check('medico','el id de medico es necesario').not().isMongoId(),
      validarCampos
],ActualizarMedico);

router.delete('/:id',[

  validarJWT,
  check('nombre','el nombre de medico es necesario').not().isEmpty(),
  validarCampos
],borrarMedico);



module.exports = router;