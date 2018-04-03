var app = angular.module('game_trends', []);
app.controller('AppController', function($scope, $http, $sce) {
  $http.get("/dota2_youtube_rss")
  .then(function(response) {
    $scope.dota2matches = response.data;

    $scope.trustSrc = function(src) {
      return $sce.trustAsResourceUrl(src);
    }

    for(var i = 0; i<$scope.dota2matches.length; i++){
      $scope.dota2matches[i].id = "https://www.youtube.com/embed/".concat($scope.dota2matches[i].id);
    }

  });
});
