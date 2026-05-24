const express = require('express');
const router = express.Router();
const { getAgentResponse } = require('../services/aiService');
const { getHistory, addMessage, deleteConversation, initConversation } = require('../services/conversationStore');
const { gatherSpeech, transferToHuman, sayAndHangup, errorFallback } = require('../utils/twimlBuilder');
const { log, logError } = require('../utils/logger');
router.post('/incoming-call', (req, res) => {
  const { CallSid, From } = req.body;
  log(CallSid, 'INCOMING', 'Call from '+From);
  initConversation(CallSid);
  const greeting = 'Namaste! Thank you for calling. Ganesh is unavailable right now. I am Swetha, his personal assistant. May I know who is calling and how I can help you?';
  const t = gatherSpeech(greeting, 'en', 'I did not hear anything. Let me connect you to Ganesh.');
  t.redirect({ method:'POST' }, '/silence-fallback');
  res.type('text/xml').send(t.toString());
});
router.post('/handle-speech', async (req, res) => {
  const { CallSid, SpeechResult, Confidence } = req.body;
  const confidence = parseFloat(Confidence)||0;
  const history = getHistory(CallSid);
  const lang = history.lang||'en';
  if (!SpeechResult || confidence < 0.35) {
    const t = gatherSpeech('I am sorry, I did not catch that. Could you please repeat?', lang, 'Let me connect you to Ganesh.');
    t.redirect({ method:'POST' }, '/silence-fallback');
    return res.type('text/xml').send(t.toString());
  }
  try {
    const { text, lang:detectedLang, shouldTransfer } = await getAgentResponse(history, SpeechResult);
    history.lang = detectedLang;
    if (shouldTransfer) { deleteConversation(CallSid); return res.type('text/xml').send(transferToHuman(detectedLang).toString()); }
    addMessage(CallSid, 'user', SpeechResult);
    addMessage(CallSid, 'assistant', text);
    const t = gatherSpeech(text, detectedLang, 'Is there anything else I can help you with?');
    t.redirect({ method:'POST' }, '/handle-speech');
    return res.type('text/xml').send(t.toString());
  } catch(err) { logError(CallSid,'ERROR',err); return res.type('text/xml').send(errorFallback(lang).toString()); }
});
router.post('/silence-fallback', (req, res) => {
  const h = getHistory(req.body.CallSid);
  deleteConversation(req.body.CallSid);
  res.type('text/xml').send(transferToHuman(h.lang||'en').toString());
});
router.post('/after-transfer', (req, res) => {
  const msg = req.body.DialCallStatus==='completed' ? 'Thank you for calling. Have a great day!' : 'Ganesh is unavailable right now. Please try again later. Goodbye!';
  res.type('text/xml').send(sayAndHangup(msg).toString());
});
router.post('/call-status', (req, res) => { deleteConversation(req.body.CallSid); res.sendStatus(200); });
module.exports = router;
