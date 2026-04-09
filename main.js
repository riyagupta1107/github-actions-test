const express = require('express')
const morgan = require('morgan')
const cors = require('cors')


const app = express()
app.use(express.json())

morgan.token('body',(req) => {
    return JSON.stringify(req.body)
})

app.use(
    morgan(':method :url :status :res[content-length] - :response-time ms :body')
  )
let data = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]
app.get('/',(req,res) => {
    res.json(data);
})
app.get('/api/persons',(req,res) => {
    res.json(data)
})
app.get('/info',(req,res) => {
    const total = data.length
    const time = new Date()

    res.send(`
        <p>Phonebook has total ${total} people</p>
        <p> at ${time}</p>
        `)
})
app.get('/api/persons/:id',(req,res) => {
    const id = req.params.id
    const d = data.find(d => d.id === id)
    if (d) res.json(d)
    else res.status(404).end()
})
app.delete('/api/persons/:id',(req,res) => {
    const id = req.params.id
    data = data.filter(d => d.id !== id)
    res.status(204).end()
})
app.post('/api/persons', (req, res) => {
    const body = req.body

    if (!body.name || !body.number) {
        return res.status(400).json({
            error: "name or number missing"
        })
    }
    const exists = data.some(d => d.name === body.name)

    if (exists) {
        return res.status(400).json({
            error: "name must be unique"
        })
    }

    const newPerson = {
        id: String(Math.floor(Math.random() * 1000000)),
        name: body.name,
        number: body.number
    }

    data.push(newPerson)

    res.status(201).json(newPerson)
})

app.listen(3001, () => {
    console.log("server is running on port 3001");
})