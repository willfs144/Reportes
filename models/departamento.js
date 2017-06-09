var mongoose = require('mongoose');  
var Schema = mongoose.Schema;

var departamentoSchema = new Schema({  
	_id: Number,
    nombre: String,
    pais: {type: Number, ref: "Nacion"}  
});

var departamento = mongoose.model('departamento', departamentoSchema); 

module.exports.departamento = departamento;
