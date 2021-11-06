const express = require('express');
var exphbs  = require('express-handlebars');
const path = require('path');
const logger = require('morgan');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://localhost:27017/Almacenbd', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on('open', _ => {
    console.log('conectado a la base de datos del almacen, Almacenbd')
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const Router = require("./routes/index")
app.use(Router.router)

module.exports = {app, mongoose};
