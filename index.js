const express = require("express");
const morgan = require("morgan");
const app = express();
const PORT = 3300;

app.use(express.json());

app.use(morgan('tiny'));

let persons = [
    {
        id: "1",
        name: "Arto Hellas",
        number: "040-123456",
    },
    {
        id: "2",
        name: "Ada Lovelace",
        number: "39-44-5323523",
    },
    {
        id: "3",
        name: "Dan Abramov",
        number: "12-43-234345",
    },
    {
        id: "4",
        name: "Mary Poppendieck",
        number: "39-23-6423122",
    },
];

app.get("/", (req, res) => {
    res.send("<h1>Hello Persons!</h1>");
});

app.get("/api/persons", (req, res) => {
    res.json(persons);
});

app.get("/info", (req, res) => {
    res.send(`<p>Phonebook has info for ${persons.length} people</p><p>${new Date()}</p>`);
});

app.get('/api/persons/:id', (req, res) =>  {
    const id = req.params.id;
    const person = persons.find(person => person.id === id);
    if (!person) {
        res.status(404).end();
        return;
    }
    res.json(person);
});

app.delete('/api/persons/:id', (req, res) => {
    const id =  req.params.id;
    persons = persons.filter(person => person.id !== id);
    
    res.status(204).end();
})

app.post('/api/persons/', (req, res) => {
    const body = req.body;
    if (!body.name && !body.number) {
        return res.status(400).json({
            error: 'Name and number are missing'
        })
    } else if (!body.name) {
        return res.status(400).json({
            error: 'Name is missing'
        })
    } else if (!body.number) {
        return res.status(400).json({
            error: 'Number is missing'
        })
    }
    const personExists = persons.find(person => person.name === body.name);
    if (!personExists) {
        return res.status(400).json({
            error: "Person's name must be unique"
        })
    }
    const person = {
        "id": Math.floor(Math.random() * 100000000),
        "name": body.name,
        "number": body.number
    }
    persons = [...persons, person];
    res.json(person);
})

app.listen(PORT);
console.log(`The server is running on http://localhost:${PORT}`);
