#!/usr/bin/env node
// const util = require('util');
import util from 'util';
import child_process from 'child_process';
const exec = util.promisify(child_process.exec);

const MESSAGE_MISSING_APP_NAME = 'Missing application name!';
const KRAP_FE_REPOSITORY_URL = 'https://github.com/CodeMonkey-Mike/krap-fe.git';
const KRAP_BE_REPOSITORY_URL = 'https://github.com/CodeMonkey-Mike/krap-be.git';

const main = async () => {
  try {
    if(process.argv.length <= 2) {
      return console.log(MESSAGE_MISSING_APP_NAME);
    }
    const appName = process.argv[process.argv.length-1]; 

    if(appName) {
      await exec(`mkdir ${appName}-fe`);
      await exec(`git clone ${KRAP_FE_REPOSITORY_URL}`);
      await exec(`cp -r -f krap-fe/ ${appName}-fe`);
      await exec(`rm -rf krap-fe`);
      console.log('Set up for the frontend package in processing. It will take a couple of minutes...')
      await exec(`npm install -g json && cd ${appName}-fe && json -I -f package.json -e 'this.name="${appName}-fe"' && rm -rf .git && git init && yarn`);    
      console.log('Set up for the frontend package succesful!')
      await exec(`mkdir ${appName}-be`);
      await exec(`git clone ${KRAP_BE_REPOSITORY_URL}`);
      await exec(`cp -r -f krap-be/ ${appName}-be`);
      await exec(`rm -rf krap-be`);
      console.log('Set up for the backend package in processing. It will take a couple of  minutes...')
      await exec(`cd ${appName}-be && json -I -f package.json -e 'this.name="${appName}-be"' && rm -rf .git && git init && yarn`);    
      console.log('Set up for the backend package succesful!');
    } else {
      return console.log(MESSAGE_MISSING_APP_NAME);
    }
  } catch (e) {
    throw new Error(e.message);
  }
};

main();