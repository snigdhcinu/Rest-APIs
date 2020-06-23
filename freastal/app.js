const express= require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');

let app=express();

	// CONNECT TO OUR MONGODB
mongoose.connect('mongodb://localhost:27017/test',{useNewUrlParser:true,useUnifiedTopology:true});
app.use(bodyParser.urlEncoded({extended:true}));

	// CREATING A NEW SCHEMA
const schema=new mongoose.Schema({
	name:String,
	age:Number,
	std:Number
});

	// CREATE A MONGOOSE MODEL
const Entry=mongoose.model("Entry",schema)


app.route('/students')
	// Get all student information from the database
.get(function(req,res){
Entry.find(function(err,foundEntries){
	if(!err)
		res.send(foundEntries);
	else
		res.send(err);
});
})
	// Post a student information to the database
.post(function(req,res){
	const newEntry=new Entry({
		name:req.body.name,
		age:req.body.age,
		std:req,body.std
	});
	newEntry.save();
})
	// Delete all student document
.delete(function(req,res){
	Entry.deleteMany(function(err){
		if(!err)
			res.send('delete successful')
		else
			res.send(err)
	})
});


app.route("/students/:studentName")
	// To get a specific student document
.get(function(req,res){
	Entry.findOne({name:req.params.studentName},
		function(err,foundEntry){
			if(foundEntry)
				res.send(foundEntry)
			else
				res.send('no such article found')
		});
})
	// To entirely update a student document
.put(function(req,res){
	Entry.update(
		{name:req.params.studentName},
		{name:req.body.name, age:req.body.age, std:req.body.std},
		{overwrite:true},
		function(err,results){
			if(!err)
				res.send('update success')
		}
		)
})
	// To update a specific field in the student document
.patch(function(req,res){
	Entry.update(
	{name:req.params.studentName},
	{$set:req.body},
	function(err){
		if(!err)
			res.send('update successful');
		else
			res.send(err);
	}
	)
})
.delete(function(req,res){
	Entry.deleteOne(
		{name:req.params.studentName},
		function(err){
			if(!err)
				res.send('Delete successful');
			else
				res.send(err);
		}
	)
});


app.listen('3000',function(){
	console.log('server online in localhost:3000');
});