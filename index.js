const express = require('express')
const historyRouter = require('./routes/history.router')

const PORT = process.env.PORT || 8080
const app = express() 

app.use(express.json())
app.use('/history', historyRouter)

app.listen(PORT, () => console.log(`Сервер был запущен на порте ${PORT}`))