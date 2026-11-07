/* ExecutiveOS World Simulation expansion — independent, manual-save local module. */
(() => {
  "use strict";
  const KEY = "executiveos-world-v1";
  const seed = () => ({
    cycle: 1, cash: 2500000, reputation: 50, influence: 10, stability: 72,
    market: 100, mood: "Steady", research: 0, tech: [], regions: ["Home Market"],
    workforce: 12, capacity: 1, boardTrust: 60, rivalWins: 0, deals: 0,
    history: ["World simulation initialized. The board expects results."],
    rivals: [
      {name:"Apex Dynamics", sector:"Technology", value:1800000, strength:54, aggression:42},
      {name:"Greenline Group", sector:"Energy", value:1450000, strength:46, aggression:30},
      {name:"Titan Logistics", sector:"Transport", value:1250000, strength:39, aggression:55},
      {name:"Velvet Commerce", sector:"Retail", value:980000, strength:34, aggression:36}
    ],
    missions: {market:0, research:0, regions:0, rivalry:0}
  });
  let state = seed();
  let activeTab = "overview";
  const $ = id => document.getElementById(id);
  const money = n => "$" + Math.round(Number(n)||0).toLocaleString("en-US");
  const clamp = (n,a,b) => Math.max(a,Math.min(b,n));
  const esc = s => String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const log = msg => { state.history.unshift("Cycle "+state.cycle+" · "+msg); state.history=state.history.slice(0,30); };
  const saved = () => { try { const x=JSON.parse(localStorage.getItem(KEY)||"null"); if(x&&typeof x==="object"&&Number.isFinite(x.cash)&&Array.isArray(x.rivals)&&Array.isArray(x.regions)){state={...seed(),...x};} } catch(e){} };
  const persist = () => { try { localStorage.setItem(KEY,JSON.stringify(state)); note("World simulation saved on this device."); } catch(e){ note("Could not save: browser storage is unavailable."); } };
  const note = msg => { const n=$("worldNotice"); if(n)n.textContent=msg; };
  const spend = (amount, label) => { if(state.cash<amount){note("Not enough World Treasury funds for "+label+".");return false;}state.cash-=amount;return true; };
  const tabNames = {overview:"World overview",board:"Boardroom",markets:"Markets & rivals",people:"Leadership",research:"Research",missions:"Missions"};
  function pageMarkup(){
    const page=document.createElement("section"); page.className="page";page.id="page-world";page.dataset.route="world";
    page.innerHTML=`
      <div class="shell world-shell">
        <div class="pagehead"><div><div class="eyebrow">ExecutiveOS expansion / 10</div><h1>World Simulation.</h1><p>Build a corporate power network across fictional markets. Rival firms evolve, the board remembers your choices, and each world cycle changes the business climate.</p></div><span class="pill">LOCAL WORLD · MANUAL SAVE</span></div>
        <div class="world-toolbar"><div><b>WORLD CONTROL</b><small id="worldNotice">Your world changes stay in memory until you save.</small></div><div class="world-toolbar-actions"><button class="btn small" id="worldAdvance">Advance world cycle ↗</button><button class="btn small secondary" id="worldSave">Save world</button><button class="btn small secondary" id="worldExport">Export</button><label class="btn small secondary world-import">Import<input id="worldImport" type="file" accept="application/json,.json" hidden></label></div></div>
        <div class="world-kpis" id="worldKpis"></div>
        <div class="world-tabs" id="worldTabs"></div>
        <div id="worldContent"></div>
        <p class="world-footnote">All companies, markets, money and events in this expansion are fictional. World Simulation uses a separate local save from the original CEO Simulator; use Export for a backup. No network calls, accounts, ads or paid services.</p>
      </div>`;
    document.querySelector("main").appendChild(page);
    const nav=$("navlinks");const b=document.createElement("button");b.className="navbtn";b.dataset.page="world";b.textContent="World Simulation";nav.insertBefore(b,nav.querySelector('[data-page="achievements"]'));
  }
  const css=document.createElement("style");
  css.textContent=`
  .world-shell{padding-bottom:34px}.world-toolbar{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:17px 19px;border:1px solid var(--line);background:var(--panel);border-radius:16px;margin:20px 0}.world-toolbar b,.world-toolbar small{display:block}.world-toolbar b{font-size:12px;letter-spacing:.1em}.world-toolbar small{font-size:11px;color:var(--muted);margin-top:4px}.world-toolbar-actions{display:flex;gap:8px;flex-wrap:wrap}.world-import{display:inline-flex;align-items:center;cursor:pointer}.world-kpis{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:12px;margin:16px 0}.world-kpi{padding:17px;border:1px solid var(--line);border-radius:14px;background:var(--panel);min-width:0}.world-kpi small{display:block;color:var(--muted);font-size:10px;letter-spacing:.08em}.world-kpi strong{display:block;font-size:clamp(18px,2vw,26px);margin-top:7px;letter-spacing:-.04em}.world-tabs{display:flex;gap:8px;flex-wrap:wrap;margin:22px 0 16px}.world-tab{border:1px solid var(--line);background:var(--panel);color:var(--muted);padding:9px 13px;border-radius:10px;font-weight:700;font-size:12px}.world-tab.active{background:#b9f27c18;border-color:#789b5e;color:var(--green)}.world-grid{display:grid;grid-template-columns:1.15fr .85fr;gap:16px}.world-panel{background:var(--panel);border:1px solid var(--line);border-radius:16px;padding:20px;min-width:0}.world-panel h3{margin:0 0 7px;font-size:17px}.world-panel>p{color:var(--muted);font-size:12px;margin:0 0 15px}.world-statline{display:flex;justify-content:space-between;gap:12px;padding:11px 0;border-bottom:1px solid #ffffff0d;font-size:12px}.world-statline:last-child{border:0}.world-statline span{color:var(--muted)}.world-action{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:13px 0;border-bottom:1px solid #ffffff0d}.world-action:last-child{border:0}.world-action b{display:block;font-size:13px}.world-action small{display:block;color:var(--muted);font-size:11px;margin-top:3px}.world-action .btn{flex:none}.world-rival{display:grid;grid-template-columns:1fr auto;gap:10px;align-items:center;padding:14px 0;border-bottom:1px solid #ffffff0d}.world-rival:last-child{border:0}.world-rival b{font-size:13px}.world-rival small{display:block;color:var(--muted);font-size:11px}.world-rival strong{font-size:13px}.world-meter{height:7px;background:#29352c;border-radius:20px;overflow:hidden;margin-top:7px}.world-meter i{display:block;height:100%;background:var(--green)}.world-feed{display:grid;gap:9px}.world-feed div{padding:11px 12px;border-left:2px solid #789b5e;background:#ffffff04;color:var(--muted);font-size:12px}.world-empty{padding:20px;border:1px dashed var(--line);border-radius:13px;color:var(--muted);font-size:12px}.world-footnote{color:var(--muted);font-size:11px;margin-top:20px}.world-good{color:var(--green)}.world-warn{color:var(--amber)}
  @media(max-width:850px){.world-kpis{grid-template-columns:repeat(3,minmax(0,1fr))}.world-grid{grid-template-columns:1fr}.world-toolbar{align-items:flex-start;flex-direction:column}}
  @media(max-width:600px){.world-kpis{grid-template-columns:repeat(2,minmax(0,1fr))}.world-toolbar-actions{width:100%}.world-toolbar-actions>*{flex:1;justify-content:center}.world-tab{flex:1 1 auto}.world-panel{padding:16px}.world-action{align-items:flex-start;flex-direction:column}.world-action .btn{width:100%}}
  `;
  document.head.appendChild(css);
  function renderKpis(){ $("worldKpis").innerHTML=[
    ["WORLD TREASURY",money(state.cash)],["MARKET INDEX",state.market.toFixed(1)],["BOARD TRUST",state.boardTrust+"%"],["GLOBAL REACH",state.regions.length+" regions"],["TECH LEVEL",state.research+"/6"]
  ].map(x=>'<div class="world-kpi"><small>'+x[0]+'</small><strong>'+x[1]+'</strong></div>').join(""); }
  function action(title,desc,cost,label,code){return '<div class="world-action"><div><b>'+title+'</b><small>'+desc+' · '+money(cost)+'</small></div><button class="btn small secondary" data-world="'+code+'">'+label+'</button></div>';}
  function overview(){return `
    <div class="world-grid">
      <div class="world-panel"><h3>Corporate command</h3><p>One world cycle represents a quarter of market activity.</p>
        <div class="world-statline"><span>Economic climate</span><b>${esc(state.mood)}</b></div><div class="world-statline"><span>Corporate reputation</span><b>${state.reputation}/100</b></div><div class="world-statline"><span>Influence network</span><b>${state.influence} points</b></div><div class="world-statline"><span>Workforce capacity</span><b>${state.workforce} employees · x${state.capacity}</b></div><div class="world-statline"><span>Completed commercial deals</span><b>${state.deals}</b></div>
      </div>
      <div class="world-panel"><h3>World intelligence</h3><p>Recent developments from your corporate universe.</p><div class="world-feed">${state.history.slice(0,7).map(x=>'<div>'+esc(x)+'</div>').join("")}</div></div>
      <div class="world-panel"><h3>Global operations</h3><p>Invest in new markets and improve your ability to compete internationally.</p>
        ${action("Open a regional office","Unlocks a new market and passive influence",350000,"Expand","region")}
        ${action("Build operating capacity","Increase workforce capacity for future expansion",180000,"Upgrade","capacity")}
        ${action("Launch a global campaign","Improve corporate reputation and board confidence",120000,"Launch","campaign")}
      </div>
      <div class="world-panel"><h3>World cycle briefing</h3><p>Each cycle updates market conditions, rival valuations, influence and operating returns.</p><div class="world-statline"><span>Next market settlement</span><b>Cycle ${state.cycle+1}</b></div><div class="world-statline"><span>Rival firms monitored</span><b>${state.rivals.length}</b></div><div class="world-statline"><span>Research projects completed</span><b>${state.tech.length}</b></div><div class="world-statline"><span>Competitive victories</span><b>${state.rivalWins}</b></div><button class="btn" data-world="advance" style="margin-top:15px">Run next world cycle ↗</button></div>
    </div>`; }
  function board(){return `<div class="world-grid"><div class="world-panel"><h3>Boardroom agenda</h3><p>Choose how to lead. Each decision shifts trust, reputation and available funds.</p>
    ${action("Approve employee profit-sharing","Raises morale and board trust; costs $90,000",90000,"Approve","profit")}
    ${action("Fund compliance and sustainability","Improves reputation and market stability",110000,"Fund","compliance")}
    ${action("Declare a strategic pivot","Higher risk, but increases influence and market reach",160000,"Pivot","pivot")}
    ${action("Host shareholder summit","Build confidence and unlock influence",65000,"Host","summit")}
    ${action("Defend against takeover pressure","Strengthen board trust and stability",140000,"Defend","defend")}
    </div><div class="world-panel"><h3>Board confidence</h3><p>Board trust influences your ability to take bold strategic decisions.</p><div class="world-statline"><span>Trust score</span><b>${state.boardTrust}%</b></div><div class="world-meter"><i style="width:${state.boardTrust}%"></i></div><div class="world-statline"><span>Reputation</span><b>${state.reputation}/100</b></div><div class="world-meter"><i style="width:${state.reputation}%"></i></div><div class="world-statline"><span>Stability</span><b>${state.stability}/100</b></div><div class="world-meter"><i style="width:${state.stability}%"></i></div></div></div>`; }
  function markets(){return `<div class="world-grid"><div class="world-panel"><h3>Rival conglomerates</h3><p>Competitors grow every cycle. Challenge them to compete for influence and market share.</p>${state.rivals.map((r,i)=>'<div class="world-rival"><div><b>'+esc(r.name)+'</b><small>'+esc(r.sector)+' · Competitive strength '+r.strength+'/100</small><div class="world-meter"><i style="width:'+r.strength+'%"></i></div></div><div><strong>'+money(r.value)+'</strong><br><button class="btn small secondary" data-world="rival:'+i+'">Challenge</button></div></div>').join("")}</div>
      <div class="world-panel"><h3>Market intelligence</h3><p>Fictional market indicators, recalculated with every world cycle.</p><div class="world-statline"><span>Market index</span><b>${state.market.toFixed(1)}</b></div><div class="world-statline"><span>Climate</span><b>${esc(state.mood)}</b></div><div class="world-statline"><span>Economic stability</span><b>${state.stability}/100</b></div><div class="world-statline"><span>Influence</span><b>${state.influence}</b></div>${action("Market research report","Spend funds to gain influence and reveal competitor trends",45000,"Research","intel")}</div></div>`; }
  function people(){return `<div class="world-grid"><div class="world-panel"><h3>Executive leadership</h3><p>Recruit specialists to improve how your corporation handles growth and volatility.</p>
    ${action("Hire Chief Financial Officer","Improves financial discipline and stability",95000,"Recruit","cfo")}
    ${action("Hire Chief Technology Officer","Improves research output and innovation",115000,"Recruit","cto")}
    ${action("Hire Chief Operations Officer","Improves capacity and operating returns",105000,"Recruit","coo")}
    ${action("Leadership development programme","Improve workforce capacity and board confidence",80000,"Train","training")}
    </div><div class="world-panel"><h3>Workforce dashboard</h3><div class="world-statline"><span>Employees</span><b>${state.workforce}</b></div><div class="world-statline"><span>Capacity multiplier</span><b>x${state.capacity}</b></div><div class="world-statline"><span>Leadership influence</span><b>${state.influence}</b></div><div class="world-statline"><span>Board trust</span><b>${state.boardTrust}%</b></div></div></div>`; }
  const projects=[["Predictive market analytics",70000,"Improves market forecasting"],["Robotics & automation",125000,"Increases operating capacity"],["Clean energy systems",145000,"Improves stability and reputation"],["Advanced materials",190000,"Unlocks higher-value operations"],["Biotechnology division",260000,"Adds innovation and influence"],["Orbital manufacturing",420000,"Late-game technology milestone"]];
  function research(){return `<div class="world-grid"><div class="world-panel"><h3>Technology & innovation</h3><p>Develop six technologies. Each project can be purchased once and contributes to your technology level.</p>${projects.map((p,i)=>'<div class="world-action"><div><b>'+esc(p[0])+'</b><small>'+esc(p[2])+' · '+money(p[1])+'</small></div><button class="btn small '+(state.tech.includes(i)?"":"secondary")+'" data-world="tech:'+i+'" '+(state.tech.includes(i)?"disabled":"")+'>'+(state.tech.includes(i)?"Developed":"Develop")+'</button></div>').join("")}</div><div class="world-panel"><h3>Innovation portfolio</h3><p>${state.tech.length} of 6 technologies developed.</p><div class="world-meter"><i style="width:${state.tech.length/6*100}%"></i></div><div class="world-feed" style="margin-top:15px">${state.tech.length?state.tech.map(i=>'<div>'+esc(projects[i][0])+' · completed</div>').join(""):'<div>No research completed yet. Begin with predictive analytics.</div>'}</div></div></div>`; }
  function missions(){const ms=[["market","Market mover","Reach a market index of 110",state.market>=110],["research","Innovation engine","Complete 2 research projects",state.tech.length>=2],["regions","Global operator","Expand into 3 regions",state.regions.length>=3],["rivalry","Competitive edge","Win 2 rival challenges",state.rivalWins>=2]];return `<div class="world-grid"><div class="world-panel"><h3>Executive mission board</h3><p>Long-term objectives reward patient, balanced management.</p>${ms.map(m=>'<div class="world-action"><div><b>'+m[1]+'</b><small>'+m[2]+'</small></div><span class="'+(m[3]?"world-good":"world-warn")+'">'+(m[3]?"COMPLETED":"IN PROGRESS")+'</span></div>').join("")}</div><div class="world-panel"><h3>Career record</h3><div class="world-statline"><span>World cycles</span><b>${state.cycle}</b></div><div class="world-statline"><span>Regions opened</span><b>${state.regions.length}</b></div><div class="world-statline"><span>Research milestones</span><b>${state.tech.length}/6</b></div><div class="world-statline"><span>Rival victories</span><b>${state.rivalWins}</b></div><div class="world-statline"><span>Commercial deals</span><b>${state.deals}</b></div></div></div>`; }
  function render(){if(!$("worldContent"))return;renderKpis();$("worldTabs").innerHTML=Object.keys(tabNames).map(k=>'<button class="world-tab '+(activeTab===k?"active":"")+'" data-world-tab="'+k+'">'+tabNames[k]+'</button>').join("");$("worldContent").innerHTML=({overview,board,markets,people,research,missions})[activeTab](); }
  function advance(){
    state.cycle++;const shock=(Math.random()*12)-5;state.market=clamp(state.market+shock+(state.tech.includes(0)?1.5:0),55,180);
    const moods=["Expansion","Steady","Slowdown","Recovery","Innovation boom"];state.mood=state.market>125?"Expansion":state.market<80?"Slowdown":moods[Math.floor(Math.random()*moods.length)];
    const drift=state.mood==="Expansion"?1.04:state.mood==="Slowdown"?.94:1.015;
    state.rivals.forEach(r=>{r.value=Math.max(150000,Math.round(r.value*drift*(.98+Math.random()*.05)));r.strength=clamp(r.strength+(Math.random()<.5?-1:1),20,95);});
    const income=Math.round((42000+state.workforce*850)*state.capacity*(state.market/100)*(state.tech.includes(1)?1.18:1));
    state.cash+=income;state.reputation=clamp(state.reputation+(state.mood==="Expansion"?1:0),0,100);state.stability=clamp(state.stability+(state.mood==="Slowdown"?-3:1),20,100);
    log("Cycle settled: "+state.mood+" market; operations generated "+money(income)+".");render();note("Cycle "+state.cycle+" settled. Review the new market climate.");
  }
  function act(code){
    if(code==="advance"){advance();return;}
    if(code.startsWith("rival:")){const i=Number(code.split(":")[1]),r=state.rivals[i];if(!r)return;if(state.cash<50000){note("A challenge requires $50,000.");return;}spend(50000,"rival challenge");const power=state.influence+state.boardTrust*.45+state.tech.length*8+Math.random()*35;if(power>=r.strength){state.rivalWins++;state.influence+=5;state.reputation=clamp(state.reputation+3,0,100);state.cash+=Math.round(r.value*.035);log("Defeated "+r.name+" in a market challenge. Victory bonus awarded.");}else{state.stability=clamp(state.stability-7,0,100);state.boardTrust=clamp(state.boardTrust-4,0,100);log("Lost a market challenge against "+r.name+". Stability and board trust fell.");}render();return;}
    if(code.startsWith("tech:")){const i=Number(code.split(":")[1]),p=projects[i];if(!p||state.tech.includes(i))return;if(spend(p[1],p[0])){state.tech.push(i);state.research=state.tech.length;if(i===0)state.influence+=3;if(i===1)state.capacity=+(state.capacity+.15).toFixed(2);if(i===2){state.stability=clamp(state.stability+8,0,100);state.reputation=clamp(state.reputation+5,0,100);}log("Research completed: "+p[0]+".");render();}return;}
    const actions={
      region:[350000,"regional office",()=>{const names=["Northern Markets","Coastal Trade Zone","Central Industrial Belt","Pacific Innovation Hub","Frontier Growth Region","European Commerce District"];const next=names.find(x=>!state.regions.includes(x));if(!next){note("All available regions are already open.");return false;}state.regions.push(next);state.influence+=4;state.deals++;log("Expanded operations into "+next+".");return true;}],
      capacity:[180000,"operating capacity",()=>{state.capacity=+(state.capacity+.25).toFixed(2);state.workforce+=4;log("Operating capacity expanded.");return true;}],
      campaign:[120000,"global campaign",()=>{state.reputation=clamp(state.reputation+8,0,100);state.boardTrust=clamp(state.boardTrust+4,0,100);log("Global campaign improved reputation and board trust.");return true;}],
      profit:[90000,"profit-sharing",()=>{state.boardTrust=clamp(state.boardTrust+10,0,100);state.workforce+=2;log("Profit-sharing approved. Workforce and board trust increased.");return true;}],
      compliance:[110000,"compliance programme",()=>{state.reputation=clamp(state.reputation+10,0,100);state.stability=clamp(state.stability+8,0,100);log("Compliance programme improved stability and reputation.");return true;}],
      pivot:[160000,"strategic pivot",()=>{state.influence+=8;state.market=clamp(state.market+3,55,180);state.boardTrust=clamp(state.boardTrust-2,0,100);log("Strategic pivot increased influence, with a small board-confidence cost.");return true;}],
      summit:[65000,"shareholder summit",()=>{state.boardTrust=clamp(state.boardTrust+7,0,100);state.influence+=3;log("Shareholder summit improved board confidence.");return true;}],
      defend:[140000,"takeover defence",()=>{state.stability=clamp(state.stability+12,0,100);state.boardTrust=clamp(state.boardTrust+5,0,100);log("Takeover defence strengthened corporate stability.");return true;}],
      intel:[45000,"market intelligence",()=>{state.influence+=4;state.deals++;log("Market research delivered actionable competitor intelligence.");return true;}],
      cfo:[95000,"CFO recruitment",()=>{state.stability=clamp(state.stability+8,0,100);state.influence+=2;log("Chief Financial Officer joined the leadership team.");return true;}],
      cto:[115000,"CTO recruitment",()=>{state.research=Math.min(6,state.research+0);state.influence+=5;state.boardTrust=clamp(state.boardTrust+2,0,100);log("Chief Technology Officer joined the leadership team.");return true;}],
      coo:[105000,"COO recruitment",()=>{state.capacity=+(state.capacity+.1).toFixed(2);state.workforce+=3;log("Chief Operations Officer improved operating capacity.");return true;}],
      training:[80000,"leadership development",()=>{state.workforce+=5;state.boardTrust=clamp(state.boardTrust+4,0,100);log("Leadership development improved workforce capability.");return true;}]
    };
    const a=actions[code];if(!a)return;if(spend(a[0],a[1])){if(a[2]()!==false)render();}
  }
  // Build the page before binding controls: these elements do not exist until pageMarkup() runs.
  pageMarkup();
  saved();
  render();

  document.addEventListener("click",e=>{const tab=e.target.closest("[data-world-tab]");if(tab){activeTab=tab.dataset.worldTab;render();return;}const btn=e.target.closest("[data-world]");if(btn){act(btn.dataset.world);}});
  const bind = (id,event,handler) => { const node=$(id); if(node) node.addEventListener(event,handler); };
  bind("worldAdvance","click",advance);
  bind("worldSave","click",persist);
  bind("worldExport","click",()=>{const blob=new Blob([JSON.stringify(state,null,2)],{type:"application/json"});const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download="executiveos-world-save.json";a.click();URL.revokeObjectURL(url);note("World save exported.");});
  bind("worldImport","change",async e=>{const file=e.target.files&&e.target.files[0];if(!file)return;try{const x=JSON.parse(await file.text());if(!x||!Number.isFinite(x.cash)||x.cash<0||!Number.isInteger(x.cycle)||x.cycle<1||!Array.isArray(x.rivals)||x.rivals.length>20||!x.rivals.every(r=>r&&typeof r.name==="string"&&typeof r.sector==="string"&&Number.isFinite(r.value)&&Number.isFinite(r.strength))||!Array.isArray(x.regions)||x.regions.length>20||!x.regions.every(r=>typeof r==="string")||!Array.isArray(x.history)||x.history.length>100||!x.history.every(r=>typeof r==="string")||!Array.isArray(x.tech)||!x.tech.every(i=>Number.isInteger(i)&&i>=0&&i<projects.length))throw new Error("Invalid save shape");state={...seed(),...x,cash:clamp(x.cash,0,1e15),reputation:clamp(Number(x.reputation)||0,0,100),boardTrust:clamp(Number(x.boardTrust)||0,0,100),stability:clamp(Number(x.stability)||0,0,100)};render();note("World save imported into this session. Use Save world to keep it.");}catch(err){note("Import failed: this file is not a valid World Simulation save.");}e.target.value="";});
  if(location.hash==="#world"){ $("page-world").classList.add("active");document.querySelectorAll(".navbtn").forEach(n=>n.classList.toggle("active",n.dataset.page==="world"));}
})();
