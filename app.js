var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var firebase = require('firebase');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');


var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(cors());


var adminObj = {};


/*=====================================================================================*/
/*admin  page coding here include mongoose and firebaseToken..*/

mongoose.connect('mongodb://addmin:addmin@ds059185.mongolab.com:59185/salesmanapp');
var adminSchema = mongoose.Schema({
    adminName: String, adminEmail: String, adminPass: String, adminAge: Number,
    fireBaseToken: String
});//({adminName: {type : String,required: true}})
var signAdmin = mongoose.model('newAdmin', adminSchema);
/*=====================================================================================*/


/*======================================================================================*/
/*ADMIN SIGNUP PAGE CODING*/

app.post("/ADMSIGN", function (req, res) {
    var ref = new Firebase("https://salsmanapp.firebaseio.com");
    ref.createUser({
        email: req.body.adminEmail,
        password: req.body.adminPass
    }, function (error, userData) {
        if (error) {
            console.log("Error creating user:", error);
        } else {
            req.body.fireBaseToken = userData.uid;
            var users = new signAdmin(req.body).save(function (err, success) {
                if (err) {
                    res.send(err);
                }
                else {
                    console.log(success);
                    signAdmin.findOne({
                        adminEmail: req.body.adminEmail,
                        adminName: req.body.adminName
                    }, function (err, datas) {
                        console.log(req.body.adminEmail);
                        if (err) {
                            res.send(err);
                        }
                        else {
                            res.send(datas)
                        }
                    })
                }
            });
            console.log("Successfully created user account with uid:", userData.uid);
        }
    })
});
/*======================================================================================*/



/*=========================================================================================*/
/*Admin login page coding*/

app.post("/LOGIN", function (req, res) {
    signAdmin.findOne({adminEmail: req.body.nam.mail, adminPass: req.body.nam.pass}, function (err, data) {
//console.log(data.adminEmail)
        adminObj[data.adminEmail] = data._id;

        if (err) {
            res.send(err)
        }
        else {
            res.send(data)
        }
    });
});

/*=========================================================================================*/



/*==================CREATE USER SIGNUP====================*/

var mySchema = mongoose.Schema({
    userName: {type: String,unique : true, require : true},
    userEmail: {type: String,unique : true ,require : true},
    userPass: {type: String,unique : true, require : true},
    userAge: Number,
    createOn : Date,
    userPro: String,
    userPro2: String,
    userPro3: String,
    userAdmin: String
});
var userModel = mongoose.model("user", mySchema);
app.post("/POST", function (req, res) {
    console.log(req.body);
    var users = new userModel();
    users.userName = req.body.userName;
    users.userEmail = req.body.userEmail;
    users.Pass = req.body.userPass;
    users.userAge = req.body.userAge;
    users.userPro = req.body.userPro;
    users.userPro2 = req.body.userPro2;
    users.userPro3 = req.body.userPro3;
    users.userAdmin = req.body.userAdmin;
    users.createOn = new Date;

    users.save(function (err, data) {
        console.log('create userr', data);
        if (err) {
            res.send(err)
        } else {
            res.send(data);
        }
    });
});
/*======================================================================*/


/*======================================================================*/
/*==========LOGIN USER FROM IONIC============*/

app.post("/LoginUser", function (req, res) {
    userModel.find({userEmail: req.body.userEmail/*, userPass: req.body.userPass*/}, function (err, data) {
        if (data) {
            res.send(data);
            console.log("New: ", data)
        } else {
            res.send(err);
            console.log(err)
        }
    })
});
/*======================================================================*/


/*======================================================================*/

/*=====Schema to Booking order  from ionic=============*/
var bookingSchema =  mongoose.Schema({
    msg: {type: String, require: true},
    price: Number,
    name: {type: String, require: true},
    position : {lat: Number,long:Number},
    local: String});
var model = mongoose.model('bookingOrder', bookingSchema);

app.post("/Not",function(req,res){
    //console.log(req.body);
    var mod = new model(req.body)
        .save(function(err,data){
    if(err){
        //console.log("SErVeR: ",err);
    res.send(err)}
    else{
        //console.log("SerVeR DaTa : ",data );
    res.send("DaTa ReceVe: ",data)
    }
});
});
/*===============================================================*/


/*========================Product Schema==========================*/
var productSchema = mongoose.Schema({
    product: {type: String,unique : true ,require: true},
    product2: {type: String,unique : true},
    userAdmin: String});

var  productModel = mongoose.model("ProductList" , productSchema);
app.post("/Product",function(req,res){
    new productModel(req.body).save(function(err,data){
        if(err){
            //console.log("Product ERROR: ",err);
            res.send(err)
        }else{
            //console.log("product DaTa: ",data);
            res.send(data)
        }
    })
});



/*====================================================================*/


/*SHOW NAME AND FULL DATA OF ADMIN*/
/*========for admin========= */
app.get("/getAdmin", function (req, res) {
    console.log(req.params);
    signAdmin.findOne({fireBaseToken: req.query.token}, function (err, data) {
        if (err) {
            res.send(err)
        }
        else {
            res.send(data)
        }
    })
});
/*========get User name========= */
app.get("/getUsers/:id", function (req, res) {
    //console.log(req.params.id);
    userModel.find({userAdmin: req.params.id}, function (err, data) {
        if (err) {
            res.send(err)
        }
        else {
            res.send(data)
        }
    })
});


/*=======get order Name from ionic=======*/
app.get("/getOrder/:id",function(req,res){
    console.log("Hi ",req.params);
    model.find({local: req.params.id},function(err,data){
        if(data){
            console.log( "GeT: ",data);
            res.send(data)
        }else{
            res.send(err);
            console.log("ErroR: ",err)
        }
    })

});

/*========get Product Name from ionic and angular==========*/

app.get("/getOrderName",function(req,res){
    console.log(req.body);
    productModel.find({userAdmin: req.query.prot},function(err,data){
        if(err){
            console.log(err);res.send(err)
        }else{
            res.send(data);
            console.log("ALLAaD", data)
        }
    });
});

/*======================================================================*/





exports = adminObj;


app.use(express.static(path.resolve(__dirname, 'public')));


app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);


module.exports = app;
app.listen(3000, function () {
    console.log("Runigggg")
});