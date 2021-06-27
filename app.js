const express = require('express');
const mongoose = require('mongoose');

const app = express();
const schema = mongoose.Schema;

// Set up default mongoose connection
var mongoDB = 'mongodb://localhost:27017/test_db_1';
mongoose.connect(
	mongoDB,
	{useNewUrlParser: true, useUnifiedTopology: true},
	() => console.log('Connected to MongoDB')
);

// Initialise schema
const FeatureAccessSchema = new schema({
	emailAddress: String,
	enabledFeatures:[String]
});

const FeatureAccessModel = mongoose.model("FeatureAccess", FeatureAccessSchema);

// Get the default connection
var db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Middlewares
app.use('/post', (req,res) => {
	console.log('Post endpoint hit');
});

// Routes
app.get('/', (req,res) => {
	res.send('Home');
});

app.listen(3000);

