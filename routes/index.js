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

/* GET usuario */
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

/* GET todos los usuarios */
router.get('/usuarios', function(req, res) {
  usuario.consultar(req, res, true)
    .then(consulta => {
      res.send(consulta ? 'Lista de usuarios de la base de datos: '+consulta : 'No hay usuarios')
    })
    .catch(err => {
      console.log(err)
      res.end()
    })
});

/* GET un tipo de equipo */
router.get('/:usuario/:apellido/:password/ver/equipos/:area', function(req, res) {
  equipo.ver(req, res)
    .then(consulta => {
      res.send(consulta ? 'Lista de equipos del area '+req.params.area+' de la base de datos: '+consulta : 'No se ha podido hacer la consulta, puede que hayas mandado mal tu usuario o no hay equipos en la base de datos que sean del area '+req.params.area)
    })
    .catch(err => {
      console.log(err)
      res.end()
    })
});

/* GET todos los equipos */
router.get('/:usuario/:apellido/:password/ver/equipos', function(req, res) {
  equipo.ver(req, res, true)
    .then(consulta => {
      res.send(consulta ? 'Lista de equipos de la base de datos: '+consulta : 'No se ha podido hacer la consulta, puede que hayas mandado mal tu usuario o no hay equipos en la base de datos')
    })
    .catch(err => {
      console.log(err)
      res.end()
    })
});

/* Rutas POST */
/* POST un usuario */
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

/* POST un equipo */
router.post('/agregar/:usuario/:apellido/:password/equipos/:area/:id/:nombre/:descripcion', function(req, res, next) {
  equipo.agregar(req, res)
    .then(guardado => {
      res.send(guardado ? 'Se ha guardado: '+guardado : 'El usuario no existe, por lo que no se guardo el equipo, rectifica los datos')
    })
    .catch(err => {
      console.log(err)
      res.end()
    })
});

/* Rutas PUT */
/*PUT un usuario */
router.put('/editar/:usuario/:apellido/:password/para/:upUsuario/:upApellido/:upPassword', function(req, res) {
  usuario.actualizar(req, res)
    .then(cambio => {
      res.send(cambio ? 'Se ha actualizado: '+cambio : 'El usuario no existe, por lo que no se pudo actualizar, rectifica los datos')
    })
    .catch(err => {
      console.log(err)
      res.end()
    })
});

/* PUT un equipo */
router.put('/editar/:usuario/:apellido/:password/equipos/:id/para/:upArea/:upID/:upNombre/:upDescripcion', function(req, res) {
  equipo.editar(req, res)
    .then(cambio => {
      res.send(cambio ? 'Se ha guardado: '+cambio : 'No se ha podido guardar, puede que hayas mandao mal tu usuario')
    })
    .catch(err => {
      console.log(err)
      res.end()
    })
});

module.exports = {router, usuario};
