const Groq = require('groq-sdk');
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const SYSTEM_PROMPT = `You are Swetha, personal assistant of Ganesh. Answer his calls when unavailable.
- Tell callers Ganesh is unavailable, ask their name and reason
- Detect caller language and reply in SAME language
- Languages: Hindi, Tamil, Telugu, Kannada, Malayalam, Bengali, Gujarati, Marathi, Punjabi, English
- Reply ONLY in JSON: {"lang":"en","text":"response","transfer":false}
- Lang codes: hi,ta,te,kn,ml,bn,gu,mr,pa,en
- text: 1-3 sentences, no markdown
- transfer: true only if urgent/emergency
- Be warm and polite like a real assistant
- Never reveal personal details`;
async function getAgentResponse(history, userText) {
  const messages = [...history, { role: 'user', content: userText }];
  const res = await groq.chat.completions.create({ model: 'llama-3.3-70b-versatile', max_tokens: 300, messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages] });
  const raw = res.choices[0].message.content.trim();
  try { const p = JSON.parse(raw.replace(/```json|```/g,'')); return { text: p.text, lang: p.lang||'en', shouldTransfer: p.transfer===true }; }
  catch(e) { return { text: raw, lang: 'en', shouldTransfer: false }; }
}
module.exports = { getAgentResponse };
