define(["./module"], function (module) {
    "use strict";
    module.factory("$alertService", ["$uibModal",
        function ($uibModal) {
            var show = function(action, event, moment) {

                return $uibModal.open({
                    templateUrl: 'templates/modalContent.html',
                    controller: function(moment) {


                        console.log(moment);

                        var vm = this;
                        vm.action = action;

                        switch(vm.action) {
                            case 'Clicked':
                                vm.title = 'Просмотр события!';
                                break;

                            case 'Edited':
                                vm.title = 'Редактирование события!';
                                break;

                            case 'Deleted':
                                vm.title = 'Удаление события!';
                                break;

                        }

                        vm.event = event;
                        vm.event.startsAt = moment(vm.event.startsAt).toDate();
                        vm.event.endsAt = moment(vm.event.endsAt);

                       
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