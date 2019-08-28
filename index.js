require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const Person = require('./models/person')

app.use(bodyParser.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :person'))
app.use(cors())
app.use(express.static('build'))

morgan.token('person', (req, res) => {
    return JSON.stringify(req.body)
})

// Error handler middleware

const errorHandler = (error, req, res, next) => {
    console.error(error.message)

    if (error.name === 'CastError' && error.kind === 'ObjectId') {
        return res.status(400).send({error: 'malformatted id'})
    }
    next(error)
}
app.use(errorHandler)
/////////////////

app.get('/api/persons', (req, res) => {
    Person.find({}).then(people => {
        res.json(people.map(person => person.toJSON()))
    } )
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndRemove(req.params.id)
        .then(result => {
            res.status(204).end()
        })
        .catch(error => next(error))    
})

app.post('/api/persons', (req, res) => {
    //const nameList = persons.map(person => person.name)
    const body = req.body
    if (!body.name) {
        return res.status(400).json({
            error: 'Missing name'
        })
    } else if (!body.number) {
        return res.status(400).json({
            error: 'Missing number'
        })
    } /*else if (nameList.includes(body.name)) {
        return res.status(400).json({
            error: 'Name ' + body.name + ' already exists!'
        })
    }*/
    const person = new Person({
        name: body.name,
        number: body.number,
    })

    person.save().then(savedPerson => {
        res.json(savedPerson.toJSON())
    })
})

app.get('/info', (req, res) => {
    let message = (
        '<p>Phonebook has info for '+ persons.length+ ' people</p>' + new Date()
    )
    res.send(message)
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
