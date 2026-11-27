import vm from "node:vm";
import {read,blob,insist} from "./knowledge-pilot.mjs";
const cal="docs/product/calibration/";
export function loadActualWitness(){
function frozenDoc(file,expected){const t=read(cal+file);insist(blob(t)===expected,"frozen witness blob mismatch");return t;}
const old=frozenDoc("g04-r8-xc01-independent-evidence.md","9ce52519372828337ccd19f0af30e12189279719");
const routeDoc=frozenDoc("g04-r8-seven-role-evidence.md","1326f94277d09281075f2423116f515334ea72bc");
const r9=frozenDoc("g04-r9-cq25-full-evidence-trace.md","3c3f92c3fad4b43dd6884c8c005b59dd90d6b985");
const block=(t,k)=>[...t.matchAll(new RegExp("\x60\x60\x60"+k+"\\n([\\s\\S]*?)\\n\x60\x60\x60","g"))].map(x=>x[1]);
const routeData=JSON.parse(block(routeDoc,"json")[0]),support=JSON.parse(block(r9,"json")[0]);
const sandbox={routeData,support,console:{log:()=>{}}};
const js=block(old,"js")[0]+"\n"+block(r9,"js").join("\n")+"\n"+[
 'const baselineTrace=runR9CQ(xc,routeData,support);',
 'const withHistory=runR9CQ.toString().replace("return {checks:out,positive:","return {history:copy(history),checks:out,positive:");',
 'if(withHistory===runR9CQ.toString())throw Error("trace adapter absent");',
 'const extended=eval("("+withHistory+")")(xc,routeData,support);',
 'const {history,...restTrace}=extended; if(JSON.stringify(restTrace)!==JSON.stringify(baselineTrace))throw Error("trace adapter changed result");',
 '({old:original,trace:baselineTrace,registry:xc.registry,history})'
].join("\n");
const witness=vm.runInNewContext(js,sandbox,{timeout:5000});
 return {witness,routeData,support};

}
