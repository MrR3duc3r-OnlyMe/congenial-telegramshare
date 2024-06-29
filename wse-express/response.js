module.exports = class AppRes {
  constructor(request) {}
  
  async send(data, status = 200) {
    return new Response(data, {
      status,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, HEAD, OPTIONS, DELETE",
        "Access-Control-Allow-Headers": 'Content-Type, X-Requested-With',
        "content-type": "text/plain;charset=utf-8"
      }
    });
  }
  
  async html(data, status = 200) {
    return new Response(data, {
      status,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, HEAD, OPTIONS, DELETE",
        "Access-Control-Allow-Headers": 'Content-Type, X-Requested-With',
        "content-type": "text/html;charset=utf-8"
      }
    });
  }
  
  async json(data, status = 200) {
    return new Response(JSON.stringify(data,null,2), {
      status,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, HEAD, OPTIONS, DELETE",
        "Access-Control-Allow-Headers": 'Content-Type, X-Requested-With',
        "content-type": "application/json"
      }
    });
  }
  
  async image(data, status = 200) {
    return new Response(data, {
      status,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, HEAD, OPTIONS, DELETE",
        "Access-Control-Allow-Headers": 'Content-Type, X-Requested-With',
        "content-type": "image/png"
      }
    });
  }
  
  async custom(data, headers, status = 200) {
    return new Response(data, {
      status,
      headers
    });
  }
};
