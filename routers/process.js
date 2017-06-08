var express = require("express");
var router = express.Router();
var Noticia = require("../models/noticia").noticia;
var Departamento = require("../models/departamento").departamento;
var Ciudad = require("../models/ciudad").ciudad;
var Categoria = require("../models/categoria").categoria;

router.get("/procesos", function(req, res){	
	
	var id=req.query.idprocess;	
	Noticia.findById(id, function(err, proces){
		//res.json(proces);
		console.log(proces);
	});
});


router.get("/categorias", function(req, res){	
	Categoria.find(function(err, doc){	  	
		res.json(doc);
	});
});



router.get("/departamentos", function(req, res){
	var buscar =req.query.q;
	var idPais =req.query.r;
	console.log(idPais); 
	Departamento.find({"nombre":{$regex:buscar, $options:"i"}}).populate('nacion').exec(function(err, doc){ 		
				
		res.json(doc);
	});
});

router.get("/municipios", function(req, res){
	var buscar =req.query.q;
	var id = 25;
	console.log(id); 
	Ciudad.find({"nombre":{$regex:buscar, $options:"i"}}).populate('departamento').exec(function(err, doc){
		//console.log(doc); 		
		/*doc = doc.filter(function(element){
			return element.departamento._id == id;
		});*/		
		res.json(doc);
	});
});


router.get("/categorias", function(req, res){	
	Categoria.find(function(err, doc){	  	
		res.json(doc);
	});
});

router.post("/procesos", function(req, res){		  
	var proceso =  new Noticia(req.body);
	 Noticia.save().then(function(){
	 	res.end();
	}, function(err){
		if(err){
	 		console.log(String(err));
	 	}	 
	 });	
});

module.exports = router;