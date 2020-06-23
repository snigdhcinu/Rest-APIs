const express=require('express')
const bodyParser=require('body-parser')
const mongoose=require('mongoose')
const ejs=require('ejs')

const app=express();

app.set('view engine','ejs')
app.use(bodyParser.urlencoded({
	extended:true
}))
app.use(express.static('public'));

// Connect to our mongoDB
mongoose.connect('mongodb://localhost:27017/wikiDB',{useNewUrlParser:true,useUnifiedTopology:true});

// Create a new Schema
const articleSchema=new mongoose.Schema({
	name: String,
	content: String
});

// Create a new model
const Article=mongoose.model('Article',articleSchema);


app.get('/articles',function(req,res){
	Article.find(function(err,foundArticles){
		// console.log(foundArticles)
		res.send(foundArticles);
	});
});
app.post('/articles',function(req,res){
	const newArticle= new Article({
		name:req.body.name,
		content:req.body.content
	});
	newArticle.save();
});


app.get('/',function(req,res){
	res.send('this is get homepage')
})
app.post('/',function(req,res){
	res.send('this is post');
})
app.listen(3000,function(){
	console.log(`Server is online in port no. 3000`);
});