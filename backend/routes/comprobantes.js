const express = require('express');
const router = express.Router();
const comprobantesController = require('../controllers/comprobantesController');

//Rutas
router.get('/', comprobantesController.getComprobantes);
router.post('/', comprobantesController.createComprobante);
router.put('/:id', comprobantesController.updateComprobante);
router.delete('/:id', comprobantesController.deleteComprobante);

module.exports = router;
