define(["./module"], function (module) {
    "use strict";
    module.controller("dgoStartController", ["$scope", function ($scope) {
		$scope.tabs = [
			{ title:'Список переговорных', url:'dgo-list-rooms', show: true }
		];
	}]);
});