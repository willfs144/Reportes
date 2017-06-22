'use strict';
app.controller("addProcessController", function($scope, $http, $filter){


  $scope.process = {
    cui:"",
    fecha_denuncia: new Date(),      
    fecha_hechos: "",
    relato_hechos:""    
  }


  	$scope.consultaProcess = function(){       
      alert(""+$scope.process.cui);
      $http({method:'GET', url:'/process/procesos',params: {idNoticia:$scope.process.cui}})
        .then(function(process){         
      });     

    }

 $http({method:'GET', url:'process/paises'})
    .success(function(response){      
     $scope.paises = response;      
  });

 
  this.buscarCategoria= function(buscar){    
    return $http({method:'GET', url:'process/categorias',params: {q:buscar}})
      .then(function(response){
        return response.data;     
      });
  }

  this.selectedItemChangeCategoria= function(item){
    try{
      $scope.process.categoria = item._id;
    }catch(e){        
      alert("Campo vacio",e);
    }
  }


  this.buscarDepartamento = function(buscar){   
    return $http({method:'GET', url:'/process/departamentos',params: {q:buscar, r: $scope.proces.pais}})//capturar el uno
      .then(function(response){       
        return response.data;     
      });
  }

  this.selectedItemChangeDepartamento = function(item){
    try{
      $scope.proces.departamento = item._id;
    }catch(e){        
      alert("Campo vacio",e);
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
      $scope.process.lugar_hechos = item._id;
    }catch(e){        
      alert("Campo vacio",e);
    }
  }

  $scope.guardarProcess= function(){ 
    console.log($scope.process);

    $http({method:'POST',url:'process/procesos',headers : { 'Content-Type': 'application/json' }, data:$scope.process})
      .success(function(response){
        alert("Recibimos los datos");
        $scope.process = {};
    }).
    error(function(data,status,headers,config){
      console.log(data);
    });
  }


  });
