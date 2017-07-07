'use strict';
app.controller("addAudienceController", function($scope, $http, $filter,$route, $mdDialog){


	var self = this;
   $scope.oneChoice=true;

 $scope.lugares = [];
 var lugar = {};
 var ubicacion = [];

  $scope.process = {
    cui:"",
    fecha_denuncia: new Date(),      
    fecha_hechos: "",
    relato_hechos:""    
  }


$http({method:'GET', url:'process/paises'})
    .success(function(response){      
     $scope.paises = response;      
  });


 this.buscarDepartamento = function(buscar){   
    return $http({method:'GET', url:'process/departamentos',params: {q:buscar, r: $scope.proces.pais._id}})//capturar el uno
      .then(function(response){       
        return response.data;     
      });
  }

  this.selectedItemChangeDepartamento = function(item){
    try{
      $scope.proces.departamento = item._id;
      lugar.departamento = item.nombre;
    }catch(e){        
      //alert("Campo vacio",e);
    }
  }

   this.buscarMunicipio = function(buscar){    
    return $http({method:'GET', url:'process/municipios',params: {q:buscar, r:$scope.proces.departamento}})
      .then(function(response){
        return response.data;     
      });
  }

  this.selectedItemChangeMunicipio = function(item){
    try{
      lugar.ubicacion = item._id;
      ubicacion.push(item._id);
      lugar.municipio = item.nombre;

    }catch(e){        
      //alert("Campo vacio",e);
    }
  }

   this.buscarFiscal = function(buscar){    
    return $http({method:'GET', url:'user/buscarFiscal',params: {q:buscar, r:$scope.user.oficina.dependencia}})
      .then(function(response){
        return response.data;     
      });
  }

  this.selectedItemChangeFiscal = function(item){
    try{
      $scope.process.fiscal = item._id
      $scope.process.ubicacion = item.oficina._id;


    }catch(e){        
      //alert("Campo vacio",e);
    }
  }
  

    /*$scope.tabClicked = function(tab) {
    	console.log(tab);
		switch (tab) {
		case 'One':
		  $scope.tabContent = $sce.trustAsHtml('<div ng-include="calendar/modal-dialog-alert.html"></div>');
		  break;
		case 'Two':
		  $scope.tabContent = $sce.trustAsHtml('  <em class="md-display-2"> <div ng-include="calendar/modal-dialog-alert.html"></div>TAB2 CONTENT</em>');
		  break;
		case 'tab3':
		  $scope.tabContent = $sce.trustAsHtml('<div class="md-display-4">TAB3 CONTENT</div>');
		  break;
		}
	}*/
  
  });



