require('./config/config');

const express = require('express');
const app = express();
var {mongoose} = require('./db/mongoose');
mongoose.connect('mongodb://localhost:27017/HotelService', {useNewUrlParser: true});
const port = 2432 || process.env.PORT;
let ejs = require('ejs')
var {Order} = require('./models/order')
var {Service} = require('./models/service')
var {Staff} = require('./models/staff');
const path = require('path')

app.use(express.static('public'))
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


var bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.render('pages/index')
})

app.get('/dining', (req, res) => {
    res.render('pages/dining')
})

app.get('/assistance', (req, res) => {
    res.render('pages/assistance')
})

app.get('/order', async(req, res) => {
    let orderResult;
    let serviceResult;
    let userRoomNumber = req.query.roomNumber;
    console.log("request body", req.body);
    try{
        orderResult = await Order.find({roomNumber: userRoomNumber});
        console.log(`Order Result is ${orderResult}`);
        serviceResult = await Service.find({roomNumber: userRoomNumber});
        res.render('pages/order', {orderResult, serviceResult, userRoomNumber})
    }catch(err){
        console.log("Failed to load orders data: " + err)
        res.status(400).send("You are a retard");
    }
})

app.post('/order', async(req, res) => {
    let orderResult;
    let serviceResult;
    let userRoomNumber = req.body.userRoomNumber;
    console.log("request body", req.body);
    try{
        orderResult = await Order.find({roomNumber: userRoomNumber});
        console.log(`Order Result is ${orderResult}`);
        serviceResult = await Service.find({roomNumber: userRoomNumber});
        res.render('pages/order', {orderResult, serviceResult, userRoomNumber})
    }catch(err){
        console.log("Failed to load orders data: " + err)
        res.status(400).send("You are a retard");
    }
    
})

app.get('/auth', (req, res) => {
    res.render('pages/auth')
})

app.post('/serviceCall', (req, res) => {
    console.log(`Request`, req.body)
    res.status(200).send({response: `I am from the server ${req.body.serviceName}, roomNumber: ${req.body.roomNumber}`});

    var newService = new Service({
        date: new Date().getDate(),
        name: req.body.serviceName,
        roomNumber: req.body.roomNumber
    })

    newService.save((err) => {
        err ? console.log(err) : console.log("Service will come soon")
    })
});

app.post('/staff', async(req, res) => {
    const code = 12345;
    // res.status(200).send({response: `Username: ${req.body.username} Password: ${req.body.password}`})
    if(req.body.code == code){
        let staffResult = await Staff.find({})
        var matches = 0;
        staffResult.forEach((staff => {
            if(staff.username == req.body.username){
                matches++;
                if(staff.password == req.body.password){
                    console.log("Correct Password")
                    res.status(200).render('pages/staff');
                }else{
                    console.log("Incorrect password")
                    res.render('pages/auth')
                }
            }
        }))

        if(matches == 0){ //if there is no user with that username
            // Create User
            console.log("Creates user")
            var newStaffUser = new Staff({
                username: req.body.username,
                password: req.body.password
            })

            newStaffUser.save((err) => {
                err ? console.log(err) : console.log("User has been created")
            })

            res.render('pages/staff');
            // 
            }
    }else{
        console.log("Incorrect code")
    }
})

app.post("/postWhatever", (req,res)=>{
    console.log(`Request stuff`, req.body);

    res.status(200).send({response: `I am from the server ${req.body.name}, room Number: ${req.body.roomNumber}`});

    var newOrder = new Order({
        date: new Date().getDate(),
        name:  req.body.name,
        roomNumber: req.body.roomNumber
    })

    newOrder.save((err) => {
        err ? console.log("Something went wrong " + err) : console.log("Order has been made")
    })
});

var server = app.listen(port, (err) => {
    err ? console.log("Oops there was an error: " + error) : console.log("Port is up on " + port);
})

var io = require('socket.io').listen(server);

io.on('connection', function(socket){
    console.log("User has connected")
})
