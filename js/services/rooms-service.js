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

		 var reservation=function(data){
			 var deferred=$q.defer();
			 $restService.reservation(data).run().then(function(data){
				 deferred.resolve(data);
			 },function(error) {
				 deferred.reject(error);
			 });
			 return deferred.promise
		 };

		 var getEventsList=function(data){
			 var deferred=$q.defer();
			 $restService.getEventsList(data).run().then(function(data){
				 deferred.resolve(data);
			 },function(error) {
				 deferred.reject(error);
			 });
			 return deferred.promise
		 };

		 var getEventsTypeList=function(data){
			 var deferred=$q.defer();
			 $restService.getEventsTypeList(data).run().then(function(data){
				 deferred.resolve(data);
			 },function(error) {
				 deferred.reject(error);
			 });
			 return deferred.promise
		 };									 
										 
										 
		return {
			getList: getList,
			getOne: getOne,
			reservation: reservation,
			getEventsList: getEventsList,
			getEventsTypeList: getEventsTypeList
		}
    }]);
});