const LoginPage = require('../pageobjects/login.page');
const InventoryPage = require('../pageobjects/inventory.page');
const CartPage = require('../pageobjects/cart.page');
const CheckoutPage = require('../pageobjects/checkout.page');
const { expect } = require('@wdio/globals');

describe('Q4: Combined Test Flow', () => {
    it('should execute all test scenarios in sequence', async () => {
        await LoginPage.open();
        await LoginPage.username.setValue('locked_out_user');
        await LoginPage.password.setValue('secret_sauce');
        await LoginPage.loginBtn.click();
        const errorMessage = await LoginPage.errorMsg;
        await expect(errorMessage).toHaveText('Epic sadface: Sorry, this user has been locked out.');

        await LoginPage.open();
        await LoginPage.login('standard_user', 'secret_sauce');

        const menuButton = await $('#react-burger-menu-btn');
        await menuButton.click();
        const resetButton = await $('#reset_sidebar_link');
        await resetButton.click();
        const closeButton = await $('#react-burger-cross-btn');
        await closeButton.waitForClickable({ timeout: 5000 });
        await closeButton.click();

        const standardItems = ['Sauce Labs Backpack', 'Sauce Labs Bike Light', 'Sauce Labs Bolt T-Shirt'];
        for (const item of standardItems) {
            const itemButton = await $(`//div[text()="${item}"]/ancestor::div[@class="inventory_item"]//button`);
            await itemButton.click();
        }

        const cartButton = await $('.shopping_cart_link');
        await cartButton.click();

        const cartItems = await $$('.inventory_item_name');
        const cartItemTexts = [];
        for (const item of cartItems) {
            cartItemTexts.push(await item.getText());
        }
        await expect(cartItemTexts).toEqual(expect.arrayContaining(standardItems));

        const checkoutButton = await $('#checkout');
        await checkoutButton.click();

        await $('#first-name').setValue('Tasnim');
        await $('#last-name').setValue('Anjum');
        await $('#postal-code').setValue('1236');
        await $('#continue').click();

        const totalPrice = await $('.summary_total_label');
        await expect(totalPrice).toHaveText(expect.stringContaining('60.45'));

        await $('#finish').click();
        const successMsg = await $('.complete-header');
        await expect(successMsg).toHaveText('Thank you for your order!');

        await menuButton.click();
        await resetButton.click();
        const logoutButton = await $('#logout_sidebar_link');
        await logoutButton.click();

        await LoginPage.open();
        await LoginPage.login('performance_glitch_user', 'secret_sauce');

        await menuButton.waitForClickable({ timeout: 10000 });
        await menuButton.click();
        await resetButton.waitForClickable({ timeout: 10000 });
        await resetButton.click();
        await closeButton.waitForClickable({ timeout: 10000 });
        await closeButton.click();

        const sortDropdown = await $('.product_sort_container');
        await sortDropdown.waitForClickable({ timeout: 10000 });
        await sortDropdown.selectByVisibleText('Name (Z to A)');

        const firstProduct = await $('.inventory_item');
        const productName = await firstProduct.$('.inventory_item_name').getText();
        const addButton = await firstProduct.$('button');
        await addButton.click();

        await cartButton.click();

        const glitchCartItem = await $('.inventory_item_name');
        await expect(await glitchCartItem.getText()).toBe(productName);

        await checkoutButton.click();

        await $('#first-name').setValue('Tasnim');
        await $('#last-name').setValue('Anjum');
        await $('#postal-code').setValue('1236');
        await $('#continue').click();

        await $('#finish').click();
        const glitchSuccessMsg = await $('.complete-header');
        await expect(glitchSuccessMsg).toHaveText('Thank you for your order!');

        await menuButton.click();
        await resetButton.waitForClickable({ timeout: 10000 });
        await resetButton.click();
        await logoutButton.click();
    });
});