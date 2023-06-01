angular.module('report_today_data', []).factory('report_today_data', function () {
    var savedData = {}

    function set(obj) {
        savedData.obj = obj;
    }

    function get() {
        return savedData;
    }
    return {
        set: set
        , get: get
    }
});