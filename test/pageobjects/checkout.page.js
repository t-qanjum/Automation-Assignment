class CheckoutPage {
    get firstName() { return $('#first-name'); }
    get lastName() { return $('#last-name'); }
    get postalCode() { return $('#postal-code'); }
    get continueBtn() { return $('#continue'); }
    get finishBtn() { return $('#finish'); }
    get confirmationText() { return $('.complete-header'); }

    async checkout(firstName, lastName, postalCode) {
        await this.firstName.waitForDisplayed();
        await browser.waitUntil(async () => {
            const element = await this.firstName;
            return element && await element.isDisplayed();
        }, {
            timeout: 15000,
            timeoutMsg: 'First name input not visible',
        });
        await this.firstName.setValue(firstName);
        await this.lastName.setValue(lastName);
        await this.postalCode.setValue(postalCode);
        await this.continueBtn.click();
    }

    async finishCheckout() {
        await this.finishBtn.click();
    }

    async getConfirmationText() {
        return await this.confirmationText.getText();
    }
}

module.exports = new CheckoutPage();
