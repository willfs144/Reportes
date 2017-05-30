var mongoose = require('mongoose');  
var Schema = mongoose.Schema;

var categoriaSchema = new Schema({ 	
    nombre: String, 
    descripcion: String    
});

var categoria = mongoose.model('categoria', categoriaSchema); 

module.exports.categoria = categoria;