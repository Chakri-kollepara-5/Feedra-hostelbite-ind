import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
app.use(cors());

app.get('/proxy/hostelbite', async (req, res) => {
  try {
    const response = await fetch('https://68f36394857123d0001955ea.heyboss.live');
    const html = await response.text();

    // Optional: fix relative paths
    const proxiedHtml = html.replace(/src="\//g, 'src="https://68f36394857123d0001955ea.heyboss.live/');

    res.send(proxiedHtml);
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to load HostelBite');
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Proxy server running on port ${PORT}`));
