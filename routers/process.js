var express = require("express");
var router = express.Router();
var Noticia = require("../models/noticia").noticia;

router.post("/noticia", function(req, res){	
	
	var id=req.query.idprocess;	
	Noticia.findById(id, function(err, proces){
		//res.json(proces);
		console.log(proces);
	});
});

module.exports = router;