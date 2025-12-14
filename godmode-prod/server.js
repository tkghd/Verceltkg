import express from "express";
const app = express();
app.use(express.json());
let logs = [];
let balance = 5000000;

app.post("/api/transfer", async (req,res)=>{
  try {
    const { to, value } = req.body;
    if(!to || !value) throw new Error("Missing to or value");
    const amount = parseFloat(value);
    if(isNaN(amount)) throw new Error("Invalid value");
    logs.push({type:"BANK_TRANSFER", to, value:amount, time:Date.now()});
    balance -= Math.floor(amount * 1e6);
    res.json({ok:true,balance});
  } catch(e) {
    res.status(500).json({ok:false,error:e.message});
  }
});

app.get("/api/balance",(req,res)=>res.json({ok:true,balance}));
app.get("/api/health",(req,res)=>res.json({ok:true}));

app.listen(3100, ()=>console.log("CORE ONLINE on port 3100"));
