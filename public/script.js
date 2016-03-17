angular.module('myApp', ['angularUtils.directives.dirPagination'])
	.constant('mealsUrl', 'http://localhost:3000/meals/')
	.controller('MyController', function($scope, $http, $log, mealsUrl) {
		$scope.pageSize = 5;
		$scope.totalCount = 0;
		$scope.currentPage = 1;


		var getResultsPage = function(pageNo) {
			$log.log("getResultsPage: " + pageNo + "");
			//$http({
			//	url: mealsUrl,
			//	method: 'GET',
			//	params: {
			//		pageNo: pageNo,
			//		pageSize: $scope.pageSize
			//	}
			//}).success(function(data) {
			//	$scope.meals = data.meals;
			//	$scope.totalCount = data.totalCount;
			//});
			$http.get('http://localhost:3000/meals?pageNo=' + pageNo + '&pageSize=' + $scope.pageSize)
				.then(function(result) {
					$log.log(result);
					$scope.meals = result.data.meals;
					$scope.totalCount = result.data.totalCount;
					$log.log($scope.meals);
					$log.log($scope.totalCount);
				},(function(err) {
					$log.error(err);
				}));
		};

		$scope.pageChanged = function(newPage) {
			$log.log("pageChanged: " + newPage);
			getResultsPage(newPage);
		};

		getResultsPage($scope.currentPage);
	});
