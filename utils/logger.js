function log(sid, label, msg) { console.log(`[Swetha][${(sid||'------').slice(-6)}] ${label}: ${msg}`); }
function logError(sid, label, err) { console.error(`[Swetha][${(sid||'------').slice(-6)}] ERR ${label}:`, err?.message||err); }
module.exports = { log, logError };
