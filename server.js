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
var Cargo = require("./models/cargo").cargo;
//var router_app = require("./routes_server");
//var session_middleware = require("./middlewares/session");

var USUARIO = 1;
mongoose.connect("mongodb://localhost/estadisticas");
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

//mongoose.Promise = Promise;

app.get("/calendario", function(solicitud, respuesta){
	data = [
			  {
			    "Title": " Fiscal 2:  Adiencia Formulacion de Imputación",
			    "Description": "A las 8:00 am con el Juez 01 penal de Control de Garantias",
			    "StartAt": "05/10/2017",
			    "EndAt": "05/10/2017",
			    "IsFullDay": false
			  },
			  {
			    "Title": " Fiscal 3: Adiencia Juicio Oral",
			    "Description": "A las 12:00  con el Juez 12 penal de Control de Garantias",
			    "StartAt": "12/02/2016 12:00:00 PM",
			    "EndAt": "12/03/2016 16:00:00 PM",
			    "IsFullDay": false
			  },
			  {
			    "Title": " Fiscal 4: Adiencia Formulacion de Acusacion",
			    "Description": "A las 9:00  con el Juez 24 penal de Control de Conocimineto",
			    "StartAt": "11/12/2016 09:00:00 PM",
			    "EndAt": "11/12/2016 12:00:00 PM",
			    "IsFullDay": false
			  },
			  {
			    "Title": " Fiscal 5: Adiencia Formulacion de Acusacion",
			    "Description": "A las 10:00 Juez 24 penal de Control de Conocimineto",
			    "StartAt": "12/12/2016 09:00:00 PM",
			    "EndAt": "12/12/2016 12:00:00 PM",
			    "IsFullDay": false
			  }
			];
			
	respuesta.json(data);
});

app.post("/login", function(req, res){	
	
	User.findOne({username:req.body.username,password:req.body.password},{_id:true},function(err, user){
		console.log(user);
		if(user != null){	
			req.session.user_id =user._id;					
			res.json({user: user, id:req.session.id});	
		}else{
			res.json(null);
		}
		
	});	
});

app.post("/usuario", function(req, res){	
	
	var id=req.query.idUsuario;	
	console.log("listos",id);	
	User.findById(id, {username:true, correo:true, nombre:true}, function(err, user){
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

//app.use("/main", router_app);
var port = process.env.PORT || 2409;
app.listen(port, function() {  
  console.log('Express server listening on port ' + port);
});
