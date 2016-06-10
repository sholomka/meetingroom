define(["./module"], function (module) {
    "use strict";
    module.factory("$urlService", ["$location", function ($location) {
        
        var gotoStartPage = function () {
           $location.url("/start");
        };

        var gotoEditPage = function (id) {
            $location.url("/edit?id=" + id);
        };

        return {
            gotoStartPage: gotoStartPage,
            gotoEditPage: gotoEditPage
        };

    }]).config(function ($routeProvider) {
        $routeProvider.when("/start", {
            templateUrl: "templates/page-start.html",
            controller: "dgoStartController"

        }).when("/edit", {
            templateUrl: "templates/page-edit.html",
            controller: "dgoEditController"

        }).otherwise({
            redirectTo: "/start"
        });
    });
});