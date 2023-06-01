angular.module('home', []).controller('home', function ($rootScope, $location, Auth, $window, $scope, $http, issuedetails) {
    if ($window.localStorage["user"]) {
        //
        var user0 = $window.localStorage["user"];
        user0 = JSON.parse(user0);
        $scope.user = user0;
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
        //
        //
        if (u_level == "1") {
            var val = {
                'u_id': user_id
            };
            //
            //
            $http.post('/api/calender1m', val).
            success(function (data, status, headers, config) {
                console.log(data);

                $("#loading").hide();
                $scope.data = data; // ds mean data search
                if ($scope.data.length == 0) {
                    $("#notoday").show();
                }
                else {
                    $("#issues").show();
                }
            }).error(function (data, status, headers, config) {
                //                alert("Error");
                // log error
            });
            //
        }
        else if (u_level == "2") {
            var val = {
                'u_id': user_id
                , 'u_area_no': u_area_no
            };
            //
            //
            $http.post('/api/calender2m', val).
            success(function (data, status, headers, config) {
                console.log(data);

                $("#loading").hide();
                $scope.data = data;
                if ($scope.data.length == 0) {
                    $("#notoday").show();
                }
                else {
                    $("#issues").show();
                }
                $("#issues").show();
            }).error(function (data, status, headers, config) {
                //                alert("Error");
                // log error
                console.log(data);
            });
            //
        }
        else {
            var val = {
                'u_id': user_id
            };
            //
            //
            $http.post('/api/calender3m', val).
            success(function (data, status, headers, config) {
                console.log(data);

                $("#loading").hide();
                $scope.data = data;
                if ($scope.data.length == 0) {
                    $("#notoday").show();
                }
                else {
                    $("#issues").show();
                }
                $("#issues").show();
            }).error(function (data, status, headers, config) {
                //                alert("Error");
                // log error
            });
            //
        }
         /// ///
        $scope.open_issue = function (Discount_Name, Discount_Position, circle, claim_no, court, issue_Notes, issue_decision_t, issue_id, last_session, last_session_reason, next_session, subject, u_area_no, u_id,issue_id,u_firstname,area_name,issue_status,judge,judge_text,judge_action,mostanef1,mostanef2,taen1,taen2,elmostaashkel1,elmostaashkel2) {
            issuedetails.set(Discount_Name, Discount_Position, circle, claim_no, court, issue_Notes, issue_decision_t, issue_id, last_session, last_session_reason, next_session, subject, u_area_no, u_id,issue_id,u_firstname,area_name,issue_status,judge,judge_text,judge_action,mostanef1,mostanef2,taen1,taen2,elmostaashkel1,elmostaashkel2);
            $location.path('/issue_details');
        }
        //
        $scope.agenda = function(){
          $location.path('/calendar');
        }
        //

/////////////////////////////////////////////////////////////////////////////////////
if ($scope.user.u_level == "1") {

    $scope.addmohamy = function(){
        $("#popadd").show();
    }
    $scope.find = function(){
        $("#popfind").show();
    }
    $scope.topics = function(){
        $("#poptopics").show();
        //
        $http.get('/api/gettopics').
                    success(function (data, status, headers, config) {
                        $scope.topics = data; 
                        console.log("topics" + data);
                    }).error(function (data, status, headers, config) {
                    // err
         });
        //
    }
    //
    ////
    $scope.addtopic = function(topic){
        var val = {
            'topic': topic
        };
        //
        $("#uadded").hide();
        $("#loading-add").show();
        $http.post('/api/addtopic', val).
                success(function (data, status, headers, config) {
                    console.log(data);
                    alert("تم اضافة موضوع الدعوي بنجاح");
                    $("#loading-add").hide();
                    $("#uadded").show();
                }).error(function (data, status, headers, config) {
                    console.log(data);
                    $("#uadded").hide();
                    $("#loading-add").hide();
                    $("#popadd").hide();
                    alert("خطا في السيرفر او الانترنت حاول لاحقاً");
                });
                //
        
    }   // end addtopic
    ////
    ////
    $scope.deltopic = function(topicid){
        var val = {
            'topic_id': topicid
        };
        //
        $("#uadded").hide();
        $("#loading-add").show();
        $http.post('/api/deltopic', val).
                success(function (data, status, headers, config) {
                    console.log(data);
                    alert("تم حذف موضوع الدعوي بنجاح");
                    $("#loading-add").hide();
                    $("#uadded").show();
                }).error(function (data, status, headers, config) {
                    console.log(data);
                    $("#uadded").hide();
                    $("#loading-add").hide();
                    $("#popadd").hide();
                    alert("خطا في السيرفر او الانترنت حاول لاحقاً");
                });
                //
        
    }   // end deltopic
    ////
    $scope.add = function(user,pass,areainsert,fn,ln,phone,deflevel){
        var val = {
            'user': user
            , 'pass': pass
            , 'areainsert': areainsert
            , 'fn': fn
            , 'ln': ln
            , 'phone': phone
            , 'deflevel': deflevel
        };
        //
        $("#uadded").hide();
        $("#loading-add").show();
        $http.post('/api/adduser', val).
                success(function (data, status, headers, config) {
                    if(data == 1){
                    alert("تم اضافه المستخدم بنجاج!");
                    $("#loading-add").hide();
                    $("#uadded").show();
                    //
                    $("#1").val("");
                    $("#2").val("");
                    $("#4").val("");
                    $("#5").val("");
                    $("#6").val("");
                    $("#1").val("");
                    //
                    var val2 = {
                        'username': user
                        , 'pass': pass
                        , 'areainsert': areainsert
                        , 'u_firstname': fn
                        , 'ln': ln
                        , 'phone': phone
                        , 'deflevel': deflevel
                    };
                    $scope.as.push(val2);
                }else{
                    alert("عفوًا المستخدم موجود مسبقاً لم يتم الاضافه");
                    $("#loading-add").hide();
                    $("#uadded").show();
                }
                }).error(function (data, status, headers, config) {
                    console.log(data);
                    alert(data);
                    $("#uadded").hide();
                    $("#loading-add").hide();
                    $("#popadd").hide();
                    alert("خطا في السيرفر او الانترنت حاول لاحقاً");
                });
                //
        
    }   // end add

       //
       $scope.closeit3 = function(){
//
$("#1").val("");
$("#2").val("");
$("#4").val("");
$("#5").val("");
$("#6").val("");
$("#1").val("");
$scope.username = "";
$scope.pass = "";
$scope.areainsert = "";
$scope.u_firstname = "";
$scope.ln = "";
$scope.phone = "";
$scope.deflevel = "";
//
        $("#uadded").hide();
        $("#loading-add").hide();
        $("#poptopics").hide();
    }
    //
    //
    $scope.closeit2 = function(){
//
$("#1").val("");
$("#2").val("");
$("#4").val("");
$("#5").val("");
$("#6").val("");
$("#1").val("");
$scope.username = "";
$scope.pass = "";
$scope.areainsert = "";
$scope.u_firstname = "";
$scope.ln = "";
$scope.phone = "";
$scope.deflevel = "";
//
$("#uadded").hide();
$("#loading-add").hide();
$("#popadd").hide();
    }
    //
    $scope.closeit1 = function(){
//
$("#1").val("");
$("#2").val("");
$("#4").val("");
$("#5").val("");
$("#6").val("");
$("#1").val("");
$scope.s1 = "";
$scope.user = "";
$scope.pass = "";
$scope.areainsert = "";
$scope.fn = "";
$scope.ln = "";
$scope.phone = "";
$scope.deflevel = "";
//
        $("#ufinded").hide();
        $("#loading-find").hide();
        $("#popfind").hide();
console.log("in close 1");
    }
    //
    $scope.closeit4 = function(){
//
$("#1").val("");
$("#2").val("");
$("#4").val("");
$("#5").val("");
$("#6").val("");
$("#1").val("");
$scope.s1 = "";
$scope.user = "";
$scope.pass = "";
$scope.areainsert = "";
$scope.fn = "";
$scope.ln = "";
$scope.phone = "";
$scope.deflevel = "";
//
$("#ufinded").hide();
$("#loading-find").hide();
$("#popmove").hide();
console.log("in close 4");
}
//


     //
     $scope.search1 = function(user){
        var val = {
            'user': user
        };
        $("#ufinded").hide();
        $("#loading-find").show();
        $http.post('/api/finduser', val).
                success(function (data, status, headers, config) {
                    console.log(data);
                    $("#loading-find").hide();
                    $scope.dodata = data;
                    $scope.user = $scope.dodata.username;
                    $scope.pass = $scope.dodata.pass;
                    $scope.fn = $scope.dodata.u_firstname;
                    $scope.ln = $scope.dodata.u_lastname;
                    $scope.phone = $scope.dodata.u_phone;
                    $rootScope.userid0 = $scope.dodata.uid;
                    $scope.deflevel0 = $scope.dodata.u_level;

                    if($scope.dodata.u_area_no == 1){
                        $scope.areainsert0 = "مركزي";
                    }else if($scope.dodata.u_area_no == 2){
                        $scope.areainsert0 = "الدقهلية";
                    }else if($scope.dodata.u_area_no == 3){
                        $scope.areainsert0 = "الغربية";
                    }else if($scope.dodata.u_area_no == 4){
                        $scope.areainsert0 = "دمياط";
                    }else if($scope.dodata.u_area_no == 5){
                        $scope.areainsert0 = "بورسعيد";
                    }else if($scope.dodata.u_area_no == 6){
                        $scope.areainsert0 = "الجيزة";
                    }else if($scope.dodata.u_area_no == 7){
                        $scope.areainsert0 = "بني سويف";
                    }else if($scope.dodata.u_area_no == 8){
                        $scope.areainsert0 = "السويس";
                    }else if($scope.dodata.u_area_no == 9){
                        $scope.areainsert0 = "الاسكندرية";
                    }else if($scope.dodata.u_area_no == 10){
                        $scope.areainsert0 = "سوهاج";
                    }else if($scope.dodata.u_area_no == 11){
                        $scope.areainsert0 = "شمال سيناء";
                    }else if($scope.dodata.u_area_no == 12){
                        $scope.areainsert0 = "البحيرة";
                    }else if($scope.dodata.u_area_no == 13){
                        $scope.areainsert0 = "جنوب سيناء";
                    }else if($scope.dodata.u_area_no == 14){
                        $scope.areainsert0 = "الشرقية";
                    }else if($scope.dodata.u_area_no == 15){
                        $scope.areainsert0 = "اسوان";
                    }else if($scope.dodata.u_area_no == 16){
                        $scope.areainsert0 = "مرسى مطروح";
                    }else if($scope.dodata.u_area_no == 17){
                        $scope.areainsert0 = "الوادي الجديد";
                    }else if($scope.dodata.u_area_no == 18){
                        $scope.areainsert0 = "المنيا";
                    }else if($scope.dodata.u_area_no == 19){
                        $scope.areainsert0 = "الاسماعيلية";
                    }else if($scope.dodata.u_area_no == 20){
                        $scope.areainsert0 = "القليوبية";
                    }else if($scope.dodata.u_area_no == 21){
                        $scope.areainsert0 = "قنا";
                    }else if($scope.dodata.u_area_no == 22){
                        $scope.areainsert0 = "كفر الشيخ";
                    }else if($scope.dodata.u_area_no == 23){
                        $scope.areainsert0 = "البحر الاحمر";
                    }else if($scope.dodata.u_area_no == 24){
                        $scope.areainsert0 = "الاقصر";
                    }else if($scope.dodata.u_area_no == 25){
                        $scope.areainsert0 = "المنوفية";
                    }else if($scope.dodata.u_area_no == 26){
                        $scope.areainsert0 = "الفيوم";
                    }else{
                        $scope.areainsert0 = "أسيوط";
                    }
                    
                    //
                    $("#1").val("");
                    $("#2").val("");
                    $("#4").val("");
                    $("#5").val("");
                    $("#6").val("");
                    $("#1").val("");
                    //
                }).error(function (data, status, headers, config) {
                    console.log(data);
                    $("#ufinded").hide();
                    $("#loading-find").hide();
                    $("#popfind").hide();
                    alert("خطا في السيرفر او الانترنت حاول لاحقاً");
                });            
    }   // end find
//
//
$scope.search2 = function(user){
var val = {
    'user': user
};
$("#ufinded").hide();
$("#loading-find").show();
$http.post('/api/finduserbyphone', val).
        success(function (data, status, headers, config) {
            console.log(data);
            $("#loading-find").hide();
            $scope.dodata = data;
            $scope.user = $scope.dodata.username;
            $scope.pass = $scope.dodata.pass;
            $scope.fn = $scope.dodata.u_firstname;
            $scope.ln = $scope.dodata.u_lastname;
            $scope.phone = $scope.dodata.u_phone;
            $rootScope.userid0 = $scope.dodata.uid;
                    //
                    $("#1").val("");
                    $("#2").val("");
                    $("#4").val("");
                    $("#5").val("");
                    $("#6").val("");
                    $("#1").val("");
                    $("#areainsert").val("");
                    $("#deflevel").val("");
                    // 
        }).error(function (data, status, headers, config) {
            console.log(data);
            $("#ufinded").hide();
            $("#loading-find").hide();
            $("#popfind").hide();
            alert("خطا في السيرفر او الانترنت حاول لاحقاً");
        });            
}   // end find
//
//
$scope.edit = function(user,pass,areainsert,fn,ln,phone,deflevel){
var vale = {
    'user': user
    , 'pass': pass
    , 'areainsert': areainsert
    , 'fn': fn
    , 'ln': ln
    , 'phone': phone
    , 'deflevel': deflevel
    , 'id': $rootScope.userid0
};
$("#ufinded").hide();
$("#loading-find").show();
$http.post('/api/edituseradmin', vale).
        success(function (data, status, headers, config) {
            $("#loading-find").hide();
            alert("تم تعديل بيانات المستخدم بنجاح !");
        }).error(function (data, status, headers, config) {
            console.log(data);
            $("#ufinded").hide();
            $("#loading-find").hide();
            $("#popfind").hide();
            alert("خطا في السيرفر او الانترنت حاول لاحقاً");
        });            
}   // end find
//

}else{
    $location.path('/');

}

      
        /////////////////////////////////////////////
    }
    else {
        $location.path('/login');
        //        window.open("/#login", "_self");
        //        alert("You Need To Login !");
    }




        //
        $scope.findalluser11 = function(){
            var val = {
                'user': 1
            };

            $http.post('/api/findalluser11', val).
                    success(function (data, status, headers, config) {
                        console.log(data);
                        $scope.as = data;
                        $("#findallusersdiv").show();
                        // $scope.dodata = data;
                        // $scope.user = $scope.dodata.username;
                        // $scope.pass = $scope.dodata.pass;
                        // $scope.fn = $scope.dodata.u_firstname;
                        // $scope.ln = $scope.dodata.u_lastname;
                        // $scope.phone = $scope.dodata.u_phone;
                        // $rootScope.userid0 = $scope.dodata.uid;
                        // $scope.deflevel0 = $scope.dodata.u_level;
    
                        // if($scope.dodata.u_area_no == 1){
                        //     $scope.areainsert0 = "مركزي";
                        // }else if($scope.dodata.u_area_no == 2){
                        //     $scope.areainsert0 = "الدقهلية";
                        // }else if($scope.dodata.u_area_no == 3){
                        //     $scope.areainsert0 = "الغربية";
                        // }else if($scope.dodata.u_area_no == 4){
                        //     $scope.areainsert0 = "دمياط";
                        // }else if($scope.dodata.u_area_no == 5){
                        //     $scope.areainsert0 = "بورسعيد";
                        // }else if($scope.dodata.u_area_no == 6){
                        //     $scope.areainsert0 = "الجيزة";
                        // }else if($scope.dodata.u_area_no == 7){
                        //     $scope.areainsert0 = "بني سويف";
                        // }else if($scope.dodata.u_area_no == 8){
                        //     $scope.areainsert0 = "السويس";
                        // }else if($scope.dodata.u_area_no == 9){
                        //     $scope.areainsert0 = "الاسكندرية";
                        // }else if($scope.dodata.u_area_no == 10){
                        //     $scope.areainsert0 = "سوهاج";
                        // }else if($scope.dodata.u_area_no == 11){
                        //     $scope.areainsert0 = "شمال سيناء";
                        // }else if($scope.dodata.u_area_no == 12){
                        //     $scope.areainsert0 = "البحيرة";
                        // }else if($scope.dodata.u_area_no == 13){
                        //     $scope.areainsert0 = "جنوب سيناء";
                        // }else if($scope.dodata.u_area_no == 14){
                        //     $scope.areainsert0 = "الشرقية";
                        // }else if($scope.dodata.u_area_no == 15){
                        //     $scope.areainsert0 = "اسوان";
                        // }else if($scope.dodata.u_area_no == 16){
                        //     $scope.areainsert0 = "مرسى مطروح";
                        // }else if($scope.dodata.u_area_no == 17){
                        //     $scope.areainsert0 = "الوادي الجديد";
                        // }else if($scope.dodata.u_area_no == 18){
                        //     $scope.areainsert0 = "المنيا";
                        // }else if($scope.dodata.u_area_no == 19){
                        //     $scope.areainsert0 = "الاسماعيلية";
                        // }else if($scope.dodata.u_area_no == 20){
                        //     $scope.areainsert0 = "القليوبية";
                        // }else if($scope.dodata.u_area_no == 21){
                        //     $scope.areainsert0 = "قنا";
                        // }else if($scope.dodata.u_area_no == 22){
                        //     $scope.areainsert0 = "كفر الشيخ";
                        // }else if($scope.dodata.u_area_no == 23){
                        //     $scope.areainsert0 = "البحر الاحمر";
                        // }else if($scope.dodata.u_area_no == 24){
                        //     $scope.areainsert0 = "الاقصر";
                        // }else if($scope.dodata.u_area_no == 25){
                        //     $scope.areainsert0 = "المنوفية";
                        // }else if($scope.dodata.u_area_no == 26){
                        //     $scope.areainsert0 = "الفيوم";
                        // }else{
                        //     $scope.areainsert0 = "أسيوط";
                        // }
                        
    
                    }).error(function (data, status, headers, config) {
                        console.log(data);
                        $("#ufinded").hide();
                        $("#loading-find").hide();
                        $("#popfind").hide();
                        alert("خطا في السيرفر او الانترنت حاول لاحقاً");
                    });            
        }   // end find
    //



    //
            ///
            $scope.area550055222 = "أختر المحامي ";

            ///////////
   $scope.motzerla = function (mohafza) {
       var valx2 = {
           'area': mohafza
       };
       console.log(mohafza);
       $http.post('/api/usersofarea', valx2).
       success(function (data, status, headers, config) {
           $("#loading").hide();
           $scope.usersfromarea = data; // ds mean data search
           console.log($scope.usersfromarea);
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
    //
        // del user
    $scope.deluser0 = function($index,uid,username){
        var val00 = {
            'uid': uid
        };
        //console.log($scope.as);
        console.log($index);
        // do Delete //
        $http.post('/api/deluserbuid', val00).
        success(function (data, status, headers, config) {
            console.log(uid);
            console.log(data);
            //$scope.deleted[uid] = true;

            if(data == 1){
                $scope.as.splice($index,1);
                //$scope.$apply();
                alert("تم حذف المستخدم بنجاح!");
            }else{
                $scope.UserTempDel = username;
                $scope.IdTempDel = uid;
                $scope.IndexTemp = $index;
                $("#popmove").show();
            }

        }).error(function (data, status, headers, config) {
            console.log(data);
            $("#ufinded").hide();
            $("#loading-find").hide();
            $("#popfind").hide();
            alert("خطا في السيرفر او الانترنت حاول لاحقاً");
        });    
        // End do Delete //
 
    }
      //

      $scope.movedel = function (area,mohamyid) {
        //
        $("#loading").show();

      var valx2 = {
        'area': area
        ,'uid': mohamyid
        ,'tempid': $scope.IdTempDel
    };
    $http.post('/api/bulkmoveuserissuesbyid', valx2).
    success(function (data, status, headers, config) {
        $("#loading").hide();
        $scope.as.splice($scope.IndexTemp,1);
       alert("تم نقل القضايا وحذف المستخدم بنجاح");
       $("#popmove").hide();
        //
    }).error(function (data, status, headers, config) {
        //                alert("Error");
        // log error
        console.log(data);
    });
    //
    }


});