const LoginPage = require('../pageobjects/login.page');
const InventoryPage = require('../pageobjects/inventory.page');
const CartPage = require('../pageobjects/cart.page');
const CheckoutPage = require('../pageobjects/checkout.page');
const { expect } = require('expect-webdriverio');

describe('Q2: Standard User Purchase Flow', () => {
    it('should complete full purchase journey with app state reset', async () => {
        await LoginPage.open();
        await LoginPage.login('standard_user', 'secret_sauce');

        const menuButton = await $('#react-burger-menu-btn');
        await menuButton.click();
        const resetButton = await $('#reset_sidebar_link');
        await resetButton.click();
        
        const closeButton = await $('#react-burger-cross-btn');
        await closeButton.waitForClickable({ timeout: 5000 });
        await closeButton.click();

        const items = ['Sauce Labs Backpack', 'Sauce Labs Bike Light', 'Sauce Labs Bolt T-Shirt'];
        for (const item of items) {
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
        await expect(cartItemTexts).toEqual(expect.arrayContaining(items));

        const checkoutButton = await $('#checkout');
        await checkoutButton.click();

        await $('#first-name').setValue('Tasnim');
        await $('#last-name').setValue('Anjum');
        await $('#postal-code').setValue('1236');
        await $('#continue').click();
        
        const subtotalElement = await $('.summary_subtotal_label');
        const taxElement = await $('.summary_tax_label');
        const totalElement = await $('.summary_total_label');
        
        const subtotal = parseFloat(await subtotalElement.getText().then(text => text.replace(/[^0-9.]/g, '')));
        const tax = parseFloat(await taxElement.getText().then(text => text.replace(/[^0-9.]/g, '')));
        const total = parseFloat(await totalElement.getText().then(text => text.replace(/[^0-9.]/g, '')));
          await expect(Math.round((subtotal + tax) * 100) / 100).toBe(total);
        await expect(totalElement).toHaveText(expect.stringContaining('60.45'));

        await $('#finish').click();        
        const successMsg = await $('.complete-header');
        await expect(successMsg).toHaveText('Thank you for your order!');

        await menuButton.click();
        await resetButton.click();
        const logoutButton = await $('#logout_sidebar_link');
        await logoutButton.click();
    });
});
