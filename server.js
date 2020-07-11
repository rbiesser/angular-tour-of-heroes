// set dependencies
const express = require('express')
const path = require('path')
const http = require('http')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

// 
const app = express()

//Get the body parser for parsing HTTP POST request data
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Routes
const hero = require('./route/hero')
app.use('/api', hero)

// Configure static file serving
app.use(express.static(path.join(__dirname, 'dist')))
app.use('/lib', express.static(path.resolve('./node_modules')))

// All other routes are sent the index file
app.get('*', (req, res) => {
    console.log('GET other')
    res.sendFile(path.join(__dirname, 'dist/index.html'))
})

// Get the port from the environment (default is 3000) and set it in Express
const port = process.env.PORT || '3000'
app.set('port', port)

// Create the HTTP server using built-in Node HTTP server
const server = http.createServer(app)

// Listen on provided port, on all network interfaces
server.listen(port, () => console.log(`Express Server running at http://localhost:${port}`))

// add the Mongoose connection to the configured database
const config = require('./config/database');
mongoose.connect(config.database, { 
        // fix MongoDB DeprecationWarnings
        // https://github.com/Automattic/mongoose/issues/6890#issuecomment-416410444
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true,
    })
    .catch(error => {
        console.log(error)
        server.close()
    });

/// add to npm start script in package.json
// ng build && node server.js