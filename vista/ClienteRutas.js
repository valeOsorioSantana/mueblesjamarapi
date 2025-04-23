const express = require('express');
const CRutas = require('../controlador/ClienteControlador');
const router = express.Router();

router.post('/usuarios', CRutas.crearCliente);

module.exports = router;