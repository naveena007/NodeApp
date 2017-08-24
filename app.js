var express = require('express');
var Cloudant = require('cloudant');
var bodyParser = require('body-parser');
//var PORT = (process.env.VCAP_APP_PORT || 3001);

//var host=(process.env.VCAP_APP_HOST || 'localhost');
var me = 'ef85078f-4429-478f-884c-3395f6ac2f0d-bluemix';
var password = '1610708681cd76176557dd7a5d88088019e6df480ec38bf563d458f4c645ce04';
var cloudant = Cloudant({account:me, password:password});



// create a new express server
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('',function(req,res){
	res.sendFile(__dirname+'/'+'index.html');
})
 app.post('/l',function(req,res){
	 var doc = req.body.value;
	 var db = cloudant.db.use('msscloud');
	 db.get(doc,function(err,data)
	 {
		
		 
		 var val=JSON.stringify(data);
		 var i=JSON.parse(val);
		 
		
		 console.log(i._id,i._rev);
		 //document.write(i._id,i._rev);
		
		 var data="Book Author&nbsp&nbsp&nbsp&nbsp:&nbsp<input type=\"text\" id=\"name\" value=\""+i.name+"\"/>"+
		 "ISBN&nbsp:&nbsp<input type=\"text\" id=\"isbn\" value=\""+i.isbn+"\"/>"+
		 "<input type=\"hidden\" id=\"revNum\" value=\""+i._rev+"\"/>"+
		 "<input type=\"hidden\" id=\"docId\" value=\""+i._id+"\"/>"+
		 "<input type='button' name='update' id=\"update\" value='UPDATE'>";
			 if(err)
		 {
			 return err
		 }
		 
res.send(data);
	
	 });
 })
 app.get('/index',function(req,res){
	res.sendFile(__dirname+'/'+'index.html');
})
app.post('/insert',function(req,res){
	 var name = req.body.name;
	 var isbn = req.body.isbn;
	 var docId = req.body.docId;
	 var db = cloudant.db.use('msscloud');
	 db.insert({_id : docId, "name" : name, "isbn":isbn},function(err,data){
		 if(err){
			 return err
		 }
		 console.log(data);
		 
		 
		 //document.write(name);
		 //alert(name);

		 res.send("Insertion Successfull");
	 }); 
 }) 
 app.get('/index',function(req,res){
	res.sendFile(__dirname+'/'+'index.html');
})
 app.post('/update',function(req,res){
	 var v3 = req.body.name;
	 var v4 = req.body.isbn;
	 var v5 = req.body.revNum;
	 var v6 = req.body.docId;
	 var db = cloudant.db.use('msscloud');
	 db.insert({_id:v6,_rev:v5,"name":v3,"isbn":v4},function(err,data){
		 if(err){
			 return console.log(err);
		 }
		 console.log(data);
	 res.send("Update Successfull");
	 });	 
 });
app.post('/delete', function(req, res){
	var docId= req.body.docId;
	var db = cloudant.db.use('msscloud');
	db.get(docId,function(err,data)
	 {
		 var value=JSON.stringify(data);
		 var k=JSON.parse(value);
		if(err)
		 {
			 return err
		 }
	var revNum = k._rev;
	console.log(revNum);
	db.destroy(docId, revNum, function(err, data){
		console.log("asdfg");
		console.log("error", err);
		console.log("data", data);
		res.send("Delete Successfull");
	});
	 })
})
//get the app environment from Cloud Foundry
/*var appEnv = cfenv.getAppEnv();
// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});*/
app.listen(8080,function () {
  console.log('Example app listening on port 8080!');
});


