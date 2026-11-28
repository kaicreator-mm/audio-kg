// Only a finite synthetic fixture; no audio or system operation.
export function denseData(v){
 if(v===null||typeof v==='string'||typeof v==='boolean')return true;
 if(typeof v==='number')return Number.isFinite(v);
 if(Array.isArray(v))return Array.from({length:v.length},(_,i)=>Object.hasOwn(v,i)&&denseData(v[i])).every(Boolean);
 if(typeof v==='object'&&v!==null&&(Object.getPrototypeOf(v)===Object.prototype||Object.getPrototypeOf(v)===null))return Object.values(v).every(denseData);
 return false;
}
export function checkedGate(gate,c,receipt,scope){
 if(!denseData(c))return 'OUTSIDE_FIXTURE';
 if(!scope||!denseData(scope)||['realExecutionRequested','realAuditionRequested','realDeliveryRequested'].some(k=>Object.hasOwn(scope,k)&&scope[k]!==false))return 'STOP_OR_PENDING';
 if(!denseData(receipt))return 'NOT_READY';
 return gate(c,receipt,scope);
}
