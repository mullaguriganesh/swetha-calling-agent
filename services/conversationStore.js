const store = new Map();
function getHistory(sid) { return store.get(sid) || []; }
function initConversation(sid) { store.set(sid, []); }
function deleteConversation(sid) { store.delete(sid); }
function addMessage(sid, role, content) {
  const h = getHistory(sid); h.push({ role, content });
  if (h.length > 30) h.splice(0, 2);
  store.set(sid, h);
}
module.exports = { getHistory, addMessage, deleteConversation, initConversation };
