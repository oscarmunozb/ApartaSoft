var express = require('express');
var router = express.Router();

var controllers = require('.././controllers');

/* GET home page. */
router.get('/', controllers.homecontroller.index);

//rutas para instrumentos
router.get('/instrumento',controllers.instrumentocontroller.getIntrumento);
router.get('/nuevo',controllers.instrumentocontroller.getNuevoInstrumento);
router.post('/crearinstrumento',controllers.instrumentocontroller.postNuevoInstrumento);

//rutas para usuarios
router.get('/usuario',controllers.usuariocontroller.getUsuario);
router.get('/nuevoUsuario',controllers.usuariocontroller.getNuevoUsuario);
router.post('/crearusuario',controllers.usuariocontroller.postNuevoUsuario);

//rutas para reserva
router.get('/reserva',controllers.reservacontroller.getReserva);
router.get('/nuevoReserva',controllers.reservacontroller.getNuevoReserva);
router.post('/crearreserva',controllers.reservacontroller.postNuevoReserva);

//login
router.get('/login', controllers.logincontroller.login);
router.post('/login', controllers.logincontroller.postIngresar);

module.exports = router;
