var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var password_validation = {
	validator: function(p){
		return this.password_confirmation == p;
	},
	message:"Las Contraseñas no son iguales"
}
//estructura de la tabla
var process_schema = new Schema({
	cui: { type: String, 
				required: "El nombre es obligatorio", 
				lowercase: true },	
	fecha_hechos: Date,
	relato_hechos: { type: String, 
				required: "El nombre es obligatorio", 
				lowercase: true },
	ciudad: [{type: Number, ref: "Ciudad"}],    
	fiscal:{ type: Schema.Types.Mixed, ref: "Perfil"},
	usuario:{ type: Schema.Types.Mixed, ref: "Perfil"},	
	etapa: {type: Schema.Types.Mixed, ref: "Etapa"},
	categoria: {type: Schema.Types.Mixed, ref: "Categoria"},
	estado: {type: Number, ref: "Estado"}
});

var noticia = mongoose.model('noticia', process_schema); 

module.exports.noticia = noticia;