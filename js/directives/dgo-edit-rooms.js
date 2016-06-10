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
                            dow : 1 // Monday is the first day of the week
                        }
                    });

                    console.log('111');

                    $scope.listRooms = {};

                    $roomsService.getOne({method: 'getOne', id: $location.$$search.id}).then(function(data) {
                        $scope.listRooms = data;


                        for (var i in $scope.listRooms) {
                            $scope.vm.events.push({
                                title: $scope.listRooms[i].title,
                                type: $scope.listRooms[i].type,
                                startsAt: moment($scope.listRooms[i].starts_at).toDate(),
                                endsAt: moment($scope.listRooms[i].ends_at).toDate(),
                                draggable: true
                            })
                        }



                    }, function (error) {
                        console.error(error);
                    });




                    $scope.vm = this;

                    $scope.vm.calendarView = 'month';
                    $scope.vm.viewDate = new Date();
                  /*  $scope.vm.events = [
                        {
                            title: '22222222222222222',
                            type: 'warning',
                            startsAt: moment().startOf('week').subtract(2, 'days').add(8, 'hours').toDate(),
                            endsAt: moment().startOf('week').add(1, 'week').add(9, 'hours').toDate(),
                            draggable: true,
                            resizable: true
                        }, {
                            title: '<i class="glyphicon glyphicon-asterisk"></i> <span class="text-primary">2222222222</span>, with a <i>html</i> title',
                            type: 'info',
                            startsAt: moment().subtract(1, 'day').toDate(),
                            endsAt: moment().add(5, 'days').toDate(),
                            draggable: true,
                            resizable: true
                        }, {
                            title: '33333333333',
                            type: 'important',
                            startsAt: moment().startOf('day').add(7, 'hours').toDate(),
                            endsAt: moment().startOf('day').add(19, 'hours').toDate(),
                            recursOn: 'year',
                            draggable: true,
                            resizable: true
                        }
                    ];*/


                    $scope.vm.isCellOpen = true;

                    $scope.vm.eventClicked = function(event) {
                        $alertService.show('Clicked', event);


                        console.log(event);
                    };

                    $scope.vm.eventEdited = function(event) {
                        $alertService.show('Edited', event);
                    };

                    $scope.vm.eventDeleted = function(event) {
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
                }
            };

        }]);
});