angular.module('home', []).controller('home', function ($rootScope, $location, Auth, $window, $scope, $http, issuedetails) {
    if ($window.localStorage["issueadmin"]) {
        $location.path('/login');

    }
    else {
        $scope.addmohamy = function(){
            $("#popadd").show();
        }
        //
        $scope.add = function(user,pass,areainsert,fn,ln,phone){
            var val = {
                'user': user
                , 'pass': pass
                , 'areainsert': areainsert
                , 'fn': fn
                , 'ln': ln
                , 'phone': phone

            };
            //
            $("#uadded").hide();
            $("#loading-add").show();
            $http.post('/api/adduser', val).
                    success(function (data, status, headers, config) {
                        $("#loading-add").hide();
                        $("#uadded").show();
                    }).error(function (data, status, headers, config) {
                        console.log(data);
                        $("#uadded").hide();
                        $("#loading-add").hide();
                        $("#popadd").hide();
                        alert("خطا في السيرفر او الانترنت حاول لاحقاً");
                    });
                    //
            
        }   // end add
        //
        $scope.closeit1 = function(){
            $("#uadded").hide();
            $("#loading-add").hide();
            $("#popadd").hide();
        }
        //


    }
});