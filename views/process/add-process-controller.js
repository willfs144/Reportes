app.controller("addProcessController", function($scope, $http){

  $scope.process = {
    noticia:"",
    fecha_de_denuncia:"",   
    pais: "",
    departamento: "",
    municipio:"",    
    fecha_de_hechos: "",
    categoria: "",
    hechos:""
  }


  	$scope.consultaProcess = function(){      
      var idNoticia = $scope.process.noticia;
      console.log(idNoticia);
      $scope.process.noticia;
      $http({method:'POST', url:'process/noticia',params: {idNoticia:idNoticia}})
        .then(function(process){ 
        console.log(process.data); 
      });     

    }

  });
