angular.module('search_result', []).controller('search_result', function ($rootScope, $location, Auth, $scope, $http, $window, issuedetails00,issuedetails) {
                    $("#search").hide();

    if ($window.localStorage["user"]) {
        ///
        var user0 = $window.localStorage["user"];
        user0 = JSON.parse(user0);
        //
        var s = issuedetails00.get();
        //
        $scope.onj = s.obj0;
        ////
         //            /////
        $scope.open_issue = function (Discount_Name, Discount_Position, circle, claim_no, court, issue_Notes, issue_decision_t, last_session, last_session_reason, next_session, subject, u_area_no, u_id, issue_id, u_firstname, area_name) {
                issuedetails.set(Discount_Name, Discount_Position, circle, claim_no, court, issue_Notes, issue_decision_t, last_session, last_session_reason, next_session, subject, u_area_no, u_id, issue_id, u_firstname, area_name);
                $location.path('/issue_details');
            }
            /////
    }
    else {
        $location.path('/login');
        //
    } // end else .. (not login) .. //
    //
});