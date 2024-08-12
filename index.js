import express from 'express';
import axios from 'axios';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(join(__dirname, 'src')));
//app.use(express.static(path.join(__dirname, 'public')));

const client_id = 'oINvcti2ijXhM9DxWau8';
const client_secret = 'laXayxxY8j';

app.use(
  cors({
    origin: [
      'https://stillcorners.github.io',
      'https://glacial-basin-92310-01f7dc392c47.herokuapp.com',
    ],
    methods: ['GET'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.get('/search/blog', async (req, res) => {
  const query = req.query.query;
  const api_url = 'https://openapi.naver.com/v1/search/blog?query=' + encodeURI(query);

  try {
    const response = await axios.get(api_url, {
      headers: {
        'X-Naver-Client-Id': client_id,
        'X-Naver-Client-Secret': client_secret,
      },
    });

    res.status(response.status).json(response.data);
  } catch (error) {
    console.error('Error:', error);
    res.status(error.response ? error.response.status : 500).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

// node index.js
