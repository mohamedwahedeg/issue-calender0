angular.module('reports0', []).controller('reports0', function ($rootScope, $location, Auth, $scope, $http, $window, report_today_data) {
    var user0 = $window.localStorage["user"];
    user0 = JSON.parse(user0);
    var user_id = user0.uid;
    var username = user0.username;
    var pass = user0.pass;
    var u_firstname = user0.u_firstname;
    var u_lastname = user0.u_lastname;
    var u_email = user0.u_email;
    var u_phone = user0.u_phone;
    var u_level = user0.u_level;
    var u_area_no = user0.u_area_no;
    //
    $("#per1").hide();
    $("#per2").hide();
    $("#per3").hide();
    $("#wrong1").hide();
    $("#wrong01").hide();
    $("#wrong001").hide();
    $("#wrong2").hide();
    $("#wrong3").hide();
    if (u_level == "1") {
        console.log("1");
        $("#per1").show();
        $scope.holoholo = "أختر المحامي";
    }
    else if (u_level == "2") {
        $("#per2").show();
        var valx2 = {
            'area': u_area_no
        };
        $http.post('/api/usersofarea', valx2).
        success(function (data, status, headers, config) {
            $("#loading").hide();
            $scope.usersfromarea = data.recordset; // ds mean data search
            //
        }).error(function (data, status, headers, config) {
            //                alert("Error");
            // log error
            console.log(data);
        });
        $scope.holoholo = "أختر المحامي";
    }
    else if (u_level == "3") {
        $("#per3").show();
    }
    else {}
    ///////////
    $scope.submit1 = function (from, to) {
            $("#wrong1").hide();
            if (from === undefined || from === null || to === undefined || to === null) {
                $("#wrong1").show();
            }
            else {
                var val1 = {
                    'from': from
                    , 'to': to
                };
                $http.post('/api/reportinrange1', val1).
                success(function (data, status, headers, config) {
                    $("#loading").hide();
                    $scope.vs1 = data.recordset;
                    report_today_data.set($scope.vs1);
                    $location.path('/report_today');
                }).error(function (data, status, headers, config) {
                    //                alert("Error");
                    // log error
                    console.log(data);
                });
            } //end else validation//
        }
        ///////////
        ///////////
    $scope.submit2 = function (from, to) {
            $("#wrong01").hide();
            if (from === undefined || from === null || to === undefined || to === null) {
                $("#wrong01").show();
            }
            else {
                var val2 = {
                    'from': from
                    , 'to': to
                    , 'u_area_no': u_area_no
                };
                $http.post('/api/reportinrange2', val2).
                success(function (data, status, headers, config) {
                    $("#loading").hide();
                    $scope.vs2 = data.recordset;
                    report_today_data.set($scope.vs2);
                    $location.path('/report_today');
                }).error(function (data, status, headers, config) {
                    //                alert("Error");
                    // log error
                    console.log(data);
                });
            } //end else validation//
        }
        ///////////
        ///////////
    $scope.submit3 = function (from, to) {
            $("#wrong001").hide();
            if (from === undefined || from === null || to === undefined || to === null) {
                $("#wrong001").show();
            }
            else {
                var val3 = {
                    'from': from
                    , 'u_id': user_id
                };
                $http.post('/api/reportinrange3', val3).
                success(function (data, status, headers, config) {
                    $("#loading").hide();
                    $scope.vs3 = data.recordset;
                    report_today_data.set($scope.vs3);
                    $location.path('/report_today');
                }).error(function (data, status, headers, config) {
                    //                alert("Error");
                    // log error
                    console.log(data);
                });
            } //end else validation//
        }
        ///////////
        ///////////////////////
    $scope.submit11 = function (valuee, from, to) {
            $("#wrong1").hide();
            $("#wrong2").hide();
            if (from === undefined || from === null || to === undefined || to === null) {
                $("#wrong1").show();
            }
            else {
                if (valuee === undefined || valuee === null) {
                    $("#wrong2").show();
                }
                else {
                    var valfa = {
                        'from': from
                        , 'to': to
                        , 'u_area_no': valuee
                    };
                    //
                    //
                    $http.post('/api/reportinrange2', valfa).
                    success(function (data, status, headers, config) {
                        $("#loading").hide();
                        $scope.datafa = data.recordset; // ds mean data search
                        console.log($scope.datafa);
                        report_today_data.set($scope.datafa);
                        $location.path('/report_today');
                        //////////////////////////////////////////////////////////////
                    }).error(function (data, status, headers, config) {
                        console.log(data);
                    });
                } //end else inner validation//
            } //end else validation//
        }
        ///////////////////////////////////////////
        ///////////
    $scope.submit13 = function (uid, firstname, from, to) {
            $scope.holoholo = firstname;
            var val13 = {
                'from': from
                , 'to': to
                , 'u_id': uid
            };
            $http.post('/api/reportinrange3', val13).
            success(function (data, status, headers, config) {
                $("#loading").hide();
                $scope.dataxs = data.recordset; // ds mean data search
                report_today_data.set($scope.dataxs);
                $location.path('/report_today');
            }).error(function (data, status, headers, config) {
                //                alert("Error");
                // log error
                console.log(data);
            });
        }
        ///////////
        ///////////////////////////////////////////
        ///////////
    $scope.motzerla = function (mohafza) {
            var valx2 = {
                'area': mohafza
            };
            $http.post('/api/usersofarea', valx2).
            success(function (data, status, headers, config) {
                $("#loading").hide();
                $scope.usersfromarea = data.recordset; // ds mean data search
                //
            }).error(function (data, status, headers, config) {
                //                alert("Error");
                // log error
                console.log(data);
            });
        }
        ///////////
});