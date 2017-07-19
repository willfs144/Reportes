var express = require("express");
var router = express.Router();
var Juzgado = require("../models/juzgado").juzgado;




router.get("/juzgados", function(req, res){
	var buscar =req.query.q;
	var idMunicipio = req.query.r;	
	console.log(idMunicipio);
	Juzgado.find({"nombre":{$regex:buscar, $options:"i"}}).exec(function(err, doc){	
		
		doc = doc.filter(function(element){
			return element.ciudad == idMunicipio;
		});	
		res.json(doc);
	});
});






module.exports = router;