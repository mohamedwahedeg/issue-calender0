angular.module('add', []).controller('add', function ($rootScope, $location, Auth, $scope, $http, $window) {
    if ($window.localStorage["user"]) {

        ///
        var user0 = $window.localStorage["user"];
        user0 = JSON.parse(user0);
        //
        $scope.user = user0;
        ////
        if ($scope.user.u_level == "1") {
            $("#areainsert").show();
        }
        ///
        $scope.doIssue = function (court, circle, claim_no, Discount_Name, Discount_Position, subject, lastdate, last_session_reason, nextdate, issue_decision_t, issue_Notes,courttype,mokem_eld3wy,areainsert) {
                $("#added").hide();
                $("#wrong").hide();
                var user_id = user0.uid;
                var username = user0.username;
                var pass = user0.pass;
                var u_lastname = user0.u_firstname;
                var u_lastname = user0.u_lastname;
                var u_email = user0.u_email;
                var u_phone = user0.u_phone;
                var u_level = user0.u_level;
                if(areainsert == undefined ||undefined == 'undefined'){
                    var u_area_no = user0.u_area_no;
                }else{
                    var u_area_no = areainsert;
                }
                
                //
                $("#loading").show();
                var val = {
                    'u_id': user_id
                    , 'u_area_no': u_area_no
                    , 'court': court
                    , 'circle': circle
                    , 'claim_no': claim_no
                    , 'Discount_Name': Discount_Name
                    , 'Discount_Position': Discount_Position
                    , 'subject': subject
                    , 'lastdate': lastdate
                    , 'last_session_reason': last_session_reason
                    , 'nextdate': nextdate
                    , 'issue_decision_t': issue_decision_t
                    , 'issue_Notes': issue_Notes
                    , 'i_court_type': courttype
                    , 'mokem_el_i': mokem_eld3wy

                };
                //
                if (court === undefined || court === null || circle === undefined || circle === null || claim_no === undefined || claim_no === null || Discount_Name === undefined || Discount_Name === null) {
                    $("#wrong").show();
                    $("#loading").hide();
                }
                else {
                    //
                    $http.post('/api/addissue', val).
                    success(function (data, status, headers, config) {
                        $("#loading").hide();
                        $scope.login = data; // ds mean data search
                        $("#added").show();
                        $("#1").val("");
                        $("#2").val("");
                        $("#3").val("");
                        $("#4").val("");
                        $("#5").val("");
                        $("#6").val("");
                        $("#7").val("");
                        $("#8").val("");
                        $("#9").val("");
                        //                        $location.path('/');
                        //                    $rootScope.menu_refresh();
                        //                    $location.path('/');
                    }).error(function (data, status, headers, config) {
                        //                alert("Error");
                        // log error
                        console.log(data);
                        $("#wrong").show();
                    });
                    //
                } // end else validation
            } // end do
            ////
    }
    else {
        $location.path('/login');
        //
    } // end else .. (not login) .. //
    //
});