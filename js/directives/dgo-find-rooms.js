define(["./module"], function (module) {
    "use strict";
    module.directive("dgoFindRooms", ["$urlService", "$constantsService", "$filter", "$restService",
        function ($urlService, $constantsService, $filter, $restService) {
            return {
                restrict: "E",
                replace: true,
                scope: true,
                templateUrl: "templates/dgo-find-rooms.html",
                controller: function ($scope, $element) {
                }
            };

        }]);
});