define(["angular", "angular-sanitize", "angular-animate", "angular-touch",
    "ui-bootstrap", "./services/index", "./controllers/index",
    "./directives/index", 'mwl.calendar', 'locale-ru'], function (angular) {
    "use strict";

    var app = angular.module("app", ["ngSanitize", "ngAnimate", "ngTouch", "ngRoute",
        "ui.bootstrap", "app.services", "app.controllers", "app.directives", 'mwl.calendar']);


    app.config(function(calendarConfig) {

        calendarConfig.dateFormatter = 'moment'; // use moment to format dates

    });

    /*app.run(["$templateCache", function($templateCache) {
    	// modify the tab template instead of overwriting it; fixes #DGO-946
    	$templateCache.put("uib/template/tabs/tab.html",$templateCache.get("uib/template/tabs/tab.html").replace('<a href ','<a href="javascript:;" '));;
    }]);*/

    return app;
});