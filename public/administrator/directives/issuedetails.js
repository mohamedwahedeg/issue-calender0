angular.module('issuedetails', []).factory('issuedetails', function () {
    var savedData = {}

    function set(Discount_Name, Discount_Position, circle, claim_no, court, issue_Notes, issue_decision_t, last_session, last_session_reason, next_session, subject, u_area_no, u_id, issue_id, u_firstname, area_name, court_type, mokem_el_issue) {
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
    }

    function get() {
        return savedData;
    }
    return {
        set: set
        , get: get
    }
});