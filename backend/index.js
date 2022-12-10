const connectTOMongo = require('./db')
const express = require('express')
const cors = require('cors')

connectTOMongo();


const app = express()
app.use(cors())
const port = 5000

// app.get('/api/auth', (req, res) => {
//   res.send('Hello World!')
// })

//This is required if we want to send data in json
app.use(express.json());
app.use('/api/auth', require('./routes/auth'))

app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})