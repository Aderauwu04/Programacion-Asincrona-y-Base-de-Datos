require('../app')
const userEstructura = require('./modelos/userEstructura')

class user{
  constructor(req, res){
    this.usuario = req.params.usuario
    this.apellido = req.params.apellido
    this.password = req.params.password
  }
  //crear usuario
  async crear(req, res){
    this.newUser = new userEstructura({
      usuario: this.usuario,
      apellido: this.apellido,
      password: this.password
    })
    const guardado = await this.newUser.save()
    return guardado
  }
  // consultar uno o todos los usuarios
  async consultar(req, res, all){
    switch (all) {
      case true:
        this.consulta = await userEstructura.find()
        break;

      default:
        this.consulta = await userEstructura.find({
          usuario: req.params.usuario,
          apellido: req.params.apellido,
          password: req.params.password
        })
        break;
    }
    if(!this.consulta.length){
      this.consulta = false
      console.log('No existe el usuario')
    }else {
      console.log(this.consulta)
    }
    return this.consulta
  }
  //actualizar un usuario
  async actualizar(req, res){
    return this.consultar(req, res)
      .then(async consulta => {
        if(!consulta){
          return false
        }else{
          if(req.params.usuario == this.usuario){
            const updatedUser = await userEstructura.findOneAndUpdate(
            {
              usuario: this.usuario
            },
            {
              usuario: req.params.upUsuario,
              apellido: req.params.upApellido,
              password: req.params.upPassword
            })
            const actualizado = await userEstructura.find({usuario: req.params.upUsuario})
            updatedUser
            this.usuario = req.params.upUsuario
            this.apellido = req.params.upApellido
            this.password = req.params.upPassword
            console.log(actualizado)
            return actualizado
          }else{
            console.log('Para editar este usuario debes iniciar sesion con el primero')
            return false
          }
        }
      })
      .catch(err => {
        console.log(err)
        res.end()
      })
  }
  //eliminar uno a todos los usuarios
  async eliminar(req, res, all){
    return this.consultar(req, res)
      .then(async consulta => {
        if(!consulta){
          return false
        }else {
          switch (all) {
            case true:
              this.eliminado = await userEstructura.deleteMany()
              console.log('Se han eliminado '+this.eliminado.deletedCount+' usuarios')
              return true

            default:
              if(req.params.usuario == this.usuario){
                this.eliminado = await userEstructura.deleteOne({usuario: this.usuario})
                console.log(this.eliminado)
                return true
              }else{
                console.log('Para eliminar este usuario debes iniciar sesion con el primero')
                return false
              }
          }
        }
      })
  }
}

module.exports = user;