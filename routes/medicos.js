const {Router} = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const {getMedico,
        crearMedico,
        ActualizarMedico,
        borrarMedico,
        getMedicoById} = require('../controllers/medicos');

const router = Router();
const { validarJWT } = require('../middlewares/validar-jwt');

router.get('/',validarJWT,getMedico);

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

router.delete('/:id',  validarJWT,borrarMedico);

router.get('/:id',  validarJWT,getMedicoById);



module.exports = router;