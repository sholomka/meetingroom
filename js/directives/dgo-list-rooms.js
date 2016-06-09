define(["./module"], function (module) {
    "use strict";
    module.directive("dgoListRooms", ["$urlService", "$constantsService", "$filter", "$restService", "$listroomsService",
        function ($urlService, $constantsService, $filter, $restService, $listroomsService) {
            return {
                restrict: "E",
                replace: true,
                scope: true,
                templateUrl: "templates/dgo-list-rooms.html",
                controller: function ($scope, $element) {
                    $listroomsService.getList({method: 'getList'}).then(function(data) {
                        $scope.listRooms = data;
                    }, function (error) {
                        console.error(error);
                    });
                }
            };

        }]);
});