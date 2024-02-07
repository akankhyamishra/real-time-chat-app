const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const PORT=process.env.PORT ||5000
const http = require('http').createServer(app);
const io=require('socket.io')(http)


http.listen(PORT,()=>{
    console.log(`listening on http://localhost:${PORT}`);
})

app.use(express.static(__dirname +'/public'))
io.on('connection',(socket)=>{
console.log('connected')
socket.on('message',(msg)=>{
    socket.broadcast.emit('message',msg);
})
})
app.get('/', (req,res)=>{
    res.sendFile(__dirname + '/index.html');
})