var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//estructura de la tabla
var juzgado_schema = new Schema({	
	_id: Number,
	nombre: String,		
	ciudad: {type: Number, ref: "Ciudad"},
	telefono: String,
	correo: { type: String, 
				required: "El correo es obligatorio.",  
				lowercase: true, unique: true, 
				match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Por favor verificar Correo'] }
});

var juzgado = mongoose.model('juzgado', juzgado_schema); 

module.exports.juzgado = juzgado;