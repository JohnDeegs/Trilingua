const express = require('express');
const app = express();
const port = Number(process.env.PORT || 8080);
const path = require("path");

app.use('/css', express.static(__dirname + '/css'));
//Store all HTML files in view folder.
app.use('/js', express.static(__dirname + '/js'));

app.use('/html', express.static(__dirname + '/html'));

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
  //__dirname : It will resolve to your project folder.
});


app.use(function (req, res, next){
	if(req.headers['x-forwarded-proto'] === 'https'){
		res.redirect('http://' + req.hostname + req.url);
	}else{
		next();
	}
});

app.listen(port);
console.log('The magic happens on port ' + port);
