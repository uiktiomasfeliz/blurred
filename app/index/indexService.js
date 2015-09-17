'use strict';

angular.module('myApp.index', [])
.factory('indexService', function($http) {
        var MyService = {};
        $http.get('resources/data.json').success(function(response) {
            MyService.data = response;
        });
        return MyService;
    }
);
