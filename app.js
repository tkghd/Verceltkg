app.use(require('express').static(require('path').join(__dirname,'public')));
app.get('/pwa.html',(req,res)=>res.sendFile(__dirname+'/public/pwa.html'));
