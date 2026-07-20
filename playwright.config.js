// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { trace } from 'node:console';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */

//Global configuration for the tests, can be overridden in the test files
const config= ({
  // what tests under tests folder to run, can be specified here 
  testDir: './tests',
  //failed test retry count -- for flaky tests
  retries: 0,

  //config parameters for running tests in parallel
  //workers: 2, //default is number of cores in the machine(5)

  //timeout for each test step , Default is 30 seconds
  timeout: 40 * 1000,
 //timeout for assertion validations
 expect:{
   timeout: 40 * 1000,
 },
 reporter: 'html',

 //Core properties that the test will  run on
  use: {
    browserName: 'chromium',
    headless: false,
    screenshot: 'off', //off, on, only-on-failure
    trace: 'off', //off, on, retain-on-failure
    video : 'off', //off, on, retain-on-failure
    //...devices['iPhone 12 Pro Max'],
    //viewport: { width: 1280, height: 720 },
    
  },  

});

module.exports = config
