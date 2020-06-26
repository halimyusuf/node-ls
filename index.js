#! /usr/bin/env node
const fs = require('fs');
const util = require('util');
const chalk = require('chalk');

const lstat = util.promisify(fs.lstat);
fs.readdir(process.cwd(), async (err, files) => {
  if (err) console.log(err);
  else {
    const statsPromise = files.map((file) => lstat(file));
    const filesStats = await Promise.all(statsPromise);
    for (let stat of filesStats) {
      const i = filesStats.indexOf(stat);
      if (stat.isFile()) {
        const size = `${stat.size}`;
        console.log(
          `${chalk.cyan(size)} ${' '.repeat(25 - size.length)} ${chalk.blue(
            files[i]
          )}`
        );
      } else {
        console.log(
          `${chalk.green('<DIR>')} ${' '.repeat(22)} ${chalk.yellow(files[i])}`
        );
      }
    }
  }
});
