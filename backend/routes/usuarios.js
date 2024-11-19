const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');
const verifyRole = require('../utils/auth');



//Rutas CRUD DE USUARIOS
router.get('/', verifyRole(['Administrador']), usuariosController.getUsuarios);
router.get('/:id', verifyRole(['Administrador']), usuariosController.getUsuarioById);
router.post('/', verifyRole(['Administrador']), usuariosController.createUsuario);
router.put('/:id', verifyRole(['Administrador']), usuariosController.updateUsuario);
router.delete('/:id', verifyRole(['Administrador']), usuariosController.deleteUsuario);


//Inicio de sesión
router.post('/login', usuariosController.login);

module.exports = router;
   