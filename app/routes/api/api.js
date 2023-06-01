var User = require('../models/user');
var Video = require('../models/video');
var Survey = require('../models/survey');
var File = require('../models/file');
var config = require('../../config');
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var fs = require('fs');
var path = require('path');
var formidable = require('formidable');
var randomstring = require('randomstring');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var secretKey = config.secretKey;
var jsonwebtoken = require('jsonwebtoken');

function createToken(user) {
    var token = jsonwebtoken.sign({
        id: user._id
        , firstname: user.firstname
        , lastname: user.lastname
        , mail: user.mail
    }, secretKey, {
        expiresIn: '43200m'
    });
    return token;
}
module.exports = function (app, express, io) {
    //start services
    var api = express.Router();
    // app.use(function (req, res, next) {
    //
    //     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, auth');
    //
    //       res.header("Access-Control-Allow-Origin", "*");
    //
    //
    //     // // Pass to next layer of middleware
    //     next();
    // 		// runcode();
    //
    // });
    //sign up //
    api.post('/user', function (req, res) {
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, auth');
        res.header("Access-Control-Allow-Origin", "*");
        if (req.body.mail == "" || req.body.pw == "") {
            res.status(403).send({
                message: "Please ENTER Your Mail And Password"
            });
        }
        else {
            var fn = req.body.firstname;
            var ln = req.body.lastname;
            var mailbase = req.body.mail;
            var mailbase2 = new Buffer(mailbase, 'base64')
            var mail = mailbase2.toString();
            var pass1 = req.body.pw;
            var pass2 = new Buffer(pass1, 'base64')
            var password = pass2.toString();
            //check for user availble or not //
            User.findOne({
                mail: mail
            }).select('firstname lastname password').exec(function (err, user) {
                if (err) throw err;
                //if user not in database ( new user ) //
                if (!user) {
                    var user = new User({
                        firstname: fn
                        , lastname: ln
                        , mail: mail
                        , password: password
                    });
                    var token = createToken(user);
                    user.create()(function (err) {
                        if (err) {
                            res.send(err);
                            return;
                        }
                        res.json({
                            message: 'User has been created!'
                            , token: token
                        });
                    });
                }
                else { //if user in our database
                    res.status(403).send({
                        message: "Sorry User Not Available !"
                    });
                }
            }); // end check if user availble
        } //end check signup  data is not null
    }); //end signup function
    //////////////
    // login
    api.get('/user', function (req, res) {
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, auth');
        res.header("Access-Control-Allow-Origin", "*");
        // 	var mailbase = req.body.mail || req.param('mail') || req.headers['mail'];
        // 	var mailbase2 = new Buffer(mailbase, 'base64')
        // 	var mail = mailbase2.toString();
        //
        // 	var pass1 = req.body.pw || req.param('pw') || req.headers['pw'];
        // 	var pass2 = new Buffer(pass1, 'base64')
        // var password = pass2.toString();
        var auth1 = req.headers['auth'];
        var auth2 = new Buffer(auth1, 'base64');
        var auth = auth2.toString();
        var mail = auth.split(":")[0]
        var password = auth.split(":")[1]
        User.findOne({
            mail: mail
        }).select('password').exec(function (err, user) {
            if (err) throw err;
            if (!user) {
                res.send({
                    message: "Wrong Email Or Password"
                });
            }
            else if (user) {
                var validPassword = user.comparePassword(password);
                if (!validPassword) {
                    // res.status(400);
                    res.send({
                        message: "Invalid Password"
                    });
                }
                else {
                    ///// token
                    var token = createToken(user);
                    res.json({
                        message: "Successfuly login!"
                        , token: token
                    });
                }
            }
        }); // end login
    }); //end main login function
    /////////////////////////////////////////
    // login for frontend
    //
    // try{     						// try for login for frontend
    //   api.post('/login', function(req, res) {
    // 		var mail = req.body.mail;
    // 		var password = req.body.password;
    //     User.findOne({
    //       mail: mail
    //     }).select('firstname lastname password').exec(function(err, user) {
    //       if(!user) {
    //         res.send({ message: "User doenst exist"});
    //       } else if(user){
    //         var validPassword = user.comparePassword(password);
    //         if(!validPassword) {
    //           res.send({ message: "Invalid Password"});
    //         } else {
    //           ///// token
    //           var token = createToken(user);
    //           res.json({
    //             success: true,
    //             message: "Successfuly login!",
    //             token: token
    //           });
    //         }
    //       }
    //     });
    //   });
    //
    //
    // } // end try for login
    // catch(le){
    // 	console.log("unknown error with login" + le);
    // }
    ////////////////////////////////
    ////////////////////////////////
    // get object for frontend //
    api.get('/me', function (req, res) {
        res.send(req.decoded);
    });
    // end object for frontend
    ///////////////////////////////////
    // get user video
    api.get('/video', function (req, res) {
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, auth');
        res.header("Access-Control-Allow-Origin", "*");
        var vid = req.headers['vid'];
        Video.findOne({
            _id: vid
        }, function (err, video) {
            if (err) {
                res.status(403).end(err);
                return;
            }
            res.json(video);
        });
    });
    api.get('/getallfiles', function (req, res) {
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, auth');
        res.header("Access-Control-Allow-Origin", "*");
        File.find({}, function (err, files) {
            if (err) {
                res.send(err);
                return;
            }
            res.json(files);
        });
    });
    ////////////////////////////////////////////
    // after login //
    // check token is valid //
    api.use(function (req, res, next) {
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, auth');
        res.header("Access-Control-Allow-Origin", "*");
        console.log("Somebody just came to our app!");
        var token = req.headers['token'];
        // check if token exist
        if (token) {
            jsonwebtoken.verify(token, secretKey, function (err, decoded) {
                if (err) {
                    res.status(400).send({
                        success: false
                        , message: "Failed to authenticate user"
                    });
                    return
                }
                else {
                    //
                    req.decoded = decoded;
                    next();
                }
            });
        }
        else {
            res.status(400).send({
                success: false
                , message: "No Token Provided"
            });
        }
    });
    ///////////////////////////////////////
    //////////////////////////////////
    // add survey
    api.post('/survey', function (req, res) {
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, auth');
            res.header("Access-Control-Allow-Origin", "*");
            var survey = new Survey({
                formId: req.body.formId
                , questionId: req.body.questionId
                , answer: req.body.answer
                , video: req.body.video
                , user: req.decoded.id
            });
            survey.save(function (err, newSurvey) {
                if (err) {
                    res.send(err);
                    return
                }
                // io.emit('survey', newsurvey)
                res.json({
                    message: "New survey created!"
                });
            });
        })
        ////////////////////////////////////////
        // get survey
    api.get('/survey', function (req, res) {
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, auth');
        res.header("Access-Control-Allow-Origin", "*");
        Survey.find({
            user: req.decoded.id
        }, function (err, surveys) {
            if (err) {
                res.send(err);
                return;
            }
            res.json(surveys);
        });
    });
    ////////////////////////////////////////
    // upload file
    api.post('/up', function (req, res) {
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, auth');
            res.header("Access-Control-Allow-Origin", "*");
            var host = req.headers.host; //host path //
            var userid = req.decoded.id;
            var f;
            var fpath;
            var oldfilename;
            // create an incoming form object
            var form = new formidable.IncomingForm();
            // specify that we want to allow the user to upload multiple files in a single request
            form.multiples = true;
            // store all uploads in the /uploads directory
            form.uploadDir = path.join(__dirname, '/uploads');
            // every time a file has been uploaded successfully,
            // rename it to it's orignal name
            form.on('file', function (err, file) {
                var rstr = randomstring.generate();
                var rstr1 = randomstring.generate();
                var nrand = rstr + rstr1;
                // fs.rename(file.path, path.join(form.uploadDir, file.name));
                // f = "uploads/" + file.name;
                fs.rename(file.path, path.join(form.uploadDir, file.name));
                oldfilename = file.name;
                // get file extention //
                var fileext = path.extname(path.join(form.uploadDir, file.name));
                //
                // create new unique file name ( include randoms and extention) //
                var filename = nrand + fileext;
                fpath = "uploads/" + filename;
                //	rename file to new filename //
                /*-----------------------------------------*/
                console.log("oldfilename" + oldfilename)
                console.log("path =  " + fpath)
                f = "http://" + host + "/" + fpath;
                console.log("url =  " + f);
                fs.rename(path.join(form.uploadDir, file.name), path.join(form.uploadDir, filename));
                // save file in our database //
                var file = new File({
                    url: f
                    , creator: userid
                    , oldfn: oldfilename
                });
                file.save(function (err, newFile) {
                    if (err) {
                        res.send(err);
                        return
                    }
                    // io.emit('file', newFile)
                    res.json(f);
                });
                ///////////////
                /*-----------------------------------------*/
            });
            // log any errors that occur
            form.on('error', function (err) {
                console.log('An error has occured: \n' + err);
                res.send("An Error Has Occured" + err);
                return
            });
            // parse the incoming request containing the form data
            form.parse(req);
        })
        ////////////////////////////////////////////////////////
        ////////////////////////
        //add video //
    api.post('/video', function (req, res) {
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, auth');
            res.header("Access-Control-Allow-Origin", "*");
            var video = new Video({
                title: req.body.title
                , url: req.body.url
                , videoevent: req.body.videoevent
                , creator: req.decoded.id
            });
            Video.create(function (err, newvideo) {
                if (err) {
                    res.send(err);
                    return
                }
                // io.emit('video', newvideo)
                res.json({
                    message: "New video saved!"
                });
            });
        })
        ////////////////////////
        // get user videos
    api.get('/videos', function (req, res) {
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, auth');
        res.header("Access-Control-Allow-Origin", "*");
        Video.find({
            creator: req.decoded.id
        }, {
            "title": true
        }, function (err, videos) {
            if (err) {
                res.status(403).end(err);
                return;
            }
            res.json(videos)
        });
    });
    /////////////////////////////
    //
    //
    // api.post('/signup', function(req, res) {
    //
    //   var user = new User({
    //     firstname: req.body.firstname,
    //     lastname: req.body.lastname,
    //     mail: req.body.mail,
    //     password: req.body.password
    //   });
    //
    //   var token = createToken(user);
    //
    //   user.save(function(err) {
    //     if(err) {
    //       res.send(err);
    //       return;
    //     }
    //
    //     res.json({
    //       success: true,
    //       message: 'User has been created!',
    //       token: token
    //     });
    //   });
    // });
    //
    //
    //
    api.get('/users', function (req, res) {
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, auth');
        res.header("Access-Control-Allow-Origin", "*");
        User.find({}, function (err, users) {
            if (err) {
                res.send(err);
                return;
            }
            res.json(users);
        });
    });
    api.get('/getallvideos', function (req, res) {
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, auth');
        res.header("Access-Control-Allow-Origin", "*");
        Video.find({}, function (err, videos) {
            if (err) {
                res.send(err);
                return;
            }
            res.json(videos);
        });
    });
    api.get('/getallsurveys', function (req, res) {
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, auth');
        res.header("Access-Control-Allow-Origin", "*");
        Survey.find({}, function (err, surveys) {
            if (err) {
                res.send(err);
                return;
            }
            res.json(surveys);
        });
    });
    //
    //app.use(function (req, res, next) {
    // Website you wish to allow to connect
    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888');
    // Request methods you wish to allow
    // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    // res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    //  next();
    //});
    //
    //
    // 	api.post('/getvideo', function(req, res) {
    // 		Video.findOne({_id: req.body.id}, function(err, video) {
    // 			if(err) {
    // 				res.send(err);
    // 				return;
    // 			}
    // 		res.json({
    // 			success: true,
    // 			message: "Successfuly get video!",
    // 			video
    // 		})
    // 	})
    // })
    return api;
}