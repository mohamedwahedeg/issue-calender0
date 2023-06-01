angular.module('mwl.calendar.docs', ['mwl.calendar', 'ngAnimate', 'ui.bootstrap', 'colorpicker.module']);
angular.module('mwl.calendar.docs') //you will need to declare your module with the dependencies ['mwl.calendar', 'ui.bootstrap', 'ngAnimate']
    .controller('KitchenSinkCtrl', function (moment, alert, calendarConfig, $window, $http, $scope, $rootScope, report_today_data, $location) {
        if ($window.localStorage["user"]) {
            var vm = this;
            //These variables MUST be set as a minimum for the calendar to work
            vm.calendarView = 'month';
            vm.viewDate = new Date();
            //    console.log(vm.viewDate);
            //   vm.viewDate =  "Thu Nov 24 2017 09:30:43 GMT+0200 (Egypt Standard Time)"
            $scope.bb = false;
            var actions = [{
                label: '<i class=\'glyphicon glyphicon-pencil\'></i>'
                , onClick: function (args) {
                    alert.show('Edited', args.calendarEvent);
                }
    }, {
                label: '<i class=\'glyphicon glyphicon-remove\'></i>'
                , onClick: function (args) {
                    alert.show('Deleted', args.calendarEvent);
                }
    }];
            //
            $scope.filterarea = 0;
            $scope.area550055 = "اختر المنطقة";
            $scope.area550055222 = "أختر المحامي ";
            //    $scope.usersfromarea = "";
            ///////////////////////////////////////////////////////////////////////////////////////////////
            var d = new Date();
            var n = d.getFullYear();
            var year = n;
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
            //
            /////////////////////////////////////////////////////////////////////////////////////////////////////
            //                $("#loading").show();
            //
            if (u_level == "1") {
                var val = {
                    'u_id': user_id
                    , 'year': year
                };
                //
                $("#chosearea0").show();
                $("#choselowyer0").show();
                //
                $http.post('/api/calender1m', val).
                success(function (data, status, headers, config) {
                    $("#loading").hide();
                    $scope.data = data.recordset; // ds mean data search
                    ///////////////////////////////////////////////////////////////////////////////////////////////
                    $scope.events_v = [];
                    var mylenght = $scope.data.length - 1;
                    $rootScope.mydata_calender_1 = $scope.data;
                    for (i = 0; i <= mylenght; i++) {
                        var s1 = data.recordset[i].claim_no;
                        var s2 = data.recordset[i].next_session;
                        var s3 = data.recordset[i].issue_id;
                        var firstinsert = vm.viewDate.getMonth();
                        firstinsert = firstinsert + 1;
                        if (data.recordset[i].next_session == undefined){
                            //
                        }else{
                            var sd = data.recordset[i].next_session.split('-');
                            if(sd[1] == firstinsert){
                                $scope.events_v.push({
                                    title: "قضية رقم" + " " + s1
                                    , color: calendarConfig.colorTypes.warning, //        startsAt: moment().startOf('day').subtract(1, 'days').add(8, 'hours').toDate(),
                                    startsAt: moment(s2).toDate(), //        endsAt: moment().startOf('day').add(1, 'day').add(9, 'hours').toDate(),
                                    draggable: true
                                    , resizable: true
                                    , actions: actions
                                    , issue_id: s3
                                })
                            }
                        }
                           

                    } //endfor 
                    ///////2
                    for (i = 0; i <= mylenght; i++) {
                        var s1 = data.recordset[i].claim_no;
                        var s2 = data.recordset[i].last_session;
                        var s3 = data.recordset[i].issue_id;
                        var firstinsert = vm.viewDate.getMonth();
                        firstinsert = firstinsert + 1;
                        if (data.recordset[i].next_session == undefined){
                        }
                        else{
                            var sd = data.recordset[i].next_session.split('-');
                            if(sd[1] == firstinsert){
                                $scope.events_v.push({
                                    title: "قضية رقم" + " " + s1
                                    , color: calendarConfig.colorTypes.important, //        startsAt: moment().startOf('day').subtract(1, 'days').add(8, 'hours').toDate(),
                                    startsAt: moment(s2).toDate(), //        endsAt: moment().startOf('day').add(1, 'day').add(9, 'hours').toDate(),
                                    draggable: false
                                    , resizable: true
                                    , actions: actions
                                    , issue_id: s3
                                })
                            }
                        }
                        

                    } //endfor 
                    /////////
                    vm.events = $scope.events_v;
                    ////////////////////////////////////////////
                }).error(function (data, status, headers, config) {
                    //                alert("Error");
                    // log error
                    $("#loading").hide();

                });
                //
            }
            else if (u_level == "2") {
                $("#chosearea0").show();
                $("#btn_areaonly").hide();
                $("#choselowyer0").show();
                var val = {
                    'u_id': user_id
                    , 'year': year
                    , 'u_area_no': u_area_no
                };
                //
                //
                $http.post('/api/calender2m', val).
                success(function (data, status, headers, config) {
                    $("#loading").hide();
                    $scope.data = data.recordset;
                    ///////////////////////////////////////////////////////////////////////////////////////////////
                    $scope.events_v = [];
                    var mylenght = $scope.data.length - 1;
                    $rootScope.mydata_calender_1 = $scope.data;
                    for (i = 0; i <= mylenght; i++) {
                        var s1 = data.recordset[i].claim_no;
                        var s2 = data.recordset[i].next_session;
                        var s3 = data.recordset[i].issue_id;
                        var firstinsert = vm.viewDate.getMonth();
                        firstinsert = firstinsert + 1;
                        if (data.recordset[i].next_session == undefined){
                            //
                        }else{
                            var sd = data.recordset[i].next_session.split('-');
                            if(sd[1] == firstinsert){
                                $scope.events_v.push({
                                    title: "قضية رقم" + " " + s1
                                    , color: calendarConfig.colorTypes.warning, //        startsAt: moment().startOf('day').subtract(1, 'days').add(8, 'hours').toDate(),
                                    startsAt: moment(s2).toDate(), //        endsAt: moment().startOf('day').add(1, 'day').add(9, 'hours').toDate(),
                                    draggable: true
                                    , resizable: true
                                    , actions: actions
                                    , issue_id: s3
                                })
                            }
                        }
                           

                    } //endfor 
                    ///////2
                    for (i = 0; i <= mylenght; i++) {
                        var s1 = data.recordset[i].claim_no;
                        var s2 = data.recordset[i].last_session;
                        var s3 = data.recordset[i].issue_id;
                        var firstinsert = vm.viewDate.getMonth();
                        firstinsert = firstinsert + 1;
                        if (data.recordset[i].next_session == undefined){
                        }
                        else{
                            var sd = data.recordset[i].next_session.split('-');
                            if(sd[1] == firstinsert){
                                $scope.events_v.push({
                                    title: "قضية رقم" + " " + s1
                                    , color: calendarConfig.colorTypes.important, //        startsAt: moment().startOf('day').subtract(1, 'days').add(8, 'hours').toDate(),
                                    startsAt: moment(s2).toDate(), //        endsAt: moment().startOf('day').add(1, 'day').add(9, 'hours').toDate(),
                                    draggable: false
                                    , resizable: true
                                    , actions: actions
                                    , issue_id: s3
                                })
                            }
                        }
                    }
                    /////////
                    vm.events = $scope.events_v;
                    ////////////////////////////////////////////            }).error(function (data, status, headers, config) {
                    //                alert("Error");
                    // log error
                    //////////////////////// go to get users for this area
                    //
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
                        $("#loading").hide();

                    });
                    //////////////////////////////////////////////////////////////
                });
            }
            else {
                var val = {
                    'u_id': user_id
                    , 'year': year
                };
                //
                //
                $http.post('/api/calender3m', val).
                success(function (data, status, headers, config) {
                    $("#loading").hide();
                    $scope.data = data.recordset;
                    ///////////////////////////////////////////////////////////////////////////////////////////////
                    $scope.events_v = [];
                    var mylenght = $scope.data.length - 1;
                    $rootScope.mydata_calender_1 = $scope.data;
                    for (i = 0; i <= mylenght; i++) {
                        var s1 = data.recordset[i].claim_no;
                        var s2 = data.recordset[i].next_session;
                        var s3 = data.recordset[i].issue_id;
                        var firstinsert = vm.viewDate.getMonth();
                        firstinsert = firstinsert + 1;
                        if (data.recordset[i].next_session == undefined){
                            //
                        }else{
                            var sd = data.recordset[i].next_session.split('-');
                            if(sd[1] == firstinsert){
                                $scope.events_v.push({
                                    title: "قضية رقم" + " " + s1
                                    , color: calendarConfig.colorTypes.warning, //        startsAt: moment().startOf('day').subtract(1, 'days').add(8, 'hours').toDate(),
                                    startsAt: moment(s2).toDate(), //        endsAt: moment().startOf('day').add(1, 'day').add(9, 'hours').toDate(),
                                    draggable: true
                                    , resizable: true
                                    , actions: actions
                                    , issue_id: s3
                                })
                            }
                        }
                           

                    } //endfor 
                    ///////2
                    for (i = 0; i <= mylenght; i++) {
                        var s1 = data.recordset[i].claim_no;
                        var s2 = data.recordset[i].last_session;
                        var s3 = data.recordset[i].issue_id;
                        var firstinsert = vm.viewDate.getMonth();
                        firstinsert = firstinsert + 1;
                        if (data.recordset[i].next_session == undefined){
                        }
                        else{
                            var sd = data.recordset[i].next_session.split('-');
                            if(sd[1] == firstinsert){
                                $scope.events_v.push({
                                    title: "قضية رقم" + " " + s1
                                    , color: calendarConfig.colorTypes.important, //        startsAt: moment().startOf('day').subtract(1, 'days').add(8, 'hours').toDate(),
                                    startsAt: moment(s2).toDate(), //        endsAt: moment().startOf('day').add(1, 'day').add(9, 'hours').toDate(),
                                    draggable: false
                                    , resizable: true
                                    , actions: actions
                                    , issue_id: s3
                                })
                            }
                        }
                    } //endfor 
                    /////////
                    vm.events = $scope.events_v;
                    ////////////////////////////////////////////            }).error(function (data, status, headers, config) {
                    //                alert("Error");
                    // log error
                });
                //
            }
            //        ///////////////////////////////////////////////////////////////////////////////////////////////
            //        vm.events = [
            //            {
            //                title: 'An event 2'
            //                , color: calendarConfig.colorTypes.warning, //        startsAt: moment().startOf('day').subtract(1, 'days').add(8, 'hours').toDate(),
            //                startsAt: moment("2017-11-24"), //        endsAt: moment().startOf('day').add(1, 'day').add(9, 'hours').toDate(),
            //                draggable: true
            //                , resizable: true
            //                , actions: actions
            //          }
            //            , {
            //                title: 'An event 2'
            //                , color: calendarConfig.colorTypes.warning, //        startsAt: moment().startOf('day').subtract(1, 'days').add(8, 'hours').toDate(),
            //                startsAt: moment("2017-11-24"), //        endsAt: moment().startOf('day').add(1, 'day').add(9, 'hours').toDate(),
            //                draggable: true
            //                , resizable: true
            //                , actions: actions
            //          }
            //
            //    ];
            ////////
            vm.cellIsOpen = true;
            vm.addEvent = function () {
                vm.events.push({
                    title: 'New event'
                    , startsAt: moment().startOf('day').toDate()
                    , endsAt: moment().endOf('day').toDate()
                    , color: calendarConfig.colorTypes.important
                    , draggable: true
                    , resizable: true
                });
            };
            vm.eventClicked = function (event) {
                //                        alert.show('Clicked', event);
            };
            vm.eventEdited = function (event) {
                //            alert.show('Edited', event);
            };
            vm.eventDeleted = function (event) {
                //            alert.show('Deleted', event);
            };
            vm.eventTimesChanged = function (calendarEvent, calendarNewEventStart) {
                $scope.str45 = $.datepicker.formatDate('yy-mm-dd', calendarNewEventStart);
                $scope.calendarNewEventStart0 = calendarEvent.startsAt;
                $scope.str46 = $.datepicker.formatDate('yy-mm-dd', $scope.calendarNewEventStart0);
                $scope.ino = calendarEvent.issue_id;
                $scope.ino1 = calendarEvent.title;
                //////////////
                $("#popupdrag").show();
            }; // end move event
            /////////////////////////////////////////////
            /////////////////////
            $scope.dodrag00 = function (reason) {
                    $("#popupdrag").hide();
                    ///////////////////////
                    var val = {
                        'issue_id': $scope.ino
                        , 'date': $scope.str45
                        , 'last': $scope.str46
                        , 'reason': reason
                    };
                    $http.post('/api/drag_issue', val).
                    success(function (data, status, headers, config) {
                        $("#popupdrag").hide();
                        //                $scope.data = data.recordset;
                    });
                    //////
                    vm.events.push({
                        title: $scope.ino1
                        , color: calendarConfig.colorTypes.important, //        startsAt: moment().startOf('day').subtract(1, 'days').add(8, 'hours').toDate(),
                        startsAt: moment($scope.str46).toDate(), //        endsAt: moment().startOf('day').add(1, 'day').add(9, 'hours').toDate(),
                        draggable: false
                        , resizable: true
                        , actions: actions
                        , issue_id: $scope.ino
                    });
                    /////
                } // end do drag func
                //////////////////////////
                //        vm.eventTimesChanged = function (event) {
                //            console.log(event.startsAt);
                //            
                //            //            ///////////////////
                //        };
            vm.toggle = function ($event, field, event) {
                $event.preventDefault();
                $event.stopPropagation();
                event[field] = !event[field];
            };
            //////////////////////////////
            vm.timespanClicked = function (date, cell) {
                
                $scope.data = [];
                $scope.data2 = [];
                //                console.log("sss");
                // if (vm.calendarView === 'month') {
                //     if ((vm.cellIsOpen && moment(date).startOf('day').isSame(moment(vm.viewDate).startOf('day'))) || cell.events.length === 0 || !cell.inMonth) {
                //         vm.cellIsOpen = false;
                //     }
                //     else {
                //         vm.cellIsOpen = true;
                //         vm.viewDate = date;
                //     }
                // }
                // else if (vm.calendarView === 'year') {
                //     if ((vm.cellIsOpen && moment(date).startOf('month').isSame(moment(vm.viewDate).startOf('month'))) || cell.events.length === 0) {
                //         vm.cellIsOpen = false;
                //     }
                //     else {
                //         vm.cellIsOpen = true;
                //         vm.viewDate = date;
                //     }
                // }
                ///////////////////////
                var str0 = $.datepicker.formatDate('yy-mm-dd', date);
                //
                $("#loading").fadeIn(500);
                //
                if (u_level == "1") {
                    if ($scope.filterarea == 1) {
                        var val55 = {
                            'u_id': $scope.filterareaNO
                            , 'date': str0
                            , 'u_area_no': $scope.filterareaNO3
                        };
                        //
                        $http.post('/api/calender1f', val55).
                        success(function (data, status, headers, config) {
                            $scope.data = data.recordset; // ds mean data search
                            $scope.bb = true;
                            $(".issues_listing_bg").show();
                            $("#issues").show();
                            $("#loading").fadeOut(500);
                            //
                            if (data.recordset.length == 0) {}
                            else {
                                window.scrollTo(0, document.body.scrollHeight);
                            }
                            //
                        }).error(function (data, status, headers, config) {
                            //                alert("Error");
                            // log error
                            $("#loading").hide();
                        });
                        //
                    }
                    else if ($scope.filterarea == 2) {
                        var val55 = {
                            'u_id': $scope.filterareaNO
                            , 'date': str0
                            , 'u_area_no': $scope.filterareaNO3
                        };
                        //
                        $http.post('/api/calender1ff', val55).
                        success(function (data, status, headers, config) {
                            $scope.data = data.recordset; // ds mean data search
                            $scope.bb = true;
                            $(".issues_listing_bg").fadeIn(500);
                            $("#issues").show();
                            $("#loading").fadeOut();
                            //
                            if (data.recordset.length == 0) {}
                            else {
                                window.scrollTo(0, document.body.scrollHeight);
                            }
                            //
                        }).error(function (data, status, headers, config) {
                            //                alert("Error");
                            // log error
                            $("#loading").hide();

                        });
                        //
                    }
                    else {
                        //
                        var val = {
                            'u_id': user_id
                            , 'date': str0
                        };
                        //
                        $http.post('/api/calender1', val).
                        success(function (data, status, headers, config) {
                            if (data.recordset.length == 0) {
                                $("#loading").hide();
                            }
                            else {
                                 /// paging ///
          //
          $scope.myissues = data.recordset;
          $scope.totalItems = $scope.myissues.length;
          $scope.currentPage = 1;
          $scope.numPerPage = 20;
          //
          $scope.paginate = function(value) {
            var begin, end, index;
            begin = ($scope.currentPage - 1) * $scope.numPerPage;
            end = begin + $scope.numPerPage;
            index = $scope.myissues.indexOf(value);
            return (begin <= index && index < end);
          };
          //
          for (i = 0; i < data.recordset.length; i++) {
            if (data.recordset[i].next_session == str0) {
                $scope.data.push(data.recordset[i]);
                $scope.$apply();
            }
            else {
                $scope.data2.push(data.recordset[i]);
                $scope.$apply();
            }
        }
        ///
                                //                                $scope.data = data.recordset; // ds mean data search
                                $scope.bb = true;
                                $(".issues_listing_bg").fadeIn(500);
                                $("#issues").show();
                                $("#issues2").show();
                                //
                                
                                $("#loading").fadeOut(500);
                                var timerID = setInterval(function() {
                                    window.scrollBy(0, -5);

                                if( window.pageYOffset <= 100 )
                                        clearInterval(timerID);
                                }, 13);
                                
                                //window.scrollTo(0, 0);
                            }
                            //
                        }).error(function (data, status, headers, config) {
                            //                alert("Error");
                            // log error
                            $("#loading").hide();

                        });
                        //
                    } //end else if filter
                } // end if level 1
                else if (u_level == "2") {
                    var val = {
                        'u_id': user_id
                        , 'date': str0
                        , 'u_area_no': u_area_no
                    };
                    //
                    //
                    $http.post('/api/calender2', val).
                    success(function (data, status, headers, config) {
                        //
                        if (data.recordset.length == 0) {
                            //
                        }
                        else {
                             /// paging ///
          //
          $scope.myissues = data.recordset;
          $scope.totalItems = $scope.myissues.length;
          $scope.currentPage = 1;
          $scope.numPerPage = 20;
          //
          $scope.paginate = function(value) {
            var begin, end, index;
            begin = ($scope.currentPage - 1) * $scope.numPerPage;
            end = begin + $scope.numPerPage;
            index = $scope.myissues.indexOf(value);
            return (begin <= index && index < end);
          };
                            for (i = 0; i < data.recordset.length; i++) {
                                if (data.recordset[i].next_session == str0) {
                                    $scope.data.push(data.recordset[i]);
                                    $scope.$apply();
                                }
                                else {
                                    $scope.data2.push(data.recordset[i]);
                                    $scope.$apply();
                                }
                            }
                            //
                            //                                $scope.data = data.recordset; // ds mean data search
                            $scope.bb = true;
                            $(".issues_listing_bg").fadeIn(500);
                            $("#issues").show();
                            $("#issues2").show();
                            //
                            window.scrollTo(0, document.body.scrollHeight);
                            $("#loading").fadeOut(500);
                        }
                        //
                    }).error(function (data, status, headers, config) {
                        //                alert("Error");
                        // log error
                        $("#loading").hide();

                    });
                    //
                }
                else {
                    var val = {
                        'u_id': user_id
                        , 'date': str0
                    };
                    //
                    //
                    $http.post('/api/calender3', val).
                    success(function (data, status, headers, config) {
                        //
                        if (data.recordset.length == 0) {
                            //
                        }
                        
                        else {
                             /// paging ///
          //
          $scope.myissues = data.recordset;
          $scope.totalItems = $scope.myissues.length;
          $scope.currentPage = 1;
          $scope.numPerPage = 20;
          //
          $scope.paginate = function(value) {
            var begin, end, index;
            begin = ($scope.currentPage - 1) * $scope.numPerPage;
            end = begin + $scope.numPerPage;
            index = $scope.myissues.indexOf(value);
            return (begin <= index && index < end);
          };
                            for (i = 0; i < data.recordset.length; i++) {
                                if (data.recordset[i].next_session == str0) {
                                    $scope.data.push(data.recordset[i]);
                                    $scope.$apply();
                                }
                                else {
                                    $scope.data2.push(data.recordset[i]);
                                    $scope.$apply();
                                }
                            }
                            //
                            //                                $scope.data = data.recordset; // ds mean data search
                            $scope.bb = true;
                            $(".issues_listing_bg").fadeIn(500);
                            $("#issues").show();
                            $("#issues2").show();
                            //
                            window.scrollTo(0, document.body.scrollHeight);
                            $("#loading").fadeOut(500);
                        }
                        //
                    }).error(function (data, status, headers, config) {
                        //                alert("Error");
                        // log error
                        $("#loading").hide();

                    });
                    //
                }
                ///////////////////////
            }; ///////// end click event
            ///////////////////////
            //
            $scope.report_today = function () {
                    report_today_data.set($scope.data);
                    $location.path('/report_today');
                }
                ///////////////////////////////////////////
                ///////////////////////
            $scope.filterareaclick = function (valuee) {
                    //////////////////////////////////////
                    if (valuee == 1) {
                        $scope.area550055 = "الدقهلية";
                    }
                    else if (valuee == 2) {
                        $scope.area550055 = "مركزي";
                    }
                    else if (valuee == 3) {
                        $scope.area550055 = "الغربية";
                    }
                    else if (valuee == 4) {
                        $scope.area550055 = "دمياط";
                    }
                    else if (valuee == 5) {
                        $scope.area550055 = "بورسعيد";
                    }
                    else if (valuee == 6) {
                        $scope.area550055 = "الجيزة";
                    }
                    else if (valuee == 7) {
                        $scope.area550055 = "بني سويف";
                    }
                    else if (valuee == 8) {
                        $scope.area550055 = "السويس";
                    }
                    else if (valuee == 9) {
                        $scope.area550055 = "الاسكندرية";
                    }
                    else if (valuee == 10) {
                        $scope.area550055 = "سوهاج";
                    }
                    else if (valuee == 11) {
                        $scope.area550055 = "شمال سيناء";
                    }
                    else if (valuee == 12) {
                        $scope.area550055 = "البحيرة";
                    }
                    else if (valuee == 13) {
                        $scope.area550055 = "جنوب سيناء";
                    }
                    else if (valuee == 14) {
                        $scope.area550055 = "الشرقية";
                    }
                    else if (valuee == 15) {
                        $scope.area550055 = "اسوان";
                    }
                    else if (valuee == 16) {
                        $scope.area550055 = "مرسى مطروح";
                    }
                    else if (valuee == 17) {
                        $scope.area550055 = "الوادي الجديد";
                    }
                    else if (valuee == 18) {
                        $scope.area550055 = "المنيا";
                    }
                    else if (valuee == 19) {
                        $scope.area550055 = "الاسماعيلية";
                    }
                    else if (valuee == 20) {
                        $scope.area550055 = "القليوبية";
                    }
                    else if (valuee == 21) {
                        $scope.area550055 = "قنا";
                    }
                    else if (valuee == 22) {
                        $scope.area550055 = "كفر الشيخ";
                    }
                    else if (valuee == 23) {
                        $scope.area550055 = "البحر الاحمر";
                    }
                    else if (valuee == 24) {
                        $scope.area550055 = "الاقصر";
                    }
                    else if (valuee == 25) {
                        $scope.area550055 = "المنوفية";
                    }
                    else if (valuee == 26) {
                        $scope.area550055 = "الفيوم";
                    }
                    else {
                        // no thing //
                    }
                    /////////////////////////////////////////
                    $scope.filterarea = 2;
                    $scope.filterareaNO = valuee;
                    $scope.filterareaNO3 = valuee;
                    delete $scope.events_v;
                    $scope.events_v = [];
                    //
                    var val = {
                        'area': valuee
                    };
                    //
                    //
                    $http.post('/api/area0', val).
                    success(function (data, status, headers, config) {
                        $("#loading").hide();
                        $rootScope.mydata_calender_1 = data.recordset;
                        $scope.data = data.recordset; // ds mean data search
                        //////////
                        var mylenght = $scope.data.length - 1;
                        for (i = 0; i <= mylenght; i++) {
                            var s1 = data.recordset[i].claim_no;
                            var s2 = data.recordset[i].next_session;
                            var s3 = data.recordset[i].issue_id;
                            $scope.events_v.push({
                                title: "قضية رقم" + " " + s1
                                , color: calendarConfig.colorTypes.warning, //        startsAt: moment().startOf('day').subtract(1, 'days').add(8, 'hours').toDate(),
                                startsAt: moment(s2).toDate(), //        endsAt: moment().startOf('day').add(1, 'day').add(9, 'hours').toDate(),
                                draggable: true
                                , resizable: true
                                , actions: actions
                                , issue_id: s3
                            })
                        } //endfor 
                        //////////////
                        vm.events = $scope.events_v;
                        //
                        //////////////////////// go to get users for this area
                        //
                        $http.post('/api/usersofarea', val).
                        success(function (data, status, headers, config) {
                            $("#loading").hide();
                            $scope.usersfromarea = data.recordset; // ds mean data search
                            //
                        }).error(function (data, status, headers, config) {
                            //                alert("Error");
                            // log error
                            $("#loading").hide();

                        });
                        //////////////////////////////////////////////////////////////
                    }).error(function (data, status, headers, config) {
                        //                alert("Error");
                        // log error
                        $("#loading").hide();

                    });
                }
                ///////////////////////////////////////////
                ///////////////////////
            $scope.userareaissue = function (userid, u_firstname) {
                    $scope.area550055222 = u_firstname;
                    $scope.filterarea = 1;
                    $scope.filterareaNO = userid;
                    delete $scope.events_v;
                    $scope.events_v = [];
                    //
                    var val = {
                        'area': userid
                    };
                    //
                    //
                    $http.post('/api/useronlyissue', val).
                    success(function (data, status, headers, config) {
                        $("#loading").hide();
                        $scope.data = data.recordset; // ds mean data search
                        //////////
                        var mylenght = $scope.data.length - 1;
                        for (i = 0; i <= mylenght; i++) {
                            var s1 = data.recordset[i].claim_no;
                            var s2 = data.recordset[i].next_session;
                            var s3 = data.recordset[i].issue_id;
                            $scope.events_v.push({
                                title: "قضية رقم" + " " + s1
                                , color: calendarConfig.colorTypes.warning, //        startsAt: moment().startOf('day').subtract(1, 'days').add(8, 'hours').toDate(),
                                startsAt: moment(s2).toDate(), //        endsAt: moment().startOf('day').add(1, 'day').add(9, 'hours').toDate(),
                                draggable: true
                                , resizable: true
                                , actions: actions
                                , issue_id: s3
                            })
                        } //endfor 
                        //////////////
                        vm.events = $scope.events_v;
                    }).error(function (data, status, headers, config) {
                        //                alert("Error");
                        // log error
                        $("#loading").hide();

                    });
                }
                /////////
                //////////////////////
            $scope.testing = function () {}
                //////
                //////////////////////
            $scope.selectall = function () {
                $scope.area550055 = "الكل";
                    var val = {
                        'u_id': user_id
                        , 'year': year
                    };
                    //
                    $("#chosearea0").show();
                    $("#choselowyer0").show();
                    //
                    $http.post('/api/calender1m', val).
                    success(function (data, status, headers, config) {
                        $("#loading").hide();
                        $scope.data = data.recordset; // ds mean data search
                        ///////////////////////////////////////////////////////////////////////////////////////////////
                        $scope.events_v = [];
                        var mylenght = $scope.data.length - 1;
                        $rootScope.mydata_calender_1 = $scope.data;
                        for (i = 0; i <= mylenght; i++) {
                            var s1 = data.recordset[i].claim_no;
                            var s2 = data.recordset[i].next_session;
                            var s3 = data.recordset[i].issue_id;
                            var firstinsert = vm.viewDate.getMonth();
                            firstinsert = firstinsert + 1;
                            if (data.recordset[i].next_session == undefined){
                                //
                            }else{
                                var sd = data.recordset[i].next_session.split('-');
                                if(sd[1] == firstinsert){
                                    $scope.events_v.push({
                                        title: "قضية رقم" + " " + s1
                                        , color: calendarConfig.colorTypes.warning, //        startsAt: moment().startOf('day').subtract(1, 'days').add(8, 'hours').toDate(),
                                        startsAt: moment(s2).toDate(), //        endsAt: moment().startOf('day').add(1, 'day').add(9, 'hours').toDate(),
                                        draggable: true
                                        , resizable: true
                                        , actions: actions
                                        , issue_id: s3
                                    })
                                }
                            }
                               
    
                        } //endfor 
                        ///////2
                        for (i = 0; i <= mylenght; i++) {
                            var s1 = data.recordset[i].claim_no;
                            var s2 = data.recordset[i].last_session;
                            var s3 = data.recordset[i].issue_id;
                            var firstinsert = vm.viewDate.getMonth();
                            firstinsert = firstinsert + 1;
                            if (data.recordset[i].next_session == undefined){
                            }
                            else{
                                var sd = data.recordset[i].next_session.split('-');
                                if(sd[1] == firstinsert){
                                    $scope.events_v.push({
                                        title: "قضية رقم" + " " + s1
                                        , color: calendarConfig.colorTypes.important, //        startsAt: moment().startOf('day').subtract(1, 'days').add(8, 'hours').toDate(),
                                        startsAt: moment(s2).toDate(), //        endsAt: moment().startOf('day').add(1, 'day').add(9, 'hours').toDate(),
                                        draggable: false
                                        , resizable: true
                                        , actions: actions
                                        , issue_id: s3
                                    })
                                }
                            }
                        }
                        

                        /////////
                        vm.events = $scope.events_v;
                        ////////////////////////////////////////////
                    }).error(function (data, status, headers, config) {
                        //                alert("Error");
                        // log error
                        $("#loading").hide();

                    });
                    //
                }
                //////
                //
            $scope.closeit = function () {
                $("#popupdrag").hide();
            }
            $scope.closebtn = function () {
                    $(".issues_listing_bg").fadeOut(500);
                $("#issues2").fadeOut(500);
                $("#issues").fadeOut(500);
                $scope.data = ""
                }
                ///////////
                //////
                //
            $scope.reports0 = function () {
                    $location.path('/reports0');
                }
                ///////////
        }
        else {
            $location.path('/login');
        }

