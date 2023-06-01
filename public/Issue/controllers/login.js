angular.module('login', []).controller('login', function ($rootScope, $location, Auth, $scope, $http, $window) {
    if ($window.localStorage["user"]) {
        $location.path('/');
    }
    else {
        localStorage.removeItem('user');
        $("#menu_login2").hide();
        $rootScope.login = 'width:65%;color: yellowgreen;';
        $scope.doLogin = function (mail, pass) {
                $("#wrong").hide();
                $("#loading").show();
                var mail0 = mail;
                var pass0 = pass;
                mail0 = escape(mail0);
                pass0 = escape(pass0);
                //
                mail0 = window.btoa(mail0);
                pass0 = window.btoa(pass0);
                console.log(mail0);
                console.log(pass0);

                //
                var val = {
                    'mail': mail0
                    , 'pass': pass0
                };
                //
                $http.post('/api/login', val).
                success(function (data, status, headers, config) {
                    $("#loading").hide();
                    if (data.length == 0) {
                        $("#wrong").show();
                    }
                    else {
                        var user = data;
                        $scope.login = data; // ds mean data search
                        console.log($scope.login);
                        $window.localStorage.setItem('user', JSON.stringify(user));
                        //                        $location.path('/');
                        $rootScope.menu_refresh();
                        $scope.$apply();
                        $location.path('/');
                        $window.location.reload();
                    }
                    console.log(data);
                }).error(function (data, status, headers, config) {
                    //                alert("Error");
                    // log error
                    console.log(data);
                    $("#wrong").show();
                });
                //
            } // end dologin .. //
            //
    } // end else .. (not login) .. //
    //
});
//$window.localStorage.setItem('lang', ar);
//if ($window.localStorage["lang"]) {
//    $window.localStorage["menu"];