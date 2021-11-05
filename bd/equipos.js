require('../app')
const almacenEstructura = require('./modelos/almacenEstructura')
const usuarios = require('./modelos/userEstructura')
const user = require('./users')

class equipo extends user{
  constructor(req, res){
    super(req, res)
  }
  async sinUsuario(req, res){
    this.sesion = await usuarios.find({
      nombre: req.params.nombre,
      apellido: req.params.apellido
    })
    console.log(this.sesion)
    if(this.sesion !== []) {
      return this.sesion
    }
  }
  async agregar(req, res) {
    this.sinUsuario(req, res)
    if(this.sesion) {
      this.area = new almacenEstructura({
        area: req.params.area,
        usuario: req.params.usuario,
        nombre: req.params.nombre,
        descripcion: req.params.descripcion
      })
      const guardado = await this.area.save()
      return guardado
    }else {
      res.write('no has iniciado sesion')
    }
  }
}

module.exports= equipo