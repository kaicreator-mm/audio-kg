import {runFiniteR8} from './r8-finite-witness.mjs';
const exact=(a,b)=>a===b;
const requiredScope=['grantor','grantee','operator','delegate','object','action','purpose','media','territory','term','audience','version','evidence'];
export function authorizationMatches(grant,request){
 if(!grant||!request)return false;
 return requiredScope.every(k=>grant[k]!==undefined&&request[k]!==undefined&&JSON.stringify(grant[k])===JSON.stringify(request[k]));
}
export function ccByNcNd4({commercial=false,adapted=false,share=false,attribution=false,version='4.0'}={}){
 if(version!=='4.0')return 'UNKNOWN_LICENSE_VERSION';
 if(!attribution&&share)return 'ATTRIBUTION_REQUIRED';
 if(commercial)return 'NOT_PERMITTED_BY_NC';
 if(share&&adapted)return 'NOT_PERMITTED_TO_SHARE_ADAPTATION_BY_ND';
 if(share&&!adapted)return 'NONCOMMERCIAL_UNADAPTED_SHARE_WITH_ATTRIBUTION';
 if(adapted&&!share)return 'NONCOMMERCIAL_ADAPTATION_NOT_SHARED';
 return 'PRIVATE_OR_NO_SHARE_SCOPE';
}
export function ccBySa4({adapted=false,share=false,commercial=false,sameOrCompatible=false,attribution=false}={}){
 if(share&&!attribution)return 'ATTRIBUTION_REQUIRED';
 if(share&&adapted&&!sameOrCompatible)return 'SHARE_ALIKE_CONDITION_NOT_MET';
 if(commercial)return 'COMMERCIAL_USE_NOT_PROHIBITED_BY_BY_SA';
 return share?'SHARE_WITH_ATTRIBUTION':'NO_SHARE';
}
export function metadataIsRightsProof(kind){return false;}
export function releaseState({requestSent=false,ackReceived=false,externalObserved=false,takedownRequested=false,takedownObserved=false}={}){
 if(takedownRequested&&takedownObserved)return 'TAKEDOWN_CONFIRMED';
 if(takedownRequested)return 'TAKEDOWN_PENDING_EXTERNAL_OBSERVATION';
 if(externalObserved)return 'EXTERNAL_AVAILABILITY_OBSERVED';
 if(ackReceived)return 'ACK_RECEIVED_NOT_PUBLICATION_PROOF';
 if(requestSent)return 'REQUEST_SENT_NOT_ACKED';
 return 'NOT_REQUESTED';
}
export function rightsGate(gates){
 const required=['object','authority','rights','consent','safety','technical','editable','dependency','review'];
 if(required.some(k=>gates?.[k]==='FAIL'))return 'STOP';
 if(required.some(k=>gates?.[k]!=='PASS'))return 'HOLD_UNKNOWN';
 return 'PASS';
}
export function myanmarS41CandidateScreen(x){
 const validLaw=x?.law==='Myanmar Copyright Law No.15/2019';
 const validSection=['41(2)','41(3)'].includes(x?.section);
 const validPurpose=['research','face_to_face_teaching'].includes(x?.purpose);
 const facts=['specific_object','specific_actor','specific_action','specific_audience','specific_location','specific_date'].every(k=>x?.[k]===true);
 const safeguards=x?.normalExploitationNotHarmed===true&&x?.legitimateInterestsNotHarmed===true&&x?.noPublicRelease===true;
 const teaching=x?.purpose!=='face_to_face_teaching'||x?.notPublishedAsTeachingMaterial===true;
 return validLaw&&validSection&&validPurpose&&facts&&safeguards&&teaching?'CANDIDATE_REQUIRES_COUNSEL_REVIEW':'NOT_ESTABLISHED_HOLD';
}
export function withdrawalDisposition({futureUse=true,existingDistribution=true,backup=true,legalHold=false}={}){
 return {futureUse:futureUse?'STOP_OR_REVIEW':'NO_CHANGE',existingDistribution:existingDistribution?'REVIEW_DISTRIBUTION_AND_CONTRACT':'NO_CHANGE',backup:backup?'REVIEW_RETENTION_AND_LAWFUL_BASIS':'NO_CHANGE',legalHold:legalHold?'PRESERVE_UNDER_VALID_HOLD':'REVIEW',decision:'NO_BLANKET_DELETE_ALL_INFERENCE'};
}
export function objectBinding(candidate){
 const fixed={work:'W1',reference:'VREF1',backing:'B1'};
 if(!candidate||candidate.work!==fixed.work||candidate.reference!==fixed.reference||candidate.backing!==fixed.backing)return 'STOP_OR_PENDING_OBJECT_MISMATCH';
 return 'SAME_FIXED_OBJECT_BASELINE';
}
export function dependencyClosure(graph,changed){
 const out=new Set(changed),queue=[...changed];
 while(queue.length){const x=queue.shift();for(const [from,to] of Object.entries(graph)){if(from===x)for(const y of to)if(!out.has(y)){out.add(y);queue.push(y);}}}
 return [...out].sort();
}
export const r8Checks=runFiniteR8();
export const checks=[
 ['authorization requires every scope dimension',authorizationMatches({grantor:'G',grantee:'R',operator:'O',delegate:'D',object:'W1',action:'publish',purpose:'release',media:'DSP',territory:'MM',term:'2026',audience:'public',version:'v1',evidence:'E'},{grantor:'G',grantee:'R',operator:'O',delegate:'D',object:'W1',action:'publish',purpose:'release',media:'DSP',territory:'MM',term:'2026',audience:'public',version:'v1',evidence:'E'})],
 ['object mismatch rejects otherwise matching grant',!authorizationMatches({grantor:'G',grantee:'R',operator:'O',delegate:'D',object:'W1',action:'publish',purpose:'release',media:'DSP',territory:'MM',term:'2026',audience:'public',version:'v1',evidence:'E'},{grantor:'G',grantee:'R',operator:'O',delegate:'D',object:'W2',action:'publish',purpose:'release',media:'DSP',territory:'MM',term:'2026',audience:'public',version:'v1',evidence:'E'})],
 ['action mismatch rejects grant',!authorizationMatches({grantor:'G',grantee:'R',operator:'O',delegate:'D',object:'W1',action:'record',purpose:'production',media:'studio',territory:'MM',term:'2026',audience:'private',version:'v1',evidence:'E'},{grantor:'G',grantee:'R',operator:'O',delegate:'D',object:'W1',action:'train',purpose:'model',media:'cloud',territory:'MM',term:'2026',audience:'private',version:'v1',evidence:'E'})],
 ['missing authorization field fails closed',!authorizationMatches({grantor:'G',grantee:'R'},{grantor:'G',grantee:'R'})],
 ['BY-NC-ND permits attributed noncommercial unadapted sharing',ccByNcNd4({commercial:false,adapted:false,share:true,attribution:true})==='NONCOMMERCIAL_UNADAPTED_SHARE_WITH_ATTRIBUTION'],
 ['BY-NC-ND prohibits commercial sharing',ccByNcNd4({commercial:true,adapted:false,share:true,attribution:true})==='NOT_PERMITTED_BY_NC'],
 ['BY-NC-ND does not permit sharing an adaptation',ccByNcNd4({commercial:false,adapted:true,share:true,attribution:true})==='NOT_PERMITTED_TO_SHARE_ADAPTATION_BY_ND'],
 ['BY-NC-ND private noncommercial adaptation is distinct from sharing',ccByNcNd4({commercial:false,adapted:true,share:false})==='NONCOMMERCIAL_ADAPTATION_NOT_SHARED'],
 ['unknown CC version remains unknown',ccByNcNd4({version:'3.0',share:true,attribution:true})==='UNKNOWN_LICENSE_VERSION'],
 ['BY-SA adapted sharing requires same or compatible license',ccBySa4({adapted:true,share:true,sameOrCompatible:false,attribution:true})==='SHARE_ALIKE_CONDITION_NOT_MET'],
 ['BY-SA allows commercial use subject to other terms',ccBySa4({adapted:true,share:true,commercial:true,sameOrCompatible:true,attribution:true})==='COMMERCIAL_USE_NOT_PROHIBITED_BY_BY_SA'],
 ['ISRC is not ownership proof',metadataIsRightsProof('ISRC')===false],
 ['ISWC is not ownership proof',metadataIsRightsProof('ISWC')===false],
 ['RIN and ERN are not rights proof',metadataIsRightsProof('RIN/ERN')===false],
 ['ACK does not prove external publication',releaseState({requestSent:true,ackReceived:true})==='ACK_RECEIVED_NOT_PUBLICATION_PROOF'],
 ['external availability requires observation',releaseState({requestSent:true,ackReceived:true,externalObserved:true})==='EXTERNAL_AVAILABILITY_OBSERVED'],
 ['takedown request is not takedown confirmation',releaseState({takedownRequested:true,takedownObserved:false})==='TAKEDOWN_PENDING_EXTERNAL_OBSERVATION'],
 ['takedown requires external observation',releaseState({takedownRequested:true,takedownObserved:true})==='TAKEDOWN_CONFIRMED'],
 ['rights UNKNOWN hard-holds release',rightsGate({object:'PASS',authority:'PASS',rights:'UNKNOWN',consent:'PASS',safety:'PASS',technical:'PASS',editable:'PASS',dependency:'PASS',review:'PASS'})==='HOLD_UNKNOWN'],
 ['failed rights gate cannot be compensated',rightsGate({object:'PASS',authority:'PASS',rights:'FAIL',consent:'PASS',safety:'PASS',technical:'PASS',editable:'PASS',dependency:'PASS',review:'PASS',score:100})==='STOP'],
 ['missing consent gate never defaults to pass',rightsGate({object:'PASS',authority:'PASS',rights:'PASS',safety:'PASS',technical:'PASS',editable:'PASS',dependency:'PASS',review:'PASS'})==='HOLD_UNKNOWN'],
 ['Myanmar section 41 screen is candidate-only even when all conditions supplied',myanmarS41CandidateScreen({law:'Myanmar Copyright Law No.15/2019',section:'41(2)',purpose:'research',specific_object:true,specific_actor:true,specific_action:true,specific_audience:true,specific_location:true,specific_date:true,normalExploitationNotHarmed:true,legitimateInterestsNotHarmed:true,noPublicRelease:true})==='CANDIDATE_REQUIRES_COUNSEL_REVIEW'],
 ['Myanmar section 41 does not create blanket AI-training permission',myanmarS41CandidateScreen({law:'Myanmar Copyright Law No.15/2019',section:'41(2)',purpose:'model_training',specific_object:true,specific_actor:true,specific_action:true,specific_audience:true,specific_location:true,specific_date:true,normalExploitationNotHarmed:true,legitimateInterestsNotHarmed:true,noPublicRelease:true})==='NOT_ESTABLISHED_HOLD'],
 ['published teaching material does not pass face-to-face teaching screen',myanmarS41CandidateScreen({law:'Myanmar Copyright Law No.15/2019',section:'41(3)',purpose:'face_to_face_teaching',specific_object:true,specific_actor:true,specific_action:true,specific_audience:true,specific_location:true,specific_date:true,normalExploitationNotHarmed:true,legitimateInterestsNotHarmed:true,noPublicRelease:true,notPublishedAsTeachingMaterial:false})==='NOT_ESTABLISHED_HOLD'],
 ['withdrawal separates future use and existing distribution',(()=>{const x=withdrawalDisposition();return x.futureUse==='STOP_OR_REVIEW'&&x.existingDistribution==='REVIEW_DISTRIBUTION_AND_CONTRACT'&&x.decision==='NO_BLANKET_DELETE_ALL_INFERENCE';})()],
 ['fresh grant cannot override changed fixed reference',objectBinding({work:'W1',reference:'VREF2',backing:'B1'})==='STOP_OR_PENDING_OBJECT_MISMATCH'],
 ['fresh grant cannot override changed backing',objectBinding({work:'W1',reference:'VREF1',backing:'B2'})==='STOP_OR_PENDING_OBJECT_MISMATCH'],
 ['same fixed objects retain baseline only',objectBinding({work:'W1',reference:'VREF1',backing:'B1'})==='SAME_FIXED_OBJECT_BASELINE'],
 ['dependency invalidation reaches descendants',JSON.stringify(dependencyClosure({source:['mix'],mix:['master'],master:['delivery']},['source']))==='["delivery","master","mix","source"]'],
 ['independent branch is not invalidated',!dependencyClosure({source:['mix'],mix:['master'],master:['delivery'],notes:['notesExport']},['source']).includes('notesExport')],
 ['R8 historical finite witness has exactly 54 checks',r8Checks.length===54],
 ['R8 historical finite witness passes all 54 checks',r8Checks.every(x=>Array.isArray(x)?x[1]===true:x===true)]
];
export const hardRubric={authorization:'exact object/action/purpose/party/operator/delegate/media/territory/term/audience/version/evidence binding',identifiers:'ISRC/ISWC/RIN/ERN are metadata only',consent:'separate purpose/action; not ownership',myanmarLaw:'candidate screen only; no legal decision',R8:'fixed W1/VREF1/B1 object binding and 54 historical synthetic checks',release:'ACK and external observed state separate',rights:'UNKNOWN_NO_IMPORT hard hold'};
