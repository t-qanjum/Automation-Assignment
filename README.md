# SauceDemo Automation Testing

## Project Overview
This project automates testing for the SauceDemo website (https://www.saucedemo.com/). It includes three test scenarios
Q1
 Try login with locked_out_user and verify the error message.


Q2
 Log in with standard_user. Then, from the hamburger menu, reset the App State. Add any three items to the cart. Navigate to the final checkout page and verify the product name and total price. Finish the purchase journey and verify the successful order message. Then, reset the App State again and log out.


Q3
 Login with performance_glitch_user and reset the App State. Then filter by name (Z to A) and select the first product into the cart. Then navigate up to the final checkout page and verify all the products' names and the total price. Then finish the purchase journey and verify the successful order message. Then, reset the App State again and log out.


Addidionally in Q4
 All the above three tests scenarios should run sequentially.



## Prerequisites
- Node.js
- npm
- WebdriverIO
- Allure



## Installation

# Clone the repository
git clone https://github.com/t-qanjum/Automation-Assignment

# Navigate to the project directory
cd Automation-Testing-Assignment-2

# Initialize a new git repository (if not already initialized)
git init

# Install all project dependencies
npm install

# Running Tests
1. Run All Tests
 --npx wdio run wdio.conf.js


2. Run Specific Test
 --npx wdio run wdio.conf.js --spec ./test/specs/<test-file>.js

 <!-- Replace <test-file> with the desired test file like-< Q1_lockedOutUser.spec.js > -->

# To Generate Allure reports
Generate the Allure report:
 --allure generate allure-results --clean -o allure-report
Opens the Allure report:
 --npx allure open allure-report


# (Optional) If WebdriverIO is not set up, you can initialize it with:
npx wdio config

# (Optional) If you need to install WebdriverIO and related packages:
npm install @wdio/cli @wdio/local-runner @wdio/mocha-framework @wdio/spec-reporter @wdio/sync webdriverio