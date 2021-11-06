require('../app')
const almacenEstructura = require('./modelos/almacenEstructura')
const user = require('./users')

class equipo extends user{
  constructor(req, res){
    super(req, res)
  }
  // agregar un equipo
  async agregar(req, res) {
    return this.guardado =
    this.consultar(req, res)
    .then(async consulta => {
        if(!consulta) {
          return false
        }else {
          this.equipo = new almacenEstructura({
            area: req.params.area,
            id: req.params.id,
            usuario: req.params.usuario,
            nombre: req.params.nombre,
            descripcion: req.params.descripcion
          })
          let guardado = await this.equipo.save()
          console.log(guardado)
          return guardado
        }
      })
      .catch(err => {
        console.log(err)
        res.end()
      })
  }

  //ver un equipo o los equipos que sean del misma area
  async ver(req, res, all){
    return this.busqueda =
      this.consultar(req, res)
        .then(async consulta =>{
          if(!consulta) {
            return false
          }else {
            switch (all) {
              case true:
                this.busqueda = await almacenEstructura.find()
                if(!this.busqueda.length){
                  return false
                } else {
                  console.log(this.busqueda)
                  return this.busqueda
                }

              default:
                this.busqueda = await almacenEstructura.find({area:req.params.area})
                if(!this.busqueda.length){
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

  //editar un equipo
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
              usuario: req.params.usuario,
              nombre: req.params.upNombre,
              descripcion: req.params.upDescripcion
            })
            const actualizado = await almacenEstructura.find({id:req.params.upID})
            updatedEquipo
            console.log(actualizado)
            return actualizado
        }
      })
      .catch(err => {
        console.log(err)
        res.end()
      })
  }

}

module.exports= equipo