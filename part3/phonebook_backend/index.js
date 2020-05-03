const express = require('express')
const app = express()
const PORT = 3001

app.use(express.json())

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

app.get('/api/persons', (request, response) => response.json(persons))

app.get('/info', (request, response) =>
  response.send(
    `Phonebook has info for ${persons.length} people
    <br>
    <br>
    ${new Date()}`
  ))

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)
  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const name = request.body.name
  const number = request.body.number
  if (!name) {
    return response.status(400).json({
      error: 'name field missing'
    })
  }
  if (!number) {
    return response.status(400).json({
      error: 'number field missing'
    })
  }

  if (persons.map(person => person.name).includes(name)) {
    return response.status(400).json({
      error: 'name already exists'
    })
  }

  const newPerson = { name: name, number: number, id: randomId() }
  persons = persons.concat(newPerson)
  response.json(newPerson)
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

const randomId = () => {
  const range = 1000000
  return Math.floor(Math.random() * range)
}