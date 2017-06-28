var express = require("express");
var router = express.Router();
var User = require("../models/user").User;



router.post("/login", function(req, res){	
	
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

/*app.get("/buscarOficina", function(req, res){
	var buscar =req.query.q;
	var id = req.query.r;	
	
	Oficina.find({"nombre":{$regex:buscar, $options:"i"}}).populate('dependencia').populate('ciudad').exec(function(err, doc){ 		
		doc = doc.filter(function(element){
			return element.dependencia._id == id;
		}); 		
		res.json(doc);
	});
});*/

router.get("/buscarFiscal", function(req, res){
	var buscar =req.query.q;
	var id = req.query.r;	
	var idFiscal= '592452ed36766dea5b473215';
	User.find({"nombre":{$regex:buscar, $options:"i"}}).populate('cargo').populate('oficina').exec(function(err, doc){
		doc = doc.filter(function(element){
			return (element.oficina.dependencia== id) && (element.cargo._id== idFiscal);
		});
		res.json(doc);
	});	
});


module.exports = router;