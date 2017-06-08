var mongoose = require('mongoose');  
var Schema = mongoose.Schema;

var ciudadSchema = new Schema({  
	_id: Number,
	nombre: String,
	departamento: {type: Number, ref: "Departamento"}   
});

var ciudad = mongoose.model('Ciudad', ciudadSchema); 

module.exports.ciudad = ciudad;