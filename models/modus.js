var mongoose = require('mongoose');  
var Schema = mongoose.Schema;

var modusSchema = new Schema({ 
	_id: Number,
    nombre: String, 
    descripcion: String    
});

var modus = mongoose.model('modus', modusSchema); 

module.exports.modus = modus;