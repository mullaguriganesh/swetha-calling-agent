const twilio = require('twilio');
const HUMAN = process.env.HUMAN_AGENT_NUMBER;
const VOICES = { hi:'Google.hi-IN-Wavenet-A', ta:'Google.ta-IN-Wavenet-A', te:'Google.te-IN-Standard-A', kn:'Google.kn-IN-Wavenet-A', ml:'Google.ml-IN-Wavenet-A', bn:'Google.bn-IN-Wavenet-A', gu:'Google.gu-IN-Wavenet-A', mr:'Google.mr-IN-Wavenet-A', pa:'Google.pa-IN-Standard-A', en:'Polly.Aditi' };
const STTS = { hi:'hi-IN', ta:'ta-IN', te:'te-IN', kn:'kn-IN', ml:'ml-IN', bn:'bn-IN', gu:'gu-IN', mr:'mr-IN', pa:'pa-IN', en:'en-IN' };
const TRANSFER_MSGS = { hi:'कृपया रुकें, गणेश जी से जोड़ रही हूं।', ta:'காத்திருங்கள், கணேஷ் அவர்களிடம் இணைக்கிறேன்.', te:'వేచి ఉండండి, గణేష్ గారికి కనెక్ట్ చేస్తున్నాను.', kn:'ನಿರೀಕ್ಷಿಸಿ, ಗಣೇಶ್ ಅವರಿಗೆ ಸಂಪರ್ಕಿಸುತ್ತೇನೆ.', ml:'കാത്തിരിക്കൂ, ഗണേഷ് സാറിലേക്ക് ബന്ധിപ്പിക്കുന്നു.', bn:'অপেক্ষা করুন, গণেশ স্যারের সাথে সংযুক্ত করছি।', gu:'રાહ જુઓ, ગણેશ સાહેબ સાથે જોડી રહી છું.', mr:'थांबा, गणेश सरांशी जोडत आहे.', pa:'ਉਡੀਕ ਕਰੋ, ਗਣੇਸ਼ ਜੀ ਨਾਲ ਜੋੜ ਰਹੀ ਹਾਂ।', en:'Please hold while I connect you to Ganesh.' };
function getVoice(l) { return VOICES[l]||VOICES.en; }
function getStt(l) { return STTS[l]||'en-IN'; }
function gatherSpeech(text, lang, fallback) {
  const t = new twilio.twiml.VoiceResponse();
  const g = t.gather({ input:'speech', action:'/handle-speech', method:'POST', speechTimeout:'auto', language:getStt(lang) });
  g.say({ voice:getVoice(lang) }, text);
  if (fallback) t.say({ voice:getVoice(lang) }, fallback);
  return t;
}
function transferToHuman(lang='en') {
  const t = new twilio.twiml.VoiceResponse();
  t.say({ voice:getVoice(lang) }, TRANSFER_MSGS[lang]||TRANSFER_MSGS.en);
  if (HUMAN) { const d=t.dial({ action:'/after-transfer', method:'POST' }); d.number(HUMAN); }
  else { t.say({ voice:getVoice(lang) }, 'Ganesh is unavailable. Please call back. Goodbye!'); t.hangup(); }
  return t;
}
function sayAndHangup(text, lang='en') { const t=new twilio.twiml.VoiceResponse(); t.say({ voice:getVoice(lang) }, text); t.hangup(); return t; }
function errorFallback(lang='en') { return transferToHuman(lang); }
module.exports = { gatherSpeech, transferToHuman, sayAndHangup, errorFallback };
