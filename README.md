Following the Full stack open course 2019 by University of Helsinki, this project comes to life. A web application called **Phonebook** is created during the course. While part 1 and 2 focus on the frontend, part 3 is mainly about building up the backend, the database, and how to connect the frontend and database to the backend, as well as to deploy the application to the Internet. The Phonebook application is now deployed at https://fullstackpart3phonebook.herokuapp.com/

## Phonebook Application
In this project, I learned how to build a backend (that works with the frontend in [part2](https://github.com/trgngochuyen/fullstackopen/tree/master/part2/phonebook)) on top of NodeJS, which is a JavaScript runtime based on Google's Chrome V8 JavaScript engine. 

To create a new template for the application, run `npm init` command, answer the questions presented by the utility, and then a *package.json* file will be created at the root of the project. We can make changes to the *scripts* object to make npm commands.

### First step of the application: HTTP web server
In the *index.js* file at the root of the project, we start by adding this:
```
const http = require('http')

const app = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.end('Hello World')
})

const port = 3001
app.listen(port)
console.log(`Server running on port ${port}`)
``` 
import web server module `const http = require('http')`
`createServer` method of the *http* module used to create a new web server. 
An event handler is registered to the server that is called every time an HTTP request is made to the server's address http:/localhost:3001.
The request is responded with the status code 200 and other stuffs. 
...

### Express instead of built-in http web server
dependencies of expres will be created in *package.json* file
```
npm install express --save
```
Import express into the application
```
const express = require('express')
const app = express()
```
Define routes to the application. This one defines an event handler, that is used to handle HTTP GET request made to the application's /root:
```
app.get('/', (request, response) => {
response.send('<h1>Hello world!</h1>') 
})
```

### nodemon
A Nodejs application does not restart by itself whenever we make changes to its code. We have to shut the application down first with `Ctrl+C`, then restart it. This is not convenient, and thus nodemon comes in handy. 
We install nodemon by defining it as a development dependency:
```
npm install --save-dev nodemon
```
### body-parser library for easy access to data
Here is how to add a new entry into the server: adding a new entry happens by making an HTTP POST request to the address http://localhost:3001/api/persons, and by sending all the information for the new entry in the request body in the JSON format. We need body-parser library to access the data easily.
Let's import body-parser and implement and initial handler for dealing with the HTTP POST requests:
```
const bodyParser = require('body-parser')

app.use(bodyParser.json())

app.post('/api/persons', (request, response) => {
const person = request.body
console.log(person)
response.json(person)
})
```
The event handler function can access the data from the *body* property of the `request` object. Without a body-parser, the *body* property would be undefined.
...
### Middleware
The body-parser is a so-called middleware. Middleware are functions that can be used for handling request and response objects. 
Let's implement our own middleware that prints information about every request that is sent to the server. Middleware is a function that receives three parameters:
```
const requestLogger = (request, response, next) => {
console.log('Method': request.method)
console.log('Path: ', request.path)
```
