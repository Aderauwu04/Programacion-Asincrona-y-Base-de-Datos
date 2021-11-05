require('../app')
const usuario = require('../routes/index')

function sinUsuario(req, res) {
  if(usuario == {}){
    res.write('No has mandado tus datos')
    res.end()
  }else{
    console.log(usuario)
    res.end()
  }
}

module.exports = sinUsuario;