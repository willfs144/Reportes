var mongoose = require('mongoose');  
var Schema = mongoose.Schema;

var direccionSchema = new Schema({  
    nombre: String,    
});

var direccion = mongoose.model('Direccion', direccionSchema); 

module.exports.direccion = direccion;
