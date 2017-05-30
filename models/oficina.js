var mongoose = require('mongoose');  
var Schema = mongoose.Schema;

var oficinaSchema = new Schema({  
    nombre: String,    
    dependencia: {type: Schema.Types.ObjectId, ref: "Dependencia"},
    ciudad: {type: Number, ref: "Ciudad"}

});

var oficina = mongoose.model('Oficina', oficinaSchema); 

module.exports.oficina = oficina;