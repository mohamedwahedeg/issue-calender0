angular.module('register', []).controller('register', function ($rootScope, $location, Auth, $scope, $http) {
    $scope.doRegister = function (mail, pass, fn, ln, country, city, age, phone) {
        var val = {
            'mail': mail
            , 'pass': pass
            , 'fn': fn
            , 'ln': ln
            , 'country': country
            , 'city': city
            , 'age': age
            , 'phone': phone
        };
        $("#suceess").hide();
        $("#noreg").hide();
        $("#loadinggif").show();
        $http.post('/api/register', val).
        success(function (data, status, headers, config) {
            $scope.regdata = data; // ds mean data search
            $("#suceess").show();
            $("#mail").val("");
            $("#pass").val("");
            $("#fn").val("");
            $("#ln").val("");
            $("#country").val("");
            $("#city").val("");
            $("#age").val("");
            $("#phone").val("");
            $("#loadinggif").hide();
        }).error(function (data, status, headers, config) {
            //                alert("Error");
            // log error
            $("#noreg").show();
        });
    }
});