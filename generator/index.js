// import fs from "fs";
const fs = require("fs");
const path = require("path");
const YAML = require("yamljs");

const start = async () => {
  let json = fs.readdirSync(path.resolve(__dirname, "../doc/en-US/"));

  let allDoc = json.reduce((prev, curr) => {
    let obj = YAML.load(path.resolve(__dirname, `../doc/en-US/${curr}`));
    obj.languages = obj.languages.map((item) => ({
      ...item,
      fromStyle: obj.name,
    }));

    return prev.concat([obj]);
  }, []);

  fs.writeFileSync(
    path.resolve(__dirname, "../pages/api/docs.json"),
    JSON.stringify(allDoc),
    "utf-8"
  );
};

start();
