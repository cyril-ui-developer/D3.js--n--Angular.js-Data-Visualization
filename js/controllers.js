(function(){ 
	"use strict"
    angular.module("D3AngularVizApp")
    
    .controller("MainCtrl", function($scope,$http,$window ){
 
 
    $scope.getData = function(){
             $http.get('http://5637ccdf1a271a1100252149.mockapi.io/products').success(function(data) { 
                 console.log("success!");
                 $scope.charts = data;
                
    }); 
    }

         //invoke data function
        $scope.getData();
});
})();