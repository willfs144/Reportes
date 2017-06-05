//var app = angular.module('myApp', ['ui.calendar', 'ui.bootstrap']); // added u.bootstrap for modal dialog
app.controller('myNgController', ['$scope', '$http', 'uiCalendarConfig', '$uibModal', function ($scope, $http, uiCalendarConfig, $uibModal) {
    
    $scope.SelectedEvent = null;
    var isFirstTime = true;   

 
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
                console.log(new Date(value.StartAt));
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
                var fromDate = moment(start).format('YYYY/MM/DD LT');
                var endDate = moment(end).format('YYYY/MM/DD LT');
                $scope.NewEvent = {
                    EventID: 0,
                    StartAt: fromDate, 
                    EndAt: endDate, 
                    IsFullDay: false, 
                    Title: '', 
                    Description: ''
                }
                $scope.ShowModal();
            }, 
            eventClick: function (event) {
                $scope.SelectedEvent = event;
                /*var fromDate = moment(event.start).format('YYYY/MM/DD LT');
                var endDate = moment(event.end).format('YYYY/MM/DD LT');
                $scope.NewEvent = {
                    EventID: event.id,
                    StartAt: fromDate, 
                    EndAt: endDate, 
                    IsFullDay: false, 
                    Title: event.title, 
                    Description: event.description
                }
                $scope.ShowModal();*/
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

    //this function for show modal dialog
    $scope.ShowModal = function(){
        $scope.option = {
            templateUrl: 'modalContent.html', 
            controller: 'modalController', 
            backdrop: 'static', 
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
    }

    
 
}]);

// create a new controller for modal 

app.controller('modalController', ['$scope', '$uibModalInstance', 'NewEvent',function($scope, $uibModalInstance, NewEvent){
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

}])