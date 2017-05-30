var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var password_validation = {
	validator: function(p){
		return this.password_confirmation == p;
	},
	message:"Las Contraseñas no son iguales"
}
//estructura de la tabla
var user_schema = new Schema({
	nombre: { type: String, 
				required: "El nombre es obligatorio", 
				lowercase: true },
	cedula: {type: Number, unique: true, 
				min:[5, "La cedula debe contener minimo 5 digitos."], 
				required: "La cedula es obligatoria"},
	fecha_de_nacimiento: Date,
	username: {type: String, unique:true, 
				minlength:[6, "Minimo 6 Caracteres."], 
				maxlength:[20, "Maximo 20 Caracteres en el usuario."], 
				required: "El usuario es obligatorio."},
	password: {type: String,
				minlength:[7, "En la contraseña minimo 7 Caracteres."], 
				maxlength:[50, "Contraseña muy grande"],
				required:"La contraseña es obligatoria.",
				validate: password_validation},				
	telefono: String,
	correo: { type: String, 
				required: "El correo es obligatorio.",  
				lowercase: true, unique: true, 
				match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Por favor verificar Correo'] },   
	perfil:{ type: Schema.Types.Mixed, ref: "Perfil"},
	cargo:{ type:  Schema.Types.Mixed, ref: "Cargo"},
	oficina: {type:  Schema.Types.Mixed, ref: "Oficina"},  			
	direccion: String,
	estado: {type: Number, ref: "Estado"}
});

user_schema.virtual("password_confirmation").get(function(){
	return this.pass;
}).set(function(password){
	this.pass = password;
});

var User = mongoose.model("User", user_schema);

module.exports.User = User;