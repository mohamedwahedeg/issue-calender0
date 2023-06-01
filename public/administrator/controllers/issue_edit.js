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
        //
        $scope.doEdit = function (court, circle, claim_no, Discount_Name, Discount_Position, subject, lastdate, last_session_reason, nextdate, issue_decision_t, issue_Notes, ctype, mokem_el_issue) {
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
    }
    else {
        $location.path('/login');
        //
    } // end else .. (not login) .. //
    //
});