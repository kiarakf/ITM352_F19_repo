/*
Author: Shane Shimizu, Daniel Francis Barit
File Description: server processing
*/
//Source from Lab 13 and Professor Daniel Port's office hours
var express = require('express'); //gets express package
var app = express(); //starts express
var myParser = require("body-parser"); //requires body parser to form data 
var products = require("./public/products.js"); //assigns the product data from the json array into the variable products
var storedUsersCartArray = require("./public/products.js");
const querystring = require('querystring'); //requires the querystring of the form.  gives utilities to parse and formate the querystring

var myParser = require("body-parser");
var cookieParser = require('cookie-parser');
app.use(cookieParser());
var session = require('express-session');
app.use(session({secret: "ITM352 rocks!"}));

app.use(myParser.urlencoded({ extended: true })); //tells the system to use JSON
fs = require('fs'); //imports Node File System or fs
var filename = 'user_data.json';//assigns the user information from the JSON into the variable filename
//source from Lab 13
//logs the method and path into the console
app.all('*', function (request, response, next) {
    console.log(request.method + ' to ' + request.path);
    next();
});

app.get("/set_cookie", function (request, response){
    response.cookie('myname', 'Shane Shimizu', {maxAge: 50*1000}).send('cookie set');

});

app.get("/use_cookie", function (request, response){
    output = "No cookie with myname";
    if(typeof request.cookies.myname != 'undefined'){
        output = `Welcome to the Use Cookie page ${request.cookies.myname}`;
    }
    response.send(output);
});

app.get('/use_session', function(request, response){
    response.send(`welcome, your session ID is ${request.session.id}`);

});


//source from Lab 13
//posts the process form data with the action as process_form
app.post("/process_form", function (request, response) {
    let POST = request.body; //assigns the body into POST variable
    var hasValidQuantities = true; //assume that the quantities textbox is true
    var hasPurchases = false; //assume the quantity of purchases are false
    for (i = 0; i < storedUsersCartArray.length; i++) { //for loop for each product in the array that increases the count by 1
        q = POST[`quantity${i}`]; //quantity entered by the user for a product(s) is assigned into q
        if (isNonNegInt(q) == false) { //if the quantity enteredby the user is not a valid integer
            hasValidQuantities = false; //HasValidQuantities is false or nothing was purchased
        }
        if (q > 0) { //if the quantity entered is more than 0
            hasPurchases = true; //hasPurchases is true and the user has entered a valid integer(s) to purchase something
        }
    }
    //source from Professor Ports office hours
    //if data is valid give user an invoice, if not give them an error
    var qString = querystring.stringify(POST); //string query together
    if (hasValidQuantities == true && hasPurchases == true) {//if hasValidQuantities and hasPurchases is true
        response.redirect('login.html?' + qString); //redirects the user to the login page with qstring
    }
    else {

        response.redirect("./cart.html?" + qString); //if quantity is not valid, user is sent back to product page along with the query data entered previously from the user
    }

});


app.use(express.static('./public')); //retrieves get request and look for file in public directory
app.listen(8080, () => console.log(`listening on port 8080`)); //the server listens on port 8080 and prints the message into the console

//copied from order_page Lab 13
//function that returns errors
function isNonNegInt(q, returnErrors = false) {
    errors = []; // assume no errors at first
    if (q == '') { q = 0 }; //if quantity or 0
    if (Number(q) != q) errors.push('Not a number!'); // Check if string is a number value
    if (q < 0) errors.push('Negative value!'); // Check if it is non-negative
    if (parseInt(q) != q) errors.push('Not an integer!'); // Check that it is an integer
    return returnErrors ? errors : (errors.length == 0); //return errors if there are errors 

}

//
//check to see if the file exists. if it does, read it and parse it. if not output a message
if (fs.existsSync(filename)) {

    data = fs.readFileSync(filename, 'utf-8');  //returns contents of the path

    stats = fs.statSync(filename);
    console.log(filename + ' has ' + stats.size + ' characters'); //console logs the filename with the amount of characters it has

    users_reg_data = JSON.parse(data);//parses the data into JSON format

    console.log(users_reg_data); //console logs

} else {
    console.log(filename + ' does not exist');
}




