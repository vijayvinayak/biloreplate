function generateRes() {
  const res = {
    header: (header, value) => {
      res.headers[header] = value;
    },
    setHeader: (header, value) => {
      res.headers[header] = value;
    },
    status: (status) => {
      res.statusCode = status;
      return res;
    },
    send: (data) => {
      res.body = data;
      return res;
    },
    json: (data) => {
      res.body = data;
      return res;
    },
    statusCode: 200,
    body: {},
    headers: {},
  };

  return res;
}

module.exports = generateRes;
