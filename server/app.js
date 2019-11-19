const express = require('express')
const app = express()
const db = require('./db')

const userRoute = require('./routes/userRoutes')

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(userRoute)

db.connect(() => {
	const server = app.listen(8080, (error) => {
		if (error) {
			console.log("Error with running the server", error)
		}
		console.log("Server is listening on port", server.address().port)
	})
})
