import test from "node:test";
import assert from "node:assert/strict";
import {SCENARIOS,createProfile,startScenario,chooseDecision,validateProfile} from "./challenge-engine.mjs";

test("all six scenarios contain three rounds with three choices",()=>{
  assert.equal(SCENARIOS.length,6);
  for(const scenario of SCENARIOS){
    assert.equal(scenario.rounds.length,3,scenario.id);
    for(const round of scenario.rounds)assert.equal(round.choices.length,3,scenario.id);
  }
});

test("each scenario can be completed and produces a valid graded record",()=>{
  for(const scenario of SCENARIOS){
    let profile=startScenario(createProfile(),scenario.id);
    for(let round=0;round<3;round++)profile=chooseDecision(profile,scenario.rounds[round].choices[0].id);
    assert.equal(profile.current.complete,true,scenario.id);
    assert.ok(profile.current.score>=0&&profile.current.score<=100,scenario.id);
    assert.ok(["S","A","B","C","D"].includes(profile.current.grade),scenario.id);
    assert.equal(profile.completed,1);
    assert.equal(validateProfile(profile),true);
  }
});

test("unaffordable decisions are rejected without changing the profile",()=>{
  let profile=startScenario(createProfile(),"cyber-response");
  profile.current.stats.cash=1;
  const before=JSON.stringify(profile);
  assert.throws(()=>chooseDecision(profile,"isolate"),/Not enough cash/);
  assert.equal(JSON.stringify(profile),before);
});

test("invalid imported profiles are rejected",()=>{
  assert.equal(validateProfile({version:1,completed:-1,best:{},history:[],current:null}),false);
  assert.equal(validateProfile(createProfile()),true);
});
