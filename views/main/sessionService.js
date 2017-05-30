'use strict';

app.factory('sessionService', ['$http','$location', function ($http,$location) {
	return{	
		set:function (key, value){
			return sessionStorage.setItem(key, value);

		}, 
		get: function(key){
			return sessionStorage.getItem(key);
		},
		destroy: function(key){
			$http.post('/sessionDestroy');
			return sessionStorage.removeItem(key);
		},
		isLogged: function(){
			if(this.get('user')) return true;
			else return false;	 	
		}, 

		logout:function(){			
			this.destroy('user');
			this.destroy('usuario');
			$location.path('/');
		}		
	};
}])