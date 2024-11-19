const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');


//Rutas CRUD DE USUARIOS
router.get('/', usuariosController.getUsuarios);
router.post('/', usuariosController.createUsuario);
router.put('/:id', usuariosController.updateUsuario);
router.delete('/:id', usuariosController.deleteUsuario);


//Inicio de sesión
router.post('/login', usuariosController.login);

module.exports = router;
   