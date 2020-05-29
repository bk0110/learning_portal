const express=require('express');
var session = require('express-session');
var path = require('path');
var bodyParser = require('body-parser');
const user=require('./routes/user');
const join_course=require('./routes/join_course');
const add_course=require('./routes/add_course');
const app=express();
const mongoose=require('mongoose');
var db=mongoose.connection; 
mongoose.connect('mongodb://localhost/airline')
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to MongoDB...'));

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());


app.get('/', function(request, response) { //first page which opens
	response.sendFile(path.join(__dirname + '/views/sign_up.html'));
});
app.get('/sign',function(request,response){ //sign in page
	response.sendFile(path.join(__dirname + '/views/sign_in.html'));
});
app.get('/sign_up_student',function(request,response){ 
	response.sendFile(path.join(__dirname + '/views/sign_up_success.html'));
});


app.get('/sign_up_teacher',function(request,response){ //sign up success for teacher
	response.sendFile(path.join(__dirname + '/sign_up_success_teacher.html'));
});
app.use(express.json());
app.use('/createuser',user);
app.use('/join_course',join_course);
app.use('/add_course',add_course);
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));