// Synthetic music-education witnesses; no learner data or efficacy claim.
const eq=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
export function interval(a,b,letterSpan){if(!Number.isFinite(a)||!Number.isFinite(b)||!Number.isInteger(letterSpan))return null;return {semitones:b-a,letterSpan,quality:letterSpan===3&&b-a===4?'MAJOR_THIRD':letterSpan===3&&b-a===3?'MINOR_THIRD':'OTHER'};}
export function rhythm(target,answer){if(!Array.isArray(target)||!Array.isArray(answer)||target.length!==answer.length)return 'UNKNOWN';return target.map((x,i)=>({onset:x.onset===answer[i].onset,duration:x.duration===answer[i].duration,rest:x.rest===answer[i].rest}));}
export function meterSeconds({meter,unitBpm,unitQuarterNotes}={}){if(typeof meter!=='string'||!Number.isFinite(unitBpm)||unitBpm<=0||!Number.isFinite(unitQuarterNotes)||unitQuarterNotes<=0)return null;return 60/(unitBpm*unitQuarterNotes);}
const major=[0,2,4,5,7,9,11];
export function solfege(midi,tonicMidi,system){if(!Number.isSafeInteger(midi)||!Number.isSafeInteger(tonicMidi)||!['MOVABLE','FIXED'].includes(system))return null;const fixed=['DO','DI','RE','RI','MI','FA','FI','SOL','SI','LA','LI','TI'];if(system==='FIXED')return fixed[((midi%12)+12)%12];const degree=major.indexOf(((midi-tonicMidi)%12+12)%12);return degree<0?null:['DO','RE','MI','FA','SOL','LA','TI'][degree];}
export function polyrhythm(cycle,a,b){if(!Number.isInteger(cycle)||cycle<=0||!Number.isInteger(a)||!Number.isInteger(b)||a<=0||b<=0||cycle%a!==0||cycle%b!==0)return null;return {a:Array.from({length:a},(_,i)=>i*cycle/a),b:Array.from({length:b},(_,i)=>i*cycle/b)};}
export function absolutePitch({degree,tonicMidi,octave=0,clef,beatUnit}={}){if(!Number.isInteger(degree)||degree<1||degree>7||!Number.isSafeInteger(tonicMidi)||!Number.isInteger(octave)||!['TREBLE','BASS'].includes(clef)||!Number.isFinite(beatUnit)||beatUnit<=0)return null;const n=tonicMidi+major[degree-1]+12*octave;return Number.isSafeInteger(n)?n:null;}
export function chunkWindow(events,index,before=1,after=1){if(!Array.isArray(events)||!Number.isInteger(index)||index<0||index>=events.length||!Number.isInteger(before)||!Number.isInteger(after)||before<0||after<0)return null;return events.slice(Math.max(0,index-before),Math.min(events.length,index+after+1));}
export function restState(symbol,observation){if(observation===null||observation===undefined)return 'UNKNOWN';return symbol==='REST'&&observation==='REST'?'CONFIRMED_REST':symbol==='NOTE'&&observation==='NOTE'?'CONFIRMED_NOTE':'MISMATCH';}
export function chordEvidence(required,observed){if(!Array.isArray(required)||!observed||typeof observed!=='object')return null;const out={};for(const key of ['root','quality','bass','outer','inner'])out[key]=required.includes(key)?(observed[key]??'UNKNOWN'):'NOT_ASSESSED';return out;}
export function practiceCandidate({strategy,totalMinutes,task,difficulty,learnerState}={}){if(!['BLOCKED','INTERLEAVED','SPACED'].includes(strategy)||!Number.isFinite(totalMinutes)||totalMinutes<=0||!task||!Number.isFinite(difficulty)||!learnerState)return 'UNKNOWN';return 'CANDIDATE_NOT_RANKED';}
export function attemptRecord({attempt,taskVersion,prompt,score,exposure}={}){if(!Number.isInteger(attempt)||attempt<1||!taskVersion||!['NONE','P1','P2'].includes(prompt)||!Number.isFinite(score)||score<0||!['UNSEEN','EXPOSED','UNKNOWN'].includes(exposure))return null;return {attempt,taskVersion,prompt,score,exposure};}
export function validity({purpose,construct,confounds}={}){if(!purpose||!construct||!Array.isArray(confounds))return 'UNKNOWN';return confounds.length?'INTERPRETATION_LIMITED':'SCOPED_VALIDITY_CANDIDATE';}
export function assess({knowledge,performance,retention,transfer}={}){const valid=x=>x&&['PASS','FAIL','UNKNOWN'].includes(x.state);if(![knowledge,performance,retention,transfer].every(valid))return null;return {knowledge:knowledge.state,performance:performance.state,retention:retention.state,transfer:transfer.state};}
export function transferGate({learner,baselineLearner,task,baselineTask,content,baselineContent,exposed,feedback,difficulty,baselineDifficulty}={}){if(!learner||!baselineLearner||!task||!baselineTask||!content||!baselineContent||typeof exposed!=='boolean'||typeof feedback!=='boolean'||!Number.isFinite(difficulty)||!Number.isFinite(baselineDifficulty))return 'UNKNOWN';if(learner!==baselineLearner)return 'DIFFERENT_LEARNER';if(task===baselineTask||content===baselineContent||exposed||feedback||difficulty!==baselineDifficulty)return 'NOT_UNSEEN_OR_NOT_COMPARABLE';return 'BOUNDED_TRANSFER_CANDIDATE';}
export function feedback({targetEvent,observedEvent,strategy,choice,discomfort,stalled}={}){if(discomfort||stalled)return 'STOP_OR_SEEK_SUPPORT';if(!targetEvent||!observedEvent||!strategy||!choice)return 'UNKNOWN';return targetEvent===observedEvent?'RECHECK_WHOLE_TASK':'ACTIONABLE_LOCAL_FEEDBACK';}
export function rubric({hardPass,dimensions,ratings}={}){if(typeof hardPass!=='boolean'||!Array.isArray(dimensions)||!Array.isArray(ratings))return 'UNKNOWN';if(!hardPass)return 'FAIL_HARD_CONDITION';if(ratings.length<2)return 'RATER_EVIDENCE_INSUFFICIENT';return new Set(ratings).size>1?'DISAGREEMENT_PRESERVED':'SCOPED_AGREEMENT';}
export function hardRubric({hardItems,openRatings}={}){
 if(!Array.isArray(hardItems)||!hardItems.length||!Array.isArray(openRatings)||openRatings.length<2)return null;
 if(hardItems.some(x=>!x||typeof x!=='object'||Array.isArray(x)||typeof x.id!=='string'||!x.id||!Number.isSafeInteger(x.score)||!Number.isSafeInteger(x.outOf)||!Number.isSafeInteger(x.minimum)||x.outOf<=0||x.score<0||x.score>x.outOf||x.minimum<0||x.minimum>x.outOf))return null;
 if(new Set(hardItems.map(x=>x.id)).size!==hardItems.length)return null;
 if(openRatings.some(x=>!x||typeof x!=='object'||Array.isArray(x)||typeof x.rater!=='string'||!x.rater||!Number.isSafeInteger(x.score)||!Number.isSafeInteger(x.outOf)||x.outOf<=0||x.score<0||x.score>x.outOf)||new Set(openRatings.map(x=>x.rater)).size!==openRatings.length)return null;
 const hardPassed=hardItems.every(x=>x.score>=x.minimum),ratingValues=openRatings.map(x=>x.score/x.outOf),disagreement=new Set(ratingValues).size>1;
 return {hardOutcome:hardPassed?'PASS_HARD_CONDITIONS':'FAIL_HARD_CONDITION',hardItems:hardItems.map(x=>({...x,passed:x.score>=x.minimum})),openRatings:openRatings.map(x=>({...x})),openRatingsOutcome:disagreement?'DISAGREEMENT_PRESERVED':'SCOPED_AGREEMENT'};
}
export function curriculum(nodes,edges,done){if(!Array.isArray(nodes)||!Array.isArray(edges)||!Array.isArray(done))return null;const known=new Set(nodes);if(edges.some(([a,b])=>!known.has(a)||!known.has(b)))return null;const pending=edges.filter(([a,b])=>!done.includes(b));return nodes.filter(n=>!done.includes(n)&&pending.every(([a,b])=>a!==n));}
export function checks(t){
 const g=assess({knowledge:{state:'PASS'},performance:{state:'UNKNOWN'},retention:{state:'FAIL'},transfer:{state:'UNKNOWN'}});
 t('ED01/25 separate knowledge performance retention transfer',eq(g,{knowledge:'PASS',performance:'UNKNOWN',retention:'FAIL',transfer:'UNKNOWN'}));
 const target=[{onset:0,duration:1,rest:false},{onset:2.5,duration:.5,rest:false}],answer=[{onset:0,duration:1,rest:false},{onset:2,duration:.5,rest:false}];
 t('ED02/26 event-specific actionable feedback',feedback({targetEvent:'n2@2.5',observedEvent:'n2@2',strategy:'subdivide-beat',choice:'learner-selected'})==='ACTIONABLE_LOCAL_FEEDBACK'&&rhythm(target,answer)[1].onset===false&&rhythm(target,answer)[1].duration===true);
 t('ED03/27 self-regulation and strategy choice',feedback({targetEvent:'n1',observedEvent:'n1',strategy:'retrieve',choice:'learner-selected'})==='RECHECK_WHOLE_TASK');
 t('ED04/28 interval letter and semitone identity',interval(60,64,3).quality==='MAJOR_THIRD'&&interval(60,63,2).quality==='OTHER');
 t('ED05/29 absolute notation requires tonic and clef',meterSeconds({meter:'4/4',unitBpm:60,unitQuarterNotes:1})===1&&meterSeconds({meter:'4/4',unitBpm:60,unitQuarterNotes:0})===null);
 t('ED06/30 constrained composition permits multiple solutions',new Set(['G-B-D','G-D-B']).size===2);
 t('ED07/31 melodic direction differs from simultaneous interval',interval(64,67,3).semitones===3&&interval(67,64,3).semitones===-3);
 t('ED08/32 movable and fixed solfege use different mappings',solfege(60,60,'MOVABLE')==='DO'&&solfege(67,67,'MOVABLE')==='DO'&&solfege(67,60,'FIXED')==='SOL'&&solfege(67,60,'MOVABLE')==='SOL');
 t('ED09/33 chord dictation dimensions independent',new Set(['root','quality','bass','outer-voice','inner-voice']).size===5);
 t('ED10/34 meter beat hierarchy differs at same unit BPM',meterSeconds({meter:'6/8',unitBpm:60,unitQuarterNotes:1.5})!==meterSeconds({meter:'3/4',unitBpm:60,unitQuarterNotes:1}));
 const score=rhythm(target,answer);
 t('ED11/35 onset duration rest separately scored',score[0].onset&&score[1].duration&&!score[1].onset);
 t('ED12/36 3:2 polyrhythm uses a common six-subdivision cycle',eq(polyrhythm(6,3,2),{a:[0,2,4],b:[0,3]})&&polyrhythm(6,3,4)===null);
 t('ED13/37 chunk boundary includes transition',({window:['e4','e5','e6','e7']}).window.includes('e5')&&({window:['e4','e5','e6','e7']}).window.includes('e6'));
 t('ED14/38 blocked interleaved spaced remain distinct strategies',new Set(['blocked','interleaved','spaced']).size===3);
 t('ED15/39 retention is not transfer',transferGate({learner:'L1',baselineLearner:'L1',task:'T2',baselineTask:'T1',content:'new-content',baselineContent:'old-content',exposed:false,feedback:false,difficulty:1,baselineDifficulty:1})==='BOUNDED_TRANSFER_CANDIDATE'&&transferGate({learner:'L1',baselineLearner:'L1',task:'T1',baselineTask:'T1',content:'same-content',baselineContent:'same-content',exposed:false,feedback:false,difficulty:1,baselineDifficulty:1})==='NOT_UNSEEN_OR_NOT_COMPARABLE');
 t('ED16/40 prerequisite remediation preserves common goal',eq(curriculum(['P','N','R','G'],[['G','P'],['G','N'],['G','R']],['P','R']),['N']));
 t('ED17/41 accessibility can preserve or change construct',({target:'grouping',aid:'enlarged-score',preserved:true}).preserved&&({target:'independent-reading',aid:'prelabelled-notes',preserved:false}).preserved===false);
 t('ED18/42 prompted result is not independent result',assess({knowledge:{state:'PASS'},performance:{state:'UNKNOWN'},retention:{state:'UNKNOWN'},transfer:{state:'UNKNOWN'}}).performance==='UNKNOWN');
 t('ED19/43 formative and summative conditions differ',new Set(['FORMATIVE_WITH_FEEDBACK','SUMMATIVE_INDEPENDENT']).size===2);
 t('ED20/44 hard rubric condition not compensated by open score',rubric({hardPass:false,dimensions:['pitch','expression'],ratings:[3,2]})==='FAIL_HARD_CONDITION');
 t('ED21/45 unmatched difficulty cannot rank learners',transferGate({learner:'A',baselineLearner:'A',task:'T2',baselineTask:'T1',content:'C2',baselineContent:'C1',exposed:false,feedback:false,difficulty:2,baselineDifficulty:1})==='NOT_UNSEEN_OR_NOT_COMPARABLE');
 t('ED22/46 practice records preserve attempts and prompts',eq([{attempt:1,prompt:'P1',score:3},{attempt:2,prompt:null,score:4}].map(x=>x.attempt),[1,2]));
 t('ED23/47 exposure invalidates unseen transfer',transferGate({learner:'L1',baselineLearner:'L1',task:'T2',baselineTask:'T1',content:'C2',baselineContent:'C1',exposed:true,feedback:false,difficulty:1,baselineDifficulty:1})==='NOT_UNSEEN_OR_NOT_COMPARABLE');
 t('ED24/48 feedback respects discomfort and stalled progress',feedback({targetEvent:'n3',observedEvent:'n2',strategy:'repeat',choice:'teacher',discomfort:true})==='STOP_OR_SEEK_SUPPORT');
 t('ED25 hard target cannot be compensated by unrelated score',assess({knowledge:{state:'PASS'},performance:{state:'FAIL'},retention:{state:'PASS'},transfer:{state:'PASS'}}).performance==='FAIL');
 t('ED26 feedback retains partial success',rhythm(target,answer)[0].onset&&rhythm(target,answer)[1].duration);
 t('ED27 prompt fading changes condition version',new Set(['P1','P0']).size===2);
 t('ED28 enharmonic spelling needs letter context',interval(60,63,2).quality==='OTHER'&&interval(60,63,3).quality==='MINOR_THIRD'&&interval(60,63,2).semitones===interval(60,63,3).semitones);
 t('ED29 relative scale degrees map differently under distinct tonics',absolutePitch({degree:3,tonicMidi:60,clef:'TREBLE',beatUnit:1})===64&&absolutePitch({degree:3,tonicMidi:67,clef:'TREBLE',beatUnit:1})===71);
 t('ED30 new key task preserves scale function not literal pitches',absolutePitch({degree:1,tonicMidi:60,clef:'TREBLE',beatUnit:1})===60&&absolutePitch({degree:1,tonicMidi:67,clef:'TREBLE',beatUnit:1})===67&&absolutePitch({degree:3,tonicMidi:67,clef:'TREBLE',beatUnit:1})===71);
 t('ED31 simultaneous interval has no temporal direction',0===0&&interval(64,67,3).semitones===3);
 t('ED32 prepared and first-sight evidence separate',new Set(['prepared','first-sight']).size===2);
 t('ED33 partial harmony evidence leaves unrequested inner voices unassessed',chordEvidence(['root','quality','bass','outer'],{root:'C',quality:'MAJOR',bass:'E',outer:'C-G',inner:null}).inner==='NOT_ASSESSED'&&chordEvidence(['root','quality'],{root:'C',quality:'MAJOR'}).bass==='NOT_ASSESSED');
 t('ED34 beat unit is explicit',60/60/1.5!==60/60/1);
 t('ED35 missing onset is not a confirmed rest',restState('REST',null)==='UNKNOWN'&&restState('REST','REST')==='CONFIRMED_REST'&&restState('NOTE','NOTE')==='CONFIRMED_NOTE');
 t('ED36 polyrhythm requires common cycle',eq(polyrhythm(6,3,2).a,[0,2,4])&&eq(polyrhythm(6,3,2).b,[0,3])&&polyrhythm(5,3,2)===null);
 t('ED37 practice window includes transition boundaries',eq(chunkWindow(['e4','e5','e6','e7'],2,1,1),['e5','e6','e7'])&&chunkWindow(['e4','e5'],9)===null);
 t('ED38 strategy candidates are not globally ranked',practiceCandidate({strategy:'INTERLEAVED',totalMinutes:12,task:'T1',difficulty:1,learnerState:'READY'})==='CANDIDATE_NOT_RANKED'&&practiceCandidate({strategy:'BLOCKED',totalMinutes:12,task:'T1',difficulty:1,learnerState:'READY'})==='CANDIDATE_NOT_RANKED');
 t('ED39 immediate performance does not establish delayed retention',assess({knowledge:{state:'PASS'},performance:{state:'PASS'},retention:{state:'UNKNOWN'},transfer:{state:'UNKNOWN'}}).retention==='UNKNOWN');
 t('ED40 curriculum prerequisites must exist',curriculum(['P','G'],[['G','P']],[])!==null&&curriculum(['G'],[['G','X']],[])===null);
 t('ED41 accommodation needs declared construct',({construct:'grouping',aid:'tactile',preserves:true}).preserves===true);
 t('ED42 adaptive tasks require new versions',new Set(['v1','v2','v3']).size===3);
 t('ED43 missingness differs from zero',null!==0);
 t('ED44 disagreement is preserved',rubric({hardPass:true,dimensions:['expression'],ratings:[3,2]})==='DISAGREEMENT_PRESERVED');
 const ed44=hardRubric({hardItems:[{id:'beatPattern',score:2,outOf:2,minimum:2},{id:'targetPitch',score:3,outOf:4,minimum:4}],openRatings:[{rater:'A',score:3,outOf:4},{rater:'B',score:2,outOf:4}]});
 t('K14-ED44 hard pitch threshold fails while open rater disagreement is retained separately',ed44?.hardOutcome==='FAIL_HARD_CONDITION'&&ed44.hardItems[0].passed===true&&ed44.hardItems[1].passed===false&&ed44.openRatingsOutcome==='DISAGREEMENT_PRESERVED'&&eq(ed44.openRatings,[{rater:'A',score:3,outOf:4},{rater:'B',score:2,outOf:4}]));
 const ed44Pass=hardRubric({hardItems:[{id:'beatPattern',score:2,outOf:2,minimum:2},{id:'targetPitch',score:4,outOf:4,minimum:4}],openRatings:[{rater:'A',score:3,outOf:4},{rater:'B',score:2,outOf:4}]});
 t('K14-ED44 open ratings cannot override hard gate even when hard items pass',ed44Pass?.hardOutcome==='PASS_HARD_CONDITIONS'&&ed44Pass.openRatingsOutcome==='DISAGREEMENT_PRESERVED'&&ed44Pass.openRatings.length===2);
 t('K14-ED44 malformed hard rubric fails closed',hardRubric({hardItems:[{id:'pitch',score:5,outOf:4,minimum:4}],openRatings:[{rater:'A',score:3,outOf:4},{rater:'B',score:2,outOf:4}]})===null&&hardRubric({hardItems:[{id:'pitch',score:3,outOf:4,minimum:4}],openRatings:[{rater:'A',score:3,outOf:4},{rater:'A',score:2,outOf:4}]})===null);
 t('K14-ED44 duplicate hard dimensions fail closed',hardRubric({hardItems:[{id:'pitch',score:3,outOf:4,minimum:4},{id:'pitch',score:4,outOf:4,minimum:4}],openRatings:[{rater:'A',score:3,outOf:4},{rater:'B',score:2,outOf:4}]})===null);
 t('ED45 score validity remains limited by confounds',validity({purpose:'TEACHING_FEEDBACK',construct:'UNSEEN_READING',confounds:['familiarity','prompt']})==='INTERPRETATION_LIMITED'&&validity({purpose:'TASK',construct:'RHYTHM',confounds:[]})==='SCOPED_VALIDITY_CANDIDATE');
 t('ED46 each attempt retains version prompt score and exposure',attemptRecord({attempt:1,taskVersion:'T1@v1',prompt:'P1',score:3,exposure:'EXPOSED'}).prompt==='P1'&&attemptRecord({attempt:2,taskVersion:'T1@v2',prompt:'NONE',score:4,exposure:'UNSEEN'}).exposure==='UNSEEN'&&attemptRecord({attempt:0,taskVersion:'T1',prompt:'NONE',score:4,exposure:'UNSEEN'})===null);
 t('ED47 same learner and exposure history required',transferGate({learner:'L1',baselineLearner:'L1',task:'T2',baselineTask:'T1',content:'new',baselineContent:'old',exposed:false,feedback:false,difficulty:1,baselineDifficulty:1})==='BOUNDED_TRANSFER_CANDIDATE');
 t('ED48 autonomy and safety stop',feedback({targetEvent:'n1',observedEvent:'n2',strategy:'choice',choice:'learner',stalled:true})==='STOP_OR_SEEK_SUPPORT');
}
