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

/* GET de un equipo por id */
router.get('/:usuario/:apellido/:password/equipo/:id', function(req, res) {
  equipo.verid(req, res,)
    .then(consulta => {
      res.send(consulta ? 'El equipo es: '+consulta : 'No se ha podido hacer la consulta, si tu usuario esta por consola quiere decir que no hay equipos en la base de datos, de lo contrario rectifica tu información')
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
      res.send(consulta ? 'Lista de equipos del area '+req.params.area+' de la base de datos: '+consulta : 'No se ha podido hacer la consulta, si tu usuario esta por consola quiere, decir que no hay equipos en la base de datos que sean del area '+req.params.area+' de lo contrario rectifica tu información')
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
      res.send(consulta ? 'Lista de equipos de la base de datos: '+consulta : 'No se ha podido hacer la consulta, si tu usuario esta por consola quiere decir que no hay equipos en la base de datos, de lo contrario rectifica tu información')
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
      res.send(cambio ? 'Se ha guardado: '+cambio : 'No se ha podido guardar, si tu usuario esta por consola quiere decir que no has mandado bien los datos del equipo, de lo contrario rectifica tus datos de usuario')
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
      res.send(eliminado ? 'Se ha eliminado: '+req.params.usuario : 'No se ha podido eliminar, puede que hayas mandado mal tu usuario')
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
      res.send(eliminado ? 'Se han eliminado los usuarios' : 'No se han eliminado los usuarios, rectifica tus datos de usuario')
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
      res.send(eliminado ? 'Se ha eliminado' : 'No se ha podido eliminar, si tu usuario esta por consola quiere decir que no has espesificado bien el id del equipo, de lo contrario rectifica tus datos de usuario')
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
      res.send(eliminado ? 'Se han eliminado los equipos del area '+req.params.area : 'No se han podido eliminar, si tu usuario esta por consola quiere decir que no has espesificado bien el area del equipo, de lo contrario rectifica tus datos de usuario')
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
      res.send(eliminado ? 'Se han eliminado todos los equipos' : 'No se han podido eliminar, rectifica tus datos de usuario')
    })
    .catch(err => {
      console.log(err)
      res.end()
    })
})

module.exports = {router, usuario};
