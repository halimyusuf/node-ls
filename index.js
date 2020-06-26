#! /usr/bin/env node
const fs = require('fs');
const util = require('util');

const lstat = util.promisify(fs.lstat);
fs.readdir(process.cwd(), async (err, files) => {
  if (err) console.log(err);
  else {
    const statsPromise = files.map((file) => lstat(file));
    const filesStats = await Promise.all(statsPromise);
    for (let stat of filesStats) {
      const i = filesStats.indexOf(stat);
      console.log(files[i], stat.isFile());
    }
  }
});
