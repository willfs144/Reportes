'use strict';
app.controller("addAudienceController", function($scope, $http, $filter,$route, $mdDialog){


	var self = this;
  $scope.oneChoice=false;
  $scope.valido = true;
  $scope.lugar=null;


  $scope.process = {
    cui:"",
    fecha_denuncia: new Date(),      
    fecha_hechos: "",
    relato_hechos:""    
  }

   if( $scope.user != null){
      $scope.NewEvent =
      {
        fecha: new Date(),
        hora: new Date(), 
        horaFinal: new Date()
      }
    }



/*$scope.consultaProcess = function(){      
      $http({method:'GET', url:'/process/procesos',params: {idNoticia:$scope.process.cui}})
        .then(function(proceso){  
         if(proceso){
          $scope.process = proceso.data;
          $scope.valido = false;
        }  
         else{
           $mdDialog.show(
              $mdDialog.alert()
                .clickOutsideToClose(true)
                .title('PROCESO NO SE ENCUENTRA REGISTRADO')
                .textContent('Verifique numero de noticia criminal y vuelva a intentarlo')        
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
  }*/

   $scope.consultaProcess = function(){      
      $http({method:'GET', url:'/process/procesos',params: {idNoticia:$scope.process.cui}})
        .success(function(proceso){  
         if(!proceso){
           mensaje();          
         }
         else{
          $scope.process = proceso;
          $scope.valido = false; 
          self.selectedItemFiscal = proceso.fiscal.nombre;
          self.searchTextFiscal = proceso.fiscal.nombre;
          //self.selectedItemChangeFiscal(self.searchTextFiscal); 
          console.log(proceso);      
         }                        
        });
  }

 function mensaje() {
      $mdDialog.show(
        $mdDialog.alert()
          .clickOutsideToClose(true)
          .title('Proceso no se encuentra registrado')
          .textContent('Verifique numero de noticia criminal y vuelva a intentarlo')        
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
      $scope.lugar = item._id;
    }catch(e){        
      //alert("Campo vacio",e);
    }
  }

   this.buscarFiscal = function(buscar){    
    return $http({method:'GET', url:'user/buscarFiscal',params: {q:buscar, r:encontrarOficina()}})
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

  this.buscarJuez = function(buscar){    
    return $http({method:'GET', url:'audience/juzgados',params: {q:buscar, r:$scope.lugar}})
      .then(function(response){
        console.log(response);
        return response.data;     
      });
  }

  this.selectedItemChangeJuez = function(item){
    try{
      $scope.process.juez = item._id;
    }catch(e){        
      //alert("Campo vacio",e);
    }
  }

  function encontrarOficina(){    
    if( $scope.user != null){    
      return  $scope.user.oficina.dependencia;
    }
    if($scope.NewEvent.user.oficina.dependencia)
      return $scope.NewEvent.user.oficina.dependencia;
    else
      return '';
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



