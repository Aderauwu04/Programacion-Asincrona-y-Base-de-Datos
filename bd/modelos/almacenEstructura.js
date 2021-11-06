const { Schema, model } = require('mongoose')

const almacen = new Schema({
  area: String,
  id:{
    type: String,
    unique: true
  },
  usuario: String,
  nombre: String,
  descripcion: String
})
const almacenEstructura = model('Almacen', almacen)

module.exports= almacenEstructura