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
        ///////////// get topics ////////////////
        $http.get('/api/gettopics').success(function (data, status, headers, config) {
        $scope.topics = data; 
       console.log("topics" + data);
         }).error(function (data, status, headers, config) {
        // err
          });

            ///////////// end get topics ////////////////
            /////////////////////////////////////////////
        $scope.doIssue = function (court, circle, claim_no, Discount_Name, Discount_Position, subject, lastdate, last_session_reason, nextdate, issue_decision_t, issue_Notes,courttype,mokem_eld3wy,areainsert,issue_status,judge,judge_text,judge_action,mostanef1,mostanef2,taen1,taen2,elmostaashkel1,elmostaashkel2) {            
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
                    , 'subject': subject.topic
                    , 'lastdate': lastdate
                    , 'last_session_reason': last_session_reason
                    , 'nextdate': nextdate
                    , 'issue_decision_t': issue_decision_t
                    , 'issue_Notes': issue_Notes
                    , 'i_court_type': courttype
                    , 'mokem_el_i': mokem_eld3wy
                    ,'issue_status': issue_status
                    ,'judge': judge
                    ,'judge_text': judge_text
                    ,'judge_action': judge_action
                    ,'mostanef1': mostanef1
                    ,'mostanef2': mostanef2
                    ,'taen1': taen1
                    ,'taen2': taen2
                    ,'elmostaashkel1': elmostaashkel1
                    ,'elmostaashkel2': elmostaashkel2
                };
                //
                if (claim_no === undefined || claim_no === null || Discount_Name === undefined || Discount_Name === null || subject.topic === null) {
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
                        //$location.path('/');
                        //$rootScope.menu_refresh();
                        //$location.path('/');
                        $scope.claim_no = claim_no;
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



    ////
    if ($scope.user.u_level == "1") {
        $("#mohamyelkadya1").hide();
    }

    if ($scope.user.u_level == "3") {
        $("#mohamyelkadya1").hide();
    }

    ///
    $scope.area550055222 = "أختر المحامي ";
         ///////////
    var valx2 = {
        'area': $scope.user.u_area_no
    };
    $http.post('/api/usersofarea', valx2).
    success(function (data, status, headers, config) {
        $("#loading").hide();
        $scope.usersfromarea = data; // ds mean data search
        //
    }).error(function (data, status, headers, config) {
        //                alert("Error");
        // log error
        console.log(data);
    });

///////////

});