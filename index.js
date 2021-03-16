const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(express.json())
app.use(morgan('tiny'))

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
]

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/info', (req, res) => {
  const numberOfContacts = persons.length
  res.send(`<p>Phonebook has info for ${numberOfContacts} people</p>
	<p>${new Date()}</p>`)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find((person) => person.id === id)
  person ? res.json(person) : res.status(404).end()
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter((person) => person.id !== id)
  res.status(204).end()
})

app.post('/api/persons', (req, res) => {
  const body = req.body

  if (!body.name) {
    return res.status(400).json({ error: 'name is missing' })
  }
  if (!body.number) {
    return res.status(400).json({ error: 'number is missing' })
  }
  if (
    persons.find(
      (person) => person.name.toLocaleLowerCase() === body.name.toLowerCase()
    )
  ) {
    return res.status(400).json({ error: 'name must be unique' })
  }

  const id = Math.floor(Math.random() * 1000 + 5)
  const person = { id, ...body }
  persons = persons.concat(person)
  res.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
