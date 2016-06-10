define(["./module"], function (module) {
    "use strict";
    module.factory("$roomsService", ["$q","$rootScope", "$restService",
                                     function($q,$rootScope,$restService) {

		var getList=function(data){
			var deferred=$q.defer();
			$restService.getList(data).run().then(function(data){
				deferred.resolve(data);
				},function(error) {
				deferred.reject(error);
			});
			return deferred.promise
		};

		 var getOne=function(data){
			 var deferred=$q.defer();
			 $restService.getOne(data).run().then(function(data){
				 deferred.resolve(data);
			 },function(error) {
				 deferred.reject(error);
			 });
			 return deferred.promise
		 };
										 
		return {
			getList: getList,
			getOne: getOne
		}
    }]);
});