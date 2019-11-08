const http = require("http");
process.env.NODE_ENV = "production";
const oracle = require("./oracle");

const random = () => Math.floor(Math.random() * 9999);

let prevRss = process.memoryUsage().rss;
const server = http
  .createServer(async (req, res) => {
    res.setHeader("Content-Type", "text/html");
    res.setHeader("X-Foo", "bar");

    res.writeHead(200, { "Content-Type": "application/json" });
    const lower = random();
    const params = [lower, lower + 100];

    const data = await oracle.query(params);
    const currentRss = process.memoryUsage().rss;

    process.stdout.write(`\n${currentRss} ${currentRss - prevRss}`);
    prevRss = currentRss;

    res.end(JSON.stringify(data));
  })
  .listen(3000);

server.on("listening", () => {
  console.log("listening");
});
