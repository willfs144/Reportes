var mongoose = require('mongoose');  
var Schema = mongoose.Schema;

var cargoSchema = new Schema({  
    nombre: String   
});

var cargo = mongoose.model('Cargo', cargoSchema); 

module.exports.cargo = cargo;