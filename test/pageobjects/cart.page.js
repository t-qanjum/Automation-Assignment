class CartPage {
    get checkoutBtn() { return $('#checkout'); }
    get firstName() { return $('#first-name'); }
    get lastName() { return $('#last-name'); }
    get postalCode() { return $('#postal-code'); }
    get continueBtn() { return $('#continue'); }
    get finishBtn() { return $('#finish'); }
    get productNames() { return $$('.inventory_item_name'); }
    get totalPrice() { return $('.summary_total_label'); }
    get successMsg() { return $('.complete-header'); }

    async checkoutInfo(first = 'Tasnim', last = 'Anjum', postal = '1236') {
        await this.checkoutBtn.click();
        await this.firstName.waitForDisplayed();
        await browser.waitUntil(async () => {
            const element = await this.firstName;
            return element && await element.isDisplayed();
        }, {
            timeout: 15000,
            timeoutMsg: 'First name input not visible',
        });
        await this.firstName.setValue(first);
        await this.lastName.setValue(last);
        await this.postalCode.setValue(postal);
        await this.continueBtn.click();
    }

    async finishCheckout() {
        await this.finishBtn.click();
    }

    async getProductNames() {
        return await Promise.all(this.productNames.map(el => el.getText()));
    }

    async getTotalPrice() {
        return (await this.totalPrice.getText()).replace('Total: $', '');
    }

    async getSuccessMessage() {
        return await this.successMsg.getText();
    }
}
module.exports = new CartPage();
