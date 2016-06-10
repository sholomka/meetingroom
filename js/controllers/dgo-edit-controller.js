define(["./module"], function (module) {
    "use strict";
    module.controller("dgoEditController", ["$scope", "$rootScope", "$urlService", "$window", "$constantsService", function ($scope, $rootScope, $urlService, $window, $constantsService) {
        $scope.tabs = [
            { title:'График переговорной', url:'dgo-edit-rooms', show: true },
            { title:'Список переговорных', url:'dgo-list-rooms', show: true },
            { title:'Поиск переговорных', url:'dgo-find-rooms', show: true}
        ];

        $scope.tabsclick = function(url) {
            if (url == 'dgo-list-rooms') {
                $urlService.gotoStartPage();
            }
        }

    }]);
});