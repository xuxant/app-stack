const express = require('express')
const userRoute = require('./routes/app')
const cors = require('cors')
const port = 5000

const app = express()

app.use(cors())
app.use(express.json())

app.use(userRoute)

app.listen(port, () => {
    console.log('Server is listning on port ' + port)
})
