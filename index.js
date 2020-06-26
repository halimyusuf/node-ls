#! /usr/bin/env node
const fs = require('fs');
const util = require('util');

const lstat = util.promisify(fs.lstat);
fs.readdir(process.cwd(), async (err, files) => {
  if (err) console.log(err);
  else {
    for (let file of files) {
      const stats = await lstat(file);
      console.log(file, stats.isFile());
    }
  }
});
