import log from "@ajar/marker";
import http, { METHODS, request } from "http";
import querystring, { stringify } from "querystring";
import url from "url";
import userAgent from "user-agents";

// const PORT = process.env.PORT;
// const HOST = process.env.HOST;
const { PORT, HOST } = process.env;
//console.log(process.env);

//create an http web server
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  // res.setHeader('Content-Type','text/plain')
  // res.setHeader('Content-Type','text/html')
  // res.end(`<h1>Hello from server!!!</h1>`);

  // Get pathname
  const url_data = url.parse(req?.url);

  // protocol
  req.protocol = "http";

  // Get obj with querystrings values/ keys
  const queryObject = url.parse(req.url, true).query;
  // user_agent before converts to string
  const user_agent = new userAgent();

  const httpAgent = new http.Agent({
    keepAlive: true,
    maxFreeSockets: 1,
    keepAliveMsecs: 3000,
  });

  http: log.cyan();

  res.setHeader("Content-Type", "application/json");
  res.setHeader("agenda", "political");
  res.setHeader("anything", "goes");
  res.setHeader(`some-single-value`, `some-single-value`);

  let obj = {
    href: `http://${HOST}:${PORT}/${req?.url}`,
    method: `${req?.method}`,
    host: `${HOST}:${PORT}`,
    protocol: `${req?.protocol}:`,
    httpVersion: `${req?.httpVersion}`,
    pathname: `${url_data?.pathname}`,
    querystring: { month: queryObject?.month, temp: queryObject?.temp },
    user_agent: `${user_agent.toString()}`,
    connection: httpAgent.connection,
  };
  let href = res.end(JSON.stringify(obj, null, 2));
  // log.cyan(querystring.unescape("month"));
  // res.end(obj);
});

//have the server listen to a given port
server.listen(PORT, HOST, (err) => {
  if (err) log.error(err);
  else log.magenta(`🌎  listening on`, `http://${HOST}:${PORT}`);
});
