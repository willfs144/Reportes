'use strict';
app.controller("addProcessController", function($scope, $http, $filter,$route, $mdDialog){

var self = this;
  

 $scope.lugares = [];
 var lugar = {};
 var ubicacion = [];

  $scope.process = {
    cui:"",
    fecha_denuncia: new Date(),      
    fecha_hechos: "",
    relato_hechos:""    
  }


  $scope.consultaProcess = function(){      
      $http({method:'GET', url:'/process/procesos',params: {idNoticia:$scope.process.cui}})
        .success(function(data){  
         if(data != null){
          console.log(data);
          mensaje();  
         }
                        
        });
  }

 
 $http({method:'GET', url:'process/paises'})
    .success(function(response){      
     $scope.paises = response;      
  });

 
  this.buscarCategoria= function(buscar){    
    return $http({method:'GET', url:'process/categorias',params: {q:buscar}})
      .then(function(response){
        console.log(response);
        return response.data;     
      });
  }

  this.selectedItemChangeCategoria= function(item){
    try{
      $scope.process.categoria = item._id;
    }catch(e){        
      //alert("Campo vacio",e);
    }
  }

   this.buscarModus= function(buscar){    
    return $http({method:'GET', url:'process/modus',params: {q:buscar}})
      .then(function(response){
        
        return response.data;     
      });
  }

  this.selectedItemChangeModus= function(item){
    try{
      $scope.process.modus = item._id;
    }catch(e){        
      //alert("Campo vacio",e);
    }
  }


  this.buscarDepartamento = function(buscar){   
    return $http({method:'GET', url:'/process/departamentos',params: {q:buscar, r: $scope.proces.pais._id}})//capturar el uno
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

  $scope.guardarProcess= function(){ 
    $scope.process.estado =21;
    $scope.process.etapa =2;
    $scope.process.usuario = $scope.user._id;
    console.log($scope.process);

    $http({method:'POST',url:'process/procesos',headers : { 'Content-Type': 'application/json' }, data:$scope.process})
      .success(function(response){
       alert("Recibimos los datos");
       $route.reload();
       $scope.process={};
       $scope.lugares={};
       limpiar();     

    }).
    error(function(data,status,headers,config){
      console.log(data);
    });

    
  }

 
  $scope.agregarLugarHechos = function(){
    lugar.pais = $scope.proces.pais.nombre;
    $scope.process.lugar_hechos = ubicacion;
    $scope.lugares.push(lugar);
    limpiar();
  }

  $scope.eliminarLugarHechos = function(idMunicipio){

    $scope.lugares = $scope.lugares.filter(function(element){
       console.log(idMunicipio);
      return element.ubicacion != idMunicipio;
    });

   ubicacion = ubicacion.filter(function(element){
    return element != idMunicipio;
   });
   $scope.process.lugar_hechos = ubicacion;
    limpiar();
  }

  function limpiar(){  
    lugar = {};        
    $scope.proces = {}; 
    self.searchTextCategoria = '';
    self.selectedItemCategoria= null;
    self.searchTextFiscal = '';
    self.selectedItemFiscal= null;
    self.searchTextMunicipio = '';
    self.selectedItemMunicipio= null;
    self.searchTextDepartamento= '';
    self.selectedItemDepartamento =null;   
  }

  function mensaje() {
      $mdDialog.show(
        $mdDialog.alert()
          .clickOutsideToClose(true)
          .title('Proceso ya esta registrado')
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
