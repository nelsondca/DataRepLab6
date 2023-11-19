//Import the express module
const express = require('express')

//Create an instance of Express
const app = express(0)

//Set the port number
const port = 4000

//Import and use the CORS middleware for enabling requestes
const cors = require('cors')
app.use(cors());

//Set up headers for CORS to allow various types of requestes
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//Use body-parser middleware to handle JSON and URL- encoded data
const bodyParser = require('body-parser');
const { default: Books } = require('../src/components/books');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Define a route for the root URL (http://localhost:4000/)
app.get('/', (req, res) => {
    res.send('Welcome to Data Rep') // Send a response with a welcome message
})

// Define a route for the '/whatever' URL (http://localhost:4000/whatever)
app.get('/whatever', (req, res) => {
    res.send('Goodbye') // Send a response with a goodbye message
})

// Define a dynamic route with a parameter named 'name'
app.get('/Hello/:name', (req, res) => {
    console.log(req.params.name); // Log the 'name' parameter to the console
    res.send("Hello " + req.params.name) // Send a response with a personalized greeting
})

//Route to fetch a list of books
app.get('/api/books', (req, res) => {
    // book data
    const data = [
        {
            "title": "Learn Git in a Month of Lunches",
            "isbn": "1617292419",
            "pageCount": 0,
            "thumbnailUrl": "https://s3.amazonaws.com/AKIAJC5RLADLUMVRPFDQ.book-thumb-images/umali.jpg",
            "status": "MEAP",
            "authors": ["Rick Umali"],
            "categories": []
        },
        {
            "title": "MongoDB in Action, Second Edition",
            "isbn": "1617291609",
            "pageCount": 0,
            "thumbnailUrl": "https://s3.amazonaws.com/AKIAJC5RLADLUMVRPFDQ.book-thumb-images/banker2.jpg",
            "status": "MEAP",
            "authors": [
                "Kyle Banker",
                "Peter Bakkum",
                "Tim Hawkins",
                "Shaun Verch",
                "Douglas Garrett"
            ],
            "categories": []
        },
        {
            "title": "Getting MEAN with Mongo, Express, Angular, and Node",
            "isbn": "1617292036",
            "pageCount": 0,
            "thumbnailUrl": "https://s3.amazonaws.com/AKIAJC5RLADLUMVRPFDQ.book-thumb-images/sholmes.jpg",
            "status": "MEAP",
            "authors": ["Simon Holmes"],
            "categories": []
        }
    ];

    //sends book data as JSON response along with additional information
    res.json({
        myBooks: books,
        "Message": "Some information",
        "Status": "Happy"
    })
})

//Route serve an HTML page
app.get('/webPage', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

//Rout to handle GET request with query parameters
app.get('/name', (req, res) => {
    res.send("Hello " + req.query.fname + " " + req.query.sName)
})

//Route to handle GET request with body parameteers
app.post('/name', (req, res) => {
    res.send("Hello " + req.body.fname + " " + req.body.sName)
})

// Define a route for the '/Ted' URL (http://localhost:4000/Ted)
app.get('/Ted', (req, res) => {
    res.send("Hello Ted") // Send a response with a greeting to Ted
})

//Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})