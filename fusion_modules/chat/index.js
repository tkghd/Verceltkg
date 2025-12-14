const express=require("express"),http=require("http");
const {Server}=require("socket.io");
const app=express(); app.use(express.json({limit:"64kb"}));
app.get("/healthz",(r,s)=>s.status(200).json({ok:true,ts:new Date().toISOString()}));
app.use(express.static(__dirname+"/public"));
const srv=http.createServer(app);
const io=new Server(srv,{path:"/socket",cors:{origin:"*"},maxHttpBufferSize:1e6});
const rooms=new Map(); // {roomId: Set<socket.id>}
function safeStr(s){ return String(s||"").slice(0,256); }
io.on("connection",(socket)=>{
  socket.on("join",(roomId,alias)=>{
    roomId=safeStr(roomId); alias=safeStr(alias);
    if(!rooms.has(roomId)) rooms.set(roomId,new Set());
    rooms.get(roomId).add(socket.id);
    socket.join(roomId); socket.data.alias=alias;
    io.to(roomId).emit("system",{type:"join",alias,roomId,ts:new Date().toISOString()});
  });
  socket.on("leave",(roomId)=>{
    roomId=safeStr(roomId);
    rooms.get(roomId)?.delete(socket.id);
    socket.leave(roomId);
    io.to(roomId).emit("system",{type:"leave",alias:socket.data.alias||"",roomId,ts:new Date().toISOString()});
  });
  socket.on("msg",(payload)=>{
    const roomId=safeStr(payload?.roomId);
    const text=safeStr(payload?.text);
    if(!roomId || !text) return;
    io.to(roomId).emit("msg",{roomId,text,alias:socket.data.alias||"",ts:new Date().toISOString()});
  });
  socket.on("disconnect",()=>{
    for(const [room,set] of rooms.entries()){
      if(set.delete(socket.id)){
        io.to(room).emit("system",{type:"disconnect",alias:socket.data.alias||"",roomId:room,ts:new Date().toISOString()});
      }
    }
  });
});
const PORT=process.env.PORT||3150;
srv.listen(PORT,()=>console.log("[chat] listening",PORT));
