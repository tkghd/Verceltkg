const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const fs = require("fs");

const app = express();
app.use(express.json());
app.use(require("cors")());

let balance = 100000000;
let logs = [];

app.post("/api/transfer", (req,res)=>{
  balance -= 1000;
  const log = { time:new Date(), action:"TRANSFER", amount:1000 };
  logs.push(log);
  broadcast();
  res.json({status:"ok", balance});
});

app.get("/api/state",(req,res)=>{
  res.json({balance, logs});
});

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

function broadcast(){
  const data = JSON.stringify({balance, logs});
  wss.clients.forEach(c=>c.readyState===1 && c.send(data));
}

server.listen(4000, ()=>console.log("CORE ONLINE"));
