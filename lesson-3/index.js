const logEvent = require("./logEvent");


const EventEmitter = require("events");

class MyEmitter extends EventEmitter {}

const emitter = new MyEmitter();

emitter.on("log", (msg) => logEvent(msg))

setTimeout(() =>{
    emitter.emit("log", "Log event emitted!")
}, 2000)