//gets called with data from the form
app.post("/login", function (request, response) {
    // Process login form POST and redirect to logged in page if ok, back to login page if not
    console.log(request.body);
    var qString = querystring.stringify(request.query); //string query together
    inputUser = request.body.username;
    inputPass = request.body.password;
    the_username = request.body.username.toLowerCase(); //give me username from input and assigning it
    var error = null;
    var stickInput = null;
    if (typeof users_reg_data[the_username] != 'undefined') { //ask object if it has property called username, if it does, it wont be udefined. check to see if it exists
        if (users_reg_data[the_username].password == request.body.password) {//check if the password they entered matches what was stored

            if (request.body.promocode == 'M4KA1'){
                disCountProducts = 'foo';                
                request.query.displayDiscount = disCountProducts;

            }
            //assigns the username, email and fullname into variables
            loginFullname = users_reg_data[the_username].name;
            loginEmail = users_reg_data[the_username].email;
            loginUserName = request.body.username;
            //retrieve variable values and puts it into query
            request.query.stickFullname = loginFullname;
            request.query.stickEmail = loginEmail;
            request.query.stickUsername = loginUserName;
            //strings query together
            qString = querystring.stringify(request.query);
            response.redirect("./invoice.html?" + qString); //redirects user back to incoice page with the query string

            
            //sends an email to the email the user entered https://www.w3schools.com/nodejs/nodejs_email.asp
            var nodemailer = require('nodemailer'); //requires nodemailer after install

            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'shanesurfshop@gmail.com', //my email
                    pass: 'surfdashop' //my password
                }
            });

            var mailOptions = {
                from: 'shanesurfshop@gmail.com',
                to: loginEmail, //to users email
                subject: 'SHANES SURF SHOP - Thank you ' + loginFullname + ' for your purchase!', //prints message with users full name into the subject box
                text: 'PLEASE COME AGAIN!'
            };

            transporter.sendMail(mailOptions, function (error1, info) { //if failed to send or there are errors, console.log them
                if (error1) {
                    console.log(error1);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
            
        //else if the password of the user name in JSON does not match the password entered
        } else if (users_reg_data[the_username].password != request.body.password) {
            error = '<font color="red">Incorrect Password</font>'; //sets error to incorrect password, which will display on the page
            stickInput = inputUser; //assigns the username the user ernterd into a variabel which will let it stick 
           
        }
        //else the username the user entered and errpr message is displayed
    } else {
        error = the_username +"<style=word-spacing: 5px>: </style>" + "<font color='red'>is not registered</font>";
        stickInput = inputUser; //assigns the username the user entered into stick input
         //retrieve variable values and puts it into query
        request.query.LoginError = error;
        request.query.logStickInput = stickInput;
        //string query together
        qString = querystring.stringify(request.query);
        //redirect user back to login page with qString
        response.redirect("./login.html?" + qString);
    }


});


