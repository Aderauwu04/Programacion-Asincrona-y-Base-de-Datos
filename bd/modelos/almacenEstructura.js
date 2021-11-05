const { Schema, model } = require('mongoose')

const almacen = new Schema({
  area: String,
  usuario: String,
  nombre: String,
  descripcion: String
})
const almacenEstructura = model('Almacen', almacen)

module.exports= almacenEstructura