module.exports = function(req, res, next){
	//console.log(res.locals);
	if(!req.session.user_id){
		res.redirect("/");
	}else {
		User.findById(req.session.user_id, function(err, usuario){
			if(err){
				console.log(err);
			}else{
				res.locals = {usuario: usuario};
				console.log(res.locals);
				next();
			}
		});
	}	
}