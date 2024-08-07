import express from 'express';
import fetch from 'node-fetch';
import utf8 from 'utf8';

const app = express();
const client_id = 'oINvcti2ijXhM9DxWau8';
const client_secret = 'laXayxxY8j';

app.use(express.static('public'));

app.use((res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
    'Access-Control-Allow-Credentials'
  );
  next();
});

app.get('/search/blog', async (req, res) => {
  //const utf8Query = utf8.encode(req.query.query);
  const query = req.query.query;
  const api_url =
    'https://openapi.naver.com/v1/search/blog.json?query=' +
    utf8.encode(query) +
    '&display=10&start=1&sort=random';

  const options = {
    url: api_url,
    headers: {
      'X-Naver-Client-Id': client_id,
      'X-Naver-Client-Secret': client_secret,
    },
  };

  try {
    const response = await fetch(api_url, options);
    if (response.ok) {
      const body = await response.json();
      res.status(200).json(body);
    } else {
      res.status(response.status).end();
      console.log('error = ' + response.status);
    }
  } catch (error) {
    res.status(500).send('Internal Server Error');
    console.log('Fetch error = ' + error);
  }
});

app.listen(5500, () => {
  console.log(
    'http://172.30.1.80:5500/search/blog?query=검색어 app listening on port 5500!'
  );
});
