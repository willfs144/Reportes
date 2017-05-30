var mongoose = require('mongoose');  
var Schema = mongoose.Schema;

var estadoSchema = new Schema({ 
	_id: Number,  
    nombre: String, 
    tipo: {type: Number, ref: "Estado"}  
});

var estado = mongoose.model('Estado', estadoSchema); 

module.exports.estado = estado;