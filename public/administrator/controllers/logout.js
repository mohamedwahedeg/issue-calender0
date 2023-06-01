angular.module('logout', []).controller('logout', function ($rootScope, $location, Auth, $scope, $http, $window) {
    if ($window.localStorage["issueadmin"]) {
        localStorage.removeItem('issueadmin');
        $rootScope.menu_refresh();
        $scope.$apply();
        $location.path('/');
    }
    else {
        $location.path('/login');
        //
    } // end else .. (not login) .. //
    //
});
//            $scope.$apply();