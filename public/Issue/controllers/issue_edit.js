angular.module('issue_edit', []).controller('issue_edit', function ($rootScope, $location, Auth, $scope, $http, $window, issuedetails) {
    if ($window.localStorage["user"]) {
        ///
        var user0 = $window.localStorage["user"];
        user0 = JSON.parse(user0);
        $scope.user = user0;
        //
        $scope.issue = issuedetails.get();
        //
        $scope.court = $scope.issue.court;
        $scope.Discount_Name = $scope.issue.Discount_Name;
        $scope.Discount_Position = $scope.issue.Discount_Position;
        $scope.circle = $scope.issue.circle;
        $scope.claim_no = $scope.issue.claim_no;
        $scope.court = $scope.issue.court;
        $scope.issue_Notes = $scope.issue.issue_Notes;
        $scope.issue_decision_t = $scope.issue.issue_decision_t;
        $scope.issue_id = $scope.issue.issue_id;
        $scope.lastdate = $scope.issue.last_session;
        $scope.last_session_reason = $scope.issue.last_session_reason;
        $scope.nextdate = $scope.issue.next_session;
        $scope.subject = $scope.issue.subject;
        $scope.u_area_no = $scope.issue.u_area_no;
        $scope.u_id = $scope.issue.u_id;
        $scope.ctype = $scope.issue.court_type;
        $scope.mokem_el_issue = $scope.issue.mokem_el_issue;
        $scope.issue_status = $scope.issue.issue_status;
        $scope.judge = $scope.issue.judge;
        $scope.judge_text = $scope.issue.judge_text;
        $scope.judge_action = $scope.issue.judge_action;
        $scope.mostanef1 = $scope.issue.mostanef1;
        $scope.mostanef2 = $scope.issue.mostanef2;
        $scope.taen1 = $scope.issue.taen1;
        $scope.taen2 = $scope.issue.taen2;
        $scope.elmostaashkel1 = $scope.issue.elmostaashkel1;
        $scope.elmostaashkel2 = $scope.issue.elmostaashkel2;
        //
        // user level 2 //
        var u_area_no = user0.u_area_no;
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
        //
        //
        $scope.doEdit = function (court, circle, claim_no, Discount_Name, Discount_Position, subject, lastdate, last_session_reason, nextdate, issue_decision_t, issue_Notes, ctype, mokem_el_issue,issue_status ,judge ,judge_text ,judge_action ,mostanef1 ,mostanef2 ,taen1 ,taen2 ,elmostaashkel1,elmostaashkel2) {
                var issue_id = $scope.issue.issue_id;
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
                var u_area_no = user0.u_area_no;
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
                    , 'issue_id': issue_id
                    , 'ctype': ctype
                    , 'mokemtype': mokem_el_issue
                    , 'issue_status': issue_status
                    , 'judge': judge
                    , 'judge_text': judge_text
                    , 'judge_action': judge_action
                    , 'mostanef1': mostanef1
                    , 'mostanef2': mostanef2
                    , 'taen1': taen1
                    , 'taen2': taen2
                    , 'elmostaashkel1': elmostaashkel1
                    , 'elmostaashkel2': elmostaashkel2
                };
                //
                //
                $http.post('/api/editissue', val).
                success(function (data, status, headers, config) {
                    $("#loading").hide();
                    $scope.login = data; // ds mean data search
                    $("#added").show();
                    //                    $("#1").val("");
                    //                    $("#2").val("");
                    //                    $("#3").val("");
                    //                    $("#4").val("");
                    //                    $("#5").val("");
                    //                    $("#6").val("");
                    //                    $("#7").val("");
                    //                    $("#8").val("");
                    //                    $("#9").val("");
                    //                        $location.path('/');
                    //                    $rootScope.menu_refresh();
                    //                    $location.path('/');
                }).error(function (data, status, headers, config) {
                    //                alert("Error");
                    // log error
                    $("#wrong").show();
                });
                //
            }
            
            //////////////////////////////////////////////////
            ////
        if ($scope.user.u_level == "1") {
            $("#q1").show();
        }

        if ($scope.user.u_level == "2") {
            $("#q2").show();
        }

        ///
        $scope.area550055222 = "أختر المحامي ";

             ///////////
    $scope.motzerla = function (mohafza) {
        var valx2 = {
            'area': mohafza
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
    }
    ///////////
    $scope.choosm = function (name) {
        $scope.area550055222 = name;
    }
/////////////
    $scope.moveissue = function (area,mohamyid,name) {
        $scope.area550055222 = name;

        var issue_id = $scope.issue.issue_id;

        var valx2 = {
            'area': area
            ,'uid': mohamyid
            ,'issue_id': issue_id
        };
        $http.post('/api/moveissue', valx2).
        success(function (data, status, headers, config) {
            $("#loading").hide();
           alert("تم نقل القضية بنجاح");
            //
        }).error(function (data, status, headers, config) {
            //                alert("Error");
            // log error
            console.log(data);
        });
    }
    ///////////
    
    $scope.moveissue2 = function (mohamyid,name) {
        $scope.area550055222 = name;

        var issue_id = $scope.issue.issue_id;
        var u_area_no0 = user0.u_area_no;

        var valx3 = {
            'area': u_area_no0
            ,'uid': mohamyid
            ,'issue_id': issue_id
        };
        $http.post('/api/moveissue', valx3).
        success(function (data, status, headers, config) {
            $("#loading").hide();
           alert("!تم نقل القضية بنجاح");
            //
        }).error(function (data, status, headers, config) {
            //                alert("Error");
            // log error
            console.log(data);
        });
    }
    ///////////

    }
    else {
        $location.path('/login');
        //
    } // end else .. (not login) .. //
    //
});