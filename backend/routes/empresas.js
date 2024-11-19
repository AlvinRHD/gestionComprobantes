const express = require('express');
const router = express.Router();
const empresasController = require('../controllers/empresasController');
const verifyRole = require('../utils/auth');


//Rutas
router.get('/', verifyRole(['Administrador']), empresasController.getEmpresas);

router.post('/', verifyRole(['Administrador']), empresasController.createEmpresa);
router.put('/:id', verifyRole(['Administrador']), empresasController.updateEmpresa);
router.delete('/:id', verifyRole(['Administrador']), empresasController.deleteEmpresa);


module.exports = router;
