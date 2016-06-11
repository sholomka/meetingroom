define(["./module"], function (module) {
    "use strict";
    module.directive("dgoEditRooms", ["$urlService", "$constantsService", "$filter", "$restService", "$roomsService", "$rootScope", "$alertService",
        function ($urlService, $constantsService, $filter, $restService, $roomsService, $rootScope, $alertService) {
            return {
                restrict: "E",
                replace: true,
                scope: true,
                templateUrl: "templates/dgo-edit-rooms.html",
                controller: function ($scope, $element, $location, moment) {
                    moment.locale('ru', {
                        week : {
                            dow : 1
                        }
                    });

                    $scope.meetingID = $location.$$search.id;
                    $scope.listRooms = {};
                    $scope.vm = this;
                    $scope.vm.calendarView = 'month';
                    $scope.vm.viewDate = new Date();

                    $roomsService.getOne({method: 'getOne', data: {id: $scope.meetingID}}).then(function(data) {
                        $scope.listRooms = data;

                        $roomsService.getEventsList({method: 'getEventsList', data: {id: $scope.meetingID}}).then(function(events) {

                            for (var i in events) {
                                $scope.vm.events.push({
                                    id: $scope.meetingID,
                                    title: events[i].title,
                                    applicant: events[i].applicant,
                                    type: events[i].type,
                                    startsAt: moment(events[i].starts_at).toDate(),
                                    endsAt: moment(events[i].ends_at).toDate(),
                                    draggable: true,
                                    resizable: true
                                })
                            }
                        }, function (error) {
                            console.error(error);
                        });

                    }, function (error) {
                        console.error(error);
                    });

                    
                    $roomsService.getEventsTypeList({method: 'getEventsTypeList', data: {}}).then(function(eventsType) {
                       $scope.eventsTypeMatch = eventsType;
                        $scope.eventsType = Object.keys($scope.eventsTypeMatch);



                        console.log($scope.eventsTypeMatch);
                        console.log($scope.eventsType);
                        console.log($scope.eventsType);

                    }, function (error) {
                        console.error(error);
                    });


                    $scope.vm.isCellOpen = true;

                    $scope.vm.eventClicked = function(event) {
                        $alertService.show('Clicked', event, moment);
                        // console.log(event);
                    };

                    $scope.vm.eventEdited = function(event) {
                        $alertService.show('Edited', event);
                    };

                    $scope.vm.eventDeleted = function(event) {




                        $scope.vm.events.splice(event.$id, 1);


                       

                        $alertService.show('Deleted', event);
                    };

                    $scope.vm.eventTimesChanged = function(event) {
                        $alertService.show('Dropped or resized', event);
                    };

                    $scope.vm.toggle = function($event, field, event) {
                        $event.preventDefault();
                        $event.stopPropagation();
                        event[field] = !event[field];
                    };


                    $scope.reservation = function() {

                        var method = 'createReservation';
                        
                      /*  var sendData = {
                            method: 'createReservation',
                            title: 'New event',
                            type: '1',
                            id: $scope.meetingID,
                            startsAt:  moment().add(3, 'hours').toDate(),
                            endsAt:  moment().add(3, 'hours').toDate()
                        };*/


                        $scope.sendData = [];

                        angular.forEach($scope.vm.events, function(value, key, obj) {
                            $scope.sendData[key] = {};
                            $scope.sendData[key].type = $scope.eventsTypeMatch[obj[key].type];
                            $scope.sendData[key].id = obj[key].id;
                            $scope.sendData[key].applicant = obj[key].applicant;
                            $scope.sendData[key].title = obj[key].title;
                            $scope.sendData[key].startsAt = moment(obj[key].startsAt).add(3, 'hours').toDate();
                            $scope.sendData[key].endsAt = moment(obj[key].endsAt).add(3, 'hours').toDate();
                        });


                        $roomsService.reservation({method: method, data: $scope.sendData}).then(function(data) {

                        }, function (error) {
                            console.error(error);
                        });
                    };
                    
                    $scope.add = function() {
                        var today = moment().toDate();
                        $scope.vm.events.push(
                            {
                                id: $scope.meetingID,
                                title: 'New event',
                                applicant: 'Заявитель',
                                type: 'important',
                                startsAt: today,
                                endsAt: today,
                                draggable: true,
                                resizable: true
                            }
                        );
                    };
                }
            };

        }]);
});