const app = require('express')();
const User = require('../models/user');
var bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.post('/', async (req, res, next) => {
try {
    const {username, email, password, role } = req.body;
    const user = new User({ username,email, password, role });
    await user.save();
    const token = jwt.sign({ _id: user._id, role: user.role }, "secretkey");
    res.header('x-auth-header', token).send(user,username,email,password);
    //res.redirect('sign_up_success');
}
catch (ex) {
    res.status(401).send("Error");
}})

module.exports = app;