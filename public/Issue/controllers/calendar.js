angular.module('calendar', []).controller('calendar', function ($rootScope, $location, Auth, $scope, $http, $window, issuedetails, report_today_data, moment, calendarConfig) {
                        $("#search").show();

    if ($window.localStorage["user"]) {
        ///
        var user0 = $window.localStorage["user"];
        user0 = JSON.parse(user0);
        ////
        var user_id = user0.uid;
        var username = user0.username;
        var pass = user0.pass;
        var u_firstname = user0.u_firstname;
        var u_lastname = user0.u_lastname;
        var u_email = user0.u_email;
        var u_phone = user0.u_phone;
        var u_level = user0.u_level;
        var u_area_no = user0.u_area_no;
        //        $scope.myDate = function (date) {
        //                //
        //                $("#loading").show();
        //                //
        //                if (u_level == "1") {
        //                    var val = {
        //                        'u_id': user_id
        //                        , 'date': date
        //                    };
        //                    //
        //                    //
        //                    $http.post('/api/calender1', val).
        //                    success(function (data, status, headers, config) {
        //                        $("#loading").hide();
        //                        $scope.data = data.recordset; // ds mean data search
        //                        console.log($scope.data);
        //                        $("#issues").show();
        //                    }).error(function (data, status, headers, config) {
        //                        //                alert("Error");
        //                        // log error
        //                        console.log(data);
        //                    });
        //                    //
        //                }
        //                else if (u_level == "2") {
        //                    var val = {
        //                        'u_id': user_id
        //                        , 'date': date
        //                        , 'u_area_no': u_area_no
        //                    };
        //                    //
        //                    //
        //                    $http.post('/api/calender2', val).
        //                    success(function (data, status, headers, config) {
        //                        $("#loading").hide();
        //                        $scope.data = data.recordset;
        //                        $("#issues").show();
        //                    }).error(function (data, status, headers, config) {
        //                        //                alert("Error");
        //                        // log error
        //                        console.log(data);
        //                    });
        //                    //
        //                }
        //                else {
        //                    var val = {
        //                        'u_id': user_id
        //                        , 'date': date
        //                    };
        //                    //
        //                    //
        //                    $http.post('/api/calender3', val).
        //                    success(function (data, status, headers, config) {
        //                        $("#loading").hide();
        //                        $scope.data = data.recordset;
        //                        $("#issues").show();
        //                    }).error(function (data, status, headers, config) {
        //                        //                alert("Error");
        //                        // log error
        //                        console.log(data);
        //                    });
        //                    //
        //                }
        //            }
        //            /////
        $scope.open_issue = function (Discount_Name, Discount_Position, circle, claim_no, court, issue_Notes, issue_decision_t, last_session, last_session_reason, next_session, subject, u_area_no, u_id, issue_id, u_firstname, area_name,court_type,mokem_el_issue,issue_status,judge,judge_text,judge_action,mostanef1,mostanef2,taen1,taen2,elmostaashkel1,elmostaashkel2) {
                issuedetails.set(Discount_Name, Discount_Position, circle, claim_no, court, issue_Notes, issue_decision_t, last_session, last_session_reason, next_session, subject, u_area_no, u_id, issue_id, u_firstname, area_name, court_type, mokem_el_issue,issue_status,judge,judge_text,judge_action,mostanef1,mostanef2,taen1,taen2,elmostaashkel1,elmostaashkel2);
                $location.path('/issue_details');
            }
            /////
        $scope.add = function () {
                $location.path('/add');
            }
            //
        $scope.clear = function () {
                $scope.date = "";
                $("#issues").hide();
                $(".card").hide();
            }
          //////////////
        $scope.calendarView = 'month'
            ///////////////////////////////////////////////
            //    var vm = this;
            //
            //    //These variables MUST be set as a minimum for the calendar to work
            //    vm.calendarView = 'month';
            //    vm.viewDate = new Date();
            //    var actions = [{
            //      label: '<i class=\'glyphicon glyphicon-pencil\'></i>',
            //      onClick: function(args) {
            //        alert.show('Edited', args.calendarEvent);
            //      }
            //    }, {
            //      label: '<i class=\'glyphicon glyphicon-remove\'></i>',
            //      onClick: function(args) {
            //        alert.show('Deleted', args.calendarEvent);
            //      }
            //    }];
            //    vm.events = [
            //      {
            //        title: 'An event',
            //        color: calendarConfig.colorTypes.warning,
            //        startsAt: moment().startOf('week').subtract(2, 'days').add(8, 'hours').toDate(),
            //        endsAt: moment().startOf('week').add(1, 'week').add(9, 'hours').toDate(),
            //        draggable: true,
            //        resizable: true,
            //        actions: actions
            //      }, {
            //        title: '<i class="glyphicon glyphicon-asterisk"></i> <span class="text-primary">Another event</span>, with a <i>html</i> title',
            //        color: calendarConfig.colorTypes.info,
            //        startsAt: moment().subtract(1, 'day').toDate(),
            //        endsAt: moment().add(5, 'days').toDate(),
            //        draggable: true,
            //        resizable: true,
            //        actions: actions
            //      }, {
            //        title: 'This is a really long event title that occurs on every year',
            //        color: calendarConfig.colorTypes.important,
            //        startsAt: moment().startOf('day').add(7, 'hours').toDate(),
            //        endsAt: moment().startOf('day').add(19, 'hours').toDate(),
            //        recursOn: 'year',
            //        draggable: true,
            //        resizable: true,
            //        actions: actions
            //      }
            //    ];
            //
            //    vm.cellIsOpen = true;
            //
            //    vm.addEvent = function() {
            //      vm.events.push({
            //        title: 'New event',
            //        startsAt: moment().startOf('day').toDate(),
            //        endsAt: moment().endOf('day').toDate(),
            //        color: calendarConfig.colorTypes.important,
            //        draggable: true,
            //        resizable: true
            //      });
            //    };
            //
            //    vm.eventClicked = function(event) {
            //      alert.show('Clicked', event);
            //    };
            //
            //    vm.eventEdited = function(event) {
            //      alert.show('Edited', event);
            //    };
            //
            //    vm.eventDeleted = function(event) {
            //      alert.show('Deleted', event);
            //    };
            //
            //    vm.eventTimesChanged = function(event) {
            //      alert.show('Dropped or resized', event);
            //    };
            //
            //    vm.toggle = function($event, field, event) {
            //      $event.preventDefault();
            //      $event.stopPropagation();
            //      event[field] = !event[field];
            //    };
            //
            //    vm.timespanClicked = function(date, cell) {
            //
            //      if (vm.calendarView === 'month') {
            //        if ((vm.cellIsOpen && moment(date).startOf('day').isSame(moment(vm.viewDate).startOf('day'))) || cell.events.length === 0 || !cell.inMonth) {
            //          vm.cellIsOpen = false;
            //        } else {
            //          vm.cellIsOpen = true;
            //          vm.viewDate = date;
            //        }
            //      } else if (vm.calendarView === 'year') {
            //        if ((vm.cellIsOpen && moment(date).startOf('month').isSame(moment(vm.viewDate).startOf('month'))) || cell.events.length === 0) {
            //          vm.cellIsOpen = false;
            //        } else {
            //          vm.cellIsOpen = true;
            //          vm.viewDate = date;
            //        }
            //      }
            //
            //    };
            /////////////////////////////////////////////////
            ///////////////////////////////////////////
    }
    else {
        $location.path('/login');
        //
    } // end else .. (not login) .. //
    //
});