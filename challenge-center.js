import {SCENARIOS,createProfile,startScenario,chooseDecision,validateProfile} from "./challenge-engine.mjs";

(() => {
  "use strict";
  const KEY="executiveos-challenges-v1";
  const $=id=>document.getElementById(id);
  const esc=value=>String(value).replace(/[&<>"']/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));
  let profile=createProfile();
  try{const stored=JSON.parse(localStorage.getItem(KEY)||"null");if(validateProfile(stored))profile=stored;}catch(error){}
  function notice(message){const node=$("challengeNotice");if(node)node.textContent=message;}
  function money(value){return "$"+Math.round(Number(value)||0).toLocaleString("en-US");}
  function statCard(label,value,percent){return '<div class="challenge-stat"><span>'+label+'</span><b>'+value+'</b><div class="progress"><i style="width:'+Math.max(0,Math.min(100,percent))+'%"></i></div></div>';}
  function renderRun(){
    const run=profile.current;if(!run)return '<div class="challenge-empty">Choose a scenario above to begin your first executive challenge.</div>';
    const scenario=SCENARIOS.find(item=>item.id===run.scenarioId);
    const stats=run.stats;
    let html='<section class="challenge-run"><div class="challenge-run-head"><div><span class="challenge-tag">'+(run.complete?"Challenge completed":"Active challenge · Round "+(run.round+1)+" of 3")+'</span><h2>'+esc(scenario.title)+'</h2><p class="muted smalltext">'+esc(scenario.description)+'</p></div><span class="pill">'+esc(scenario.difficulty)+'</span></div>';
    html+='<div class="challenge-stats">'+statCard("Cash reserve",money(stats.cash),stats.cash/500000*100)+statCard("Board trust",stats.trust+"/100",stats.trust)+statCard("Resilience",stats.resilience+"/100",stats.resilience)+statCard("Reputation",stats.reputation+"/100",stats.reputation)+statCard("Risk exposure",stats.exposure+"/100",stats.exposure)+'</div>';
    html+='<div class="challenge-objective"><b>Success objective:</b> '+esc(scenario.objective.text)+'</div>';
    if(run.complete){
      html+='<div class="challenge-result"><div class="challenge-grade">'+esc(run.grade)+'</div><div><b>Final score: '+run.score+'/100</b><p class="muted smalltext">'+(run.objectiveMet?"Objective achieved. Your response met the scenario brief.":"Objective missed. Review the decision history and try a different strategy.")+'</p></div></div>';
      html+='<div class="smalltext muted" style="margin-top:12px"><b>Decisions taken</b>'+run.decisions.map(item=>'<div class="challenge-history-item"><span>Round '+item.round+' · '+esc(item.title)+'</span><b>'+money(item.cost)+'</b></div>').join("")+'</div>';
    }else{
      const round=scenario.rounds[run.round];
      html+='<h3 style="margin:18px 0 6px;font-size:16px">'+esc(round.prompt)+'</h3><p class="muted smalltext">Choose one response. Decisions are final for this run and affect your final score.</p><div class="challenge-decisions">'+round.choices.map(choice=>'<button type="button" class="challenge-decision" data-challenge-choice="'+esc(choice.id)+'"><b>'+esc(choice.title)+'</b><span>'+esc(choice.detail)+'</span><small>Investment: '+money(choice.cost)+'</small></button>').join("")+'</div>';
      html+='<div class="smalltext muted" style="margin-top:12px">Decision rounds completed: '+run.round+'/3 · Progress is not saved until you select Save progress.</div>';
    }
    return html+'</section>';
  }
  function render(){
    const bestScores=Object.values(profile.best).map(item=>item.score);
    const best=bestScores.length?Math.max(...bestScores):0;
    $("challengeKpis").innerHTML='<div class="challenge-kpi"><span>Scenarios available</span><strong>'+SCENARIOS.length+'</strong></div><div class="challenge-kpi"><span>Completed runs</span><strong>'+profile.completed+'</strong></div><div class="challenge-kpi"><span>Personal best</span><strong>'+best+'/100</strong></div><div class="challenge-kpi"><span>Scenarios mastered</span><strong>'+Object.keys(profile.best).length+'/'+SCENARIOS.length+'</strong></div>';
    $("challengeScenarios").innerHTML=SCENARIOS.map(scenario=>{
      const record=profile.best[scenario.id];
      const active=profile.current&&profile.current.scenarioId===scenario.id&&!profile.current.complete;
      return '<article class="challenge-card"><span class="challenge-tag">'+esc(scenario.difficulty)+' · '+esc(scenario.tag)+'</span><h3>'+esc(scenario.title)+'</h3><p>'+esc(scenario.description)+'</p><div class="challenge-objective">'+esc(scenario.objective.text)+'</div><div class="challenge-card-foot"><span class="smalltext muted">'+(record?"Best: "+record.grade+" · "+record.score+"/100":"No record yet")+'</span><button class="btn small '+(active?"":"secondary")+'" type="button" data-challenge-start="'+scenario.id+'">'+(active?"Resume":"Play scenario")+'</button></div></article>';
    }).join("");
    $("challengeActive").innerHTML=renderRun();
    $("challengeHistory").innerHTML=profile.history.length?profile.history.map(item=>'<div class="challenge-history-item"><span><b>'+esc(item.title)+'</b><small class="muted"> · '+new Date(item.date).toLocaleDateString()+(item.objectiveMet?" · Objective met":" · Objective missed")+'</small></span><b>'+esc(item.grade)+' · '+item.score+'/100</b></div>').join(""):'<div class="challenge-empty">Completed scenarios and personal bests will appear here.</div>';
  }
  function save(){try{localStorage.setItem(KEY,JSON.stringify(profile));notice("Challenge progress saved on this device.");}catch(error){notice("Could not save: browser storage is unavailable.");}}
  function download(){
    const blob=new Blob([JSON.stringify(profile,null,2)],{type:"application/json"});
    const url=URL.createObjectURL(blob);const link=document.createElement("a");
    link.href=url;link.download="executiveos-challenge-save.json";link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
    notice("Challenge profile exported.");
  }
  function pageMarkup(){
    const page=document.createElement("section");page.className="page";page.id="page-challenges";page.dataset.route="challenges";
    page.innerHTML='<div class="shell challenge-shell"><div class="pagehead"><div><div class="eyebrow">ExecutiveOS expansion / 11</div><h1>Executive Challenges.</h1><p>Handle high-pressure corporate decisions across six fictional crisis scenarios. Every choice changes your cash reserves, board confidence, resilience, reputation and risk exposure.</p></div><span class="pill">LOCAL · MANUAL SAVE</span></div><div class="challenge-toolbar"><div><b>CHALLENGE CONTROL</b><small id="challengeNotice">Challenge progress is separate from your other game saves.</small></div><div class="challenge-toolbar-actions"><button class="btn small" id="challengeSave" type="button">Save progress</button><button class="btn small secondary" id="challengeExport" type="button">Export</button><label class="btn small secondary" for="challengeImport">Import<input id="challengeImport" type="file" accept="application/json,.json" hidden></label></div></div><div class="challenge-kpis" id="challengeKpis"></div><div class="sectionhead"><div><div class="eyebrow">Choose your scenario</div><h2>Boardroom crisis desk</h2></div><p>Three rounds per scenario. Your final grade reflects financial discipline, stakeholder confidence and operational control.</p></div><div class="challenge-grid" id="challengeScenarios"></div><div class="sectionhead"><div><div class="eyebrow">Live decision room</div><h2>Current challenge</h2></div><p>Make deliberate trade-offs. There is no single perfect path through every crisis.</p></div><div id="challengeActive"></div><div class="sectionhead"><div><div class="eyebrow">Personal record</div><h2>Recent results</h2></div></div><div class="challenge-history" id="challengeHistory"></div><p class="world-footnote">All scenarios and outcomes are fictional. Challenge saves are stored separately in this browser. Export a JSON backup before changing devices or clearing browser storage.</p></div>';
    document.querySelector("main").appendChild(page);
    const nav=$("navlinks");if(nav&&!$("challengeNavButton")){const button=document.createElement("button");button.className="navbtn";button.id="challengeNavButton";button.dataset.page="challenges";button.type="button";button.textContent="Executive Challenges";nav.appendChild(button);}
    if(location.hash==="#challenges"){page.classList.add("active");document.querySelectorAll(".navbtn").forEach(button=>button.classList.toggle("active",button.dataset.page==="challenges"));}
  }
  pageMarkup();render();
  document.addEventListener("click",event=>{
    const start=event.target.closest("[data-challenge-start]");
    if(start){
      if(profile.current&&!profile.current.complete&&!window.confirm("Starting another scenario will replace the current unsaved challenge. Continue?"))return;
      profile=startScenario(profile,start.dataset.challengeStart);render();notice("Scenario started. Make your first decision.");
      return;
    }
    const choice=event.target.closest("[data-challenge-choice]");
    if(choice){try{profile=chooseDecision(profile,choice.dataset.challengeChoice);render();if(profile.current.complete)notice("Scenario complete. Your result is ready to review.");else notice("Decision recorded. Continue to the next round.");}catch(error){notice(error.message);}return;}
    if(event.target.closest("#challengeSave")){save();return;}
    if(event.target.closest("#challengeExport")){download();}
  });
  $("challengeImport").addEventListener("change",async event=>{
    const file=event.target.files&&event.target.files[0];if(!file)return;
    try{const imported=JSON.parse(await file.text());if(!validateProfile(imported))throw new Error("Invalid challenge save");profile=imported;render();notice("Challenge save imported into this session. Select Save progress to keep it.");}
    catch(error){notice("Import failed: this is not a valid Executive Challenge save.");}
    event.target.value="";
  });
})();
