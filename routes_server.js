var express = require("express");

var router = express.Router();

router.get("/app", function(req, res){
	alert("hola Mundo");
});

module.exports = router;