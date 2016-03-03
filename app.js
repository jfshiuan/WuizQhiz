
/**
 * Module dependencies.
 */

 var express = require('express');
 var http = require('http');
 var path = require('path');
 var handlebars = require('express3-handlebars');


 var index = require('./routes/index');
 var login = require('./routes/login');
 var logout = require('./routes/logout');
 var signup = require('./routes/signup');
 var help = require('./routes/help');
 var home = require('./routes/home');
 var play = require('./routes/play');
 var myStats = require('./routes/myStats');
 var createQuiz = require('./routes/createQuiz');
 var classStats = require('./routes/classStats');
 var studentStats = require('./routes/studentStats');
 var student = require('./routes/student');
 var instructor = require('./routes/instructor');
 var selectCourse = require('./routes/selectCourse');
 var getData = require('./routes/getData');
 var addQuestions = require('./routes/addQuestions');
 var updateData = require('./routes/updateData');
 var checkAnswer=require('./routes/checkAnswer');
 var addCourse = require('./routes/addCourse');
 var addTheCourse = require('./routes/addTheCourse');

//var palette = require('./routes/palette');
// Example route
// var user = require('./routes/user');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('Intro HCI secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}



// Add routes here
app.get('/', index.view);
app.get('/login', login.login);
app.get('/logout', logout.logout);
app.get('/signup', signup.signup);
app.get('/help', help.help);
app.get('/play', play.play);
app.get('/submitAnswer', play.submitAnswer);
app.get('/myStats', myStats.myStats);
app.get('/createQuiz', createQuiz.createQuiz);
app.get('/classStats', classStats.classStats);
app.get('/studentStats', studentStats.studentStats);
app.get('/student', student.view);
app.get('/instructor', instructor.view);
app.get('/home', home.home);
app.get('/getLoginData', login.getLoginData);
app.post('/selectCourse', selectCourse.selectCourse);
app.get('/getSelectedCourse', getData.getSelectedCourse);
app.get('/addQuestions', addQuestions.addQuestions);
app.post('/selectAction', selectCourse.selectAction);
app.post('/changeProfilePicture', updateData.changeProfilePicture);
app.post('/checkAnswer', checkAnswer.checkAnswer);
app.post('/getCorrectAnswer', getData.getCorrectAnswer);
app.get('/addCourse', addCourse.view);
app.post('/addTheCourse', addTheCourse.addTheCourse);
//app.get('/project/:id', project.projectInfo);
//app.get('/palette', palette.randomPalette)
// Example route
// app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});
