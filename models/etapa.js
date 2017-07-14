var mongoose = require('mongoose');  
var Schema = mongoose.Schema;

var etapaSchema = new Schema({
	_id: Number,  
    nombre: String
});

var etapa = mongoose.model('Etapa', etapaSchema); 

module.exports.etapa = etapa;