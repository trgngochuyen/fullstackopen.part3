const mongoose = require('mongoose')

if ( process.argv.length > 3 && process.argv.length < 5 ) {
    console.log('give your password, a new name, and a new number as argument to add a new entry')
    process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://huyentruong:${password}@cluster0-icjwl.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true })


const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
    name: name,
    number: number,
})

if (!name && !number) {
    Person.find({}).then(persons => {
        console.log('phonebook: ')
        persons.map(person => {
            console.log(person.name, person.number)
        })
        mongoose.connection.close()
    })
}

if (name && number && process.argv.length > 5) {
    console.log('If the name contains whitespace, put it in double quote "..."')
    mongoose.connection.close()
}

if (name && number && process.argv.length === 5) {
    person.save().then(response => {
        console.log(`added ${name} ${number} to phonebook`)
        mongoose.connection.close()
    })
}