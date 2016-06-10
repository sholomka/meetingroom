require.config({
	paths: {
		"domReady": 			"../lib/require/domReady",
		"async": 				"../lib/require/async",

		"moment": 				'../lib/angular-bootstrap-calendar/moment-with-locales.min',
		"interact": 			"../lib/angular-bootstrap-calendar/interact.min",
		"angular": 				"../lib/angular/angular.min",
		"locale-ru": 				"../lib/angular/angular-locale_ru-ua",

		"angular-route": 		"../lib/angular/angular-route.min",
		"angular-sanitize":		"../lib/angular/angular-sanitize.min",
		"angular-animate":		"../lib/angular/angular-animate.min",
		"angular-touch":		"../lib/angular/angular-touch.min",
		"ui-bootstrap": 		"../lib/angular-bootstrap/ui-bootstrap-tpls-1.3.3.min",
		"mwl.calendar": 		"../lib/angular-bootstrap-calendar/angular-bootstrap-calendar-tpls.min"
	},
	shim: {
		"moment": {
			deps: []
		},
		"interact": {
			deps: []
		},
		"mwl.calendar": {
			deps: ["angular"]
		},
		
		"angular": {
			exports: "angular"
		},
		"locale-ru": {
			deps: ["angular"]
		},
		"angular-route": {
			deps: ["angular"]
		},
		"angular-sanitize": {
			deps: ["angular"]
		},
		"angular-animate": {
			deps: ["angular"]
		},
		"angular-touch": {
			deps: ["angular"]
		},
		"ui-bootstrap": {
			deps: ["angular"]
		},
		"bootstrapLightbox": {
			deps: ["angular","ui-bootstrap"]
		}
	}
});

require(["bootstrap"],undefined,function(error) {
	var errorCode=error.requireType;
	if (error.requireModules && error.requireModules.length>0) errorCode+=": "+error.requireModules.join(',');
	document.getElementById("main").innerHTML='<div class="alert alert-danger">Была ошибка при загрузке приложения. Пожалуйста, повторите попытку позже !!!!!!!<br/><span class="small text-black">['+errorCode+']</span></div>';
});