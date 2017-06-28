                             var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//estructura de la tabla
var process_schema = new Schema({
	cui: {type: String, 
				required: "El numero noticia criminal es obligatorio", 
				minlength:[21, "minimo 21 caracteres noticia criminal."], 
				maxlength:[21, "maximo 21 caracteres noticia criminal"]},
	nombre: String,
	fecha_denuncia: Date,	
	fecha_hechos: Date,
	relato_hechos: { type: String, 
				required: "los hechos son obligatorios", 
				lowercase: true },
	lugar_hechos: [{type: Number, ref: "Ciudad"}],    
	fiscal:{ type: Schema.Types.Mixed, ref: "User"},
	usuario:{ type: Schema.Types.Mixed, ref: "User"},	
	etapa: {type: Schema.Types.Mixed, ref: "Etapa"},
	categoria: {type: Schema.Types.Mixed, ref: "Categoria"},
	estado: {type: Number, ref: "Estado"},
	ubicacion: {type:  Schema.Types.Mixed, ref: "Oficina"}
});

var noticia = mongoose.model('noticia', process_schema); 

module.exports.noticia = noticia;