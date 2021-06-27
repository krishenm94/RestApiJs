const express = require('express');

const app = express();

// Middlewares
app.use('/post', (req,res) => {
	console.log('Post endpoint hit');
});

// Routes
app.get('/', (req,res) => {
	res.send('Home');
});

app.get('/post', (req,res) => {
	res.send('Post');
});

app.get('/get', (req,res) => {
	res.send('Get');
});

app.get('/put', (req,res) => {
	res.send('Put');
});

app.get('/delete', (req,res) => {
	res.send('Delete');
});

app.listen(3000);

