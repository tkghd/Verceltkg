import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import { ethers } from "ethers";

const app = express();
const server = http.createServer(app);
const io = new Server(server,{cors:{origin:"*"}});

app.use(cors());
app.use(express.json());

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

let state = {
  address: wallet.address,
  balance: "0",
  logs: []
};

async function sync(){
  state.balance = ethers.formatEther(
    await provider.getBalance(wallet.address)
  );
}

function log(type,data={}){
  const e={type,time:Date.now(),...data};
  state.logs.unshift(e);
  io.emit("event",e);
}

await sync();

app.get("/api/state",(r,s)=>s.json(state));

app.post("/api/transfer",async(r,s)=>{
  const tx = await wallet.sendTransaction({
    to: r.body.to,
    value: ethers.parseEther(r.body.amount)
  });
  log("TRANSFER",{hash:tx.hash});
  await sync();
  s.json({ok:true,hash:tx.hash});
});

app.post("/api/nft/mint",(r,s)=>{
  log("NFT",{to:r.body.to});
  s.json({ok:true});
});

io.on("connection",()=>{
  io.emit("state",state);
  log("HUD_CONNECT");
});

server.listen(3100,()=>console.log("🔥 API ONLINE"));
