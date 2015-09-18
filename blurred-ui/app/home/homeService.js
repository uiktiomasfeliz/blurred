app.factory('homeService', function($http) {
  var myService = {
    getContent: function() {
      var promise = $http.get('home/json1.json').then(function (response) {
        return response.data;
      });
      return promise;
    }
  };
  return myService;
});
