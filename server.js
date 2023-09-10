require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = process.env.PORT;
console.log (port);

const corsOptions = {
  origin: 'https://easy-qr-code-213cd3729788.herokuapp.com/', 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};


app.use(express.static(__dirname + "/public"));
app.use(cors(corsOptions));
app.use(express.json());

async function shortenURL(originalURL) {
  const apiKey = process.env.URLSHORT;
  const apiUrl = 'https://url-shortener-service.p.rapidapi.com/shorten';

  // Check if the URL starts with "http://" or "https://", and add it if missing
  if (!originalURL.startsWith('http://') && !originalURL.startsWith('https://')) {
    originalURL = 'http://' + originalURL;
  }
app.get('/', (req, res) => {
  res.sendFile(__dirname + 'index.html');
});

  const encodedParams = new URLSearchParams();
  encodedParams.set('url', originalURL);

  const options = {
    method: 'POST',
    url: apiUrl,
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'X-RapidAPI-Key': apiKey,
      'X-RapidAPI-Host': 'url-shortener-service.p.rapidapi.com',
    },
    data: encodedParams,
  };

  try {
    const response = await axios.request(options);
    return response.data.result_url; // Return the shortened URL directly as a string
  } catch (error) {
    console.error('An error occurred:', error);
    throw error;
  }
}

app.post('/shorten', async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    const shortUrl = await shortenURL(url);

    if (shortUrl) {
      res.status(200).send(shortUrl); // Send the shortened URL as plain text with a 200 status code
    } else {
      res.status(500).json({ error: 'Failed to shorten URL' });
    }
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).json({ error: 'An error occurred while shortening the URL' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
