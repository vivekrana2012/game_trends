var app = angular.module('game_trends', []);
app.controller('AppController', function($scope, $http) {
    $http.get('/dota2_youtube_rss', function(response){
      $scope.dota2_videolist = response;
      console.log($scope.dota2_videolist);
    });
});
