angular.module('MainController', []).controller('MainController', function ($rootScope, $location, Auth, $scope, $window, $http, issuedetails00) {
    
    $(document).ready(function(){

        (function($) {
            $.fn.clickToggle = function(func1, func2) {
                var funcs = [func1, func2];
                this.data('toggleclicked', 0);
                this.click(function() {
                    var data = $(this).data();
                    var tc = data.toggleclicked;
                    $.proxy(funcs[tc], this)();
                    data.toggleclicked = (tc + 1) % 2;
                });
                return this;
            };
        }(jQuery));


$(".topbar-btn").clickToggle(
    function(){
        $(".topbar").addClass("visible");
        $(".topbar-btn").html("&and;");
    }
,function(){
    $(".topbar").removeClass("visible");
    $(".topbar-btn").html("&or;");
    
});

    });
    
    if ($window.localStorage["user"]) {

//
        var user0 = $window.localStorage["user"];
        user0 = JSON.parse(user0);
        $scope.user = user0;
        $scope.userfullname = $scope.user.u_firstname;
        $scope.userareaname = $scope.user.area_name;
        //
        $("#menu_notlogin").hide();
        $("#menu_login").show();
        $("#menu_login2").show();
        $scope.seach = function (search) {
            //////////////////////////////////
             if (search === undefined || search === null){
                 alert("من فضلك ادخل كلمة أو رقم للبحث");
             }else{
                 
             
            //
            $("#loading").show();
            //
            var val = {
                'searchtext': search
            };
            //
            //
            $http.post('/api/search', val).
            success(function (data, status, headers, config) {
                $("#loading").hide();
                $scope.data = data.recordset; // ds mean data search
                issuedetails00.set($scope.data);
                $location.path('/search_result');
            }).error(function (data, status, headers, config) {
                //                alert("Error");
                // log error
            });
            //
            ///////////////////////
            //////////////////////////////////
            } //end else validation//
        }
        $scope.u = function () {
                //////////////////////////////////
                $location.path('/user');
                //////////////////////////////////
            }
            ////////
        $scope.l = function () {
                //////////////////////////////////
                $location.path('/logout');
                //////////////////////////////////
            }
            //////////
        $scope.custom = function (lable, search) {
                //////////////////////////////////
                if (lable == 0) {
                    console.log("ana gowa 1");
                    var x = "claim_no";
                    //
                    var val = {
                        'searchtext': search
                        , 'column': x
                    };
                    //
                    //
                    $http.post('/api/customsearch', val).
                    success(function (data, status, headers, config) {
                        $("#loading").hide();
                        $scope.data = data.recordset; // ds mean data search
                        issuedetails00.set($scope.data);
                        $location.path('/search_result');
                    }).error(function (data, status, headers, config) {
                        //                alert("Error");
                        // log error
                    });
                    //
                }
                else if (lable == 1) {
                    console.log("ana gowa 2");
                    var x = "court";
                    //
                    var val = {
                        'searchtext': search
                        , 'column': x
                    };
                    //
                    //
                    $http.post('/api/customsearch', val).
                    success(function (data, status, headers, config) {
                        $("#loading").hide();
                        $scope.data = data.recordset; // ds mean data search
                        issuedetails00.set($scope.data);
                        $location.path('/search_result');
                    }).error(function (data, status, headers, config) {
                        //                alert("Error");
                        // log error
                    });
                    //
                }
                else if (lable == 2) {
                    console.log("ana gowa 3");
                    var x = "circle";
                    //
                    var val = {
                        'searchtext': search
                        , 'column': x
                    };
                    //
                    //
                    $http.post('/api/customsearch', val).
                    success(function (data, status, headers, config) {
                        $("#loading").hide();
                        $scope.data = data.recordset; // ds mean data search
                        issuedetails00.set($scope.data);
                        $location.path('/search_result');
                    }).error(function (data, status, headers, config) {
                        //                alert("Error");
                        // log error
                    });
                    //
                }
                else {
                    console.log("ana gowa 4");
                    var x = "Discount_Name";
                    //
                    var val = {
                        'searchtext': search
                        , 'column': x
                    };
                    //
                    //
                    $http.post('/api/customsearch', val).
                    success(function (data, status, headers, config) {
                        $("#loading").hide();
                        $scope.data = data.recordset; // ds mean data search
                        issuedetails00.set($scope.data);
                        $location.path('/search_result');
                    }).error(function (data, status, headers, config) {
                        //                alert("Error");
                        // log error
                    });
                    //
                }
                //////////////////////////////////
            }
            //////////
    }
    else {
        $("#menu_login").hide();
        $("#menu_notlogin").show();
    }
    $rootScope.menu_refresh = function () {
        if ($window.localStorage["user"]) {
            //
            $("#menu_notlogin").hide();
            $("#menu_login").show();
                $scope.$apply();

        }
        else {
            $("#menu_login").hide();
            $("#menu_notlogin").show();
                $scope.$apply();

        }
    }
});