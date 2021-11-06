require('../app')
const almacenEstructura = require('./modelos/almacenEstructura')
const user = require('./users')

class equipo extends user{
  constructor(req, res){
    super(req, res)
  }
  // agregar un equipo
  async agregar(req, res) {
    return this.consultar(req, res)
    .then(async consulta => {
        if(!consulta) {
          return false
        }else {
          this.equipo = new almacenEstructura({
            area: req.params.area,
            id: req.params.id,
            usuario: this.usuario,
            nombre: req.params.nombre,
            descripcion: req.params.descripcion
          })
          this.guardado = await this.equipo.save()
          console.log(this.guardado)
          return this.guardado
        }
      })
      .catch(err => {
        console.log(err)
        res.end()
      })
  }
   //ver un equipo en espesifico
   async verid(req, res){
    return this.consultar(req, res)
      .then(async consulta =>{
        if(!consulta) {
          return false
        }else {
          this.busqueda = await almacenEstructura.find({id:req.params.id})
          if(!this.busqueda.length){
            console.log('El equipo no existe')
            return false
          } else {
            console.log(this.busqueda)
            return this.busqueda
          }
        }
      })
      .catch(err => {
        console.log(err)
        res.end()
      })
  }
  //ver un equipo o los equipos que sean del misma area
  async ver(req, res, all){
    return this.consultar(req, res)
      .then(async consulta =>{
        if(!consulta) {
          return false
        }else {
          switch (all) {
            case true:
              this.busqueda = await almacenEstructura.find()
              if(!this.busqueda.length){
                console.log('No hay equipos')
                return false
              } else {
                console.log(this.busqueda)
                return this.busqueda
              }

            default:
              this.busqueda = await almacenEstructura.find({area:req.params.area})
              if(!this.busqueda.length){
                console.log('No hay equipos de esta area '+req.params.area)
                return false
              } else {
                console.log(this.busqueda)
                return this.busqueda
              }
          }
        }
      })
      .catch(err => {
        console.log(err)
        res.end()
      })
  }
  //editar un equipo o todos los equipos
  async editar(req, res){
    return this.cambio =
    this.consultar(req,res)
      .then(async consulta =>{
        if(!consulta){
          return false
        }else {
          const updatedEquipo = await almacenEstructura.findOneAndUpdate(
            {
              id: req.params.id
            },
            {
              area: req.params.upArea,
              id: req.params.upID,
              usuario: this.usuario,
              nombre: req.params.upNombre,
              descripcion: req.params.upDescripcion
            })
            if(updatedEquipo.length){
              const actualizado = await almacenEstructura.find({id:req.params.upID})
              updatedEquipo
              console.log(actualizado)
              return actualizado
            }else{
              console.log('El equipo no existe')
              return false
            }
        }
      })
      .catch(err => {
        console.log(err)
        res.end()
      })
  }
  async borrarid(req, res){
    return this.verid(req, res)
      .then(async consulta => {
        if(!consulta){
          return false
        }else {
          this.eliminado = await almacenEstructura.deleteOne({id: req.params.id})
          if(this.eliminado.deletedCount !== 0){
            console.log(this.eliminado)
            return true
          }else{
            console.log('El equipo no existe')
            return false
          }
        }
      })
      .catch(err => {
        console.log(err)
        res.end()
      })
  }
  async borrar(req, res, all){
    return this.consultar(req, res)
      .then(async consulta => {
        if(!consulta){
          return false
        }else {
          switch (all) {
            case true:
              this.eliminado = await almacenEstructura.deleteMany()
              if(this.eliminado.deletedCount !== 0){
                console.log('Se han eliminado '+this.eliminado.deletedCount+' equipos')
                return true
              }else{
                console.log('No hay equipos')
                return false
              }

            default:
              this.eliminado = await almacenEstructura.deleteMany({area: req.params.area})
              if(this.eliminado.deletedCount !== 0){
                return true
              }else{
                console.log('No hay equipos del area '+req.params.area+' para eliminar')
                return false
              }
          }
        }
      })
      .catch(err => {
        console.log(err)
        res.end()
      })
  }
}

module.exports= equipo