define(["./module"], function (module) {
    "use strict";
    module.factory("$alertService", ["$uibModal",
        function ($uibModal) {
            var show = function(url, event, $scope) {
                return $uibModal.open({
                    templateUrl: url,
                    controller: function(moment) {
                        var vm = this;
                        vm.event = event;
                    },
                    backdrop: true,
                    scope: $scope,
                    controllerAs: 'vm'
                });
            };
            
            return {
                show: show
            };
        }
    ])
    ;
})
;