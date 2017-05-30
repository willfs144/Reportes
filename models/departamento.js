var mongoose = require('mongoose');  
var Schema = mongoose.Schema;

var departamentoSchema = new Schema({  
    nombre: String,
    pais: {type: Schema.Types.ObjectId, ref: "Pais"}   
});

var departamento = mongoose.model('Departamento', departamentoSchema); 

module.exports.departamento = departamento;
