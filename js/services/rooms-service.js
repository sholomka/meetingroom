define(["./module"], function (module) {
    "use strict";
    module.factory("$roomsService", ["$q","$rootScope", "$restService",
                                     function($q,$rootScope,$restService) {
		 var getPromise=function(data){
			 var deferred=$q.defer();
			 $restService.post(data).run().then(function(data){
				 deferred.resolve(data);
			 },function(error) {
				 deferred.reject(error);
			 });
			 return deferred.promise
		 };
										 
		return {
			getPromise:getPromise
		}
    }]);
});