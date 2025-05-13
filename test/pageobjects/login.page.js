class LoginPage {
    get username() { return $('#user-name'); }
    get password() { return $('#password'); }
    get loginBtn() { return $('#login-button'); }
    get errorMsg() { return $('h3[data-test="error"]'); }

    async open() {
        await browser.url('https://www.saucedemo.com/');
        await browser.waitUntil(async () => {
            const usernameField = await this.username;
            const passwordField = await this.password;
            return await usernameField.isDisplayed() && await passwordField.isDisplayed();
        }, {
            timeout: 10000,
            timeoutMsg: 'Login form not ready after 10s'
        });
    }

    async login(user, pass) {
        if (user === 'performance_glitch_user') {
            await browser.pause(2000);
        }
        
        await this.username.setValue(user);
        await this.password.setValue(pass);
        
        await browser.waitUntil(async () => {
            return await this.loginBtn.isClickable();
        }, {
            timeout: 10000,
            timeoutMsg: 'Login button not clickable after 10s'
        });
        
        await this.loginBtn.click();
        
        await browser.waitUntil(async () => {
            const url = await browser.getUrl();
            return url.includes('/inventory.html');
        }, {
            timeout: 15000,
            timeoutMsg: 'Navigation not complete after 15s'
        });
    }

   
    async verifyErrorMessage(expectedMessage) {
        await browser.waitUntil(async () => {
            return await this.errorMsg.isDisplayed();
        }, {
            timeout: 5000,
            timeoutMsg: 'Error message not displayed after 5s'
        });
        
        const actualMessage = await this.errorMsg.getText();
        await expect(actualMessage).toBe(expectedMessage);
    }

    async resetAndLogout() {
        const menuButton = await $('#react-burger-menu-btn');
        await menuButton.waitForClickable({ timeout: 5000 });
        await menuButton.click();

        const resetButton = await $('#reset_sidebar_link');
        await resetButton.waitForClickable({ timeout: 5000 });
        await resetButton.click();

        const logoutButton = await $('#logout_sidebar_link');
        await logoutButton.waitForClickable({ timeout: 5000 });
        await logoutButton.click();

        // Verify we're back at login page
        await browser.waitUntil(async () => {
            const url = await browser.getUrl();
            return url.includes('saucedemo.com');
        }, {
            timeout: 5000,
            timeoutMsg: 'Did not return to login page after 5s'
        });
    }
}

module.exports = new LoginPage();
