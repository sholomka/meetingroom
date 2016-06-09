require.config({
	paths: {
		"domReady": 			"../lib/require/domReady",
		"async": 				"../lib/require/async",
		"angular": 				"../lib/angular/angular.min",
		"angular-route": 		"../lib/angular/angular-route.min",
		"angular-sanitize":		"../lib/angular/angular-sanitize.min",
		"angular-animate":		"../lib/angular/angular-animate.min",
		"angular-touch":		"../lib/angular/angular-touch.min",
		"ui-bootstrap": 		"../lib/angular-bootstrap/ui-bootstrap-tpls-1.3.3.min"
	},
	shim: {
		"angular": {
			exports: "angular"
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