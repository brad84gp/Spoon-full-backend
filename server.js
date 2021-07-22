const app = require('./app')
const {PORT} = require('./config')

app.listen(PORT, function(){
    console.log(`Port started on http://localhost:${PORT}`)
})