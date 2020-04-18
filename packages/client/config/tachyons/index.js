const fs = require("fs");

const makeCore = require("tachyons-generator");
const config = require("./config");

const generate = async () => {
  const tachy = makeCore(config);
  const out = await tachy.generate();
  fs.writeFileSync("src/styles/tachyons.scss", out.css);
};

generate();
