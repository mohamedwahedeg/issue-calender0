var config = require('../../config');
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
var visitor = ua('UA-66661717-2');
var sql = require('mssql');
module.exports = function (app, express, io) {
    //start services
    var api = express.Router();
    api.use(function (req, res, next) {
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, auth, token');
        res.header("Access-Control-Allow-Origin", "*");
        console.log("Somebody just came to our app!");
        next();
    });
    //    function runNeedAuth(){
    ////////////////////////////////
    //  				console.log("ana gowa need auth");
    //
    //
    //  	// upload file
    //  	api.post('/up', function(req, res) {
    //  		console.log("ana gowa upload");
    //  		var host = req.headers.host;					//host path //
    //  		var userid = req.decoded.id;
    //  		var f;
    //  		var fpath;
    //  		var oldfilename;
    //  		  // create an incoming form object
    //  		  var form = new formidable.IncomingForm();
    //  		  // specify that we want to allow the user to upload multiple files in a single request
    //  		  form.multiples = true;
    //  		  // store all uploads in the /uploads directory
    //  		  form.uploadDir = path.join(__dirname, '/uploads');
    //  		  // every time a file has been uploaded successfully,
    //  			console.log("ana rf3t el file");
    //  		  // rename it to it's orignal name
    //  		  form.on('file', function(err, file) {
    //  				console.log(err.toString());
    //
    //  				var rstr = randomstring.generate();
    //  				var rstr1 = randomstring.generate();
    //  				var nrand = rstr + rstr1;
    //  		    // fs.rename(file.path, path.join(form.uploadDir, file.name));
    //  				// f = "uploads/" + file.name;
    //  				fs.rename(file.path, path.join(form.uploadDir, file.name));
    //  				oldfilename = file.name;
    //  				// get file extention //
    //  				var fileext = path.extname(path.join(form.uploadDir, file.name));
    //  				//
    //  				// create new unique file name ( include randoms and extention) //
    //  				var filename = nrand + fileext;
    //  				fpath = "uploads/" + filename;
    //  	          //	rename file to new filename //
    //
    //  	          /*-----------------------------------------*/
    //  							console.log("oldfilename" + oldfilename)
    //  	            console.log("path =  " + fpath)
    //  	            f = "http://" + host + "/" + fpath;
    //  	            console.log("url =  " + f);
    //
    //  							fs.rename(path.join(form.uploadDir, file.name), path.join(form.uploadDir, filename));
    //
    //  							cloudinary.uploader.upload(path.join(form.uploadDir, filename), function(result) {
    //  								var public_id = result['public_id'];
    //  								var url = result['url']
    //  								var url = "http://res.cloudinary.com/dfnykkhfl/video/upload/";
    //  								var url = url + public_id +".webm";
    //
    //  								console.log("public_id : " + public_id);
    //  								console.log("url : " + url);
    //  							  // console.log(result);
    //
    //  								// save file in our database //
    //  									 var file = new File({
    //  										 url: url,
    //  										 creator: userid,
    //  										 oldfn: oldfilename
    //  									 });
    //  									 file.save(function(err, file) {
    //  										 if(err) {
    //  											 res.send(err);
    //  											 return
    //  										 }
    //  										 // io.emit('file', newFile)
    //  										 res.json({url: url,
    //  															 filename: oldfilename
    //  														 });
    //  									 });
    //
    //  									 /////////////
    //
    //
    //  							},        { resource_type: "video" });
    //
    //
    //
    //
    //  	          /*-----------------------------------------*/
    //  			});
    //  		  // // log any errors that occur
    //  		  // form.on('error', function(err) {
    //  		  //   console.log('An error has occured: \n' + err);
    //  			// 	res.send("An Error Has Occured" + err);
    //  			// 	return
    //  		  // });
    //  		  // parse the incoming request containing the form data
    //  		  form.parse(req);
    //  	})
    //  	///////////////////////////////////////
    //  // add survey
    //  	api.post('/survey', function(req, res) {
    //  		var survey = new Survey({
    //  			formId: req.body.formId,
    //  			questionId: req.body.questionId,
    //  			answer: req.body.answer,
    //  			video: req.body.video,
    //  			user: req.decoded.id
    //  		});
    //  		survey.save(function(err, newSurvey) {
    //  			if(err) {
    //  				res.send(err);
    //  				return
    //  			}
    //  			// io.emit('survey', newsurvey)
    //  			res.json({message: "New survey created!"});
    //  		});
    //  	})
    //  ///////////////////////////////////////////////////
    //  	// get survey
    //  	api.get('/survey', function(req, res) {
    //  	 Survey.find({user: req.decoded.id}, function(err, surveys) {
    //  			if(err) {
    //  				res.send(err);
    //  				return;
    //  			}
    //  			res.json(surveys);
    //  		});
    //  	});
    //  	////////////////////////////////////////
    //  	// get videos uploaded
    //  	api.get('/up', function(req, res) {
    //      var id = req.decoded.id;
    //      console.log("ana gowa upload Get");
    //  	 File.find({creator: id}, function(err, files) {
    //  			if(err) {
    //  				res.status(400).end(err);
    //  				console.log("error fe upload Get" + err);
    //  				return;
    //  			}
    //  			res.json(files);
    //  		});
    //  	});
    //  	////////////////////////////////////////
    //  			//add video //
    //  			api.post('/video', function(req, res) {
    //
    //  				var video = new Video({
    //  					title: req.body.title,
    //  					url: req.body.url,
    //  					videoevent: req.body.videoevent,
    //  					creator: req.decoded.id
    //  				});
    //
    //  				Video.save(function(err, newvideo) {
    //  					if(err) {
    //  						res.send(err);
    //  						return
    //  					}
    //  					// io.emit('video', newvideo)
    //  					res.json({message: "New video saved!"});
    //  				});
    //  			})
    //  	//////////////////////////////////////////
    //  	// get user videos
    //  	api.get('/videos', function(req, res) {
    //  		Video.find({creator: req.decoded.id}, {"title": true}, function(err, videos) {
    //  			if(err) {
    //  			res.status(403).end(err);
    //  			return;
    //  		}
    //  					res.json(videos)
    //  				});
    //  	});
    ////////////////////////////////////////////////////////
    //
    ///////////////////////////////////////
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
        visitor.pageview("/login", "", "login").send();
        var username = req.body.mail;
        var pass = req.body.pass;
        var s = "moahmed"
        var config = {
            user: 'sa'
            , password: 'sa'
            , server: 'localhost'
            , database: 'azissue'
        };
        // connect to your database
        sql.connect(config, function (err) {
            if (err) console.log(err);
            // create Request object
            var request = new sql.Request();
            // AND [dbo].[users].[pass] = ' + password + ''
            // query to the database and get the records
            request.query("SELECT * FROM [dbo].[users] where [dbo].[users].[username] = '" + username + "' AND [dbo].[users].[pass] = '" + pass + "'", function (err, recordset) {
                if (err) console.log(err)
                    // send records as a response
                res.json(recordset);
                sql.close();
            });
        });
    }); //end main login function
    ////////////////////////////////////////
    ////////////////////////////////////////
    api.post('/addissue', function (req, res) {
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
        //
        var config = {
            user: 'sa'
            , password: 'sa'
            , server: 'localhost'
            , database: 'azissue'
        };
        // connect to your database
        sql.connect(config, function (err) {
            if (err) console.log(err);
            // create Request object
            var request = new sql.Request();
            // AND [dbo].[users].[pass] = ' + password + ''
            // query to the database and get the records 
            request.query("insert into [dbo].[issues] ([dbo].[issues].[u_id],[dbo].[issues].[u_area_no],[dbo].[issues].[court],[dbo].[issues].[circle],[dbo].[issues].[claim_no],[dbo].[issues].[Discount_Name],[dbo].[issues].[Discount_Position],[dbo].[issues].[subject],[dbo].[issues].[last_session],[dbo].[issues].[next_session],[dbo].[issues].[last_session_reason],[dbo].[issues].[issue_decision_t],[dbo].[issues].[issue_Notes]) values ('" + u_id + "','" + u_area_no + "',N'" + court + "',N'" + circle + "','" + claim_no + "',N'" + Discount_Name + "',N'" + Discount_Position + "',N'" + subject + "','" + lastdate + "',N'" + nextdate + "',N'" + last_session_reason + "',N'" + issue_decision_t + "',N'" + issue_Notes + "')", function (err, recordset) {
                if (err) console.log(err)
                    // send records as a response
                res.json("Added !");
                sql.close();
            });
        });
    });
    //
    ///////////////////////////////////////
    ////////////////////////////////////////
    //calender1
    //        visitor.pageview("/", "http://peaksandpies.com", "Welcome1").send();
    api.post('/calender3', function (req, res) {
        visitor.pageview("/calender3", "", "calender3").send();
        var u_id = req.body.u_id;
        var date = req.body.date;
        var config = {
            user: 'sa'
            , password: 'sa'
            , server: 'localhost'
            , database: 'azissue'
        };
        // connect to your database
        sql.connect(config, function (err) {
            if (err) console.log(err);
            // create Request object
            var request = new sql.Request();
            // AND [dbo].[users].[pass] = ' + password + ''
            // query to the database and get the records
            request.query("SELECT * FROM [dbo].[issues] where [dbo].[issues].[u_id] = '" + u_id + "' AND [dbo].[issues].[next_session] = '" + date + "'", function (err, recordset) {
                if (err) console.log(err)
                    // send records as a response
                res.json(recordset);
                sql.close();
            });
        });
    }); //end   
    ////////////////////////////////////////
    ///////////////////////////////////////
    ////////////////////////////////////////
    //calender 
    //        visitor.pageview("/", "http://peaksandpies.com", "Welcome1").send();
    api.post('/calender1', function (req, res) {
        visitor.pageview("/calender1", "", "calender1").send();
        var u_id = req.body.u_id;
        var date = req.body.date;
        var config = {
            user: 'sa'
            , password: 'sa'
            , server: 'localhost'
            , database: 'azissue'
        };
        // connect to your database
        sql.connect(config, function (err) {
            if (err) console.log(err);
            // create Request object
            var request = new sql.Request();
            // AND [dbo].[users].[pass] = ' + password + ''
            // query to the database and get the records
            request.query("SELECT * FROM [dbo].[issues] where [dbo].[issues].[next_session] = '" + date + "'", function (err, recordset) {
                if (err) console.log(err)
                    // send records as a response
                res.json(recordset);
                sql.close();
            });
        });
    }); //end   
    ////////////////////////////////////////
    ////////////////////////////////////////
    //calender 
    //        visitor.pageview("/", "http://peaksandpies.com", "Welcome1").send();
    api.post('/calender1m', function (req, res) {
        sql.close();
        var d = new Date().toISOString().split('T')[0];
        visitor.pageview("/calender1", "", "calender1").send();
        var u_id = req.body.u_id;
        var date = req.body.date;
        var config = {
            user: 'sa'
            , password: 'sa'
            , server: 'localhost'
            , database: 'azissue'
        };
        // connect to your database
        sql.connect(config, function (err) {
            if (err) console.log(err);
            // create Request object
            var request = new sql.Request();
            // AND [dbo].[users].[pass] = ' + password + ''
            // query to the database and get the records
            request.query("SELECT * FROM [dbo].[issues] where [dbo].[issues].[next_session] = '" + d + "'", function (err, recordset) {
                if (err) console.log(err)
                    // send records as a response
                res.json(recordset);
                sql.close();
            });
        });
    }); //end   
    ////////////////////////////////////////
    ////////////////////////////////////////
    //calender1
    //        visitor.pageview("/", "http://peaksandpies.com", "Welcome1").send();
    api.post('/calender3m', function (req, res) {
        sql.close();
        visitor.pageview("/calender3", "", "calender3").send();
        var u_id = req.body.u_id;
        var d = new Date().toISOString().split('T')[0];
        var config = {
            user: 'sa'
            , password: 'sa'
            , server: 'localhost'
            , database: 'azissue'
        };
        // connect to your database
        sql.connect(config, function (err) {
            if (err) console.log(err);
            // create Request object
            var request = new sql.Request();
            // AND [dbo].[users].[pass] = ' + password + ''
            // query to the database and get the records
            request.query("SELECT * FROM [dbo].[issues] where [dbo].[issues].[u_id] = '" + u_id + "' AND [dbo].[issues].[next_session] = '" + d + "'", function (err, recordset) {
                if (err) console.log(err)
                    // send records as a response
                res.json(recordset);
                sql.close();
            });
        });
    }); //end   
    ////////////////////////////////////////
    ////////////////////////////////////////
    api.post('/editissue', function (req, res) {
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
        //
        var config = {
            user: 'sa'
            , password: 'sa'
            , server: 'localhost'
            , database: 'azissue'
        };
        // connect to your database
        sql.connect(config, function (err) {
            if (err) console.log(err);
            // create Request object
            var request = new sql.Request();
            // AND [dbo].[users].[pass] = ' + password + ''
            // query to the database and get the records 
            request.query("UPDATE [dbo].[issues] SET [dbo].[issues].[court] = N'" + court + "',[dbo].[issues].[circle] = N'" + circle + "',[dbo].[issues].[claim_no] = '" + claim_no + "',[dbo].[issues].[Discount_Name] = N'" + Discount_Name + "',[dbo].[issues].[Discount_Position] = N'" + Discount_Position + "',[dbo].[issues].[subject] = N'" + subject + "',[dbo].[issues].[last_session] = N'" + lastdate + "',[dbo].[issues].[next_session] = N'" + nextdate + "',[dbo].[issues].[last_session_reason] = N'" + last_session_reason + "',[dbo].[issues].[issue_decision_t] = N'" + issue_decision_t + "',[dbo].[issues].[issue_Notes] = N'" + issue_Notes + "' Where [dbo].[issues].[issue_id] = " + issue_id + "", function (err, recordset) {
                if (err) console.log(err)
                    // send records as a response
                res.json("Added !");
                sql.close();
            });
        });
    });
    //
    ///////////////////////////////////////
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