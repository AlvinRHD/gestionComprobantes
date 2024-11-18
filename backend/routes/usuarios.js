const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');


//Rutas
router.get('/', usuariosController.getUsuarios);
router.post('/', usuariosController.createUsuario);
router.put('/:id', usuariosController.updateUsuario);
router.delete('/:id', usuariosController.deleteUsuario);

module.exports = router;