// process a simple register form
app.post("/register", function (request, response) {

    //string query together
    var qString = querystring.stringify(request.query);
    //assigns the inputs of the user into variables
    regInputUser = request.body.username.toLowerCase(); //assigns the username the user entered with to lower case for unique names
    regInputFullname = request.body.fullname;
    regInputPassword = request.body.password;
    regInputRepPassword = request.body.repeat_password;
    regInputEmail = request.body.email;
    email = request.body.email.toLowerCase();

    
    if (regInputFullname.length > 30){ //if the fullname entered is greater than 30 characters
        fullnameErrorReg = '<font color="red">Full Name must be 30 characters or less</font>'; //stores appropriate error into variable
        regIncorrectFullName = regInputFullname; //sticks the input from the user and store in variable
        regIncorrectUsername = regInputUser;
        regIncorrectEmail = regInputEmail;
    } else if (!(/^[A-Za-z ]+$/.test(regInputFullname))) { // regular expression; else if the fullname does not equal letters only, source: https://www.ntu.edu.sg/home/ehchua/programming/howto/Regexe.html
        fullnameErrorReg = '<font color="red">Full Name must be letters only</font>'; //stores appropriate error into variable
        regIncorrectFullName = regInputFullname; //sticks the input from the user and store in variable
        regIncorrectUsername = regInputUser;
        regIncorrectEmail = regInputEmail;
    } else { //else  there are no errors
        fullnameErrorReg = ''; //no errors are stored in the variable
        regIncorrectFullName = regInputFullname; //sticks input from the user and store in variable
        regIncorrectUsername = regInputUser;
        regIncorrectEmail = regInputEmail;
    }

    if (regInputPassword.length < 6) { //if password the user enters is less than 6 characters
        passwordErrorReg = '<font color="red">Password must be more than 6 characters long</font>'; //stores appropriate error into variable
        regIncorrectFullName = regInputFullname; //sticks input from the user and store in varible
        regIncorrectUsername = regInputUser;
        regIncorrectEmail = regInputEmail;
    } else if (regInputRepPassword != regInputPassword) { //else if the repeat password does not match the password enterd from the user
        passwordErrorReg = '<font color="red">Password DOES NOT Match</font>'; //stores appropriate error into variable
        regIncorrectFullName = regInputFullname; //sticks input from the user and store in variable
        regIncorrectUsername = regInputUser;
        regIncorrectEmail = regInputEmail;
    } else { //else there are no errors
        passwordErrorReg = ''; //no errors are stores in the variable
        regIncorrectFullName = regInputFullname; //sticks input from the user and store in variable
        regIncorrectUsername = regInputUser;
        regIncorrectEmail = regInputEmail;
    }

    if (typeof users_reg_data[regInputUser] != 'undefined') {//check if the username is already taken
        usernameErrorReg = '<font color="red">User already registered</font>'; //stores appropriate error into a variable
        regIncorrectFullName = regInputFullname; //sticks input from user and store in variable
        regIncorrectUsername = regInputUser;
        regIncorrectEmail = regInputEmail;
    } else if (!(/^[a-zA-Z0-9]+$/.test(regInputUser))) { //if the username does not equal letters and numbers only, source: https://www.ntu.edu.sg/home/ehchua/programming/howto/Regexe.html
        usernameErrorReg = '<font color="red">Username must be characters and numbers only</font>'; //stores appropriate error into a variable
        regIncorrectFullName = regInputFullname; //sticks input from user and store in variable
        regIncorrectUsername = regInputUser;
        regIncorrectEmail = regInputEmail;
    } else if (regInputUser.length > 10) { //if the username is greater than 10 characters long
        usernameErrorReg = useLong = '<font color="red">Username must be 10 characters or less</font>'; //stores appropriate error into variable
        regIncorrectFullName = regInputFullname; //sticks input from user and store in variable
        regIncorrectUsername = regInputUser;
        regIncorrectEmail = regInputEmail;
    } else if (regInputUser.length < 4) { //if the username is less than 4 characters long
        usernameErrorReg = '<font color="red">Username must be at least 4 characters long</font>'; //store appropriate error into variable
        regIncorrectFullName = regInputFullname; //sticks input from the user and store in varible
        regIncorrectUsername = regInputUser;
        regIncorrectEmail = regInputEmail;
    } else { //else there are no errors
        usernameErrorReg = ''; //no errors are stored in the variable
        regIncorrectFullName = regInputFullname; //sticks input from the user and store in variable
        regIncorrectUsername = regInputUser;
        regIncorrectEmail = regInputEmail;
    }

    if (!(/^[a-zA-Z0-9._]+@[a-zA-Z.]+\.[a-zA-Z]{2,3}$/.test(regInputEmail))) { // follows X@Y.Z format; address which can only contain letters, numbers, and the characters “_” and “.”; Y is the host machine which can contain only letters and numbers and “.” characters; Z is the domain name which is either 2 or 3 letters such as “edu” or “tv”
        emailErrorReg = '<font color="red">Email is invalid</font>'; //no errors are stored in the variable
        regIncorrectFullName = regInputFullname; //sticks input from the user and store in variable
        regIncorrectUsername = regInputUser;
        regIncorrectEmail = regInputEmail;
    } else { //else there are no errors
        emailErrorReg = ''; //no errors are stored in the variable
        regIncorrectFullName = regInputFullname;
        regIncorrectUsername = regInputUser;
        regIncorrectEmail = regInputEmail;
    }

    //if there are no errors stored in each error variable, user is stored in users_reg_data object
    if (fullnameErrorReg == '' && passwordErrorReg == '' && usernameErrorReg == '' && emailErrorReg == '') {
        users_reg_data[regInputUser] = {}; //new user becomes new property of users_reg_data object
        users_reg_data[regInputUser].name = request.body.fullname; //name entered is stored in users_reg_data object
        users_reg_data[regInputUser].password = request.body.password; //password entered is stored in users_reg_data object
        users_reg_data[regInputUser].email = request.body.email; //email entered is stored in users_reg_data object
        fs.writeFileSync(filename, JSON.stringify(users_reg_data)); //strings data into JSON for users_reg_data

        //retrieve variables and puts them into query
        request.query.stickFullname = regInputFullname;
        request.query.stickEmail = regInputEmail;
        request.query.stickUsername = regInputUser;
        //string query together
        qString = querystring.stringify(request.query);
        //redirect user to invoice page with query string
        response.redirect("./invoice.html?" + qString);

        //sends an email to the email the user entered https://www.w3schools.com/nodejs/nodejs_email.asp
        var nodemailer = require('nodemailer'); //requires nodemailer after install

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'shanesurfshop@gmail.com', //my email
                pass: 'surfdashop' //my password
            }
        });

        var mailOptions = {
            from: 'shanesurfshop@gmail.com',
            to: regInputEmail, //to users email
            subject: 'SHANES SURF SHOP - Thank you ' + regInputFullname + ' for your purchase!', //prints message with users full name into the subject box
            text: 'PLEASE COME AGAIN!'
        };

        transporter.sendMail(mailOptions, function (error, info) { //if failed to send or there are errors, console.log them
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });


        console.log(request.body);
    }
    //retrieve variables and puts them into query; for displaying errors on page
    request.query.RegFullnameError = fullnameErrorReg;
    request.query.RegPasswordError = passwordErrorReg;
    request.query.RegUsernameError = usernameErrorReg;
    request.query.RegEmailError = emailErrorReg;
    //retrieve variables and puts them into query; for sticking user input
    request.query.stickRegFullname = regIncorrectFullName;
    request.query.stickUsername = regIncorrectUsername;
    request.query.stickEmail = regIncorrectEmail;
    //string query together
    qString = querystring.stringify(request.query);
    //redirect user to registration page with qstring
    response.redirect("./registration.html?" + qString);

});

