require('../app')
const userEstructura = require('./modelos/userEstructura')
const usuarios = require('./modelos/userEstructura')

class user{
  constructor(req, res){}
  async crear(req, res){
    this.newUser= new userEstructura({
      nombre: req.params.nombre,
      apellido: req.params.apellido,
      password: req.params.password
    })
    const guardado = await this.newUser.save()
    return guardado
  }
  async consultar(req, res){
    const prom = new Promise(async (resolve, reject) => {
      let consulta = await usuarios.find({
        nombre: req.params.nombre,
        apellido: req.params.apellido,
        password: req.params.password
      })
      if (!consulta.length){
        console.log('nosirve'+consulta)
        resolve(false)
      }else {
        resolve(true)
        console.log(consulta)
      }
    })
    return prom
  }
}

module.exports = user;