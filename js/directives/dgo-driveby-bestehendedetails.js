define(["./module"], function (module) {
    "use strict";
    module.directive("dgoDrivebyBestehendedetails", ["$urlService", "$constantsService", "$filter", "$restService", "$newsService", "$drivebysService", "$listenerService", "$mapServiceBestehende", "$sucheService", "$uibModal", "$rootScope", "$sce",
        function ($urlService, $constantsService, $filter, $restService, $newsService, $drivebysService, $listenerService, $mapServiceBestehende, $sucheService, $uibModal, $rootScope, $sce) {
            return {
                restrict: "E",
                replace: true,
                scope: true,
                templateUrl: "templates/dgo-driveby-bestehendedetails.html",
                controller: function ($scope, $attrs, Lightbox, $sessionStorage, $anchorScroll, $timeout) {
                    $constantsService.getZustande().then(function(constants){
                        $scope.zustand = constants;
                        $scope.zustandFront = {};
                        for (var key in constants) {
                            $scope.zustandFront[constants[key]] = key;
                        }
                    });

                    $constantsService.getObjektTypen().then(function(constants){
                        $scope.objekttyp = constants;
                        $scope.objekttypFront = {};
                        for (var key in constants) {
                            $scope.objekttypFront[constants[key]] = key;
                        }
                    });

                    $constantsService.getStates().then(function(constants){
                        $scope.states = constants;
                        $scope.denkmalschutz = {"Unbekannt": null, "Ja": true, "Nein": false};
                        $scope.denkmalschutzFront = {};
                        for (var key in $scope.denkmalschutz) {
                            $scope.denkmalschutzFront[$scope.denkmalschutz[key]] = key;
                        }
                    });

                    $constantsService.getBautenstande().then(function(constants){
                        $scope.bautenstand = constants;
                        $scope.bautenstandFront = {};
                        for (var key in constants) {
                            $scope.bautenstandFront[constants[key]] = key;
                        }
                    });

                    $constantsService.getObjektStandard().then(function(constants){
                        $scope.objektStandardType = constants;
                        $scope.objektStandardTypeFront = {};
                        for (var key in constants) {
                            $scope.objektStandardTypeFront[constants[key]] = key;
                        }
                    });

                    $constantsService.getObjektStandardUmg().then(function(constants){
                        $scope.umgebende = constants;
                        $scope.umgebendeFront = {};
                        for (var key in constants) {
                            $scope.umgebendeFront[constants[key]] = key;
                        }
                    });

                    $constantsService.getLeerstandUmg().then(function(constants){
                        $scope.leerstand = constants;
                        $scope.leerstandFront = {};
                        for (var key in constants) {
                            $scope.leerstandFront[constants[key]] = key;
                        }
                    });

                    $constantsService.getVerkehr().then(function(constants){
                        $scope.verkehrsanbindung = constants;
                        $scope.verkehrsanbindungFront = {};
                        for (var key in constants) {
                            $scope.verkehrsanbindungFront[constants[key]] = key;
                        }
                    });

                    $constantsService.getVersorgung().then(function(constants){
                        $scope.versorgungseinrichtung = constants;
                        $scope.versorgungseinrichtungFront = {};
                        for (var key in constants) {
                            $scope.versorgungseinrichtungFront[constants[key]] = key;
                        }
                    });

                    $constantsService.getErholung().then(function(constants){
                        $scope.erholungsmoglichkeiten = constants;
                        $scope.erholungsmoglichkeitenFront = {};
                        for (var key in constants) {
                            $scope.erholungsmoglichkeitenFront[constants[key]] = key;
                        }
                    });

                    $scope.sortByKey = function(array, key) {
                        if(angular.isArray(array) && !angular.equals(array, [])) {
                            return array.sort(function(a, b) {
                                var x = a[key]; var y = b[key];
                                return ((x < y) ? -1 : ((x > y) ? 1 : 0));
                            });
                        }
                    };

                    $scope.$on('acceptbestehende', function (event, args) {
                        if (args.isVideo) {
                            $scope.video[args.index].accept = args.accept;
                        } else {
                            $scope.images[args.index].accept = args.accept;
                        }
                    });

                    $scope.$on('acceptDblClickbestehende', function (event, args) {
                        if (args.isVideo) {
                            $scope.video[args.index].accept = args.accept;
                            $scope.video[args.index].complaint = args.complaint;

                        } else {
                            $scope.images[args.index].accept = args.accept;
                            $scope.images[args.index].complaint = args.complaint;
                        }
                    });

                    $scope.$on('complaintbestehende', function (event, args) {
                        if (args.isVideo) {
                            $scope.video[args.index].complaint = args.complaint;
                        } else {
                            $scope.images[args.index].complaint = args.complaint;
                        }
                    });

                    $scope.loadItems = function(args) {
                        $scope.sendData = {};
                        $scope.uploadingObject = {};
                        $scope.uploadingObject.unbekannt = false;
                        $scope.showForm = true;
                        $scope.max = 5;
                        $scope.isReadonly = false;
                        $scope.uploadingObject.driveByRate = 0;
                        $scope.myInterval = 5000;
                        $scope.noWrapSlides = false;
                        $scope.active = 0;
                        $scope.mapped = {};
                        $scope.driveByRate = {};
                        $scope.rateTextStyle = {};

                        var progresses = $scope.bautenstand,
                            countProgresses = Object.keys(progresses).length;

                        var statusWidth = Math.floor(100 / (countProgresses + 1));
                        $scope.driveByStatusWidth = statusWidth + "%";
                        $scope.driveByStatusTotalWidth = (statusWidth * (countProgresses)) + "%";
                        $scope.driveByMap = {};

                        angular.forEach(args.data, function(value, key, obj) {
                            if (key == 'base64Images' && args.data[key]) {
                                $scope.sendData.base64Images = [];

                                angular.forEach(args.data[key], function(value, key, obj) {
                                    $scope.sendData.base64Images[key] = {};
                                    $scope.sendData.base64Images[key].base64 = obj[key].base64;
                                    $scope.sendData.base64Images[key].index = obj[key].index;
                                    $scope.sendData.base64Images[key].uri = obj[key].uri;
                                });
                            } else if (key == 'images' && args.data[key]) {
                                $scope.sendData.images = [];

                                angular.forEach(args.data[key], function(value, key, obj) {
                                    $scope.sendData.images[key] = {};
                                    $scope.sendData.images[key].base64 = obj[key].base64;
                                    $scope.sendData.images[key].index = obj[key].index;
                                    $scope.sendData.images[key].uri = obj[key].uri;
                                });
                            } else {
                                $scope.sendData[key] = value;

                                if (key == 'buildingProgress') {
                                    if (!angular.isArray($scope.driveByMap[value])) {
                                        $scope.driveByMap[value] = [];
                                    }
                                    $scope.driveByMap[value].unshift($scope.sendData);
                                }
                            }
                        });

                        var j = 0;
                        for(var i in progresses) {
                            if (progresses[i] == $scope.sendData.buildingProgress) {
                                $scope.driveByStatus = progresses[i];
                                $scope.driveByStatusIndex = j;
                                var blockWidth = 100 / (countProgresses);
                                $scope.driveByStatusBarWidth = (blockWidth * ($scope.driveByStatusIndex)).toFixed(2) + "%";
                                break;
                            }

                            j++;
                        }

                        $scope.driveBy = $scope.sendData;
                        $scope.selectedDriveBy = $scope.sendData;
                        $scope.drivebyLoading = false;

                        $scope.infoData = {};
                        $scope.infoData.projectType = args.data.projectType;
                        $scope.infoData.objectType = args.data.objectType;
                        $scope.infoData.protectedBuilding = args.data.protectedBuilding;
                        $scope.infoData.buildingProgress = args.data.buildingProgress;
                        $scope.infoData.objectStandard = args.data.objectStandard;
                        $scope.infoData.objectStandardEnv = args.data.objectStandardEnv;
                        $scope.infoData.vacancyEnv = args.data.vacancyEnv;
                        $scope.infoData.publicTransport = args.data.publicTransport;
                        $scope.infoData.nearbySupply = args.data.nearbySupply;
                        $scope.infoData.nearbyRecreation = args.data.nearbyRecreation;

                       
                        $sessionStorage.base64Imagesbestehende = [];
                        $sessionStorage.base64Videobestehende = [];
                        $sessionStorage.formchangesbestehende = [];
                        $sessionStorage.videoComplaintsbestehende = {};
                        $sessionStorage.datenComplaintsbestehende = {};
                        $sessionStorage.complaintsbestehende = [];
                       

                        $scope.reset();

                        if (angular.isArray(args.data.base64Images) && !angular.equals(args.data.base64Images, [])) {
                            $scope.images = args.data.base64Images;
                        } else if (angular.isArray(args.data.images) && !angular.equals(args.data.images, [])) {
                            $scope.images = args.data.images;
                        }

                        if (args.data.base64Video) {
                            $scope.videoUrl = "data:video/mp4;base64," + args.data.base64Video;
                        } else if (args.data.videoUri) {
                            $scope.videoUrl = args.data.videoUri;
                        }
                        
                        $scope.base64Video = args.data.base64Video;
                        $scope.daten = {
                            accept: false,
                            complaint: false
                        };

                        $scope.config = {
                            sources: [
                                {src: $sce.trustAsResourceUrl($scope.videoUrl), type: "video/mp4"},
                                {src: $sce.trustAsResourceUrl($scope.videoUrl), type: "video/webm"},
                                {src: $sce.trustAsResourceUrl($scope.videoUrl), type: "video/ogg"}
                                /* {src: $sce.trustAsResourceUrl("http://static.videogular.com/assets/videos/videogular.webm"), type: "video/webm"},
                                 {src: $sce.trustAsResourceUrl("http://static.videogular.com/assets/videos/videogular.ogg"), type: "video/ogg"}*/
                            ],
                            tracks: [
                                {
                                    src: "http://www.videogular.com/assets/subs/pale-blue-dot.vtt",
                                    kind: "subtitles",
                                    srclang: "en",
                                    label: "English",
                                    default: ""
                                }
                            ],
                            theme: "bower_components/videogular-themes-default/videogular.css",
                            plugins: {
                                poster: "http://www.videogular.com/assets/images/videogular.png"
                            }
                        };

                        $scope.video = [
                            {
                                'type': 'video',
                                'tab': 'bestehende',
                                'config': $scope.config,
                                'thumbUrl': 'https://i.ytimg.com/vi/N7TkK2joi4I/1.jpg',
                                'base64Video': $scope.base64Video,
                                'accept': false,
                                'complaint': false
                            }
                        ];

                        $scope.titlesImage = [
                            "Objektübersicht",
                            "Bauschild",
                            "Objekteingang",
                            "Rückseite",
                            "Objektumgebung 1",
                            "Objektumgebung 2"
                        ];

                        $scope.sortByKey($scope.images, 'index');
                        var slides = $scope.slides = [];

                        angular.forEach($scope.images, function(value, key, obj) {
                            obj[key].url = obj[key].base64 ? 'data:image/png;base64,' + obj[key].base64 : obj[key].uri;
                            obj[key].thumbUrl = obj[key].base64 ? 'data:image/png;base64,' + obj[key].base64 : obj[key].uri;
                            obj[key].caption = $scope.titlesImage[key];
                            obj[key].accept = false;
                            obj[key].complaint = false;
                            obj[key].tab = 'bestehende';

                            slides.push({
                                image: obj[key].base64 ? 'data:image/png;base64,' + obj[key].base64 : obj[key].uri,
                                text: $scope.titlesImage[key],
                                id: key
                            });
                        });

                        angular.forEach($scope.sendData.complaints, function(value, key, obj) {
                            var index = parseInt(obj[key].element.substr(-1)) - 1;
                            $scope.images[index].complaintText = obj[key].complaintText;
                        });

                        $scope.rateText = [
                            "Bitte bewerten Sie diesen Upload!",
                            "Der Upload war unzureichend",
                            "Der Upload hatte gravierende Mängel",
                            "Der Upload hatte leichte Mängel",
                            "Der Upload war weitgehend in Ordnung",
                            "Der Upload war beanstandungsfrei"
                        ];

                        $scope.preloader = false;
                        $scope.showForm = true;
                    };

                    $scope.preloader = false;

                    $scope.$on('preloaderbestehende', function (event, args) {
                        if (angular.isDefined(currentItemsTimer)) {
                            $timeout.cancel(currentItemsTimer);
                        }
                        $scope.preloader = args.data;
                        $scope.showForm = false;
                    });

                    var currentItemsTimer;

                    $scope.$on('drivebyDetailsbestehende', function (event, args) {
                        currentItemsTimer = $timeout(function () {
                            $scope.loadItems(args);
                        }, 500);
                    });

                    $scope.driveByDetail = {
                        height: $scope.driveByNeueHeight,
                        paddingRight: 0
                    };

                    $scope.driveBysListStyleObj = {
                        overflow: 'auto',
                        height: $scope.driveBysListHeight,
                        position: 'relative'
                    };

                    $scope.getStars = function(rating) {
                        // Get the value
                        var val = rating > 5 ? 5 :parseFloat(rating);

                        // Turn value into number/100
                        var size = val/5*100;

                        return size + '%';
                    };

                    $scope.getUserInfo = function(userName, open) {
                        if (open) {
                            $drivebysService.getUserInfo(userName).then(function (data) {
                                $scope.userInfo = data;
                                $scope.rate = data.averageRating;

                            }, function (error) {
                                $rootScope.driveBys = undefined;
                                if (error && error.exception == "PolygonNotInViewportException") {
                                    $rootScope.newsBemerkung = error.error;
                                } else {
                                    $rootScope.newsError = error;
                                }
                            });
                        }
                    };

                    $listenerService.addChangeListener("detailItembestehende", "dgoDrivebyDetails", function (item) {
                        if (angular.isObject(item)) {
                            $scope.mapObjectList = [];
                            angular.forEach(item.objektImBauVorschau, function(data) {
                                $sucheService.loadItem(data.id).then(function (data) {
                                    $scope.mapObjectList.push(data);
                                });
                            });
                        }
                    });

                    $scope.highlightMarker = function (item, $event) {
                       
                        $sessionStorage.formchangesbestehende.push('highlightMarker');

                        $scope.sendData.mappedImmoObject = {
                            "objectType": item.angebotsart,
                            "objectId": item.id
                        };

                        angular.element(document.querySelectorAll('.driveby-bestehende-detail .ax_dynamic_panel')).removeClass('active');
                        angular.element(document.querySelector('.driveby-bestehende-detail #u722')).css('opacity', '1');
                        angular.element($event.currentTarget).toggleClass('active');
                        // $mapServiceBestehende.removeDrivebyMarker();
                        $mapServiceBestehende.highlightItem(item);

                        $scope.street = item.adresse.strasse;
                        $scope.plz = item.adresse.plz;
                        $scope.city = item.adresse.ort;

                        $drivebysService.getMapped(item.id).then(function (data) {
                            if (data.length > 0) {
                                var progresses = [];
                                angular.forEach($scope.bautenstand, function(value, key, obj) {
                                    progresses.push({
                                        key: value,
                                        name: key
                                    });
                                });

                                var statusWidth = Math.floor(100 / (progresses.length + 1));
                                $scope.driveByStatusWidth = statusWidth + "%";
                                $scope.driveByStatusTotalWidth = (statusWidth * (progresses.length)) + "%";
                                $scope.driveByMap = {};

                                for (var i = 0; i < data.length; i++) {
                                    if (!angular.isArray($scope.driveByMap[data[i].buildingProgress])) {
                                        $scope.driveByMap[data[i].buildingProgress] = [];
                                    }
                                    $scope.driveByMap[data[i].buildingProgress].unshift(data[i]); //sortierung umkehren
                                }


                                for (var i = 0; i < progresses.length; i++) {
                                    if (progresses[i].key == data[0].buildingProgress) {
                                        $scope.driveByStatus = progresses[i].key;
                                        $scope.driveByStatusIndex = i;
                                        var blockWidth = 100 / (progresses.length);
                                        $scope.driveByStatusBarWidth = (blockWidth * ($scope.driveByStatusIndex)).toFixed(2) + "%";
                                        break;
                                    }
                                }

                                $scope.driveBy = data;
                                $scope.selectedDriveBy = $scope.driveBy[0];

                                var slides = $scope.slides = [];

                                angular.forEach($scope.selectedDriveBy.images, function(value, key, obj) {
                                    slides.push({
                                        image: obj[key].uri,
                                        id: key
                                    });
                                });

                                $scope.drivebyLoading = false;

                            }  else {
                                $scope.drivebyLoading = false;
                            }

                        }, function (error) { });
                    };


                    $scope.calcOffsets = function (status, statusIndex) {
                        if (statusIndex == $scope.driveByStatusIndex) {
                            var driveBys = $scope.driveByMap[status];
                            if (driveBys && driveBys.length > 0) {
                                $scope.driveByStatusOffset = ((driveBys.length - 1) / driveBys.length * 100) + "%";
                            }
                        }
                    };

                    $scope.getDriveByOffset = function (status, index) {
                        var driveBys = $scope.driveByMap[status];
                        return (index / driveBys.length * 100) + "%";
                    };

                    $scope.setSelectedDriveBy = function (driveBy) {
                        $scope.selectedDriveBy = driveBy;

                        var slides = $scope.slides = [];

                        angular.forEach($scope.selectedDriveBy.images, function(value, key, obj) {
                            slides.push({
                                image: obj[key].uri,
                                id: key
                            });
                        });

                        $scope.videoUrl = $scope.selectedDriveBy.videoUri;

                        $scope.config = {
                            sources: [
                                {src: $sce.trustAsResourceUrl($scope.videoUrl), type: "video/mp4"},
                                {src: $sce.trustAsResourceUrl($scope.videoUrl), type: "video/webm"},
                                {src: $sce.trustAsResourceUrl($scope.videoUrl), type: "video/ogg"}
                            ]
                        };
                    };

                    $scope.reset = function () {
                        $scope.street = $scope.sendData.street;
                        $scope.plz = $scope.sendData.plz;
                        $scope.city = $scope.sendData.city;
                        angular.element(document.querySelector('.driveby-bestehende-detail #u722')).css('opacity', '0.4');
                        angular.element(document.querySelectorAll('.driveby-bestehende-detail .ax_dynamic_panel')).removeClass('active');
                        $mapServiceBestehende.unhighlightAllItems();
                        $mapServiceBestehende.resetDrivebyMarker($scope.sendData.location);
                        $scope.sendData.mappedImmoObject = null;

                        $scope.undoForm('highlightMarker');
                        //$listenerService.triggerChange("drivebyDetails", "dgoDrivebys", $scope.sendData.location);
                    };

                    $scope.undoForm = function(key) {
                        for (var i in $sessionStorage.formchangesbestehende) {
                            if ($sessionStorage.formchangesbestehende[i] == key)
                                delete $sessionStorage.formchangesbestehende[i];
                        }
                    };

                    $scope.Lightbox = Lightbox;

                    $scope.accept = function($event, index, type) {
                        var event = $event.currentTarget,
                            accept = angular.element(event),
                            complaint = accept.next();

                        if (complaint.hasClass('active')) {
                            return;
                        }

                        switch (type) {
                            case 'video':
                                if (!accept.hasClass('active')) {
                                    // $sessionStorage.base64Videobestehende = $scope.base64Video;
                                    $scope.video[index].accept = true;
                                    $sessionStorage.formchangesbestehende.push('videoaccept'+index);
                                } else {
                                    // delete $sessionStorage.base64Videobestehende;
                                    $scope.video[index].accept = false;
                                    $scope.undoForm('videoaccept'+index);
                                }

                                break;
                            case 'daten':
                                if (!accept.hasClass('active')) {
                                    $sessionStorage.formchangesbestehende.push('datenaccept');
                                    $scope.daten.accept = true;
                                } else {
                                    delete $sessionStorage.datenbestehende;
                                    $scope.daten.accept = false;
                                    $scope.undoForm('datenaccept');
                                }

                                break;

                            default:
                                if (!accept.hasClass('active')) {
                                    $sessionStorage.formchangesbestehende.push('imagesaccept'+index);
                                    $scope.images[index].accept = true;
                                } else {
                                    delete $sessionStorage.base64Imagesbestehende[index];
                                    $scope.images[index].accept = false;
                                    $scope.undoForm('imagesaccept'+index);
                                }

                                $rootScope.$broadcast('accept2', {
                                    index: index,
                                    accept:  $scope.images[index].accept
                                });
                        }
                    };

                    $scope.acceptDblClick = function($event, index, type) {
                        var event = $event.currentTarget,
                            accept = angular.element(event),
                            complaint = accept.next();

                        if (complaint.hasClass('active')) {
                            switch (type) {
                                case 'video':
                                    $scope.video[index].complaint = false;
                                    $scope.video[index].accept = true;

                                    delete $sessionStorage.videoComplaintsbestehende;

                                    $sessionStorage.formchangesbestehende.push('videoaccept'+index);
                                    $scope.undoForm('videocomplaints'+index);
                                    break;
                                case 'daten':
                                    $scope.daten.complaint = false;
                                    $scope.daten.accept = true;

                                    delete $sessionStorage.datenComplaintsbestehende;

                                    $sessionStorage.formchangesbestehende.push('datenaccept');
                                    $scope.undoForm('datencomplaints');
                                    break;

                                default:
                                    $scope.images[index].complaint = false;
                                    $scope.images[index].accept = true;

                                    delete $sessionStorage.complaintsbestehende[index];

                                    $sessionStorage.formchangesbestehende.push('imagesaccept'+index);
                                    $scope.undoForm('imagecomplaints'+index);
                            }
                        }
                    };

                    $scope.complaints = function($event, index, type) {
                        var currentModal = $uibModal.open({
                            templateUrl: 'templates/modal-complaint-text.html',
                            backdrop: true,
                            windowClass: 'modal-popup-complaint',
                            scope: $scope
                        });

                        $scope.complaintTextBestehende = $scope.images[index].complaintText;
                    };

                    $scope.complaint = function($event, index, type) {
                        $scope.check = function(complaintText) {
                            $scope.disabled = complaintText == '';
                        };

                        $scope.currentImg = $scope.images[index].thumbUrl;

                        switch (type) {
                            case 'video':
                                $scope.complaintText = angular.isObject($sessionStorage.videoComplaintsbestehende) && !angular.equals({}, $sessionStorage.videoComplaintsbestehende) ? $sessionStorage.videoComplaintsbestehende.complaintText : '';
                                break;

                            case 'daten':
                                $scope.complaintText = angular.isObject($sessionStorage.datenComplaintsbestehende) && !angular.equals({}, $sessionStorage.datenComplaintsbestehende) ? $sessionStorage.datenComplaintsbestehende.complaintText : '';
                                break;

                            default:
                                $scope.complaintText = angular.isObject($sessionStorage.complaintsbestehende[index]) ? $sessionStorage.complaintsbestehende[index].complaintText : '';
                        }

                        $scope.check($scope.complaintText);
                        $scope.templateUrl = type == 'daten' ? 'templates/modal-daten-complaint.html' : 'templates/modal-complaint.html';

                        var currentModal = $uibModal.open({
                            templateUrl: $scope.templateUrl,
                            backdrop: true,
                            windowClass: 'modal-popup-complaint',
                            scope: $scope
                        });

                        $scope.save = function(complaintText) {
                            var nextIndex = index + 1;

                            switch (type) {
                                case 'video':
                                    if (!$scope.video[index].complaint) {
                                        $scope.video[index].complaint = true;
                                    }

                                    if ($scope.video[index].accept) {
                                        $scope.video[index].complaint = true;
                                        $scope.video[index].accept = false;
                                    }

                                    $sessionStorage.videoComplaintsbestehende = {};
                                    $sessionStorage.videoComplaintsbestehende.complaintText = complaintText;
                                    $sessionStorage.videoComplaintsbestehende.element = 'VIDEO';

                                    $sessionStorage.formchangesbestehende.push('videocomplaints'+index);
                                    break;

                                case 'daten':
                                    if (!$scope.daten.complaint) {
                                        $scope.daten.complaint = true;
                                    }

                                    if ($scope.daten.accept) {
                                        $scope.daten.complaint = true;
                                        $scope.daten.accept = false;
                                    }
                                    $sessionStorage.datenComplaintsbestehende = {};
                                    $sessionStorage.datenComplaintsbestehende.complaintText = complaintText;
                                    $sessionStorage.datenComplaintsbestehende.element = 'DATEN';

                                    $sessionStorage.formchangesbestehende.push('datencomplaints');
                                    break;

                                default:
                                    if (!$scope.images[index].complaint) {
                                        $scope.images[index].complaint = true;
                                    }

                                    if ($scope.images[index].accept) {
                                        $scope.images[index].complaint = true;
                                        $scope.images[index].accept = false;
                                    }
                                    $sessionStorage.complaintsbestehende[index] = {};
                                    $sessionStorage.complaintsbestehende[index].complaintText = complaintText;
                                    $sessionStorage.complaintsbestehende[index].element = 'IMAGE' + nextIndex;

                                    $sessionStorage.formchangesbestehende.push('imagecomplaints'+index);
                            }


                            $rootScope.$broadcast('complaint2', {
                                index: index,
                                complaint:  $scope.images[index].complaint
                            });

                            currentModal.dismiss();
                        };

                        $scope.cancel = function() {
                            currentModal.dismiss();
                        };
                    };

                    $scope.info = function() {
                        var currentModal = $uibModal.open({
                            templateUrl: 'templates/modal-info.html',
                            backdrop: true,
                            windowClass: 'modal-popup-info',
                            scope: $scope
                        });

                        $scope.save = function() {
                            $scope.infoData.projectType = $scope.sendData.projectType;
                            $scope.infoData.objectType = $scope.sendData.objectType;
                            $scope.infoData.protectedBuilding = $scope.sendData.protectedBuilding;
                            $scope.infoData.buildingProgress = $scope.sendData.buildingProgress;
                            $scope.infoData.objectStandard = $scope.sendData.objectStandard;
                            $scope.infoData.objectStandardEnv = $scope.sendData.objectStandardEnv;
                            $scope.infoData.vacancyEnv = $scope.sendData.vacancyEnv;
                            $scope.infoData.publicTransport = $scope.sendData.publicTransport;
                            $scope.infoData.nearbySupply = $scope.sendData.nearbySupply;
                            $scope.infoData.nearbyRecreation = $scope.sendData.nearbyRecreation;

                            $scope.daten.accept = true;

                            currentModal.dismiss();
                        };

                        $scope.cancel = function() {
                            $scope.sendData.projectType = $scope.infoData.projectType;
                            $scope.sendData.objectType = $scope.infoData.objectType;
                            $scope.sendData.protectedBuilding = $scope.infoData.protectedBuilding;
                            $scope.sendData.buildingProgress = $scope.infoData.buildingProgress;
                            $scope.sendData.objectStandard = $scope.infoData.objectStandard;
                            $scope.sendData.objectStandardEnv = $scope.infoData.objectStandardEnv;
                            $scope.sendData.vacancyEnv = $scope.infoData.vacancyEnv;
                            $scope.sendData.publicTransport = $scope.infoData.publicTransport;
                            $scope.sendData.nearbySupply = $scope.infoData.nearbySupply;
                            $scope.sendData.nearbyRecreation = $scope.infoData.nearbyRecreation;

                            currentModal.dismiss();
                        };
                    };

                    $scope.getRate = function() {
                        if ($scope.uploadingObject.driveByRate > 0) {
                            $sessionStorage.formchangesbestehende.push('driveByRate');
                            $scope.driveByRate.error = false;
                            $scope.rateTextStyle.color = 'black';
                        } else {
                            $scope.undoForm('driveByRate');
                        }
                    };

                    $scope.showError = function() {
                        var index = [];
                        $scope.error = false;

                        if ($scope.sendData.mappedImmoObject == null) {
                            index.push('mappedImmoObjectbestehende');
                            $scope.error = true;
                            $scope.mapped.error = true;
                        } else {
                            $scope.mapped.error = false;
                        }

                        angular.forEach($scope.images, function(value, key, obj) {
                            if (!(value.accept || value.complaint)) {
                                index.push('imagebestehende_' + value.index);
                                obj[key].error = true;
                                $scope.error = true;
                            } else {
                                obj[key].error = false;
                            }

                            if (value.complaint)
                                $scope.sendData.state = $scope.states.Abgelehnt;
                        });

                        angular.forEach($scope.video, function(value, key, obj) {
                            if (!(value.accept || value.complaint)) {
                                index.push('videobestehende');
                                obj[key].error = true;
                                $scope.error = true;
                            } else {
                                obj[key].error = false;
                            }

                            if (value.complaint)
                                $scope.sendData.state = $scope.states.Abgelehnt;
                        });

                        if (!($scope.daten.accept || $scope.daten.complaint)) {
                            index.push('datenbestehende');
                            $scope.daten.error = true;
                            $scope.error = true;
                        } else {
                            $scope.daten.error = false;
                        }

                        if ($scope.uploadingObject.driveByRate == 0) {
                            index.push('driveByRatebestehende');
                            $scope.error = true;
                            $scope.driveByRate.error = true;

                            $scope.rateTextStyle = {color: $scope.driveByRate.error ? 'red' : 'black'};

                        } else {
                            $scope.driveByRate.error = false;
                        }

                        if ($scope.daten.complaint)
                            $scope.sendData.state = $scope.states.Abgelehnt;

                        if (index.length > 0)
                            $anchorScroll(index[0]);
                    };

                    $scope.unbekanntChange = function() {
                        if ($scope.uploadingObject.unbekannt) {
                            $sessionStorage.formchangesbestehende.push('unbekannt');
                        } else {
                            $scope.undoForm('unbekannt');
                        }
                    };

                    $scope.storeEdited = function () {
                        $scope.sendData.state = $scope.states.Abgeschlossen;
                        
                        $scope.showError();

                        if (!$scope.error) {
                            if(!angular.equals($sessionStorage.complaintsbestehende, [])) {
                                $scope.sendData.complaints = $sessionStorage.complaintsbestehende.filter(function(x) {
                                    return x !== undefined &&  x !== null;
                                });
                            } else {
                                $scope.sendData.complaints = [];
                            }

                            if(angular.isObject($sessionStorage.videoComplaintsbestehende) && !angular.equals($sessionStorage.videoComplaintsbestehende, {})) {
                                $scope.sendData.complaints.push($sessionStorage.videoComplaintsbestehende)
                            }

                            if(angular.isObject($sessionStorage.datenComplaintsbestehende) && !angular.equals($sessionStorage.datenComplaintsbestehende, {})) {
                                $scope.sendData.complaints.push($sessionStorage.datenComplaintsbestehende)
                            }

                            if(angular.equals($scope.sendData.complaints, [])) {
                                $scope.sendData.complaints = null;
                            }

                            $scope.sendData.rating = $scope.uploadingObject.driveByRate;
                            
                            if ($scope.uploadingObject.unbekannt)
                                $scope.sendData.state =  $scope.states.Unbekannt;
                            
                            $scope.preloader = true;
                            $scope.showForm = false;
                            
                            console.log($scope.sendData);

                            $drivebysService.storeEdited($scope.sendData, 'bestehende').then(function () {
                                $scope.sendData = {};
                                $sessionStorage.formchangesbestehende = [];
                                $rootScope.$broadcast('updateDriveByBestehende');

                            }, function (error) {});
                        }
                    };

                    $scope.driveByCancel = function() {
                        $scope.sendData = {};
                        $scope.showForm = false;
                    };

                    $scope.delete = function() {
                        var currentModal = $uibModal.open({
                            templateUrl: 'templates/modal-delete.html',
                            backdrop: true,
                            windowClass: 'modal-popup-delete',
                            scope: $scope
                        });

                        $scope.yes = function() {
                            $drivebysService.deleteDriveBy($scope.sendData.transactionHash, 'bestehende').then(function () {
                                currentModal.dismiss();
                                $scope.sendData = {};
                                $scope.showForm = false;
                                $sessionStorage.formchangesbestehende = [];

                                $rootScope.$broadcast('updateDriveByBestehende');
                            }, function (error) {});
                        };

                        $scope.no = function() {
                            currentModal.dismiss();
                        };
                    }
                }
            };
        }]);
});
