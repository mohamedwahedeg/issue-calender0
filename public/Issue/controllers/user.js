angular.module('user', []).controller('user', function ($rootScope, $location, Auth, $scope, $http,$window) {
   
    if ($window.localStorage["user"]) {
        ///
        var user0 = $window.localStorage["user"];
        user0 = JSON.parse(user0);
        $scope.user = user0;
        //
        $scope.fname = $scope.user.u_firstname;
        $scope.lname = $scope.user.u_lastname;
        $scope.email = $scope.user.u_email;
        $scope.phone = $scope.user.u_phone;
//        $scope.u_area_no = $scope.issue.u_area_no;
//        $scope.u_id = $scope.issue.u_id;
        //
        $scope.doEdit = function (fname,lname,email,phone) {
            var user_id = $scope.user.uid;
                $("#added").hide();
                $("#wrong").hide();
                //
                $("#loading").show();
                var val = {
                    'u_id': user_id
                    , 'fname': fname
                    , 'lname': lname
                    , 'email': email
                    , 'phone': phone
                };
                //
                $http.post('/api/edituser', val).
                success(function (data, status, headers, config) {
                    $("#loading").hide();
                    $scope.login = data; // ds mean data search
                    $("#added").show();
                }).error(function (data, status, headers, config) {
                    console.log(data);
                    $("#wrong").show();
                });
                //
            }
            ////
    }
    
});