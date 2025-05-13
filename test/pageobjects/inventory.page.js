class InventoryPage {
    get menuBtn() { return $('#react-burger-menu-btn'); }
    get resetAppBtn() { return $('#reset_sidebar_link'); }
    get logoutBtn() { return $('#logout_sidebar_link'); }
    get items() { return $$('.inventory_item'); }
    get addToCartBtns() { return $$('button.btn_inventory'); }
    get cartIcon() { return $('.shopping_cart_link'); }
    get sortSelect() { return $('.product_sort_container'); }

    async resetApp() {
        await this.menuBtn.click();
        await browser.pause(500);
        await this.resetAppBtn.click();
        await browser.pause(500);
        await this.menuBtn.click();
        await browser.pause(500);
    }

    async logout() {
        await this.menuBtn.click();
        await browser.pause(500);
        await this.logoutBtn.click();
    }

    async addItems(count = 3) {
        for (let i = 0; i < count; i++) {
            await this.addToCartBtns[i].click();
        }
    }

    async sortBy(option) {
        await this.sortSelect.selectByVisibleText(option);
    }

    async goToCart() {
        await this.cartIcon.click();
    }

    async addItemToCart(itemName) {
        const item = await this.items.find(async el => (await el.$('.inventory_item_name').getText()) === itemName);
        if (item) {
            await item.$('button.btn_inventory').click();
        }
    }

    async addFirstItemToCart() {
        if (this.addToCartBtns.length > 0) {
            await this.addToCartBtns[0].click();
        }
    }

    async sortProducts(order) {
        await this.sortSelect.selectByAttribute('value', order);
    }
}
module.exports = new InventoryPage();
// Compare this snippet from test/specs/Q4_combinedFlow.spec.js:
//         await browser.pause(1000); // Small pause to ensure any animations complete
//         await $('#react-burger-menu-btn').click();
//
//
//         // Ensure the menu button is interactable before clicking
//         await browser.execute(() => {
//             const menuButton = document.querySelector('#react-burger-menu-btn');
//             if (menuButton) {
//                 menuButton.scrollIntoView({ behavior: 'smooth', block: 'center' });
//             }
//         });
//         await browser.waitUntil(async () => {
//             const menuButton = document.querySelector('#react-burger-menu-btn');
//             return menuButton && menuButton.offsetParent !== null;
//         });