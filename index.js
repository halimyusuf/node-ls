#! /usr/bin/env node
const fs = require('fs');
const util = require('util');
const chalk = require('chalk');
const path = require('path');

const targetDir = process.argv[2] || process.cwd();

const lstat = util.promisify(fs.lstat);
fs.readdir(targetDir, async (err, files) => {
  if (err) console.log(err);
  //   console.log(files);
  else {
    const statsPromise = files.map((file) => lstat(path.join(targetDir, file)));
    const filesStats = await Promise.all(statsPromise);
    let fileCount = 0;
    let dirCount = 0;
    let totalSize = 0;
    for (let stat of filesStats) {
      const i = filesStats.indexOf(stat);
      if (stat.isFile()) {
        fileCount++;
        const size = `${stat.size}`;
        totalSize += Number(size);
        console.log(
          `  ${chalk.cyan(size)} ${' '.repeat(25 - size.length)} ${chalk.blue(
            files[i]
          )}`
        );
      } else {
        dirCount++;
        console.log(
          `  ${chalk.green('<DIR>')} ${' '.repeat(20)} ${chalk.yellow(
            files[i]
          )}`
        );
      }
    }
    console.log(
      `${' '.repeat(10)} ${fileCount} File(s) ${' '.repeat(
        5
      )} ${totalSize} bytes`
    );
    console.log(`${' '.repeat(10)} ${dirCount} Dir(s) `);
  }
});
