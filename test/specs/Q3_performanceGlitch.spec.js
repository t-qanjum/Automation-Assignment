const LoginPage = require('../pageobjects/login.page');
const InventoryPage = require('../pageobjects/inventory.page');
const CartPage = require('../pageobjects/cart.page');
const CheckoutPage = require('../pageobjects/checkout.page');
const { expect } = require('expect-webdriverio');

describe('Q3: Performance Glitch User Flow', () => {
    it('should complete purchase with Z to A sorting', async () => {
        await LoginPage.open();
        await LoginPage.login('performance_glitch_user', 'secret_sauce');

        const menuButton = await $('#react-burger-menu-btn');
        await menuButton.waitForClickable({ timeout: 10000 });
        await menuButton.click();
        const resetButton = await $('#reset_sidebar_link');
        await resetButton.waitForClickable({ timeout: 10000 });
        await resetButton.click();
        
        const closeButton = await $('#react-burger-cross-btn');
        await closeButton.waitForClickable({ timeout: 10000 });
        await closeButton.click();

        const sortDropdown = await $('.product_sort_container');
        await sortDropdown.waitForClickable({ timeout: 10000 });
        await sortDropdown.selectByVisibleText('Name (Z to A)');

        const firstProduct = await $('.inventory_item');
        const productName = await firstProduct.$('.inventory_item_name').getText();
        const addButton = await firstProduct.$('button');
        await addButton.click();

        const cartButton = await $('.shopping_cart_link');
        await cartButton.click();

        const cartItem = await $('.inventory_item_name');
        await expect(await cartItem.getText()).toBe(productName);

        const checkoutButton = await $('#checkout');
        await checkoutButton.click();        
        const firstName = await $('#first-name');
        const lastName = await $('#last-name');
        const postalCode = await $('#postal-code');
        const continueBtn = await $('#continue');
        
        await firstName.waitForEnabled({ timeout: 10000 });
        await firstName.setValue('Tasnim');
        await lastName.waitForEnabled({ timeout: 10000 });
        await lastName.setValue('Anjum');
        await postalCode.waitForEnabled({ timeout: 10000 });
        await postalCode.setValue('1236');

        await continueBtn.waitForClickable({ timeout: 10000 });
        await continueBtn.click();

        const subtotalElement = await $('.summary_subtotal_label');
        const taxElement = await $('.summary_tax_label');
        const totalElement = await $('.summary_total_label');
        
        await subtotalElement.waitForExist({ timeout: 10000 });
        await taxElement.waitForExist({ timeout: 10000 });
        await totalElement.waitForExist({ timeout: 10000 });
        
        const subtotal = parseFloat(await subtotalElement.getText().then(text => text.replace(/[^0-9.]/g, '')));
        const tax = parseFloat(await taxElement.getText().then(text => text.replace(/[^0-9.]/g, '')));
        const total = parseFloat(await totalElement.getText().then(text => text.replace(/[^0-9.]/g, '')));
        
        await expect(Math.round((subtotal + tax) * 100) / 100).toBe(total);

        const finishBtn = await $('#finish');
        await finishBtn.waitForClickable({ timeout: 10000 });
        await finishBtn.click();

        const successMsg = await $('.complete-header');
        await successMsg.waitForDisplayed({ timeout: 10000 });
        await expect(successMsg).toHaveText('Thank you for your order!');

        await menuButton.click();
        await resetButton.waitForClickable({ timeout: 10000 });
        await resetButton.click();
        const logoutButton = await $('#logout_sidebar_link');
        await logoutButton.click();
    });
});
