angular.module('myApp', ['ngRoute'])
    .config(['$routeProvider','$httpProvider', function($routeProvider,$httpProvider){
       $httpProvider.defaults.useXDomain = true;

       $routeProvider.when('/', {
            templateUrl : 'app/home.html',
            controller : 'MyCtrl'
            
        })
        .when('/countries', {
            templateUrl : 'app/countries.html',
            controller : 'MyCtrl'
           
        }) 
        .when('/countryDetail', {
            templateUrl : 'app/country_detail.html',
            controller : 'MyCtrl'
           
        }) 
        .otherwise({redirectTo:'/'});
        
    }]) //end config

    .service('getCountriesInfoService', ['$http', function ($http) {
        this.processCountiesInfo = getCountriesInfo;

        var url = "http://api.geonames.org/countryInfo?username=wpiusa";
        function getCountriesInfo(callback){
            $http({
              method: 'GET',
              url: url,
              params: {callback: 'JSON_CALLBACK'}
            })
            .success(function (data, status, header, config){
                  alert("success");
                  callback(data);
            },
            function(response) {
              alert('error');
            });
        };                

        
    }])

  
   // .factory('dataFactory', ['$http', function($http) {
    //   alert("inside factory");
    //}])
    .controller('MyCtrl', ['$scope','$location','$http','getCountriesInfoService',function($scope,$location,$http,getCountriesInfoService) {
         

          $scope.gotoNextPage=function(nextPage){
            $location.path(nextPage);
            //x=getCountriesInfoService.getCountriesInfo();
            getCountriesInfoService.processCountiesInfo(function(data) {
               alert("service success");
               //console.log(data);
              // var carsFromServer =angular.toJson(data);
              
               //console.log(carsFromServer.geonames.country[0].countryName);
               
                              
            });      
            $scope.test="DDD";
           
          }//end goto next page function
     
    }]);

   
     
    
   