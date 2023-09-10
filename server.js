const axios = require('axios');

async function shortenURL(originalURL) {
  const apiKey = process.env.URLSHORT;
  const apiUrl = 'https://url-shortener-service.p.rapidapi.com/shorten';

  // Check if the URL starts with "http://" or "https://", and add it if missing
  if (!originalURL.startsWith('http://') && !originalURL.startsWith('https://')) {
    originalURL = 'http://' + originalURL;
  }

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

module.exports = async (req, res) => {
  if (req.method === 'POST') {
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
  } else {
    res.status(405).end(); // Method not allowed
  }
};
