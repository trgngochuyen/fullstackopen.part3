const express = require('express')
const morgan = require('morgan')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(bodyParser.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :person'))
app.use(cors())

morgan.token('person', (req, res) => {
    return JSON.stringify(req.body)
})


let persons = [
    {
    "name": "Arto Hellas",
    "number": "040-123456",
    "id": 1
    },
    {
    "name": "Ada Lovelace",
    "number": "39-44-5323523",
    "id": 2
    },
    {
    "name": "Dan Abramov",
    "number": "12-43-234345",
    "id": 3
    },
    {
    "name": "Mary Poppendieck",
    "number": "39-23-6423122",
    "id": 4
    }
]

app.get('/', (req, res) => {
    res.send('<h1>Here I am!</h1>')
    console.log('Hello there')
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
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

app.delete('/api/persons/:id', (req, res) => {
    
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)
    res.status(204).end()
})

app.post('/api/persons', (req, res) => {
    const generateId = (min, max) => {
        const id = Math.floor(Math.random()*(max-min)+min)
        return id
    }
    const nameList = persons.map(person => person.name)
    const body = req.body
    if (!body.name) {
        return res.status(400).json({
            error: 'Missing name'
        })
    } else if (!body.number) {
        return res.status(400).json({
            error: 'Missing number'
        })
    } else if (nameList.includes(body.name)) {
        return res.status(400).json({
            error: 'Name ' + body.name + ' already exists!'
        })
    }
    const person = {
        name: body.name,
        number: body.number,
        id: generateId(0,1000000),
    }
    persons = persons.concat(person)
    //console.log(person)
    res.json(person)
})

app.get('/info', (req, res) => {
    let message = (
        '<p>Phonebook has info for '+ persons.length+ ' people</p>' + new Date()
    )
    res.send(message)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
