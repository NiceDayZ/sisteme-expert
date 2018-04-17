const express = require('express');
var bodyParser = require("body-parser");
var path = require('path');
var nodemailer = require('nodemailer');

const app = express();


app.use(express.static(__dirname + '/'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		   user: 'craciunmihai42@gmail.com',
		   pass: 'wAter200'
	   }
   });


app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/post', (req, res) => {
	var nume = req.body.lname;
	var prenume = req.body.fname;
	var email = req.body.email;
	var subject = req.body.subject;
	var message = req.body.message;

	//
	const mailOptions = {
		from: email, 
		to: 'craciunmihai42@gmail.com', 
		subject: subject, 
		html: `<h2>${prenume} ${nume}:</h2><br><p>${message}</p>`
	  };

	  transporter.sendMail(mailOptions, function (err, info) {
		if(err)
		  console.log(err)
		else
		  console.log(info);
	 });


	console.log(nume);
	res.redirect("/");
})

app.listen(8080, () => console.log('Aplicatia a pornit pe portul 8080!'));