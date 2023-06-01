angular.module('login', []).controller('login', function ($rootScope, $location, Auth, $scope, $http, $window) {
    if ($window.localStorage["issueadmin"]) {
        $location.path('/');
    }
    else {
        localStorage.removeItem('issueadmin');
        $("#menu_login2").hide();
        $rootScope.login = 'width:65%;color: yellowgreen;';
        
        $scope.doLogin = function (code) {
                $("#wrong").hide();
                $("#loading").show();
              
                if(code == '100100')        
                $window.localStorage.setItem('issueadmin', "xfactor");
                        $rootScope.menu_refresh();
                        $scope.$apply();
                        $location.path('/');
                        $window.location.reload();

                //
            } // end dologin .. //
            //
    } // end else .. (not login) .. //
    //
});
//$window.localStorage.setItem('lang', ar);
//if ($window.localStorage["lang"]) {
//    $window.localStorage["menu"];