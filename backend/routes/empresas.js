const express = require('express');
const router = express.Router();
const empresasController = require('../controllers/empresasController');


//Rutas
router.get('/', empresasController.getEmpresas);
router.post('/', empresasController.createEmpresa);
router.put('/:id', empresasController.updateEmpresa);
router.delete('/:id', empresasController.deleteEmpresa);

module.exports = router;
