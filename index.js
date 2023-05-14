const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)

let connectedUsers = 0

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

io.on('connection', (socket) => {
    connectedUsers++
    io.emit('user', connectedUsers)
    console.log(`Um usuário se conectou!\nUsuários conectados agora: ${connectedUsers}`)

    socket.on('chat message', (msg) => {
        console.log(`Mensagem: ${msg}`)
        io.emit('chat message', msg)
    })

    socket.on('disconnect', () => {
        connectedUsers = (connectedUsers - 1)
        io.emit('user', connectedUsers)
        console.log(`Um usuário se desconectou...\nUsuários conectados agora: ${connectedUsers}`)
    })
})

server.listen(3000, () => {
    console.log('Servidor iniciado na porta: 3000')
})