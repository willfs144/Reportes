//Define an angular module for our app
var app = angular.module('sampleApp', ['ngRoute', 'ngMaterial', 'ngMessages', 'ui.calendar', 'ui.bootstrap']);

//rutas del inicio session
app.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when('/', {			
			templateUrl: 'main/login.html',
			controller: 'loginController'
		}).
		when('/dashboard', {			
			templateUrl: 'start/initiate.html',
			controller: 'initiateController',
			controller: 'dashboardController'
		}).
		when('/signup',{
			templateUrl: 'main/signup.html',
			controller: 'signupController'
		}).
		when('/addprocess',{
			templateUrl: 'process/add-process.html',
			controller: 'addProcessController',
			controller: 'dashboardController'
		}).
		when('/calendar',{
			templateUrl: 'calendar/calendario.html',
			controller: 'myNgController',
			controller: 'dashboardController'
		}).
		otherwise({
			redirectTo: '/'
			});
	}]);




app.run(function($rootScope, $location, sessionService){
	var routespermission= ['/dashboard','/addprocess','/calendar'];
	$rootScope.$on('$routeChangeStart', function(){
		if(routespermission.indexOf($location.path()) !=-1 && !sessionService.isLogged()){
			$location.path("/");
		}
	});

});


app.config(function($mdDateLocaleProvider) {
  // Example of a Spanish localization.
  $mdDateLocaleProvider.months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
                                  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  $mdDateLocaleProvider.shortMonths = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 
                                  'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
  $mdDateLocaleProvider.days = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sábado'];
  $mdDateLocaleProvider.shortDays = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'];
  // Can change week display to start on Monday.
  $mdDateLocaleProvider.firstDayOfWeek = 1;
 
  $mdDateLocaleProvider.weekNumberFormatter = function(weekNumber) {
    return 'Semana ' + weekNumber;
  };
  $mdDateLocaleProvider.msgCalendar = 'Calendario';
  $mdDateLocaleProvider.msgOpenCalendar = 'Abrir calendario';

   $mdDateLocaleProvider.formatDate = function(date) {
      return moment(date).format('MM/DD/YYYY');
    };
  
     $mdDateLocaleProvider.parseDate = function(dateString) {
      var m = moment(dateString, 'MM/DD/YYYY', true);
      return m.isValid() ? m.toDate() : new Date(NaN);
    }
});

app.config(function($mdThemingProvider) {
   $mdThemingProvider
    .theme('default')  
    .primaryPalette('blue',{
      'default': '900',
      'hue-2': '500'
    })
    .accentPalette('indigo')
    .warnPalette('red')
    .backgroundPalette('grey');
  });
