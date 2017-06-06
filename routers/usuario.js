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

module.exports = router;