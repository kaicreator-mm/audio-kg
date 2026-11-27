import {json,retrieve,dir} from "./knowledge-pilot.mjs";
const query=process.argv[2];
if(typeof query!=="string"||process.argv.length!==3)throw Error("one query required");
console.log(JSON.stringify(retrieve(json(dir+"pack.json"),json(dir+"sources.json"),query)));
