define(["./module"], function (module) {
    "use strict";
    module.directive("dgoListRooms", ["$urlService", "$constantsService", "$filter", "$restService", "$roomsService", "$rootScope",
        function ($urlService, $constantsService, $filter, $restService, $roomsService, $rootScope) {
            return {
                restrict: "E",
                replace: true,
                scope: true,
                templateUrl: "templates/dgo-list-rooms.html",
                controller: function ($scope, $element, $location) {


                    if (!$location.$$search.id) {
                        $roomsService.getList({method: 'getList'}).then(function(data) {

                            $scope.listRooms = data;
                        }, function (error) {
                            console.error(error);
                        });
                    }

                    $scope.edit = function(id) {
                        $urlService.gotoEditPage(id);
                    }
                    
                }
            };

        }]);
});