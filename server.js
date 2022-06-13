var express = require("express");
var mongoose = require('mongoose');
var session = require('express-session');
var bodyParser = require("body-parser");
//var RedisStore = require("connect-redis")(session);
var User = require("./models/user").User;
var Perfil = require("./models/perfil").perfil;
var Ciudad = require("./models/ciudad").ciudad;
var Sede = require("./models/sede").sede;
var Dependencia = require("./models/dependencia").dependencia;
var Oficina = require("./models/oficina").oficina;
var Estado = require("./models/estado").estado;
var Etapa = require("./models/etapa").etapa;
var Cargo = require("./models/cargo").cargo;

//rutas por modulos macros
var Rusuario = require("./routers/usuario");
var Rprocess = require("./routers/process");
var Raudience = require("./routers/audience");


//var session_middleware = require("./middlewares/session");

var USUARIO = 1;
mongoose.connect("mongodb://mongodb:27017/estadisticas");
//mongoose.connect("mongodb://localhost:27017/estadisticas");
var app = express();

app.use("/public",express.static('public'));//archivos staticos css
app.use(express.static(__dirname + "/views"));
app.use(bodyParser.json());// para peticiones application/json
app.use(bodyParser.urlencoded({extended: true}));// parsear tambien arreglos

app.use(session({   
	key: 'user',	
	secret: "Secret",
	resave: false,
	saveUninitialized: false  	
}));

/*var sessionMiddleware = session({
	store:new SessionStore,
	secret: "Liam Josue",
});*/
//app.use(session_middleware);

mongoose.Promise = Promise;

app.get("/calendario", function(solicitud, respuesta){
	data = [
			  {
			    "Title": " Fiscal 2:  Adiencia Formulacion de Imputación",
			    "Description": "A las 8:00 am con el Juez 01 penal de Control de Garantias",
			    "StartAt": "2017-07-17T05:00:00.000Z",
			    "EndAt": "2017-07-20T05:00:00.000Z",
			    "IsFullDay": true
			  },
			  {
			    "Title": " Fiscal 3: Adiencia Juicio Oral",
			    "Description": "A las 12:00  con el Juez 12 penal de Control de Garantias",
			    "StartAt": "07/07/2017 12:00:00 PM",
			    "EndAt": "07/07/2017 16:00:00 PM",
			    "IsFullDay": false
			  },
			  {
			    "Title": " Fiscal 4: Adiencia Formulacion de Acusacion",
			    "Description": "A las 9:00  con el Juez 24 penal de Control de Conocimineto",
			    "StartAt": "11/12/2017 09:00:00 PM",
			    "EndAt": "11/12/2017 12:00:00 PM",
			    "IsFullDay": false
			  },
			  {
			    "Title": " Fiscal 5: Adiencia Formulacion de Acusacion",
			    "Description": "A las 10:00 Juez 24 penal de Control de Conocimineto",
			    "StartAt": "08/08/2017 09:00:00 PM",
			    "EndAt": "08/08/2017 12:00:00 PM",
			    "IsFullDay": false
			  }
			];
			
	respuesta.json(data);
});




app.post("/usuario", function(req, res){	
	
	var id=req.query.idUsuario;	
	User.findById(id, {username:true, correo:true, nombre:true, perfil:true, oficina:true}).populate('oficina').exec(function(err, user){
		res.json(user);
	});
});

app.post("/authorization", function(req, res){	
	if (!req.session.user_id)
    	res.json(false);
  	else 	
		res.json(true);
});

app.post("/sessionDestroy", function(req, res){	
	//req.session.destroy();
	req.session.user_id = null;
	req.session.destroy();
	console.log("paso");
	
});

app.get("/perfilLoad", function(req, res){	
	Perfil.find(function(err, doc){ 		  	
		res.json(doc);
	});
});

app.get("/sedeLoad", function(req, res){	
	Sede.find(function(err, doc){ 		  	
		res.json(doc);
	});
});

app.get("/buscarCargo", function(req, res){
	var buscar =req.query.q;	
	Cargo.find({"nombre":{$regex:buscar, $options:"i"}},function(err, doc){ 		  	
		res.json(doc);
	});
});

app.get("/buscarDependencia", function(req, res){
	var buscar =req.query.q;
	var id = req.query.r;
	console.log(id); 
	Dependencia.find({"nombre":{$regex:buscar, $options:"i"}}).populate('sede').exec(function(err, doc){ 		
		doc = doc.filter(function(element){
			return element.sede._id == id;
		}); 		
		res.json(doc);
	});
});

app.get("/buscarOficina", function(req, res){
	var buscar =req.query.q;
	var id = req.query.r;	
	
	Oficina.find({"nombre":{$regex:buscar, $options:"i"}}).populate('dependencia').populate('ciudad').exec(function(err, doc){ 		
		doc = doc.filter(function(element){
			return element.dependencia._id == id;
		}); 		
		res.json(doc);
	});
});


app.get("/usuarioEstadoLoad", function(req, res){	
	Estado.find({tipo:USUARIO},function(err, doc){ 
		console.log(doc);		  	
		res.json(doc);
	});
});

app.post("/users", function(req, res){		  
	var user =  new User(req.body);
	 user.save().then(function(){
	 	res.end();
	}, function(err){
		if(err){
	 		console.log(String(err));
	 	}	 
	 });	
});

var port = process.env.PORT || 2409;
//Usando Rutas
app.use('/user', Rusuario);
app.use('/process', Rprocess);
app.use('/audience', Raudience);

app.listen(port, function() {  
  console.log('Express server listening on port ' + port);
});
