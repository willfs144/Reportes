var mongoose = require('mongoose');  
var Schema = mongoose.Schema;

var perfilUsuarioSchema = new Schema({  
    nombre: String   
});

var perfil = mongoose.model('Perfil', perfilUsuarioSchema); 

module.exports.perfil = perfil;
