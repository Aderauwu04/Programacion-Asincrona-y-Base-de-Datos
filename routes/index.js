const express = require('express');
const router = express.Router();
const user = require('../bd/users')
const equipos = require('../bd/equipos')

let usuario;
let equipo;

/* Rutas GET */
/* GET home page. */
router.get('/:usuario/:apellido/:password', function(req, res) {
  usuario = new user(req, res)
  usuario.consultar(req, res)
  .then(consulta => {
      if (consulta){
        console.log('Bienvenido '+req.params.usuario)
        equipo = new equipos(req, res)
        res.render('index', {usuario: {user:consulta[0].usuario, ape:consulta[0].apellido}});
      }else {
        res.render('index', {usuario: {user:'Tu usuario no esta registrado'}})
      }
    })
    .catch(err => {
      console.log(err)
      res.end()
    })
});

/* GET todos los usuarios */
router.get('/usuarios', function(req, res) {
  console.log(usuario)
  usuario.consultar(req, res, true)
    .then(consulta => {
      res.send(consulta ? 'Lista de usuarios de la base de datos: '+consulta : 'No hay usuarios')
    })
    .catch(err => {
      console.log(err)
      res.end()
    })
});

/* GET de un equipo por id */
router.get('/:usuario/:apellido/:password/equipo/:id', function(req, res) {
  equipo.verid(req, res,)
    .then(consulta => {
      res.send(consulta ? 'El equipo es: '+consulta : 'No se ha podido hacer la consulta, mira la consola para saber el error')
    })
    .catch(err => {
      console.log(err)
      res.end()
    })
});

/* GET todos los equipos de un area */
router.get('/:usuario/:apellido/:password/ver/equipos/:area', function(req, res) {
  equipo.ver(req, res)
    .then(consulta => {
      res.send(consulta ? 'Lista de equipos del area '+req.params.area+' de la base de datos: '+consulta : 'No se ha podido hacer la consulta, mira la consola para saber el error')
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
      res.send(consulta ? 'Lista de equipos de la base de datos: '+consulta : 'No se ha podido hacer la consulta, mira la consola para saber el error')
    })
    .catch(err => {
      console.log(err)
      res.end()
    })
});

/* Rutas POST */
/* POST un usuario */
router.post('/agregar/:usuario/:apellido/:password', function(req, res) {
  usuario = new user(req, res)
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
      res.send(guardado ? 'Se ha guardado: '+guardado : 'No se han podido hacer cambios, mira la consola para saber el error')
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
      res.send(cambio ? 'Se ha actualizado: '+cambio : 'No se han podido hacer cambios, mira la consola para saber el error')
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
      res.send(cambio ? 'Se ha guardado: '+cambio : 'No se han podido hacer cambios, mira la consola para saber el error')
    })
    .catch(err => {
      console.log(err)
      res.end()
    })
});

/** Rutas DELETE */
/* DELETE un usuario */
router.delete('/eliminar/:usuario/:apellido/:password', function(req, res) {
  usuario.eliminar(req, res)
    .then(eliminado => {
      res.send(eliminado ? 'Se ha eliminado: '+req.params.usuario : 'No se han podido hacer cambios, mira la consola para saber el error')
    })
    .catch(err => {
      console.log(err)
      res.end()
    })
})

/* DELETE todos los usuarios*/
router.delete('/eliminar/:usuario/:apellido/:password/all', function(req, res) {
  usuario.eliminar(req, res, true)
    .then(eliminado => {
      res.send(eliminado ? 'Se han eliminado los usuarios' : 'No se han eliminado los usuarios, mira tus datos de usuario')
    })
    .catch(err => {
      console.log(err)
      res.end()
  })
})

/* DELETE un por id */
router.delete('/eliminar/:usuario/:apellido/:password/equipo/:id', function(req, res) {
  equipo.borrarid(req, res)
    .then(eliminado => {
      res.send(eliminado ? 'Se ha eliminado' : 'No se han podido hacer cambios, mira la consola para saber el error')
    })
    .catch(err => {
      console.log(err)
      res.end()
    })
})

/* DELETE todos los equipos de un area*/
router.delete('/eliminar/:usuario/:apellido/:password/equipos/:area', function(req, res) {
  equipo.borrar(req, res)
    .then(eliminado => {
      res.send(eliminado ? 'Se han eliminado los equipos del area '+req.params.area : 'No se han podido hacer cambios, rectifica la consola para saber el error')
    })
    .catch(err => {
      console.log(err)
      res.end()
    })
})

/* DELETE todos los equipos */
router.delete('/eliminar/:usuario/:apellido/:password/equipos', function(req, res) {
  equipo.borrar(req, res, true)
    .then(eliminado => {
      res.send(eliminado ? 'Se han eliminado todos los equipos' : 'No se han podido hacer cambios, rectifica la consola para saber el error')
    })
    .catch(err => {
      console.log(err)
      res.end()
    })
})

module.exports = {router, usuario};
