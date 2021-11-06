const { Schema, model } = require('mongoose')

const usuarios = new Schema({
  usuario: {
    type:String,
    unique:true
  },
  apellido: String,
  password: {
    type: String,
    default: 'password'
  }
})

const userEstructura = model('User', usuarios)

module.exports = userEstructura