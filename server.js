require('dotenv').config();
const express = require('express');
const callRoutes = require('./routes/callRoutes');
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/', callRoutes);
app.get('/health', (req, res) => res.json({ status: 'ok', agent: 'Swetha' }));
app.listen(process.env.PORT || 3000, () => console.log('\n🎙️ Swetha is live!\n'));
