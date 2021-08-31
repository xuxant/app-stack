const express = require('express')
const libraryRoute = require('./routes/app')
const cors = require('cors')
const port = 8000

const app = express()

app.use(cors())
app.use(express.json())

app.use(libraryRoute)

app.listen(port, () => {
    console.log('Server is listning on port ' + port)
})
