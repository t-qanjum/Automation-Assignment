"Apologies for the late submission. I had checked earlier and saw that the deadline was May 13, 2025, at 11:59 PM."

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

1. **Clone the repository**
   ```bash
   git clone https://github.com/t-qanjum/Automation-Assignment.git
   ```

2. **Navigate to the project directory**
   ```bash
   cd Automation-Assignment
   ```

3. **Install all project dependencies**
   ```bash
   npm install
   ```

4. **(Optional) If you do not have Allure CLI installed globally:**
   ```bash
   npm install -g allure-commandline --save-dev
   ```

---

## Running Tests and Viewing Allure Report

To run all tests, generate the Allure report, and open it automatically, use:

```bash
npm run test:allure
```

`package.json` must include the following scripts to create allure report automatically:
"scripts": {
  "test": "wdio run wdio.conf.js",
  "allure:generate": "allure generate allure-results --clean -o allure-report",
  "allure:open": "allure open allure-report",
  "test:allure": "npm run test && npm run allure:generate && npm run allure:open"
}
