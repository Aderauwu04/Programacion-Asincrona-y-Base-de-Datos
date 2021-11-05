const express = require('express');
const router = express.Router();
const user = require('../bd/users')
const equipos = require('../bd/equipos')

let usuario;
let equipo;

/* Rutas GET */
/* GET home page. */
router.get('/', function(req, res) {
  usuario = new user(req, res)
  equipo = new equipos(req, res)
  console.log('Bienvenido')
  res.render('index.ejs', { title: 'Express' });
});

router.get('/:usuario/:apellido/:password', function(req, res) {
  usuario.consultar(req, res)
    .then(prom => {
      console.log(prom ? 'sirvio' : 'nosirvio')
    })
    .catch(err => {
      console.log(err)
      res.end()
    })
});

/* Rutas POST */
router.post('/:nombre/:apellido/:password', function(req, res) {
  usuario.crear(req, res)
    .then(guardado => {
      res.send('se ha guardado: '+guardado)
    })
    .catch(err => {
      console.log(err)
      res.end()
    })
});

router.post('/:usuario/:password/agregar/equipo/:area/:nombre/:descripcion', function(req, res, next) {
  equipo.agregar(req, res)
    .then(guardado => {
      res.send('se ha guardado: '+guardado)
      res.end()
    })
    .catch(err => {
      console.log(err)
      res.end()
    })
});

module.exports = {router, usuario};