////////////
        $scope.nextm = function(){
            $scope.events_v = [];
            var month1 = vm.viewDate.getMonth();
            month1 = month1 + 1;
            var mylenght = $rootScope.mydata_calender_1.length - 1;
            //
            for (i = 0; i <= mylenght; i++) {
                var s1 = $rootScope.mydata_calender_1[i].claim_no;
                var s2 = $rootScope.mydata_calender_1[i].next_session;
                var s22 = $rootScope.mydata_calender_1[i].last_session;
                var s3 = $rootScope.mydata_calender_1[i].issue_id;
                var firstinsert = vm.viewDate.getMonth();
                firstinsert = firstinsert + 1;
                if ($rootScope.mydata_calender_1[i].next_session == undefined){
                    //
                }else{
                    var sd = $rootScope.mydata_calender_1[i].next_session.split('-');
                    if(sd[1] == firstinsert){
                        $scope.events_v.push({
                            title: "قضية رقم" + " " + s1
                            , color: calendarConfig.colorTypes.warning, //        startsAt: moment().startOf('day').subtract(1, 'days').add(8, 'hours').toDate(),
                            startsAt: moment(s2).toDate(), //        endsAt: moment().startOf('day').add(1, 'day').add(9, 'hours').toDate(),
                            draggable: true
                            , resizable: true
                            , actions: actions
                            , issue_id: s3
                        })
                    }
                }
                //2//
                if ($rootScope.mydata_calender_1[i].last_session == undefined){
                    //
                }else{
                    var sd = $rootScope.mydata_calender_1[i].last_session.split('-');
                    if(sd[1] == firstinsert){
                        $scope.events_v.push({
                            title: "قضية رقم" + " " + s1
                            , color: calendarConfig.colorTypes.important, //        startsAt: moment().startOf('day').subtract(1, 'days').add(8, 'hours').toDate(),
                            startsAt: moment(s22).toDate(), //        endsAt: moment().startOf('day').add(1, 'day').add(9, 'hours').toDate(),
                            draggable: true
                            , resizable: true
                            , actions: actions
                            , issue_id: s3
                        })
                    }
                }
                // //
            } //endfor 
             
            /////////


            vm.events = $scope.events_v;
            
        }
        //
        $scope.lastm = function(){
            $scope.events_v = [];
            var month1 = vm.viewDate.getMonth();
            month1 = month1 + 1;
            var mylenght = $rootScope.mydata_calender_1.length - 1;
            //
            for (i = 0; i <= mylenght; i++) {
                var s1 = $rootScope.mydata_calender_1[i].claim_no;
                var s2 = $rootScope.mydata_calender_1[i].next_session;
                var s22 = $rootScope.mydata_calender_1[i].last_session;
                var s3 = $rootScope.mydata_calender_1[i].issue_id;
                var firstinsert = vm.viewDate.getMonth();
                firstinsert = firstinsert + 1;
                if ($rootScope.mydata_calender_1[i].next_session == undefined){
                    //
                }else{
                    var sd = $rootScope.mydata_calender_1[i].next_session.split('-');
                    if(sd[1] == firstinsert){
                        $scope.events_v.push({
                            title: "قضية رقم" + " " + s1
                            , color: calendarConfig.colorTypes.warning, //        startsAt: moment().startOf('day').subtract(1, 'days').add(8, 'hours').toDate(),
                            startsAt: moment(s2).toDate(), //        endsAt: moment().startOf('day').add(1, 'day').add(9, 'hours').toDate(),
                            draggable: true
                            , resizable: true
                            , actions: actions
                            , issue_id: s3
                        })
                    }
                }
                //2//
                if ($rootScope.mydata_calender_1[i].last_session == undefined){
                    //
                }else{
                    var sd = $rootScope.mydata_calender_1[i].last_session.split('-');
                    if(sd[1] == firstinsert){
                        $scope.events_v.push({
                            title: "قضية رقم" + " " + s1
                            , color: calendarConfig.colorTypes.important, //        startsAt: moment().startOf('day').subtract(1, 'days').add(8, 'hours').toDate(),
                            startsAt: moment(s22).toDate(), //        endsAt: moment().startOf('day').add(1, 'day').add(9, 'hours').toDate(),
                            draggable: true
                            , resizable: true
                            , actions: actions
                            , issue_id: s3
                        })
                    }
                }
                // //
            } //endfor 
             
            /////////


            vm.events = $scope.events_v;
            //
            }
        //////////////

    });