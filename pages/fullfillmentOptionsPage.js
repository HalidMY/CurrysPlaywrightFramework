import { expect } from 'playwright/test';
import BasePage from './basePage';
import urls from '../data/url.json';

export default class FullfillmentOptionsPage extends BasePage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        super(page);
        // Locators
        this.postCodeInput = page.locator('#stockSearch');
        this.checkPostCodeButton = page.locator('a[class^="cart-submit-user-location"]');
        this.deliveryOptions = page.locator('[name="checkout-delivery-option-small_box_home_delivery"]');
        this.continueAsGuestButton = page.locator('button[value="submit-fulfillment"]');
    }

    // Actions

    /**
     * @description This method enters the post code into the input field.
     * @param {String} postCode 
     */
    async enterPostCode(postCode) {
        console.log("Entering post code:", postCode);
        await this.postCodeInput.fill(postCode);
    }

    /**
     * @description This method clicks the check post code button.
     * It is used to validate the post code and fetch delivery options.
     */
    async clickCheckPostCodeButton() {
        console.log("Clicking the 'Check Post Code' button");
        await this.clickElement(this.checkPostCodeButton);
    }

    /**
     * @description This method selects the first delivery option available.
     * It is used to proceed with the delivery option selection.
     */
    async selectRegularDeliveryOption() {
        console.log("Selecting the delivery option");
        await this.clickElement(this.deliveryOptions.first());
    }

    /**
     * @description This method clicks the 'Continue as Guest' button to proceed with the checkout process.
     */
    async clickContinueAsGuestButton() {
        console.log("Clicking the 'Continue as Guest' button");
        await this.clickElement(this.continueAsGuestButton);
    }

    /**
     * @description This method searches for the post code, selects the delivery option, and continues as a guest.
     * @param {String} postCode 
     */
    async searchAndEnterPostCodeAndContinueAsGuest(postCode) {
        console.log("Searching for post code and continuing as guest");
        await this.enterPostCode(postCode);
        await this.clickCheckPostCodeButton();
        await this.selectRegularDeliveryOption();
        await this.clickContinueAsGuestButton();
    }

    // Validations

    /**
     * @description This method validates that the Fulfillment Options page is displayed.
     */
    async validateFulfillmentOptionsPage() {
        console.log("Validating Fulfillment Options page URL:", url);
        const url = await this.getUrl(this.page);
        expect(url.startsWith(urls.prod.currys.fullFillmentOptionsUrl)).toBe(true);
    }
}