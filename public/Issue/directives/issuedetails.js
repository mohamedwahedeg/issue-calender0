angular.module('issuedetails', []).factory('issuedetails', function () {
    var savedData = {}

    function set(Discount_Name, Discount_Position, circle, claim_no, court, issue_Notes, issue_decision_t, last_session, last_session_reason, next_session, subject, u_area_no, u_id, issue_id, u_firstname, area_name, court_type, mokem_el_issue,issue_status,judge,judge_text,judge_action,mostanef1,mostanef2,taen1,taen2,elmostaashkel1,elmostaashkel2) {
        savedData.Discount_Name = Discount_Name;
        savedData.Discount_Position = Discount_Position;
        savedData.circle = circle;
        savedData.claim_no = claim_no;
        savedData.court = court;
        savedData.issue_Notes = issue_Notes;
        savedData.issue_decision_t = issue_decision_t;
        savedData.last_session = last_session;
        savedData.last_session_reason = last_session_reason;
        savedData.next_session = next_session;
        savedData.subject = subject;
        savedData.u_area_no = u_area_no;
        savedData.u_id = u_id;
        savedData.issue_id = issue_id;
        savedData.u_firstname = u_firstname;
        savedData.area_name = area_name;
        savedData.court_type = court_type;
        savedData.mokem_el_issue = mokem_el_issue;
        savedData.issue_status = issue_status;
        savedData.judge = judge;
        savedData.judge_text = judge_text;
        savedData.judge_action = judge_action;
        savedData.mostanef1 = mostanef1;
        savedData.mostanef2 = mostanef2;
        savedData.taen1 = taen1;
        savedData.taen2 = taen2;
        savedData.elmostaashkel1 = elmostaashkel1;
        savedData.elmostaashkel2 = elmostaashkel2;
    }

    function get() {
        return savedData;
    }
    return {
        set: set
        , get: get
    }
});