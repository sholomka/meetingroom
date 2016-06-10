define(["./module"], function (module) {
    "use strict";
    module.factory("$alertService", ["$uibModal",
        function ($uibModal) {
            var show = function(action, event) {
                return $uibModal.open({
                    templateUrl: 'templates/modalContent.html',
                    controller: function() {
                        var vm = this;
                        vm.action = action;
                        vm.event = event;
                    },
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