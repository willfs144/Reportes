var mongoose = require('mongoose');  
var Schema = mongoose.Schema;

var dependenciaSchema = new Schema({  
    nombre: String,
    sede: {type: Schema.Types.ObjectId, ref: "Sede"}   
});

var dependencia = mongoose.model('Dependencia', dependenciaSchema); 

module.exports.dependencia = dependencia;


