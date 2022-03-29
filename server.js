const express = require('express');
const cluster = require('cluster');
const os = require('os');

const app = express()

function delay(duration){
    const start = Date.now()
    while(Date.now() - start < duration){
        //Event loop is blocked
    }
}

app.get('/', (req,res) => {
    res.send(`Performance example: PID ${process.pid}`)
})

app.get('/timer', (req,res) => {

    //Blocking functions
    //  JSON.stringify({}) = '{}'
    //  JSON.parse('{}') = {}
    //  [].sort()

    // Delay response
    delay(9000)
    res.send(`TIME. PID: ${process.pid}`)
})

console.log('Running server.js');
if (cluster.isMaster) {
    console.log("Master Started ...");
    const NUM_WORKERS = os.cpus().length
    for (let index = 0; index < NUM_WORKERS; index++) {      
        cluster.fork()  
    }
}else{
    console.log("Worker Started ...");
    app.listen(3000)
}