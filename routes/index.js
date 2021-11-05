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
    .then(consulta => {
      res.send(consulta ? 'Tu usuario es: '+consulta : 'El usuario no existe')
    })
    .catch(err => {
      console.log(err)
      res.end()
    })
});

/* Rutas POST */
router.post('/agregar/:usuario/:apellido/:password', function(req, res) {
  usuario.crear(req, res)
    .then(guardado => {
      res.send('Se ha guardado: '+guardado)
    })
    .catch(err => {
      console.log(err)
      res.end()
    })
});

router.post('/agregar/:usuario/:apellido/:password/equipo/:area/:nombre/:descripcion', function(req, res, next) {
  equipo.agregar(req, res)
    .then(guardado => {
      console.log('asdasdasdasd'+guardado)
      res.send(guardado ? 'Se ha guardado: '+guardado : 'El usuario no existe, por lo que no se guardo el equipo')
    })
    .catch(err => {
      console.log(err)
      res.end()
    })
});

/* Rutas PUT */
router.put('/editar/:usuario/:apellido/:password', function(req, res) {
  usuario.actualizar(req, res)
    .then(cambio => {
      res.send('Se ha guardado: '+cambio)
    })
    .catch(err => {
      console.log(err)
      res.end()
    })
});

router.put('/editar/:usuario/:apellido/:password/equipo/:area/:nombre/:descripcion', function(req, res) {
  equipo.editar(req, res)
    .then(cambio => {
      res.send('Se ha guardado: '+cambio)
    })
    .catch(err => {
      console.log(err)
      res.end()
    })
});

module.exports = {router, usuario};
