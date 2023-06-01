angular.module('report_today', []).controller('report_today', function ($rootScope, $location, Auth, $scope, $http, $window, issuedetails, $timeout, report_today_data) {
    if ($window.localStorage["user"]) {
        ///
        var user0 = $window.localStorage["user"];
        user0 = JSON.parse(user0);
        ////
        var user_id = user0.uid;
        var username = user0.username;
        var pass = user0.pass;
        var u_lastname = user0.u_firstname;
        var u_lastname = user0.u_lastname;
        var u_email = user0.u_email;
        var u_phone = user0.u_phone;
        var u_level = user0.u_level;
        var u_area_no = user0.u_area_no;
        //////////
        //        $("#tooplate_header").hide();
        $scope.data = report_today_data.get();
        console.log($scope.data);
        //
        $scope.excel0 = function (tableId) {
                var dt = new Date();
                var day = dt.getDate();
                var month = dt.getMonth() + 1;
                var year = dt.getFullYear();
                var hour = dt.getHours();
                var mins = dt.getMinutes();
                var postfix = day + "." + month + "." + year + "_" + hour + "." + mins;
                //creating a temporary HTML link element (they support setting file names)
                var a = document.createElement('a');
                //getting data from our div that contains the HTML table
                var data_type = 'data:application/vnd.ms-excel';
                var table_div = document.getElementById('document');
                var table_html = table_div.outerHTML.replace(/ /g, '%20');
                a.href = data_type + ', ' + table_html;
                //setting the file name
                a.download = 'exported_table_' + postfix + '.xls';
                //triggering the function
                a.click();
                //                                a.preventDefault();
                ////////////////////////////////
            } ////
        $scope.export2Word = function (event) {
                //
                $('.main_content').wordExport();
                //
            }
            ////
            //
        $scope.ssprint = function () {
                //
                var divToPrint = document.getElementById('document');
                var newWin = window.open('', 'Print-Window');
                newWin.document.open();
                newWin.document.write('<html><body onload="window.print()"><style>body{direction:rtl;}table td{padding:4px;border:1px solid;}table tr:first-child{background:#e3e3e3;font-weight:bold;} table{font-size:10px; border-collapse:collapse;border:1px solid;}</style>' + divToPrint.innerHTML + '</body></html>');
                newWin.document.close();
                setTimeout(function () {
                    newWin.close();
                }, 10); //
            }
            ////
            //
    }
    else {
        $location.path('/login');
        //
    } // end else .. (not login) .. //
    //
});