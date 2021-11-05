require('../app')
const almacenEstructura = require('./modelos/almacenEstructura')
const usuarios = require('./modelos/userEstructura')
const user = require('./users')

class equipo extends user{
  constructor(req, res){
    super(req, res)
  }
  async agregar(req, res) {
    return this.guardado =
    this.consultar(req, res)
    .then(async consulta => {
      let guardado;
        if(!consulta.length) {
          guardado = false
        }else {
          this.equipo = new almacenEstructura({
            area: req.params.area,
            usuario: req.params.usuario,
            nombre: req.params.nombre,
            descripcion: req.params.descripcion
          })
          guardado = await this.equipo.save()
          console.log(guardado)
        }
        return guardado
      })
  }
}

module.exports= equipo