var mongoose = require('mongoose');  
var Schema = mongoose.Schema;

var sedeSchema = new Schema({  
    nombre: String   
});

var sede = mongoose.model('Sede', sedeSchema); 

module.exports.sede = sede;