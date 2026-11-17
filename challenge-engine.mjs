const clamp=(value,min,max)=>Math.max(min,Math.min(max,value));
const clone=value=>JSON.parse(JSON.stringify(value));

export const SCENARIOS=[
  {
    id:"supply-chain",title:"Supply Chain Breakdown",difficulty:"Operational",tag:"Resilience",
    description:"A port shutdown strands critical components while customer orders keep arriving.",
    objective:{text:"Finish with resilience at 65 or higher and at least $250,000 in reserve.",checks:[{stat:"resilience",min:65},{stat:"cash",min:250000}]},
    rounds:[
      {prompt:"The primary port has closed without warning. How do you protect production?",choices:[
        {id:"diversify",title:"Activate alternate suppliers",detail:"Pay to qualify backup suppliers and split incoming orders.",cost:65000,effects:{resilience:18,trust:5,reputation:3,exposure:-8}},
        {id:"airfreight",title:"Charter emergency air freight",detail:"Restore the fastest deliveries, but spend heavily.",cost:145000,effects:{resilience:13,reputation:4,exposure:-3}},
        {id:"ration",title:"Ration existing inventory",detail:"Protect cash by slowing fulfilment and prioritising key clients.",cost:18000,effects:{resilience:5,trust:-7,reputation:-4,exposure:4}}
      ]},
      {prompt:"A second-tier supplier warns that its own stock is running low. What is your next move?",choices:[
        {id:"stockpile",title:"Build a strategic buffer",detail:"Secure additional stock before prices rise.",cost:90000,effects:{resilience:14,trust:2,exposure:-5}},
        {id:"redesign",title:"Approve substitute components",detail:"Fund engineering changes to widen the supplier pool.",cost:70000,effects:{resilience:12,reputation:3,exposure:-4}},
        {id:"delay",title:"Extend customer delivery windows",detail:"Preserve cash and communicate a controlled delay.",cost:12000,effects:{cash:25000,trust:-4,reputation:-3,resilience:2}}
      ]},
      {prompt:"The board wants a long-term plan before the next reporting cycle.",choices:[
        {id:"dual-source",title:"Mandate dual sourcing",detail:"Pay for permanent redundancy across critical parts.",cost:85000,effects:{resilience:16,trust:5,exposure:-7}},
        {id:"visibility",title:"Invest in supply visibility",detail:"Improve forecasting and supplier monitoring.",cost:55000,effects:{resilience:9,trust:3,exposure:-8}},
        {id:"single-source",title:"Renegotiate the main contract",detail:"Win short-term savings but retain concentration risk.",cost:15000,effects:{cash:45000,resilience:-5,trust:-2,exposure:8}}
      ]}
    ]
  },
  {
    id:"cyber-response",title:"Cyber Incident",difficulty:"Critical",tag:"Security",
    description:"An intrusion is detected in a customer platform. The scope is not yet confirmed.",
    objective:{text:"Reduce exposure to 25 or lower while keeping board trust at 60 or higher.",checks:[{stat:"exposure",max:25},{stat:"trust",min:60}]},
    rounds:[
      {prompt:"Unusual access patterns suggest an active intrusion. What happens first?",choices:[
        {id:"isolate",title:"Isolate affected systems",detail:"Contain the incident and preserve forensic evidence.",cost:70000,effects:{exposure:-18,resilience:8,trust:4}},
        {id:"ransom",title:"Pay the demanded ransom",detail:"Attempt a quick restoration with major uncertainty.",cost:175000,effects:{exposure:9,trust:-8,reputation:-9}},
        {id:"wait",title:"Wait for more evidence",detail:"Avoid immediate disruption, but allow the incident to spread.",cost:0,effects:{exposure:14,resilience:-8,trust:-7}}
      ]},
      {prompt:"Customers are asking whether their information was affected. How do you respond?",choices:[
        {id:"disclose",title:"Issue a verified customer notice",detail:"Communicate known facts and provide support channels.",cost:35000,effects:{trust:12,reputation:8,exposure:-5}},
        {id:"quiet",title:"Keep communications internal",detail:"Delay public attention while the investigation continues.",cost:8000,effects:{trust:-10,reputation:-8,exposure:5}},
        {id:"support",title:"Fund identity and account protection",detail:"Offer practical protection while investigation proceeds.",cost:80000,effects:{trust:9,reputation:6,resilience:3,exposure:-4}}
      ]},
      {prompt:"The incident is contained. What investment prevents a repeat?",choices:[
        {id:"zero-trust",title:"Deploy zero-trust controls",detail:"Strengthen access boundaries and privileged account reviews.",cost:95000,effects:{exposure:-13,resilience:13,trust:5}},
        {id:"audit",title:"Commission an independent audit",detail:"Test controls and publish a remediation roadmap.",cost:55000,effects:{exposure:-9,trust:8,reputation:5}},
        {id:"minimal",title:"Apply only urgent patches",detail:"Limit spending and accept residual operational risk.",cost:18000,effects:{exposure:-3,resilience:1,trust:-2}}
      ]}
    ]
  },
  {
    id:"hostile-bid",title:"Hostile Takeover Defence",difficulty:"Strategic",tag:"Governance",
    description:"An aggressive competitor has accumulated shares and is preparing a public offer.",
    objective:{text:"End with board trust at 65 or higher and cash of at least $250,000.",checks:[{stat:"trust",min:65},{stat:"cash",min:250000}]},
    rounds:[
      {prompt:"The bidder announces an unsolicited offer. What is your first response?",choices:[
        {id:"review",title:"Commission an independent valuation",detail:"Give shareholders a credible view of the offer.",cost:35000,effects:{trust:10,reputation:5,exposure:-3}},
        {id:"buyback",title:"Launch a measured buyback",detail:"Support the share price while consuming reserves.",cost:125000,effects:{trust:7,resilience:2,reputation:2}},
        {id:"attack",title:"Attack the bidder publicly",detail:"Escalate the contest with uncertain reputational cost.",cost:18000,effects:{trust:-6,reputation:-8,exposure:7}}
      ]},
      {prompt:"Several institutional investors want a credible alternative to the offer.",choices:[
        {id:"plan",title:"Present a funded growth plan",detail:"Commit capital to a transparent long-term strategy.",cost:85000,effects:{trust:12,reputation:5,resilience:4}},
        {id:"dividend",title:"Offer a special dividend",detail:"Return cash to shareholders immediately.",cost:110000,effects:{trust:8,resilience:-2,reputation:2}},
        {id:"delay",title:"Seek a short review extension",detail:"Buy time for due diligence and negotiations.",cost:12000,effects:{trust:3,exposure:-4,reputation:1}}
      ]},
      {prompt:"The board must now choose a durable governance response.",choices:[
        {id:"engage",title:"Negotiate with major shareholders",detail:"Build a stable coalition around measurable commitments.",cost:40000,effects:{trust:13,reputation:6,exposure:-5}},
        {id:"defence",title:"Adopt proportionate safeguards",detail:"Improve takeover readiness and board oversight.",cost:65000,effects:{trust:5,resilience:10,exposure:-6}},
        {id:"entrench",title:"Entrench the current leadership",detail:"Protect management control at the expense of confidence.",cost:10000,effects:{trust:-12,reputation:-7,exposure:9}}
      ]}
    ]
  },
  {
    id:"product-recall",title:"Product Recall",difficulty:"Reputation",tag:"Customer trust",
    description:"A quality issue may affect a recently shipped product line. Reports are increasing.",
    objective:{text:"Finish with reputation at 65 or higher and resilience at 55 or higher.",checks:[{stat:"reputation",min:65},{stat:"resilience",min:55}]},
    rounds:[
      {prompt:"The quality team confirms a possible safety defect. What do you do?",choices:[
        {id:"recall",title:"Start a voluntary recall",detail:"Stop shipments and arrange returns immediately.",cost:135000,effects:{reputation:15,trust:9,resilience:5,exposure:-10}},
        {id:"inspect",title:"Inspect every affected batch",detail:"Narrow the scope before deciding on a recall.",cost:60000,effects:{reputation:5,trust:3,resilience:7,exposure:-5}},
        {id:"deny",title:"Deny the reports publicly",detail:"Protect short-term sales while uncertainty remains.",cost:0,effects:{reputation:-15,trust:-10,exposure:13}}
      ]},
      {prompt:"Retail partners are pausing orders pending your response.",choices:[
        {id:"refund",title:"Offer refunds and replacements",detail:"Fund a clear customer remedy across all channels.",cost:90000,effects:{reputation:10,trust:8,resilience:2}},
        {id:"partners",title:"Brief partners with verified facts",detail:"Coordinate a consistent response and safe inventory handling.",cost:35000,effects:{trust:7,reputation:5,exposure:-4}},
        {id:"wait",title:"Wait for final laboratory results",detail:"Reduce immediate costs but leave partners uncertain.",cost:5000,effects:{trust:-6,reputation:-5,exposure:5}}
      ]},
      {prompt:"The immediate issue is under control. How do you restore confidence?",choices:[
        {id:"quality",title:"Fund independent quality assurance",detail:"Add external testing and traceability checks.",cost:75000,effects:{resilience:12,reputation:8,exposure:-8}},
        {id:"compensation",title:"Create a customer support fund",detail:"Resolve complaints quickly and transparently.",cost:65000,effects:{trust:10,reputation:7}},
        {id:"costcut",title:"Reduce inspection costs",detail:"Recover margin but weaken future safeguards.",cost:10000,effects:{cash:30000,resilience:-10,exposure:8}}
      ]}
    ]
  },
  {
    id:"market-crash",title:"Market Crash",difficulty:"Financial",tag:"Liquidity",
    description:"Demand falls sharply, credit tightens and investors are questioning your cash runway.",
    objective:{text:"Protect at least $260,000 in cash and finish with resilience at 60 or higher.",checks:[{stat:"cash",min:260000},{stat:"resilience",min:60}]},
    rounds:[
      {prompt:"Markets fall and customer orders slow. What is your immediate move?",choices:[
        {id:"liquidity",title:"Secure a liquidity reserve",detail:"Set aside cash and renegotiate short-term facilities.",cost:35000,effects:{cash:65000,resilience:5,trust:2}},
        {id:"hedge",title:"Hedge key exposures",detail:"Pay for protection against the largest market risks.",cost:105000,effects:{resilience:13,exposure:-8,reputation:2}},
        {id:"slash",title:"Freeze all discretionary spending",detail:"Preserve cash quickly but weaken execution capacity.",cost:5000,effects:{cash:55000,resilience:-8,trust:-5}}
      ]},
      {prompt:"A lender asks for a credible plan before renewing credit.",choices:[
        {id:"forecast",title:"Publish a rolling cash forecast",detail:"Show weekly liquidity, obligations and downside scenarios.",cost:25000,effects:{trust:8,resilience:7,exposure:-4}},
        {id:"asset-sale",title:"Sell non-core assets",detail:"Raise cash without cutting essential operations.",cost:20000,effects:{cash:115000,resilience:-3,reputation:-1}},
        {id:"borrow",title:"Accept expensive emergency credit",detail:"Gain short-term runway with higher financial exposure.",cost:30000,effects:{cash:100000,exposure:9,trust:-3}}
      ]},
      {prompt:"The downturn may last several quarters. What is the operating strategy?",choices:[
        {id:"core",title:"Protect profitable core operations",detail:"Focus resources on resilient products and customers.",cost:55000,effects:{resilience:13,trust:5,reputation:3}},
        {id:"restructure",title:"Restructure low-return units",detail:"Accept transition costs to improve long-term efficiency.",cost:80000,effects:{cash:45000,resilience:10,trust:-4}},
        {id:"expand",title:"Bet on a rapid recovery",detail:"Invest aggressively before demand is proven.",cost:125000,effects:{resilience:-6,exposure:8,reputation:2}}
      ]}
    ]
  },
  {
    id:"global-expansion",title:"International Expansion",difficulty:"Growth",tag:"Market entry",
    description:"A new region offers strong demand, but local partners and regulations are unfamiliar.",
    objective:{text:"Finish with reputation at 60 or higher, trust at 55 or higher and at least $200,000 in cash.",checks:[{stat:"reputation",min:60},{stat:"trust",min:55},{stat:"cash",min:200000}]},
    rounds:[
      {prompt:"The board approves exploring a promising new region. How do you enter?",choices:[
        {id:"joint",title:"Form a local joint venture",detail:"Share risk with an established regional partner.",cost:85000,effects:{trust:8,reputation:5,resilience:5,exposure:-4}},
        {id:"direct",title:"Build a wholly owned operation",detail:"Keep control but commit substantial capital.",cost:165000,effects:{reputation:7,resilience:3,exposure:4}},
        {id:"export",title:"Test demand through exports",detail:"Run a smaller market test before committing locally.",cost:35000,effects:{cash:12000,reputation:3,resilience:2,exposure:-2}}
      ]},
      {prompt:"Local advisers identify regulatory and cultural differences.",choices:[
        {id:"compliance",title:"Hire local compliance specialists",detail:"Map regulations and build controls before launch.",cost:55000,effects:{reputation:8,trust:5,exposure:-9}},
        {id:"training",title:"Train a regional leadership team",detail:"Build local capability and stakeholder understanding.",cost:65000,effects:{trust:8,resilience:7,reputation:4}},
        {id:"rush",title:"Launch before competitors",detail:"Move quickly while accepting higher execution risk.",cost:15000,effects:{reputation:-5,trust:-4,exposure:10}}
      ]},
      {prompt:"The first customer contracts are ready. What makes the expansion sustainable?",choices:[
        {id:"service",title:"Invest in local customer service",detail:"Build trust through reliable support and fulfilment.",cost:60000,effects:{reputation:9,trust:7,resilience:4}},
        {id:"supplier",title:"Develop regional suppliers",detail:"Reduce lead times and concentration risk.",cost:75000,effects:{resilience:11,exposure:-6,reputation:3}},
        {id:"lean",title:"Keep the launch footprint lean",detail:"Preserve capital and expand only after results improve.",cost:18000,effects:{cash:35000,resilience:3,trust:1,reputation:1}}
      ]}
    ]
  }
];

