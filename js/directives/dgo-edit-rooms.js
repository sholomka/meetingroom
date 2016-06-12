define(["./module"], function (module) {
    "use strict";
    module.directive("dgoEditRooms", ["$urlService", "$filter", "$restService", "$roomsService", "$rootScope", "$alertService",
        function ($urlService, $filter, $restService, $roomsService, $rootScope, $alertService) {
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
                    
                    $scope.getEventsList = function(sendData) {
                        $roomsService.getPromise(sendData).then(function(events) {
                            for (var i in events) {
                                $scope.vm.events.push({
                                    id: events[i].id,
                                    m_id: events[i].m_id,
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
                    };

                    $roomsService.getPromise({method: 'getOne', data: {id: $scope.meetingID}}).then(function(data) {
                        $scope.listRooms = data;
                        var sendData = {method: 'getEventsList', data: {id: $scope.meetingID}};
                        $scope.getEventsList(sendData);

                    }, function (error) {
                        console.error(error);
                    });
                    
                    $roomsService.getPromise({method: 'getEventsTypeList', data: {}}).then(function(eventsType) {
                        $scope.eventsTypeMatch = eventsType;
                        $scope.eventsType = Object.keys($scope.eventsTypeMatch);
                    }, function (error) {
                        console.error(error);
                    });
                    
                    $scope.vm.isCellOpen = true;

                    $scope.vm.eventClicked = function(event) {
                        var currentModal = $alertService.show('templates/modal-content.html', event, $scope);

                        $scope.ok = function() {
                            currentModal.dismiss();
                        }
                    };

                    $scope.vm.eventEdited = function(event) {
                        var editEvent = {};
                        editEvent.applicant = event.applicant;
                        editEvent.id = event.id;
                        editEvent.title = event.title;
                        editEvent.m_id = event.m_id;
                        editEvent.type = event.type;
                        editEvent.startsAt = event.startsAt;
                        editEvent.endsAt = event.endsAt;

                        var currentModal = $alertService.show('templates/modal-edit.html', editEvent, $scope);

                        $scope.ok = function() {
                            editEvent.type = $scope.eventsTypeMatch[editEvent.type];
                            editEvent.startsAt = moment(editEvent.startsAt).add(3, 'hours').toDate();
                            editEvent.endsAt = moment(editEvent.endsAt).add(3, 'hours').toDate();

                            var sendData = {method: 'updateReservation', data: editEvent};

                            $roomsService.getPromise(sendData).then(function(data) {
                                $scope.vm.events = [];
                                sendData = {method: 'getEventsList', data: {id: $scope.meetingID}};
                                $scope.getEventsList(sendData);
                                currentModal.dismiss();
                            }, function (error) {
                                console.error(error);
                            });
                        };

                        $scope.cancel = function() {
                            currentModal.dismiss();
                        };

                        $scope.toggle = function($event, field, event) {
                            $scope.vm.toggle($event, field, event);
                        }
                    };

                    $scope.vm.eventDeleted = function(event) {
                        var currentModal = $alertService.show('templates/modal-delete.html', event, $scope);

                        $scope.ok = function() {
                            var sendData = {method: 'deleteReservation', data: {id: event.id}};

                            $roomsService.getPromise(sendData).then(function(data) {
                                $scope.vm.events = [];
                                sendData = {method: 'getEventsList', data: {id: $scope.meetingID}};
                                $scope.getEventsList(sendData);
                                currentModal.dismiss();
                            }, function (error) {
                                console.error(error);
                            });
                        };

                        $scope.cancel = function() {
                            currentModal.dismiss();
                        }
                    };
                    
                    $scope.vm.toggle = function($event, field, event) {
                        $event.preventDefault();
                        $event.stopPropagation();
                        event[field] = !event[field];
                    };
                    
                    $scope.reservation = function() {
                        var method = 'createReservation';
                        $scope.sendData = [];

                        angular.forEach($scope.vm.events, function(value, key, obj) {
                            $scope.sendData[key] = {};
                            $scope.sendData[key].type = $scope.eventsTypeMatch[obj[key].type];
                            $scope.sendData[key].m_id = obj[key].m_id;
                            $scope.sendData[key].applicant = obj[key].applicant;
                            $scope.sendData[key].title = obj[key].title;
                            $scope.sendData[key].startsAt = moment(obj[key].startsAt).add(3, 'hours').toDate();
                            $scope.sendData[key].endsAt = moment(obj[key].endsAt).add(3, 'hours').toDate();
                        });
                        
                        $roomsService.getPromise({method: method, data: $scope.sendData}).then(function(data) {
                            $scope.data = data.response;
                            var currentModal = $alertService.show('templates/modal-save.html', event, $scope);

                            $scope.ok = function() {
                                currentModal.dismiss();
                            }
                        }, function (error) {
                            console.error(error);
                        });
                    };
                    
                    $scope.add = function() {
                        var today = moment({hour: 9, minute: 0}).toDate();

                        $scope.vm.events.push(
                            {
                                m_id: $scope.meetingID,
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