const express = require('express')
const Cors = require('cors')
const db = require('./db')
const userRoutes = require('./routes/userRoutes')
const emailRoutes = require('./routes/emailRoutes')

const app = express()

app.use(Cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*")
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
//   next()
// })

app.use(userRoutes)
app.use(emailRoutes)

db.connect(() => {
  const server = app.listen(8080, (error) => {
    if (error) {
      console.log('Error with running the server', error)
    }
    console.log('Server is listening on port', server.address().port)
  })
})
