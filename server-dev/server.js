const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
const app = express();
const port = 3000;

const client_id = process.argv[2].split("client_id=")[1].split(" ")[0];
const client_secret = process.argv[3].split("client_secret=")[1].split(" ")[0];

const convertQueryParams = (url) => {
  const query = url;
  const result = {};
  query.split("&").forEach((param) => {
    const item = param.split("=");
    result[item[0]] = decodeURIComponent(item[1]);
  });
  return result;
};

app.use(cors());

app.get("/:code", async (req, res) => {
  const response = await fetch("https://github.com/login/oauth/access_token", {
    method: "post",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      client_id: client_id,
      client_secret: client_secret,
      code: req.params.code,
    }),
  });
  const data = await response.text();
  res.send(convertQueryParams(data).access_token);
});
app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
