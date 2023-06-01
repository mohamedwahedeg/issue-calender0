var config = require('../../config');
var configdb = require('../../config');
var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');
var sql = require('mssql');
var formidable = require('formidable');
var randomstring = require('randomstring');
var request = require("request");
var ua = require('universal-analytics');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var secretKey = config.secretKey;
var visitor = ua('UA-66661717-3');
var sql = require('mssql');
var htmlDocx = require('html-docx-js');
var FileSaver = require('file-saver');
var ip = require("ip");
var date9 = new Date();

var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "az_issues"
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });
  
//
module.exports = function (app, express, io) {
    //start services
    var api = express.Router();
    api.use(function (req, res, next) {
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, auth, token');
        res.header("Access-Control-Allow-Origin", "*");
        console.log("Somebody come, ip= " + req.connection.remoteAddress + " - TIME: " + date9 + "  --- ");
        next();
    });


    // SYS Register //
    api.post('/register', function (req, res) {
            var nulles = "";
            var user = new User({
                mail: req.body.mail
                , password: req.body.pass
                , firstname: req.body.fn
                , lastname: req.body.ln
                , country: req.body.country
                , city: req.body.city
                , age: req.body.age
                , phone: req.body.phone
                , Address: nulles
                , job: nulles
                , skills: nulles
                , paymentmethod: nulles
                , balance: nulles
                , photo: nulles
                , firends: nulles
                , followers: nulles
            });
            user.save(function (err, newuser) {
                if (err) {
                    res.send(err);
                    return
                }
                //io.emit('User', newuser);
                res.json({
                    message: "You Registered Successfully !"
                });
            });
        })
        ///////////////////////////////////////////////////
        //////////////////////////////////////////////////////
        //login
        //        visitor.pageview("/", "http://peaksandpies.com", "Welcome1").send();
    api.post('/login', function (req, res) {
        sql.close();
        visitor.pageview("/login", "", "login").send();
        var u00 = Buffer.from(req.body.mail, 'base64').toString()
        var p00 = Buffer.from(req.body.pass, 'base64').toString()
        //
        var username = escape(u00);
        var pass = escape(p00);
        //encrypt // var p = Buffer.from(pass).toString('base64');
        var s = "moahmed"
        // connect to your database
        
            con.query("SELECT * FROM users CROSS JOIN areas where areas.area_id = users.u_area_no AND users.username = N'" + username + "' AND users.pass = '" + pass + "'", function (err, result, fields) {
              if (err) throw err;
              console.log(result[0]);
              res.json(result[0]);
            });

    }); //end main login function
    ////////////////////////////////////////
    ////////////////////////////////////////
    api.post('/addissue', function (req, res) {
        sql.close();
        visitor.pageview("/addissue", "", "addissue").send();
        var u_id = req.body.u_id;
        var u_area_no = req.body.u_area_no;
        var court = req.body.court;
        var circle = req.body.circle;
        var claim_no = req.body.claim_no;
        var Discount_Name = req.body.Discount_Name;
        var Discount_Position = req.body.Discount_Position;
        var subject = req.body.subject;
        var lastdate = req.body.lastdate;
        var last_session_reason = req.body.last_session_reason;
        var nextdate = req.body.nextdate;
        var issue_decision_t = req.body.issue_decision_t;
        var issue_Notes = req.body.issue_Notes;
        var i_court_type = req.body.i_court_type;
        var mokem_el_i = req.body.mokem_el_i;
        var issue_status = req.body.issue_status;
        var judge = req.body.judge;
        var judge_text = req.body.judge_text;
        var judge_action = req.body.judge_action;
        var mostanef1 = req.body.mostanef1;
        var mostanef2 = req.body.mostanef2;
        var taen1 = req.body.taen1;
        var taen2 = req.body.taen2;
        var elmostaashkel1 = req.body.elmostaashkel1;
        var elmostaashkel2 = req.body.elmostaashkel2;
            con.query("insert into issues (u_id,u_area_no,court,circle,claim_no,Discount_Name,Discount_Position,subject,last_session,next_session,last_session_reason,issue_decision_t,issue_Notes,court_type,mokem_el_issue,issue_status,judge,judge_text,judge_action,mostanef1,mostanef2,taen1,taen2,elmostaashkel1,elmostaashkel2) values ('" + u_id + "','" + u_area_no + "',N'" + court + "',N'" + circle + "',N'" + claim_no + "',N'" + Discount_Name + "',N'" + Discount_Position + "',N'" + subject + "','" + lastdate + "',N'" + nextdate + "',N'" + last_session_reason + "',N'" + issue_decision_t + "',N'" + issue_Notes + "',N'" + i_court_type + "',N'" + mokem_el_i + "',N'" + issue_status + "',N'" + judge + "',N'" + judge_text + "',N'" + judge_action + "',N'" + mostanef1 + "',N'" + mostanef2 + "',N'" + taen1 + "',N'" + taen2 + "',N'" + elmostaashkel1 + "',N'" + elmostaashkel2 + "')", function (err, result, fields) {
                if (err) throw err;
                console.log(result);
                res.json(result);
              });
    });
    //
    ////////////////////////////////////////
    //calender3
    //        visitor.pageview("/", "http://peaksandpies.com", "Welcome1").send();
    api.post('/calender3', function (req, res) {
        sql.close();
        visitor.pageview("/calender3", "", "calender3").send();
        var u_id = req.body.u_id;
        var date = req.body.date;
        
            con.query("SELECT DISTINCT areas.area_id, areas.area_name, issues.*, users.uid, users.u_firstname FROM areas INNER JOIN issues on areas.area_id = issues.u_area_no INNER JOIN users on users.uid = issues.u_id where users.uid = issues.u_id AND areas.area_id = issues.u_area_no AND users.u_id = '" + u_id + "' AND (next_session = '" + date + "' OR last_session = '" + date + "')", function (err, result, fields) {
                if (err) throw err;
                console.log(result[0]);
                res.json(result[0]);
              });

        
    }); //end   
    ////////////////////////////////////////
    ////////////////////////////////////////
    //calender3
    //        visitor.pageview("/", "http://peaksandpies.com", "Welcome1").send();
    api.post('/calender2', function (req, res) {
        sql.close();
        visitor.pageview("/calender2", "", "calender2").send();
        var u_id = req.body.u_id;
        var date = req.body.date;
        var u_area_no = req.body.u_area_no;

        con.query("SELECT DISTINCT areas.area_id, areas.area_name, issues.*, users.uid, users.u_firstname FROM areas INNER JOIN issues on areas.area_id = issues.u_area_no INNER JOIN users on users.uid = issues.u_id where users.uid = issues.u_id AND areas.area_id = issues.u_area_no AND issues.u_area_no = '" + u_area_no + "' AND (next_session = '" + date + "' OR last_session = '" + date + "')", function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            res.json(result);
          });
          
    }); //end   
    ////////////////////////////////////////
    ////////////////////////////////////////
    //calender 
    //        visitor.pageview("/", "http://peaksandpies.com", "Welcome1").send();
    api.post('/calender1', function (req, res) {
        sql.close();
        visitor.pageview("/calender1", "", "calender1").send();
        var u_id = req.body.u_id;
        var date = req.body.date;

        con.query("SELECT DISTINCT areas.area_id, areas.area_name,issues.*, users.uid, users.u_firstname FROM areas INNER JOIN issues on areas.area_id = issues.u_area_no INNER JOIN users on users.uid = issues.u_id where next_session = '" + date + "' OR last_session = '" + date + "'", function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            res.json(result);
          });
//            request.query("SELECT areas.area_id, areas.area_name, issues.*, users.uid, users.u_firstname FROM areas CROSS JOIN issues CROSS JOIN users where users.uid = issues.u_id AND areas.area_id = issues.u_area_no AND [next_session] = '" + date + "'", function (err, recordset) {

    }); //end   
    ////////////////////////////////////////
    ////////////////////////////////////////
    //calender 
    //        visitor.pageview("/", "http://peaksandpies.com", "Welcome1").send();
    api.post('/calender1m', function (req, res) {
        var d = new Date().toISOString().split('T')[0];
        visitor.pageview("/calender1", "", "calender1").send();
        var year = req.body.year;

        con.query("SELECT DISTINCT * FROM areas INNER JOIN issues on areas.area_id = issues.u_area_no INNER JOIN users on users.uid = issues.u_id where next_session like '%"+ year +"%' or last_session like '%"+ year +"%'", function (err, result, fields) {
        //con.query("SELECT DISTINCT areas.area_id, areas.area_name, issues.*, users.uid, users.u_firstname FROM areas INNER JOIN issues on areas.area_id = issues.u_area_no INNER JOIN users on users.uid = issues.u_id where [next_session] like '%"+ year +"%' or [last_session] like '%"+ year +"%'", function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            res.json(result);
          });
    }); //end   
    ////////////////////////////////////////
    ////////////////////////////////////////
    //calender1
    //        visitor.pageview("/", "http://peaksandpies.com", "Welcome1").send();
    api.post('/calender2m', function (req, res) {
        sql.close();
        visitor.pageview("/calender2m", "", "calender2m").send();
        var u_id = req.body.u_id;
        var u_area_no = req.body.u_area_no;
        var year = req.body.year;
        var d = new Date().toISOString().split('T')[0];
        
        con.query("SELECT DISTINCT * FROM areas INNER JOIN issues on areas.area_id = issues.u_area_no INNER JOIN users on users.uid = issues.u_id where users.u_area_no = '" + u_area_no + "' AND (next_session like '%" + year + "%' OR last_session like '%" + year + "%')", function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            res.json(result);
          });

    }); //end   
    ////////////////////////////////////////
    ////////////////////////////////////////
    //calender3
    //        visitor.pageview("/", "http://peaksandpies.com", "Welcome1").send();
    api.post('/calender3m', function (req, res) {
        sql.close();
        visitor.pageview("/calender3", "", "calender3").send();
        var u_id = req.body.u_id;
        var year = req.body.year;
        var d = new Date().toISOString().split('T')[0];
    
        con.query("SELECT DISTINCT * FROM areas INNER JOIN issues on areas.area_id = issues.u_area_no INNER JOIN users on users.uid = issues.u_id where users.u_id = '" + u_id + "' AND (next_session like '%" + year + "%' OR last_session like '%" + year + "%')", function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            res.json(result);
          });
    }); //end
    ////////////////////////////////////////
    ////////////////////////////////////////
    api.post('/editissue', function (req, res) {
        sql.close();
        visitor.pageview("/editissue", "", "editissue").send();
        var u_id = req.body.u_id;
        var u_area_no = req.body.u_area_no;
        var court = req.body.court;
        var circle = req.body.circle;
        var claim_no = req.body.claim_no;
        var Discount_Name = req.body.Discount_Name;
        var Discount_Position = req.body.Discount_Position;
        var subject = req.body.subject;
        var lastdate = req.body.lastdate;
        var last_session_reason = req.body.last_session_reason;
        var nextdate = req.body.nextdate;
        var issue_decision_t = req.body.issue_decision_t;
        var issue_Notes = req.body.issue_Notes;
        var issue_id = req.body.issue_id;
        var ctype = req.body.ctype;
        var mokemtype = req.body.mokemtype;
        var issue_status = req.body.issue_status;
        var judge = req.body.judge;
        var judge_text = req.body.judge_text;
        var judge_action = req.body.judge_action;
        var mostanef1 = req.body.mostanef1;
        var mostanef2 = req.body.mostanef2;
        var taen1 = req.body.taen1;
        var taen2 = req.body.taen2;
        var elmostaashkel1 = req.body.elmostaashkel1;
        var elmostaashkel2 = req.body.elmostaashkel2;
        //
        con.query("UPDATE issues SET court = N'" + court + "', circle = N'" + circle + "', claim_no = N'" + claim_no + "', Discount_Name = N'" + Discount_Name + "', Discount_Position = N'" + Discount_Position + "', subject = N'" + subject + "', last_session = N'" + lastdate + "', next_session = N'" + nextdate + "', last_session_reason = N'" + last_session_reason + "', issue_decision_t = N'" + issue_decision_t + "', issue_Notes = N'" + issue_Notes + "', court_type = N'" + ctype + "', mokem_el_issue = N'" + mokemtype + "', issue_status = N'" + issue_status + "', judge = N'" + judge + "', judge_text = N'" + judge_text + "', judge_action = N'" + judge_action + "', mostanef1 = N'" + mostanef1 + "', mostanef2 = N'" + mostanef2 + "', taen1 = N'" + taen1 + "', taen2 = N'" + taen2 + "', elmostaashkel1 = N'" + elmostaashkel1 + "', elmostaashkel2 = N'" + elmostaashkel2 + "' Where issue_id = " + issue_id + "", function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            res.json(result);
          });
    });
    //
    ///////////////////////////////////////
    ////////////////////////////////////////
    api.post('/edituser', function (req, res) {
        sql.close();
        visitor.pageview("/edituser", "", "edituser").send();
        var u_id = req.body.u_id;
        var fname = req.body.fname;
        var lname = req.body.lname;
        var email = req.body.email;
        var phone = req.body.phone;
        //
        con.query("UPDATE users SET u_firstname = N'" + fname + "',u_lastname = N'" + lname + "',u_email = '" + email + "',u_phone = N'" + phone + "' Where uid = " + u_id + "", function (err, result, fields) {
          if (err) throw err;
          console.log(result);
          res.json(result);
        });

    });
    /////////////////////////////////////
    ////////////////////////////////////////
    api.get('/get_today_report_msword', function (req, res) {
        sql.close();
        var htmlDocx = require('html-docx-js');
        var FileSaver = require('file-saver');
        visitor.pageview("/get_today_report_msword", "", "get_today_report_msword").send();
        var content = req.body.content;
        var test = '<table><tr><td dir="rtl" style="font-family: Noto Naskh Arabic">رقم القضية</td> <td style="width:15%;"> محكمة</td><td>دائرة</td> <td style="width:12%;">اسم الخصم</td> <td>صفته</td> <td style="width:15%;">موضوع الدعوي</td> <td>الجلسة السابقة</td> <td>سبب التاجيل</td> <td>الجلسة التالية</td> <td style="width:15%;">القرار</td> <td>الملاحظات</td> <td>المحامي</td> <td>المنطقه</td> </tr> <tr> <td>205</td> <td>الصديق الثانوية</td> <td>خاتم المرسلين العادى ث / خاتم المرسلين النموذجى ث خاتم المرسلين العادى ث / خاتم المرسلين النموذجى ث / / </td> <td>الصديق</td> </tr> </table>';
        var converted = htmlDocx.asBlob(test);
        FileSaver.saveAs(converted, 'test.docx');
    });
    ///////////////////////////////////////
    ////////////////////////////////////////
    api.post('/drag_issue', function (req, res) {
        visitor.pageview("/drag_issue", "", "drag_issue").send();
        var issue_id = req.body.issue_id;
        var nextdate = req.body.date;
        var last = req.body.last;
        var reason = req.body.reason;
        //
        con.query("UPDATE issues SET next_session = '" + nextdate + "', last_session = '" + last + "', last_session_reason = N'" + reason + "' Where issue_id = " + issue_id + "", function (err, result, fields) {
          if (err) throw err;
          con.query("insert into tagel (issue_id,last_session_reason,last_session) values ('" + issue_id + "',N'" + reason + "',N'" + last + "')", function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            res.json(result);
          });
        });
        
    });
    //
    ///////////////////////////////////////
    ////////////////////////////////////////
    api.post('/search', function (req, res) {
        sql.close();
        visitor.pageview("/search", "", "search").send();
        var searchtext = req.body.searchtext;
        //
        con.query("SELECT * FROM issues where (court like N'%" + searchtext + "%' OR circle like N'%" + searchtext + "%' OR claim_no like N'%" + searchtext + "%' OR Discount_Name like N'%" + searchtext + "%' OR next_session like N'%" + searchtext + "%')", function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            res.json(result);
          });
            //request.query("SELECT areas.area_id, areas.area_name, issues.*, users.uid, users.u_firstname FROM areas CROSS JOIN issues CROSS JOIN users where users.uid = issues.u_id AND areas.area_id = issues.u_area_no AND ([court] like N'%" + searchtext + "%' OR [circle] like N'%" + searchtext + "%' OR [claim_no] like N'%" + searchtext + "%' OR [Discount_Name] like N'%" + searchtext + "%' OR [next_session] like N'%" + searchtext + "%' OR .[areas].[area_name] like N'%" + searchtext + "%')", function (err, recordset) {

    });
    //
    ///////////////////////////////////////
    ////////////////////////////////////////
    api.post('/customsearch', function (req, res) {
        sql.close();
        visitor.pageview("/customsearch", "", "customsearch").send();
        var column = req.body.column;
        var searchtext = req.body.searchtext;
        //
        con.query("SELECT * FROM issues where (court like N'%" + searchtext + "%' OR circle like N'%" + searchtext + "%' OR claim_no like N'%" + searchtext + "%' OR Discount_Name like N'%" + searchtext + "%' OR next_session like N'%" + searchtext + "%')", function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            res.json(result);
          });
    });
    //
    ///////////////////////////////////////
    ////////////////////////////////////////////////////
    //area
    //        visitor.pageview("/", "http://peaksandpies.com", "Welcome1").send();
    api.post('/area0', function (req, res) {
        sql.close();
        visitor.pageview("/area0", "", "area0").send();
        var area = req.body.area;
con.query("SELECT areas.area_id, areas.area_name, issues.*, users.uid, users.u_firstname FROM areas CROSS JOIN issues CROSS JOIN users where users.uid = issues.u_id AND areas.area_id = issues.u_area_no AND issues.u_area_no = '" + area + "'", function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            res.json(result);
          });

    }); //end   
    ////////////////////////////
    ////////////////////////////////////////
    //calender1filter
    api.post('/calender1f', function (req, res) {
        sql.close();
        visitor.pageview("/calender1f", "", "calender1f").send();
        var u_id = req.body.u_id;
        var date = req.body.date;
        var u_area_no = req.body.u_area_no;

        con.query("SELECT areas.area_id, areas.area_name, issues.*, users.uid, users.u_firstname FROM areas CROSS JOIN issues CROSS JOIN users where users.uid = issues.u_id AND areas.area_id = issues.u_area_no AND u_area_no = '" + u_area_no + "' AND next_session = '" + date + "' AND u_id = '" + u_id + "'", function (err, result, fields) {
            if (err) throw err;
            console.log(result[0]);
            res.json(result[0]);
          });
          
    }); //end   
    ////////////////////////////////////////
    ////////////////////////////////////////////////////
    //usersofarea
    //        visitor.pageview("/", "http://peaksandpies.com", "Welcome1").send();
    api.post('/usersofarea', function (req, res) {
        sql.close();
        visitor.pageview("/usersofarea", "", "usersofarea").send();
        var area = req.body.area;

        con.query("SELECT * FROM users where u_area_no = '" + area + "'", function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            res.json(result);
          });
          

    }); //end   
    ////////////////////////////
    ////////////////////////////////////////
    ////////////////////////////////////////
    //calender3
    //        visitor.pageview("/", "http://peaksandpies.com", "Welcome1").send();
    api.post('/useronlyissue', function (req, res) {
        sql.close();
        visitor.pageview("/useronlyissue", "", "useronlyissue").send();
        var u_id = req.body.area;
        var date = req.body.date;
       
        con.query("SELECT areas.area_id, areas.area_name, issues.*, users.uid, users.u_firstname FROM areas CROSS JOIN issues CROSS JOIN users where users.uid = issues.u_id AND areas.area_id = issues.u_area_no AND issues.u_id = '" + u_id + "'", function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            res.json(result);
          });

    }); //end   
    ////////////////////////////////////////
    //calender3
    //        visitor.pageview("/", "http://peaksandpies.com", "Welcome1").send();
    api.post('/get_his', function (req, res) {
        sql.close();
        visitor.pageview("/get_his", "", "get_his").send();
        var id = req.body.id;

        con.query("SELECT * FROM tagel where issue_id = '" + id + "'", function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            res.json(result);
          });
          
          
            // AND pass] = ' + password + ''
            // query to the database and get the records
            //            SELECT areas.area_id, areas.area_name, issues.*, users.uid, users.u_firstname FROM areas CROSS JOIN issues CROSS JOIN users where users.uid = issues.u_id AND areas.area_id = issues.u_area_no AND [u_id] = '" + u_id + "' AND [next_session] = '" + date + "'
            //                         	where [next_session] like '%2017%';

    }); //end   
    ////////////////////////////////////////
    ////////////////////////////////////////
    //calender1filter
    api.post('/calender1ff', function (req, res) {
        sql.close();
        visitor.pageview("/calender1ff", "", "calender1ff").send();
        var u_id = req.body.u_id;
        var date = req.body.date;
        var u_area_no = req.body.u_area_no;

        con.query("SELECT * FROM areas CROSS JOIN issues CROSS JOIN users where users.uid = issues.u_id AND areas.area_id = issues.u_area_no AND u_area_no = '" + u_area_no + "' AND next_session = '" + date + "'", function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            res.json(result);
          });
                          
    }); //end   


            ////////////////////////////////////////
     //reportuserssum
     api.get('/reportuserssum', function (req, res) {
      sql.close();
      visitor.pageview("/reportuserssum", "", "reportuserssum").send();

con.query("SELECT DISTINCT users.uid, users.u_firstname, COUNT(issues.issue_id) AS NOIssues, areas.area_name FROM issues INNER JOIN users ON users.uid = issues.u_id INNER JOIN areas ON areas.area_no = users.u_area_no GROUP BY users.uid;", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.json(result);
      });

  }); //end   
  ////////////////////////////////////////

        ////////////////////////////////////////
     //reportsum
     api.get('/reportsum', function (req, res) {
      sql.close();
      visitor.pageview("/reportsum", "", "reportsum").send();

      var res0 = {
        all: 0
        ,motadawl: 0
        , ghermotadawl: 0
      };

con.query("SELECT count(issue_id) AS AllNumber FROM issues", function (err, result, fields) {
        if (err) throw err;
        res0.all = result[0].AllNumber;
        con.query("SELECT count(issue_id) AS AllNumber2 FROM issues where (issue_status = 1)", function (err, result2, fields) {
          if (err) throw err;
          res0.motadawl = result2[0].AllNumber2;

          console.log(res0);
          res.json(res0);

        });
      });

  }); //end   
  ////////////////////////////////////////

    ////////////////////////////////////////
     //reportinrange1
    api.post('/reportinrange1', function (req, res) {
        sql.close();
        visitor.pageview("/reportinrange1", "", "reportinrange1").send();
        var low = req.body.from;
        var high = req.body.to;
        
con.query("SELECT areas.area_id, areas.area_name, issues.*, users.uid, users.u_firstname FROM areas CROSS JOIN issues CROSS JOIN users where users.uid = issues.u_id AND areas.area_id = issues.u_area_no AND issues.next_session >= '" + low + "' AND issues.next_session <= '" + high + "'", function (err, result, fields) {
          if (err) throw err;
          console.log(result);
          res.json(result);
        });
    }); //end   
    ////////////////////////////////////////
    ////////////////////////////////////////
     //reportinrange2
    api.post('/reportinrange2', function (req, res) {
        sql.close();
        visitor.pageview("/reportinrange2", "", "reportinrange2").send();
        var low = req.body.from;
        var high = req.body.to;
        var u_area_no = req.body.u_area_no;

con.query("SELECT areas.area_id, areas.area_name, issues.*, users.uid, users.u_firstname FROM areas CROSS JOIN issues CROSS JOIN users where users.uid = issues.u_id AND areas.area_id = issues.u_area_no AND issues.u_area_no = '" + u_area_no + "' AND issues.next_session >= '" + low + "' AND issues.next_session <= '" + high + "'", function (err, result, fields) {
          if (err) throw err;
          console.log(result);
          res.json(result);
        });


    }); //end   
    ////////////////////////////////////////
    ////////////////////////////////////////
     //reportinrange3
    api.post('/reportinrange3', function (req, res) {
        sql.close();
        visitor.pageview("/reportinrange3", "", "reportinrange3").send();
        var low = req.body.from;
        var high = req.body.to;
        var u_id = req.body.u_id;

con.query("SELECT areas.area_id, areas.area_name, issues.*, users.uid, users.u_firstname FROM areas CROSS JOIN issues CROSS JOIN users where users.uid = issues.u_id AND areas.area_id = issues.u_area_no AND issues.u_id = '" + u_id + "' AND issues.next_session >= '" + low + "' AND issues.next_session <= '" + high + "'", function (err, result, fields) {
          if (err) throw err;
          console.log(result);
          res.json(result);
        });

    }); //end   
    ////////////////////////////////////////
    ////////////////////////////////////////
     //reportinrange3
    api.post('/delissue', function (req, res) {
        var issue_id = req.body.issue_id;
        con.query("DELETE FROM issues WHERE issue_id = " + issue_id + "", function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            res.json(result);
          });
        
    }); //end   
    ////////////////////////////////////////
    ///////////////// admin cp /////////////
     ////////////////////////////////////////
     api.post('/adduser', function (req, res) {
        sql.close();
        visitor.pageview("/adduser", "", "adduser").send();
        var user = req.body.user;
        var pass = req.body.pass;
        var areainsert = req.body.areainsert;
        var fn = req.body.fn;
        var ln = req.body.ln;
        var phone = req.body.phone;
        var deflevel = req.body.deflevel;
        //

        con.query("SELECT areas.area_id, areas.area_name,users.* FROM users CROSS JOIN areas where areas.area_id = users.u_area_no AND users.username = N'" + user + "'", function (err, result, fields) {
          if (err) throw err;
          console.log(result[0]);
          // check if user exist
          if(result[0]){
            console.log(0);
            res.json(0);
                    }else{
            con.query("insert into users (username,pass,u_firstname,u_lastname,u_area_no,u_phone,u_level) values (N'" + user + "',N'" + pass + "',N'" + fn + "',N'" + ln + "',N'" + areainsert + "',N'" + phone + "',N'" + deflevel + "')", function (err, result, fields) {
              if (err) throw err;
              console.log(1);
              res.json(1);
            });
          }
          //  end check if user exist
        });

            // AND pass] = ' + password + ''

    });
    ////////////////////////////////////////
    api.post('/moveissue', function (req, res) {
        sql.close();
        visitor.pageview("/moveissue", "", "moveissue").send();
        var uid = req.body.uid;
        var area = req.body.area;
        var issue_id = req.body.issue_id;
        console.log(uid);
        console.log(area);
        console.log(issue_id);
        //
con.query("UPDATE issues SET u_id = N'" + uid + "',u_area_no = N'" + area + "' Where issue_id = " + issue_id + "", function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            res.json(result);
          });
    });
    //
    ///////////////////////////////////////
    ////////////////////////////////////////
    api.post('/findalluser11', function (req, res) {
      sql.close();
      visitor.pageview("/findalluser11", "", "findalluser11").send();
      //var user = req.body.user;
      //
con.query("SELECT areas.area_id, areas.area_name,users.* FROM users CROSS JOIN areas where areas.area_id = users.u_area_no", function (err, result, fields) {
          if (err) throw err;
          console.log(result);
          res.json(result);
        });

  });
  ////////////////////////////////////////
     ////////////////////////////////////////
     api.post('/finduser', function (req, res) {
        sql.close();
        visitor.pageview("/finduser", "", "finduser").send();
        var user = req.body.user;
        //
con.query("SELECT areas.area_id, areas.area_name,users.* FROM users CROSS JOIN areas where areas.area_id = users.u_area_no AND users.username = N'" + user + "'", function (err, result, fields) {
            if (err) throw err;
            console.log(result[0]);
            res.json(result[0]);
          });

    });
    ////////////////////////////////////////
    ////////////////////////////////////////
     api.post('/finduserbyphone', function (req, res) {
        sql.close();
        visitor.pageview("/finduserbyphone", "", "finduserbyphone").send();
        var user = req.body.user;
        //
        con.query("SELECT areas.area_id, areas.area_name,users.* FROM users CROSS JOIN areas where areas.area_id = users.u_area_no AND users.u_phone = N'" + user + "'", function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            res.json(result);
          });

    });
    ////////////////////////////////////////
    ////////////////////////////////////////
    api.post('/edituseradmin', function (req, res) {
        sql.close();
        visitor.pageview("/edituseradmin", "", "edituseradmin").send();
        var u_id = req.body.id;
        var fname = req.body.fn;
        var lname = req.body.ln;
        var u_level = req.body.deflevel;
        var phone = req.body.phone;
        var username = req.body.user;
        var u_area_no = req.body.areainsert;
        var pass = req.body.pass;

        console.log(req);
        
        con.query("UPDATE users SET u_firstname = N'" + fname + "',u_lastname = N'" + lname + "',pass = N'" + pass + "',u_level = '" + u_level + "',u_phone = N'" + phone + "',username = N'" + username + "',u_area_no = N'" + u_area_no + "' Where uid = " + u_id + "", function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            res.json(result);
          });


    });
    ////////////////////////////////////////
    api.get('/gettopics', function (req, res) {
        visitor.pageview("/gettopics", "", "gettopics").send();
        con.query("SELECT * FROM topics", function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            res.json(result);
          });
    });
    ////////////////////////////////////////
    ////////////////////////////////////////
    api.post('/addtopic', function (req, res) {
        sql.close();
        visitor.pageview("/addtopic", "", "addtopic").send();
        var topic = req.body.topic;
        //
       
        con.query("insert into topics (topic) values (N'" + topic + "')", function (err, result, fields) {
            if (err) throw err;
            console.log(result[0]);
            res.json(result[0]);
          });
          
    });
    //
    ///////////////////////////////////////
     ////////////////////////////////////////

     //deltopic
     api.post('/deltopic', function (req, res) {
        sql.close();
        visitor.pageview("/deltopic", "", "deltopic").send();
        var topic_id = req.body.topic_id;
        con.query("DELETE FROM topics WHERE topic_id = " + topic_id + "", function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            res.json(result);
          });

    }); //end

    ////////////////////////////////////////

    api.post('/bulkmoveuserissuesbyid', function (req, res) {
      var uid = req.body.uid;
      var area = req.body.area;
      var tempid = req.body.tempid;
console.log(uid);
console.log(area);
console.log(tempid);

      con.query("select * FROM issues WHERE u_id = " + tempid + "", function (err, result, fields) {
          if (err) throw err;
          //
          if(result[0].X == 0){
            //
            con.query("DELETE FROM users WHERE uid = " + tempid + "", function (err, result0, fields) {
              if (err) throw err;
              res.json(1);
            });
            //
          }else{
            console.log(result);
              con.query("UPDATE issues SET u_id = N'" + uid + "', u_area_no = N'" + area + "' WHERE u_id = "+ tempid + "", function (err, result0, fields) {
                if (err) throw err;
                
                con.query("DELETE FROM users WHERE uid = " + tempid + "", function (err, result0, fields) {
                  if (err) throw err;
                  res.json(1);
                });
                
              });
          }
          //
        });
  }); //end   

    api.post('/deluserbuid', function (req, res) {
      var uid = req.body.uid;
      console.log(uid);

      con.query("select Count(*) AS X FROM issues WHERE u_id = " + uid + "", function (err, result, fields) {
          if (err) throw err;
          console.log(result[0].X);
          //
          if(result[0].X == 0){
            //
            con.query("DELETE FROM users WHERE uid = " + uid + "", function (err, result, fields) {
              if (err) throw err;
              console.log(result);
              res.json(1);
            });
            //
          }else{
            res.json(0);
          }
          //
        });


      
  }); //end   

    // }   // end need auth //
    /////////////////////////////////////
    /*  function runNeedNoAuth(){
  //////////////////////////////////////////
        console.log("ana gowa need no auth");
  //////////////////////////////////////
  	//sign up //
  		api.post('/user', function(req, res) {
  			if(req.body.mail == ""||	req.body.pw == ""){
  				res.status(403).send({ message: "Please ENTER Your Mail And Password"});
  			}else{
  			var fn = req.body.firstname;
  			var ln = req.body.lastname;

  			var mailbase = req.body.mail;
  			var mailbase2 = new Buffer(mailbase, 'base64')
  			var mail = mailbase2.toString();

  			var pass1 = req.body.pw;
  			var pass2 = new Buffer(pass1, 'base64')
  			var password = pass2.toString();

  			//check for user availble or not //
  			User.findOne({mail: mail}).select('firstname lastname password').exec(function(err, user) {
  				if(err) throw err;
  								//if user not in database ( new user ) //
  							if(!user) {
  										var user = new User({
  											firstname: fn,
  											lastname: ln,
  											mail: mail,
  											password: password
  										});
  										var token = createToken(user);
  										user.save(function(err) {
  											if(err) {
  												res.send(err);
  												return;
  											}
  															res.json({
  																message: 'User has been created!',
  																token: token
  															});
  														});
  								}else{ //if user in our database
  									res.status(403).send({ message: "Sorry User Not Available !"});
  								}
  					}); // end check if user availble
  				} //end check signup  data is not null
  					}); //end signup function
  //////////////////////////////////////////
  	// get user video
  	api.get('/video', function(req, res) {
  		var vid = req.headers['vid'];

  		Video.findOne({_id: vid}, function(err, video) {
  			if(err) {
  			res.status(403).end(err);
  			return;
  		  }
  			res.json(video);
  		});
  	});
  //////////////////////////////////////////////////////
          //login
      api.get('/user', function(req, res) {
  					console.log("ana gowa el login");

          var auth1 = req.headers['auth'];
          var auth2 = new Buffer(auth1, 'base64');
          var auth = auth2.toString();
          var mail =  auth.split(":")[0];
          var password = auth.split(":")[1];
          User.findOne({
              mail: mail
          }).select('firstname lastname password').exec(function(err, user) {
              if(err)
                  throw err;
              if(!user) {
                  res.status(403).send({ message: "Wrong Email Or Password"});
              } else if(user){
                  var validPassword = user.comparePassword(password);
                  if(!validPassword) {
                      // res.status(400);
                      res.status(403).send({ message: "Invalid Password"});
                  } else {
                      ///// token
                      var token = createToken(user);
                      res.json({
                          message: "Successfuly login!",
                          token: token
                      });
                  }
              }
          }); // end login
      }); //end main login function
  ////////////////////////////////////////
  //forget password
  api.post('/fp', function(req, res) {
    var mail = req.body.mail;
    User.findOne({
        mail: mail
      }).select('firstname lastname password').exec(function(err, user) {
          if(err)
              throw err;
              if(!user) {
                  res.status(403).send({ message: "Sorry This E-mail Not Register With Us !"});
                } else {
                  var firstname = user.firstname;
                  var host = req.headers.host;					//host path //
                  var h1 = randomstring.generate();
                  var h2 = randomstring.generate();
                  var h3 = randomstring.generate();
                  var h4 = randomstring.generate();

                  var message = 'Hey ,  ' + firstname + ' \
                    Please Click On This Link To Reset Your Password :  ' + 'http://mediool.com/sys/fp.html?' + h1 + '=' + h2 + '&foo=' + mail + '&' + h3 + '=' + h4 + '  \
                    ---- \
                     Mediool Team ,\
                      regards';
                  sendmail({
                      from: 'no-reply@mediool.com',
                      to: mail,
                      subject: 'Your Password At Mediool !',
                      html: message,
                    }, function(err, reply) {
                      console.log(err && err.stack);
                      console.dir(reply);
                      res.end("password has been sent !");
                    });

                  } // end last else
                });

            });
  ///////////////////////////////////////////
    api.post('/fpl', function(req, res) {
      var mail = req.body.mail;
      var password2 = req.body.password;

      User.findOne({mail: mail}).select('firstname lastname password').exec(function(err, user) {
        if(err) throw err;
        if(!user) {
            res.status(403).send({ message: "Sorry This URL Not Valid , Please Try To Forget Password Again !"});
          } else {
                  user.password = password2;
                  user.save(function(err) {
                    if(err) {
                      res.send(err);
                      return;
                    }
                    res.redirect('http://mediool.com/sys/fpd.html');

                });

              } //end else //

    }); //end find //
  }); //end fpl//


  ///////////////////////////////////////////

  api.post('/subs', function(req, res) {
    var mail = req.body.mail;

    Subscribe.findOne({mail: mail}).select('mail').exec(function(err, user) {
      if(err) throw err;
      if(!user) {
        var subscribe = new Subscribe({
          mail: mail
        });
        Subscribe.create({mail: mail} , function(err , subscribe) {
          if(err) {
            res.send(err);
            return;
          }

          var message = 'Hey , thank you for subscribe mediool.com  '  + ' \
            You will get our NewsLetter Now . '  + '  \
            ---- \
             Mediool Team ,\
              regards';
          sendmail({
              from: 'no-reply@mediool.com',
              to: mail,
              subject: 'Your Subscribe At Mediool !',
              html: message,
            }, function(err, reply) {
              console.log(err && err.stack);
              console.dir(reply);
            });
            
          res.redirect('https://mediool.com/?foo=1');
      });

        } else {
          res.redirect('https://mediool.com/?foo=2');
        }

    }); //end find //


  }); //end sub //

 /////////////////////////////////////
 api.get('/subs', function(req, res) {
   console.log("ana gowa el Subscribe get");
   Subscribe.find(function(err, Subscribes) {
      if(err) {
        res.send(err);
        return;
      }


    res.json(Subscribes);
    });

 }); //end sub get //

 /////////////////////////////////////

 /////////////////////////////////////

}  // end no need auth //

//////////////////////////////////////////
	// // get object for frontend //
	// api.get('/me', function(req, res) {
	// 	res.send(req.decoded);
	// });
	// end object for frontend
	///////////////////////////////////
    */
    return api;
};