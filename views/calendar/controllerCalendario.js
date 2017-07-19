//var app = angular.module('myApp', ['ui.calendar', 'ui.bootstrap']); // added u.bootstrap for modal dialog
app.controller('myNgController', ['$scope', '$mdDialog', '$http', 'uiCalendarConfig', '$uibModal', '$mdpTimePicker', '$http', '$filter','$route',function ($scope, $mdDialog,$http, uiCalendarConfig, $uibModal, $mdpTimePicker, $http, $filter,$route) {
    
    $scope.SelectedEvent = null;
    var isFirstTime = true;   

      $scope.status = '  ';
      $scope.customFullscreen = false;
     

    $scope.events = [];
    $scope.eventSources = [$scope.events];

   

    $scope.NewEvent = {};
    // this function for ge datetime form json date 
    function getDate(datetime){
        if (datetime != null) {
            var mili = datetime.replace(/\/Date\((-?\d+)\)\//, '$1');
            return new Date(parseInt(mili));
        }else
            return "";

    }


 
 function clearCalendar(){
    if(uiCalendarConfig.calendars.myCalendar != null){
        uiCalendarConfig.calendars.myCalendar.fullCalendar('removeEvents');
        uiCalendarConfig.calendars.myCalendar.fullCalendar('unselect');
    }
 }
    //Load events from server
    //will put this to a method
    function populate(){
            clearCalendar();
            $http.get('/calendario', {
            cache: false,
            params: {}
        }).then(function (data) {
            $scope.events.slice(0, $scope.events.length);
            angular.forEach(data.data, function (value) {
                $scope.events.push({
                    id: value.EventID,
                    title: value.Title,
                    description: value.Description,
                    start: new Date(value.StartAt),
                    end: new Date(value.EndAt),
                    allDay : value.IsFullDay,
                    stick: true
                });                
            });

        });
    }
    populate();
    



	//configure calendar
    $scope.uiConfig = {      
        calendar: {
            lang: 'Spanish',           
            height: 630,             
            editable: false,
            displayEventTime: true,
            header: {
                left: 'month agendaWeek agendaDay  ',
                center: 'title',
                right:'today prev, next'
            },
            /*timeFormat:{
                month: ' ', 
                agenda: 'h:mm t'
            },*/
            selectable: true, 
            selectHelper: true,
            select: function(start, end){
                var fromDate = moment(start).format('DD/MM/YYYY LT');
                var endDate = moment(end).format('DD/MM/YYYY LT');
                var f = new Date(fromDate)
                $scope.NewEvent = {
                    EventID: 0,
                    StartAt: fromDate, 
                    EndAt: endDate, 
                    fecha: new Date(end),
                    hora: f || new Date(endDate),
                    IsFullDay: false, 
                    Title: '', 
                    Description: '',
                    user: $scope.user 
                }
                 if(isNaN($scope.NewEvent.hora.getTime())){
                        $scope.NewEvent.hora = new Date();
                    }
               console.log("fecha:  "+$scope.NewEvent.hora);
                //$scope.ShowModal();
                 $scope.showAdvanced();
                 console.log("datos:  "+$scope.user.oficina._id);
            }, 
            eventClick: function (event) {
                $scope.SelectedEvent = event;
                var fromDate = moment(event.start).format('DD/MM/YYYY LT');
                var endDate = moment(event.end).format('DD/MM/YYYY LT');
                //var fecha = moment(start).format('DD/MM/YYYY');
                $scope.NewEvent = {
                    EventID: event.id,
                    StartAt: fromDate, 
                    EndAt: endDate, 
                    fecha: new Date(event.end),
                    hora: fromDate.split('GMT-'),
                    IsFullDay: false, 
                    Title: event.title, 
                    Description: event.description
                }                
                //$scope.ShowModal();
            },              
            eventAfterAllRender: function () {
                if ($scope.events.length > 0 && isFirstTime) {
                    uiCalendarConfig.calendars.myCalendar.fullCalendar( 'removeEventSource', $scope.events);
                    uiCalendarConfig.calendars.myCalendar.fullCalendar( 'addEventSource', $scope.events);         
                    uiCalendarConfig.calendars.myCalendar.fullCalendar('refetchEvents');
                     //$scope.myCalendar.fullCalendar('refetchEvents');
                    //Focus first event
                    //uiCalendarConfig.calendars.myCalendar.fullCalendar('rerenderEvents');
                    uiCalendarConfig.calendars.myCalendar.fullCalendar('gotoDate', $scope.events[0].start);
                    isFirstTime = false;
                }
            }           
        }
    };

    $scope.changeLang = function() {
      if($scope.changeTo === 'English'){
        $scope.uiConfig.calendar.dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        $scope.uiConfig.calendar.dayNamesShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];       
        $scope.changeTo= 'Español';
      } else {
        $scope.uiConfig.calendar.dayNames = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
        $scope.uiConfig.calendar.dayNamesShort = ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"];  
         $scope.uiConfig.calendar.monthNames =['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio','Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        $scope.changeTo= 'English';
      }
    };
    $scope.changeLang();


    $scope.showAdvanced = function() {




    $mdDialog.show({
      controller: DialogController,
      templateUrl: 'calendar/modal-dialog-alert.html',
      parent: angular.element(document.body),      
      clickOutsideToClose:true,
      fullscreen: $scope.customFullscreen, // Only for -xs, -sm breakpoints.
      locals: {
       NewEvent: $scope.NewEvent        
     }
    })
    .then(function(answer) {
      $scope.status = 'You said the information was "' + answer + '".';
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
  };


    //this function for show modal dialog
    /*$scope.ShowModal = function(){
        $scope.option = {
            templateUrl: 'calendar/modal-dialog-alert.html', 
            controller: 'modalController', 
            parent: angular.element(document.body),
            backdrop: 'static', 
            clickOutsideToClose:true,
            resolve: {
                NewEvent: function(){
                    return $scope.NewEvent;
                }
            }
        };
        var modal = $uibModal.open($scope.option);
        modal.result.then(function(data){
            $scope.NewEvent = data.event;
            switch(data.operation){
                case 'Save':
                //save here
                    $http({
                        method: 'POST',
                        url: 'home/SaveEvent',
                        data: $scope.NewEvent
                    }).then(function(response){
                        if (response.data.status) {
                            populate();
                        }
                    })
                    break;
                case 'Delete':
                //Delete here
                    $http({
                        method: 'POST',
                        url: 'home/DeleteEvent',
                        data: {eventID: $scope.NewEvent.EventID }
                    }).then(function(response){
                        if (response.data.status) {
                            populate();
                        }
                    })
                    break;
                default: 
                    break;
            }
        }, function(){
            console.log('Modal dialog closed')
        })
    }*/


 
}]);

// create a new controller for modal 

/*app.controller('modalController', ['$scope','$mdDialog','$uibModalInstance', 'NewEvent',function($scope, $mdDialog, $uibModalInstance, NewEvent){
    $scope.NewEvent = NewEvent;
    $scope.Message = "";
    $scope.ok = function(){
        if ($scope.NewEvent.Title.trim() != "") {
            $uibModalInstance.close({event: $scope.NewEvent, operation: 'Save'});
        }else{
            $scope.Message = "Event title required ";
        }
    }
    $scope.delete = function(){
         $uibModalInstance.close({event: $scope.NewEvent, operation: 'Delete'});
    }
    $scope.cancel = function(){
         $uibModalInstance.dismiss('cancel');
    }

    

}]);*/


function DialogController($scope, $mdDialog, NewEvent, $http, $filter,$route) {
   

    $scope.NewEvent = NewEvent;
    console.log("tomelo: "+$scope.process);
    $scope.Message = "";
    $scope.hide = function() {
      $mdDialog.hide();
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.answer = function(answer) {
      $mdDialog.hide(answer);
    };

    
  }



