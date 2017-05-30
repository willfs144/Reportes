var mongoose = require('mongoose');  
var Schema = mongoose.Schema;

var etapaSchema = new Schema({
    nombre: String  
});

var etapa = mongoose.model('etapa', etapaSchema); 

module.exports.etapa = etapa;