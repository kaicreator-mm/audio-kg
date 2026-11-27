import {json,retrieve,dir} from "./knowledge-pilot.mjs";
import {loadActualWitness} from "./witness-pilot.mjs";
import {runWorkflowPilot} from "./workflow-pilot.mjs";
const query=process.argv[2];
if(typeof query!=="string"||process.argv.length!==3)throw Error("one query required");
const knowledge=retrieve(json(dir+"pack.json"),json(dir+"sources.json"),query);
let workflow=null;
if(query==="CQ21"||query==="CQ25"){
 const {witness,routeData,support}=loadActualWitness(), w=runWorkflowPilot(witness,routeData,support);
 workflow={kind:"SYNTHETIC_FIXED_RESEARCH_WITNESS",state:w.trace.state,trace:w.trace,graph:w.projection,graphDigest:w.graphDigest,graphKind:"COMPLETE_SYNTHETIC_REPLAY_ENVELOPE",affectedIfCandidateChanges:w.affected,boundedResolution:w.boundedResolution,limits:w.limits,release:false};
}
console.log(JSON.stringify({knowledge,workflow}));
