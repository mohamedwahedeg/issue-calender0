angular.module('issue_details', []).controller('issue_details', function ($rootScope, $location, Auth, $scope, $http, $window, issuedetails) {
    if ($window.localStorage["user"]) {
        ///
        var user0 = $window.localStorage["user"];
        user0 = JSON.parse(user0);
        //
        $scope.issue = issuedetails.get();
        console.log($scope.issue);
        $scope.issue_id = $scope.issue.issue_id;
        $scope.nextdate = $scope.issue.next_session;
        //
        $scope.user = user0;
        ////
        
        if ($scope.user.u_level == "1") {
            $("#access1").show();
        }else if($scope.user.u_level == "2" && $scope.user.u_area_no == $scope.issue.u_area_no){
            $("#access1").show();
        }else if($scope.user.u_level == "3" && $scope.user.uid == $scope.issue.u_id){
            $("#access1").show();
        }else{
            // do no thing
        }
        //////
        $scope.edit = function () {
                $location.path('/issue_edit');
            }
            ///
            ////////// get hist /../
            //
        var val0 = {
            'id': $scope.issue.issue_id
        };
        //
        //
        $http.post('/api/get_his', val0).
        success(function (data, status, headers, config) {
            $("#loading").hide();
            $scope.his = data.recordset; // ds mean data search
            console.log($scope.his);
        });
        //////////////
        ///////
        ////
        $scope.closeit = function () {
                $("#popupdrag").hide();
            }
            //////
                ////
        $scope.closeit2 = function () {
                $("#delissue").hide();
            }
            //////
            ////
        $scope.addt2gel1 = function () {
                $("#popupdrag").show();
            }
            //////
            ////
        $scope.deli = function () {
                $("#delissue").show();
            }
            //////
        $scope.del2 = function () {
                var vallll = {
                    'issue_id': $scope.issue_id
                };
                $http.post('/api/delissue', vallll).
                success(function (data, status, headers, config) {
                    $("#loading").hide();
                    $("#delissue").hide();
                    $scope.$apply();
                    $location.path('/');
                }).error(function (data, status, headers, config) {});
                //
            }
            //////
        $scope.addt2gel2 = function (date, reasson) {
                var val99 = {
                    'issue_id': $scope.issue_id
                    , 'date': date
                    , 'last': $scope.nextdate
                    , 'reason': reasson
                };
                //
                var newobj = {
                    issue_id: $scope.issue_id
                    , last_session: $scope.nextdate
                    , last_session_reason: reasson
                };
                $http.post('/api/drag_issue', val99).
                success(function (data, status, headers, config) {
                    $("#loading").hide();
                    $scope.doneit = data; // ds mean data search
                    $("#popupdrag").hide();
                    $scope.his.push(newobj);
                    $scope.$apply();
                    console.log($scope.his);
                    $scope.issue.last_session = $scope.nextdate;
                    $scope.issue.next_session = date;
                }).error(function (data, status, headers, config) {
                    $("#wrong").show();
                });
                //
            }
            //////
    }
    else {
        $location.path('/login');
        //
    } // end else .. (not login) .. //
    //
});