process.env.NODE_ENV = "production";
const express = require("express");
const oracle = require("./oracle");
const { random } = require("lodash");
const app = express();
const port = 3000;

app.get("/close", async (req, res) => {
  const pool = await oracle.closePool().catch(err => {
    console.error(err.message);
    res.send("Pool closed");
  });

  res.send("Pol Closed");
});

app.get("/init", async (req, res) => {
  const pool = await oracle.initPool().catch(err => {
    console.error(err.message);
    res.send("Pol Itialization failed");
  });

  res.send("Pol Itialized");
});

app.get("/query", async (req, res) => {
  const lower = random(0, 9999);
  const params = [lower, lower + 100].sort();
  res.json(await oracle.query(params));
});

app.get("/", (req, res) => res.send("yo"));

app.listen(port, () => console.log(`Listening on ${port}!`));
