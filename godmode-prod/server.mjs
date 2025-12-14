import express from "express";
import http from "http";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/health", (_,res)=>res.json({ok:true}));
app.post("/api/transfer", async (req,res)=>{
  const { to, value } = req.body;
  res.json({ ok:true, to, value, simulated:true });
});

const PORT = process.env.PORT || 3100;
const server = http.createServer(app);

server.listen(PORT, "0.0.0.0", ()=>{
  console.log("LISTENING ON", PORT);
});
