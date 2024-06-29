module.exports = class AppRes {
  constructor(request) {}

  async send(data, status = 200) {
    return new Response(data, {
      status,
      headers: {
        "content-type": "text/plain;charset=utf-8"
      }
    });
  }
  
  async html(data, status = 200) {
    return new Response(data, {
      status,
      headers: {
        "content-type": "text/html;charset=utf-8"
      }
    });
  }
  
  async json(data, status = 200) {
    return new Response(JSON.stringify(data,null,2), {
      status,
      headers: {
        "content-type": "application/json"
      }
    });
  }
  
  async image(data, status = 200) {
    return new Response(data, {
      status,
      headers: {
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
