const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { generateSpeech } = require('./ttsService');  // This is the function that will handle TTS logic

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

app.post('/api/convert', async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'No text provided.' });
  }

  try {
    const audioUrl = await generateSpeech(text);
    res.json({ audioUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to convert text to speech.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});