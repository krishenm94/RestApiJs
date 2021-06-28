const express = require('express');
const mongoose = require('mongoose');

const app = express();
const schema = mongoose.Schema;

// Set up default mongoose connection
var mongoDB = 'mongodb://localhost:27017/test_db_1';
mongoose.connect(
	mongoDB,
	{useNewUrlParser: true, useUnifiedTopology: true},
	() => console.log('Connected to MongoDB instance')
);

// Initialise schema
const FeatureAccessSchema = new schema({
	email: String,
	featureName:String,
	enable: Boolean
});

const FeatureAccessModel = mongoose.model("FeatureAccess", FeatureAccessSchema);

// Get the default connection
var db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Middlewares
app.use(express.json());

// Routes
app.get('/feature/:email&:featureName', (req,res) => {
       try{
	       const _email = req.params.email;
	       const _featureName = req.params.featureName;
	       const feature = FeatureAccessModel.find(
		       { email: _email, featureName: _featureName}
	       );
	       if(!feature) res.status(404).send("Entry not found");
	       res.status(200).json({canAccess: feature.enable});
       } catch (e){
	       res.status(404).send(e);
       }

});

app.post("/feature", async (req,res) => {
	try{

	        feature = FeatureAccessModel.find(
		       { email: req.body.email, featureName: req.body.featureName}
	        );
	        if(feature) {
			console.log("Entry already exists. Failed to post");
			res.status(304).json({feature}).send("Entry already exists");
			return;
		}
		feature = FeatureAccessModel.create(req.body)
		res.status(200).json({});
		console.log("Post successful");
	} catch (e){
		res.status(304);
		console.log("Failed to post");
		return e;
	}
});

app.listen(3000);