const scenarioById=id=>SCENARIOS.find(item=>item.id===id);
export function createProfile(){return {version:1,completed:0,best:{},history:[],current:null};}
export function startScenario(profile,id){
  const scenario=scenarioById(id);
  if(!scenario)throw new Error("Unknown executive challenge.");
  const next=clone(profile);
  next.current={scenarioId:id,round:0,stats:{cash:500000,trust:52,resilience:48,reputation:54,exposure:42},decisions:[],complete:false,score:null,grade:null,objectiveMet:false};
  return next;
}
export function scoreRun(run){
  const scenario=scenarioById(run.scenarioId);
  if(!scenario)throw new Error("Unknown executive challenge.");
  const s=run.stats;
  const base=(clamp(s.cash/500000,0,1)*25)+(s.trust/100*20)+(s.resilience/100*20)+(s.reputation/100*20)+((100-s.exposure)/100*15);
  const objectiveMet=scenario.objective.checks.every(check=>check.min!==undefined?s[check.stat]>=check.min:s[check.stat]<=check.max);
  const score=Math.round(clamp(base+(objectiveMet?4:0),0,100));
  return {score,grade:score>=90?"S":score>=80?"A":score>=70?"B":score>=60?"C":"D",objectiveMet};
}
export function chooseDecision(profile,choiceId){
  const next=clone(profile);
  const run=next.current;
  if(!run||run.complete)throw new Error("Start an active challenge before making a decision.");
  const scenario=scenarioById(run.scenarioId);
  const round=scenario.rounds[run.round];
  if(!round)throw new Error("This challenge has no remaining decisions.");
  const choice=round.choices.find(item=>item.id===choiceId);
  if(!choice)throw new Error("That decision is not available in this round.");
  if(run.stats.cash<choice.cost)throw new Error("Not enough cash for this decision. Choose a lower-cost response.");
  run.stats.cash=clamp(run.stats.cash-choice.cost+(choice.effects.cash||0),0,1000000000);
  for(const key of ["trust","resilience","reputation","exposure"])run.stats[key]=clamp(run.stats[key]+(choice.effects[key]||0),0,100);
  run.decisions.push({round:run.round+1,id:choice.id,title:choice.title,cost:choice.cost});
  run.round++;
  if(run.round===scenario.rounds.length){
    const result=scoreRun(run);
    run.complete=true;run.score=result.score;run.grade=result.grade;run.objectiveMet=result.objectiveMet;
    next.completed++;
    const previous=next.best[scenario.id];
    if(!previous||result.score>previous.score)next.best[scenario.id]={score:result.score,grade:result.grade};
    next.history.unshift({scenarioId:scenario.id,title:scenario.title,score:result.score,grade:result.grade,objectiveMet:result.objectiveMet,date:new Date().toISOString()});
    next.history=next.history.slice(0,30);
  }
  return next;
}
export function validateProfile(value){
  if(!value||typeof value!=="object"||value.version!==1||!Number.isInteger(value.completed)||value.completed<0||!value.best||typeof value.best!=="object"||Array.isArray(value.best)||!Array.isArray(value.history)||value.history.length>30)return false;
  for(const [id,result] of Object.entries(value.best)){
    if(!scenarioById(id)||!result||!Number.isFinite(result.score)||result.score<0||result.score>100||!["S","A","B","C","D"].includes(result.grade))return false;
  }
  if(!value.history.every(item=>item&&scenarioById(item.scenarioId)&&Number.isFinite(item.score)&&item.score>=0&&item.score<=100&&["S","A","B","C","D"].includes(item.grade)&&typeof item.title==="string"&&typeof item.date==="string"))return false;
  if(value.current===null)return true;
  const run=value.current,scenario=run&&scenarioById(run.scenarioId);
  if(!scenario||!Number.isInteger(run.round)||run.round<0||run.round>3||!Array.isArray(run.decisions)||run.decisions.length!==run.round||typeof run.complete!=="boolean")return false;
  const stats=run.stats;
  if(!stats||!Number.isFinite(stats.cash)||stats.cash<0||stats.cash>1000000000)return false;
  for(const key of ["trust","resilience","reputation","exposure"])if(!Number.isFinite(stats[key])||stats[key]<0||stats[key]>100)return false;
  if(run.complete&&(run.round!==3||!Number.isFinite(run.score)||run.score<0||run.score>100||!["S","A","B","C","D"].includes(run.grade)))return false;
  return run.decisions.every(item=>item&&Number.isInteger(item.round)&&item.round>=1&&item.round<=3&&typeof item.title==="string"&&Number.isFinite(item.cost)&&item.cost>=0);
}
