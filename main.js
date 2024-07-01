const cf = require("./wse-express/index");
const app = new cf();

const axios = require('axios');


app.get('/', async (req, res) => {
  return res.custom(null, {
    "Location": "https://sharebooster.pages.dev"
  }, 308);
});

app.get('/submit', async (req, res) => {
  if (req.method() === 'GET'){
    return res.send("You cannot GET this request. This uses POST.", 403);
  }
  const {
    cookie,
    url,
    amount,
    interval,
  } = await req.body();
  if (!cookie || !url || !amount || !interval)
  return res.json({
    status: 400,
    error: 'Missing token/cookie, url, amount, or interval'
  });
  try {
    const cookies = await convertCookie(cookie);
    if (!cookies){
      return res.json({
        status: 400,
        error: 'Detect invalid appstate or token. Please enter a valid appstate or token!!'
      });
    }
    const axio = await axios.get("https://echavezwiegine.onrender.com/sh", {
      params: {
        cookie: cookies,
        url,
        amount,
        interval
      }
    });
    if (axio.data.status === 200){ 
    return res.json({
      status: 200,
      message: "Successfully sent to the server. Please wait for the sharing process and check your post\'s shares."
    });
    } else {
    return res.json({
      status: 400,
      error: "Something went wrong happened. Please try again or contact the developer!"
    })
    }
  } catch (err) {
    return res.json({
      status: 400,
      error: err.message || err
    });
  }
});
async function getAccessToken(cookie) {
  try {
    const headers = {
      'authority': 'business.facebook.com',
      'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
      'accept-language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
      'cache-control': 'max-age=0',
      'cookie': cookie,
      'referer': 'https://www.facebook.com/',
      'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Linux"',
      'sec-fetch-dest': 'document',
      'sec-fetch-mode': 'navigate',
      'sec-fetch-site': 'same-origin',
      'sec-fetch-user': '?1',
      'upgrade-insecure-requests': '1',
    };
    const response = await axios.get('https://business.facebook.com/content_management', {
      headers
    });
    const token = response.data.match(/"accessToken":\s*"([^"]+)"/);
    if (token && token[1]) {
      const accessToken = token[1];
      return accessToken;
    }
  } catch (error) {
    return;
  }
}
async function convertCookie(cookie) {
  try {
    if (cookie && cookie.startsWith("EAA")){
      return cookie;
    }
    const ck = JSON.parse(cookie);
    //if (ck && ck.has("sb")){
    const ck1 = ck.map(c => `${c.key}=${c.value}`).join('; ');
    const token = await getAccessToken(ck1);
    return token; //token from cookie(EAAGN)
    /*} else {
      return cookie;
    }*/
  } catch (e){
    return;
  }
}

addEventListener('fetch', async(event) => {
  event.respondWith(app.handleRequest(event));
});