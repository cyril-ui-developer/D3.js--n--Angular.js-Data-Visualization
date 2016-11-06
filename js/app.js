
(function(){
"use strict"
  angular.module('D3AngularVizApp', ['ngRoute','MockApiModule'])
/**
 * Configure the Routes
 */
.config(['$routeProvider', function ($routeProvider /*, $locationProvider*/) {
  $routeProvider
   
  // Pages
    .when("/", {templateUrl: "partials/bar.chart.html", controller: "MainCtrl"})
    .when("/line", {templateUrl: "partials/line.chart.html", controller: "MainCtrl"})
    .when("/morecharts", {templateUrl: "partials/more.charts.html", controller: "MainCtrl"})
    .otherwise("/404", {templateUrl: "partials/404.html", controller: "MainCtrl"});
    

}])
})();
