const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

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

let message = (
    '<p>Phonebook has info for '+ persons.length+ ' people</p>' + new Date()
)
app.get('/', (req, res) => {
    res.send('<h1>Here I am!</h1>')
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
    const body = req.body
    if (!body.name) {
        return res.status(400).json({
            error: 'name and number missing'
        })
    }
    const person = {
        name: body.name,
        number: body.number,
        id: generateId(0,1000000),
    }
    persons = persons.concat(person)
    console.log(person)
    res.json(person)
})

app.get('/info', (req, res) => {
    res.send(message)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
