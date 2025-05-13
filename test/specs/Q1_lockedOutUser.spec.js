const LoginPage = require('../pageobjects/login.page');
const { expect } = require('expect-webdriverio');

describe('Q1: Locked Out User Test', () => {
    it('should show error message when logging in with locked_out_user', async () => {
        await LoginPage.open();
        
        await LoginPage.username.setValue('locked_out_user');
        await LoginPage.password.setValue('secret_sauce');
        await LoginPage.loginBtn.click();
        
        const errorMessage = await LoginPage.errorMsg.getText();
        await expect(errorMessage).toBe('Epic sadface: Sorry, this user has been locked out.');
    });
});
