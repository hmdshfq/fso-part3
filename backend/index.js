require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const mongoose = require("mongoose")
const { Person, connectDB } = require("./models/person.js")
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.static("dist"))

morgan.token("post", (request) => {
  return request.method === "POST" && JSON.stringify(request.body)
})

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :post")
)

app.get("/api/people", async (req, res) => {
  const people = await Person.find({})
  res.json(people)
})

app.get("/info", async (req, res) => {
  const people = await Person.find({})
  res.send(`<h1>There are ${people.length} people in the phonebook.</h1>`)
})

app.get("/api/people/:id", async (req, res) => {
  const id = Number(req.params.id)
  const people = await Person.find({})
  const person = people.find((person) => person.id === id)
  if (!person) {
    res.status(404).end()
    return
  }
  res.json(person)
})

app.delete("/api/people/:id", async (req, res) => {
  const id = req.params.id

  // Check if id is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid id format" })
  }

  const deletedPerson = await Person.findByIdAndDelete(id)

  if (!deletedPerson) {
    return res.status(404).json({ error: "Person not found" })
  }

  res.status(204).end()
})

app.post("/api/people/", async (req, res) => {
  const body = req.body
  if (!body.name && !body.number) {
    return res.status(400).json({
      error: "Name and number are missing",
    })
  } else if (!body.name) {
    return res.status(400).json({
      error: "Name is missing",
    })
  } else if (!body.number) {
    return res.status(400).json({
      error: "Number is missing",
    })
  }
  const personExists = await Person.findOne({ name: body.name })

  if (personExists) {
    return res.status(400).json({
      error: "Person's name must be unique",
    })
  }
  const person = new Person({
    name: body.name,
    number: body.number,
  })
  const savedPerson = await person.save()
  res.json(savedPerson)
})
;(async () => {
  await connectDB
  app.listen(port, "::", () => {
    console.log(`Server listening on [::]${port}`)
  })
})()
