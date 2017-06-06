'use strict';
app.controller("loginController", function($scope, $location,$http, $rootScope, sessionService, $mdDialog){
$scope.msgError='';
$scope.user = {		
		username: "",
		password: ""
	}
	$scope.submit = function() {
		
		var datos = JSON.stringify($scope.user);

		$http({method:'POST',url:'user/login',data:datos})
			.success(function(data){
				console.log(data);
				if(data){
					sessionService.set('user', data.id);
					sessionService.set('usuario', data.user._id);

					$location.path("/dashboard");					
				}
				else{							
					$location.path("/");
					mensaje()
					
				}
			}).
			error(function(data){
				console.log(data);
		});			
	}
	function mensaje() {
	    $mdDialog.show(
	      $mdDialog.alert()
	        .clickOutsideToClose(true)
	        .title('Datos de acceso Incorrectos')
	        .textContent('Verifique sus datos de acceso y vuelva a intentarlo')	       
	        .ok('ok!')
	        .openFrom({
					top: -50,
					width: 30,
					height: 80
				}).closeTo({
					left: 1500
				})	       
			);
	}
});



app.controller("signupController", function($scope, $http, $filter){

	$scope.user = {
		nombre:"",	
		username: "jbernal",
		password: "jbernal",
		cargo: "",		
		fecha_de_nacimiento: new Date('1988-09-24T15:20:00Z'),
		password_confirmation:""
	}

	this.buscarCargo = function(buscar){
		return $http({method:'GET', url:'/buscarCargo',params: {q:buscar}})
			.then(function(response){
				return response.data;     
			});
	}

	this.selectedItemChangeCargo = function(item){
		try{
			$scope.user.cargo = item._id;
		}catch(e){        
			alert("Campo vacio",e);
		}
	}

	$http({method:'GET', url:'/usuarioEstadoLoad'})
		.success(function(response){      	
			$scope.estados = response;  
			
	});

	$http({method:'GET', url:'/perfilLoad'})
		.success(function(response){
			if(response != null)
				$scope.perfils = response;     
	});

	$http({method:'GET', url:'/sedeLoad'})
		.success(function(response){
			$scope.sedes = response;     
	});

	this.buscarDependencia = function(buscar){        
		return $http({method:'GET', url:'/buscarDependencia',params: {q:buscar, r:$scope.user.sede}})
			.then(function(response){		
				return response.data; 
		});
	}

	this.selectedItemChangeDependencia = function(item){
		try{
			$scope.user.dependencia = item._id;
		}catch(e){
			alert("Campo vacio",e);
		}
	}

	this.buscarOficina = function(buscar){        
		return $http({method:'GET', url:'/buscarOficina',params: {q:buscar, r:$scope.user.dependencia}})
			.then(function(response){
				return response.data; 
		});
	}

	this.selectedItemChangeOficina = function(item){
		try{
			$scope.user.oficina = item._id;
		}catch(e){
			alert("Campo vacio",e);
		}
	}

	$scope.guardar= function(){ 
		console.log($scope.user);
		$http({method:'POST',url:'/users',headers : { 'Content-Type': 'application/json' }, data:$scope.user})
			.success(function(response){
				alert("Recibimos los datos");
				$scope.user = {};
		}).
		error(function(data,status,headers,config){
			console.log(data);
		});
	}

});






