var mongoose = require('mongoose');  
var Schema = mongoose.Schema;

var paisSchema = new Schema({  
    nombre: String   
});

var pais = mongoose.model('Nacion', paisSchema); 

module.exports.pais = pais;




