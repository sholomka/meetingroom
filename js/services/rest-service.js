define(["./module"], function (module) {
    "use strict";
    module.factory("$restService", ["$q","$http","$location", function($q,$http,$location) {
    	
    	var getRequest=function(config) {
    		var requestConfig=angular.extend({
    			method: "GET",
    			responseType: "json"
    		},config);
    		return {
    			run: function() {
    				var deferred=$q.defer();
    				$http(requestConfig).then(function(response) {
    					deferred.resolve(response.data);
    	    		},function(response) {
						deferred.reject(response.data);
    	    		});
    				return deferred.promise;
    			},
    			isAllowed: function() {
    				return $authService.isCurrentRequestAllowed(requestConfig.method,requestConfig.url);
    			}
    		}
    	};
		
        var getList = function (data) {
            return getRequest({
                method: "POST",
                url: "ajax.php",
				data: data
            });
        };

		var getOne = function (data) {
			return getRequest({
				method: "POST",
				url: "ajax.php",
				data: data
			});
		};
		
		var reservation = function (data) {
			return getRequest({
				method: "POST",
				url: "ajax.php",
				data: data
			});
		};

		var getEventsList = function (data) {
			return getRequest({
				method: "POST",
				url: "ajax.php",
				data: data
			});
		};

		var getEventsTypeList = function (data) {
			return getRequest({
				method: "POST",
				url: "ajax.php",
				data: data
			});
		};
		
		return {
			getList: getList,
			getOne: getOne,
			reservation: reservation,
			getEventsList: getEventsList,
			getEventsTypeList: getEventsTypeList
        };
    }]);
});
