var express = require("express");
var router = express.Router();
var Noticia = require("../models/noticia").noticia;
var Pais = require("../models/pais").pais;
var Departamento = require("../models/departamento").departamento;
var Ciudad = require("../models/ciudad").ciudad;
var Categoria = require("../models/categoria").categoria;


router.get("/procesos", function(req, res){	
	
	Noticia.find({cui:req.query.idNoticia}, function(err, proces){
		res.json(proces);		
	});
});


router.get("/paises", function(req, res){	
	Pais.find(function(err, doc){			  	
		res.json(doc);
	});
});


router.get("/departamentos", function(req, res){
	var buscar =req.query.q;
	var idPais =req.query.r;	
	Departamento.find({"nombre":{$regex:buscar, $options:"i"}}).populate('nacion').exec(function(err, doc){ 		
		doc = doc.filter(function(element){
			return element.pais == idPais;
		});				
		res.json(doc);
	});
});

router.get("/municipios", function(req, res){
	var buscar =req.query.q;
	var idDepartamento = req.query.r;	
	Ciudad.find({"nombre":{$regex:buscar, $options:"i"}}).exec(function(err, doc){			
		doc = doc.filter(function(element){
			return element.departamento == idDepartamento;
		});	
		res.json(doc);
	});
});


router.get("/categorias", function(req, res){	
	var buscar =req.query.q;
	Categoria.find({"nombre":{$regex:buscar, $options:"i"}}, function(err, doc){
		console.log(doc);	  	
		res.json(doc);
	});
});

router.post("/procesos", function(req, res){
		  
	var noticia =  new Noticia(req.body);
	noticia.save().then(function(){
	 	res.end();
	}, function(err){
		if(err){
	 		console.log(String(err));
	 	}	 
	 });	
});

module.exports = router;