/*
Author:Neeraj Lohumi
feature:using this controller, we can easily add/delete products to the mongodb
*/
var myapp=angular.module('myapp',[]);
myapp.controller('AppCtrl',['$scope','$http',function($scope,$http){
	
	var refresh=function(){
	$http.get('/productlist').then(function(response){
		/*var data = response.data;
	    var status = response.status;
	    var statusText = response.statusText;
	    var headers = response.headers;
	    var config = response.config;*/
	    console.log(response.data);
  		$scope.prodlist = response.data;
  		
	});
	};
	refresh();
	$scope.addProd=function(){
		
		$http.post('/productlist',$scope.prod).then(function(response){
			console.log(response.data);
			$scope.prod="";
			refresh();
		});
	};
	$scope.remove=function(id){
		console.log(id);
		$http.delete('/productlist/'+ id).then(function(){
			refresh();
		});
	};
	$scope.Edit=function(id){
		$http.get('/productlist/'+ id).then(function(response){
			$scope.prod = response.data; 
		});
	};
	$scope.update=function(id){
		$http.put('/productlist/'+ $scope.prod._id,$scope.prod)
		.then(function(response){
			$scope.prod="";
			refresh(); 
		});
	};

}]);

