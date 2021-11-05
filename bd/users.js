require('../app')
const userEstructura = require('./modelos/userEstructura')
const usuarios = require('./modelos/userEstructura')

class user{
  constructor(req, res){}
  async crear(req, res){
    this.newUser= new userEstructura({
      usuario: req.params.usuario,
      apellido: req.params.apellido,
      password: req.params.password
    })
    const guardado = await this.newUser.save()
    return guardado
  }
  async consultar(req, res){
    let consulta = await usuarios.find({
      usuario: req.params.usuario,
      apellido: req.params.apellido,
      password: req.params.password
    })
    if(!consulta.length){
      consulta = false
      console.log('No existe el usuario')
    }else {
      console.log(consulta)
    }
    return consulta
  }
}

module.exports = user;