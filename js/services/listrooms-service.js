define(["./module"], function (module) {
    "use strict";
    module.factory("$listroomsService", ["$q","$rootScope", "$restService",
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
										 
		return {
			getList: getList
		}
    }]);
});