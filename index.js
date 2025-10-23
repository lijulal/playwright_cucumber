
// index.js
const fs = require("fs");
const path = require("path");
const Ajv = require("ajv");

const schemaPath = path.resolve("C:\\interview repo\\PlaywrightCucuber\\src\\schema\\schema.json");
const dataFile = "C:\\interview repo\\PlaywrightCucuber\\src\\schema\\data.valid.json"; // default file

function loadJson(p) {
  try {
    return JSON.parse(fs.readFileSync(p, "utf8"));
  } catch (err) {
    console.error(`Failed to read/parse ${p}:`, err.message);
    process.exit(2);
  }
}

const schema = loadJson(schemaPath);
const data = loadJson("C:\\interview repo\\PlaywrightCucuber\\src\\schema\\data.valid.json");

const ajv = new Ajv({ allErrors: true, strict: false }); // strict:false to be permissive in demo
require("ajv-formats")(ajv); // to enable "email" format (install ajv-formats if needed)

const validate = ajv.compile(schema);
const valid = validate(data);

if (valid) {
  console.log(`✔ Validation passed for ${dataFile}`);
  process.exit(0);
} else {
  console.log(`✖ Validation failed for ${dataFile}. Errors:`);
  // Pretty-print errors
  for (const err of validate.errors) {
    console.log(`  - [${err.instancePath || '/'}] ${err.message}${err.params ? ` (${JSON.stringify(err.params)})` : ''}`);
  }
  process.exit(1);
}
