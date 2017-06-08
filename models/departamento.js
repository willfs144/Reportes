var mongoose = require('mongoose');  
var Schema = mongoose.Schema;

var departamentoSchema = new Schema({  
    nombre: String,
    pais: {type: Number, ref: "Nacion"}   
});

var departamento = mongoose.model('Departamento', departamentoSchema); 

module.exports.departamento = departamento;
