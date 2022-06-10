'use strict';
app.controller("allFindProcessController",['$scope', function ($scope) {

 $scope.toggleSearch = false;
  $scope.headers = [
    {
      name:'',
      field:'thumb'
    },{
      name: 'Name', 
      field: 'name'
    },{
      name:'Description', 
      field: 'description'
    },{
      name: 'Last Modified', 
      field: 'last_modified'
    }
  ];
  
  $scope.content = [
    {
      thumb:'https://lh3.googleusercontent.com/-5NfcdlvGQhs/AAAAAAAAAAI/AAAAAAAAABY/ibGrApGYTuQ/photo.jpg', 
      name: 'Bruno Mars', 
      description: 'Human',
      last_modified: 'Jun 5, 2014'
    },{
      thumb:'http://www.otakia.com/wp-content/uploads/V_1/article_3573/7405.jpg', 
      name: 'AT-AT', 
      description: 'Robot',
      last_modified: 'Jun 5, 2014'
    },{
      thumb:'https://speakerdata.s3.amazonaws.com/photo/image/774492/Mark-Ronson-r24.jpg', 
      name: 'Mark Ronson', 
      description: 'Human',
      last_modified: 'Jun 5, 2014'
    },{
      thumb:'https://25.media.tumblr.com/61ebf04c3cc7a84944aa0246e902f2a7/tumblr_mm35b87dGz1qmwrnuo1_1280.jpg', 
      name: 'Daft Punk', 
      description: 'Human-Robot',
      last_modified: 'Jun 5, 2014'
    },{
      thumb:'http://thatgrapejuice.net/wp-content/uploads/2014/03/lady-gaga-that-grape-juice-televisionjpg.jpg', 
      name: 'Lady Gaga', 
      description: 'Undefined',
      last_modified: 'Jun 5, 2014'
    }
  ];
  
  $scope.custom = {name: 'bold', description:'grey',last_modified: 'grey'};
  $scope.sortable = ['name', 'description', 'last_modified'];
  $scope.thumbs = 'thumb';
  $scope.count = 2;
}]);

app.directive('mdTable', function () {
  return {
    restrict: 'E',
    scope: { 
      headers: '=', 
      content: '=', 
      sortable: '=', 
      filters: '=',
      customClass: '=customClass',
      thumbs:'=', 
      count: '=' 
    },
    controller: function ($scope,$filter,$window) {
      var orderBy = $filter('orderBy');
      $scope.tablePage = 0;
      $scope.nbOfPages = function () {
        return Math.ceil($scope.content.length / $scope.count);
      },
      	$scope.handleSort = function (field) {
          if ($scope.sortable.indexOf(field) > -1) { return true; } else { return false; }
      };
      $scope.order = function(predicate, reverse) {
          $scope.content = orderBy($scope.content, predicate, reverse);
          $scope.predicate = predicate;
      };
      $scope.order($scope.sortable[0],false);
      $scope.getNumber = function (num) {
      			    return new Array(num);
      };
      $scope.goToPage = function (page) {
        $scope.tablePage = page;
      };
    },
    template: angular.element(document.querySelector('#md-table-template')).html()
  }
});

//UNCOMMENT BELOW TO BE ABLE TO RESIZE COLUMNS OF THE TABLE
/*
app.directive('mdColresize', function ($timeout) {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      scope.$evalAsync(function () {
        $timeout(function(){ $(element).colResizable({
          liveDrag: true,
          fixed: true
          
        });},100);
      });
    }
  }
});
*/

app.directive('showFocus', function($timeout) {
  return function(scope, element, attrs) {
    scope.$watch(attrs.showFocus, 
      function (newValue) { 
        $timeout(function() {
            newValue && element.focus();
        });
      },true);
  };    
});

app.filter('startFrom',function (){
  return function (input,start) {
    start = +start;
    return input.slice(start);
  }
});


/* $scope.gridOptions = {
            data: [],
            urlSync: false
        };

         $scope.headers = [
	    {
	      name:'',
	      field:'thumb'
	    },{
	      name: 'Name', 
	      field: 'name'
	    },{
	      name:'Description', 
	      field: 'description'
	    },{
	      name: 'Last Modified', 
	      field: 'last_modified'
	    }
	  ];
        myAppFactory.getData().then(function (responseData) {
            $scope.gridOptions.data = responseData.data;  
            $scope.content = responseData.data;        
            console.log(responseData.data);
        })

       

    }])
    .factory('myAppFactory', function ($http) {
        return {
            getData: function () {
                return $http({
                    method: 'GET',
                    url: 'https://angular-data-grid.github.io/demo/data.json'
                });
            }
        }
    });*/



