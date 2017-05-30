'use strict';

app.controller('AppCtrl', function ($scope, $timeout, $mdSidenav) {	
	$scope.toggleLeft = buildToggler('left');
	$scope.toggleRight = buildToggler('right');
	function buildToggler(componentId) {
		return function() {
			$mdSidenav(componentId).toggle();
		}
		
	}
});

app.controller("dashboardController", function($scope,$http,sessionService){

	$scope.menu = [
    {
      link : 'addprocess',
      title: 'Agregar Proceso',
      icon: 'agregar'
    },
    {
      link : 'updateprocess',
      title: 'Modificar Proceso',
      icon: 'group'
    },
    {
      link : 'findprocess',
      title: 'conultar Proceco',
      icon: 'message'
    }    
  ];
  $scope.admin = [
    {
      link : 'addaudience',
      title: 'Agregar Audiencia',
      icon: 'agregar'
    },
    {
      link : 'updateaudience',
      title: 'Modificar Audiencia',
      icon: 'group'
    },
    {
      link : 'findaudience',
      title: 'conultar Audiencia',
      icon: 'message'
    },
    {
      link : 'deleteaudience',
      title: 'Eliminar Audiencia',
      icon: 'message'
    }        
  ];


	var idUsuario= sessionService.get('usuario');	

	$scope.user;
	
	$http({method:'POST', url:'/usuario',params: {idUsuario:idUsuario}})
			.then(function(user){	
			console.log(user.data);	
				$scope.user = user.data;
		});			
	 $scope.cerrar = function(){ 	
	 	sessionService.logout();
	 	
	 }

	 //sessionService.destroy('usuario');
	});




