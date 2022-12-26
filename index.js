const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const SocketServer = require('websocket').server
const http = require('http')

const server = http.createServer((req, res) => {})

server.listen(port, ()=>{
  console.log("Listening on port ", port)
})

const wsServer = new SocketServer({httpServer:server})

const connections = []

wsServer.on('request', (req)=>{
  const connection = req.accept()
  console.log('new connection')
  connections.push(connection)

  connection.on('message', (mes)=>{
    console.log(mes)
    connections.forEach(element=>{
      if(element != connection){
        console.log('this')
        element.send(mes.utf8Data)
      }
    })
  })

  connection.on('close', (resCode, des)=>{
    console.log('connection closed')
    connections.splice(connections.indexOf(connection), 1)
  })
})