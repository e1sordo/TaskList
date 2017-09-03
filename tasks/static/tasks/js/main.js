/**
 * Created by vlavik on 30/08/2017.
 */

var app = angular.module('drf-angular', [
	'ui.router'
]);

app.constant('BASE_URL', 'http://localhost:8000/api/tasks/');

app.config(function($stateProvider, $urlRouterProvider){
	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: '/static/tasks/html/home.html',
			controller: 'MainCtrl'
		})
		.state('add-task', {
			url: "/add",
			templateUrl: '/static/tasks/html/add.html',
			controller: 'MainCtrl'
		});

	$urlRouterProvider.otherwise('/');
});

app.config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
}]);

app.controller('MainCtrl', function($scope, Tasks, $state){
	$scope.newTask = {};
	$scope.addTask = function() {
		Tasks.addOne($scope.newTask)
			.then(function(res){
				// redirect to homepage once added
				$state.go('home');
			});
	};

	$scope.homePage = function() {
	    $state.go('home');
    };

    $scope.updateTask = function(data){
		Tasks.update(data.id, data);
		// update the list in ui
		$scope.tasks = $scope.tasks.filter(function(task){
			return task.id !== 0;
		})
    };

	$scope.deleteTask = function(id){
		Tasks.delete(id);
		// update the list in ui
		$scope.tasks = $scope.tasks.filter(function(task){
			return task.id !== id;
		})
	};

	Tasks.all().then(function(res){
		$scope.tasks = res.data;
	});
});

app.service('Tasks', function($http, BASE_URL){
	var Tasks = {};

	Tasks.all = function(){
		return $http.get(BASE_URL);
	};

	Tasks.update = function(id, data){
		return $http({
            method: 'PUT',
            url: BASE_URL + id + '/',
            data: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });
	};

	Tasks.delete = function(id){
		return $http.delete(BASE_URL + id + '/');
	};

	Tasks.addOne = function(newTask){
        return $http.post(BASE_URL, newTask)
    };

	return Tasks;
});
