angular.module('issuedetails00', []).factory('issuedetails00', function () {
    var savedData = {}

    function set(obj) {
        savedData.obj0 = obj;
    }

    function get() {
        return savedData;
    }
    return {
        set: set
        , get: get
    }
});