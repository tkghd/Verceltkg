sudo bash -c ' set -e
# --- BASE SETUP ---
BASE=/opt/fusion mkdir -p 
$BASE/{sync_engine/bin,cards,ledger,logs,tmp}
# --- WRITE AUTO SYNC ENGINE (JS) ---
cat > $BASE/sync_engine/bin/engine.js << 
"EOF"
#!/usr/bin/env node
const fs=require("fs"); 
const{execSync}=require("child_process"); 
const OWNER=process.env.OWNER||"MASTER"; 
const 
HUD=process.env.HUD_URL||"http://136.116.5.70/hud-sync"; 
const CARD_DIR="/opt/fusion/cards"; const 
LEDGER="/opt/fusion/ledger/ledger.json"; 
function load(){try{return 
JSON.parse(fs.readFileSync(LEDGER));}catch{return[];}} 
function 
save(v){fs.writeFileSync(LEDGER,JSON.stringify(v,null,2));} 
function scan(){
  return 
  fs.readdirSync(CARD_DIR).map(f=>({
    id:f.replace(".png",""), 
    path:`${CARD_DIR}/${f}`
  }));
}
function mint(owner,path){ const 
  id=`TKN-${Date.now()}`; 
  return{tokenId:id,txHash:`SIM-${id}`};
}
function pkpass(card,owner,token){ const 
  tmp=`/opt/fusion/tmp_${Date.now()}`; 
  const 
  out=`/opt/fusion/${card}_${Date.now()}.pkpass`; 
  fs.mkdirSync(tmp,{recursive:true}); 
  fs.writeFileSync(`${tmp}/pass.json`,JSON.stringify({
    formatVersion:1, 
    organizationName:"T-Technology™", 
    serialNumber:String(Date.now()), 
    primaryFields:[{key:"owner",label:"Owner",value:owner}], 
    secondaryFields:[
      {key:"card",label:"Card",value:card}, 
      {key:"token",label:"Token",value:token}
    ]
  },null,2));
  execSync(`cd ${tmp} && zip -r ${out} 
  .`); return out;
}
async function run(){ const 
  ledger=load(); const cards=scan(); 
  for(const c of cards){
    if(!ledger.find(x=>x.cardId===c.id)){ 
      const m=mint(OWNER,c.path); const 
      p=pkpass(c.id,OWNER,m.tokenId); 
      ledger.push({cardId:c.id,owner:OWNER,mint:m,pk:p,ts:Date.now()}); 
      save(ledger); try{
        await fetch(HUD,{ method:"POST", 
          headers:{"Content-Type":"application/json"}, 
          body:JSON.stringify({card:c.id,token:m})
        });
      }catch{}
    }
  }
  console.log("SYNC:",ledger.length);
}
run(); EOF chmod +x 
$BASE/sync_engine/bin/engine.js
# --- SYSTEMD PERMA SERVICE ---
cat > 
/etc/systemd/system/fusion-sync.service 
<< "UNIT" [Unit] Description=Ωβα Fusion 
Auto Sync Engine After=network.target 
[Service] ExecStart=/usr/bin/node 
/opt/fusion/sync_engine/bin/engine.js 
Restart=always RestartSec=2 
Environment=OWNER=MASTER 
Environment=HUD_URL=http://136.116.5.70/hud-sync 
[Install] WantedBy=multi-user.target UNIT 
systemctl daemon-reload systemctl enable 
--now fusion-sync.service
'
