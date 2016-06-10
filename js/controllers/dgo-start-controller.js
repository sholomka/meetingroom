define(["./module"], function (module) {
    "use strict";
    module.controller("dgoStartController", ["$scope", "$rootScope", "$urlService", "$window", "$constantsService", function ($scope, $rootScope, $urlService, $window, $constantsService) {
		$scope.tabs = [
			{ title:'Список переговорных', url:'dgo-list-rooms', show: true },
			{ title:'Поиск переговорных', url:'dgo-find-rooms', show: true}
			// { title:'Neue', url:'dgo-neue-driveby', show: false },
			// { title:'Bestehende', url:'dgo-bestehende-driveby', show: false}
		];

		/*$scope.$on('edit', function(event, args) {
			$scope.meetingId = args.meetingId;

			for (var i in $scope.tabs) {
				if ($scope.tabs[i].url == 'dgo-list-rooms') {
					$scope.tabs[i].url = 'dgo-find-rooms';
					$scope.tabs[i].title = 'График переговорной';
				}

				console.log($scope.tabs[i].url);
			}

		});*/




	}]);
});