#!/usr/bin/env node

const fs = require("fs");
const { execSync } = require("child_process");

console.log("installing prettier-standard and husky...");
execSync("yarn add -D prettier-standard husky@4.0", {
  cwd: "./",
  stdio: "ignore",
});
console.log("prettier-standard and husky were added successfully!\n");

console.log("configuring package.json...");
const packageJson = JSON.parse(fs.readFileSync("./package.json"));
fs.writeFileSync(
  "./package.json",
  JSON.stringify(
    {
      ...packageJson,
      prettier: {
        trailingComma: "all",
        singleQuote: true,
        arrowParens: "avoid",
      },
      husky: {
        hooks: {
          "pre-commit": "prettier-standard --format --staged",
        },
      },
    },
    null,
    2
  )
);
console.log("package.json configured successfully!\n");

console.log("committing changes...\n");
execSync(
  'git add package.json && git commit -m "prettier-standard and husky added"',
  {
    cwd: "./",
    stdio: "ignore",
  }
);
console.log("changes committed successfully!\n");
