const express=require('express'); const app=express();
try{const godmodeCore=require('./godmode-core.js');godmodeCore(app);}catch(e){console.warn('godmode-core missing');}
app.get('/',(req,res)=>res.send('UI OK'));
app.get('/api/godmode/status',(req,res)=>res.json({status:'ok',timestamp:Date.now()}));
const PORT=process.env.PORT||3000; app.listen(PORT,()=>console.log('Server running on '+PORT));
