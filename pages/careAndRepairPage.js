import BasePage from "./basePage.js";

export default class CareAndRepairPage extends BasePage {
    /**
   * @param {import('@playwright/test').Page} page
   */

    constructor(page) {
        super(page);
        // Locators
        this.continuWithoutCareAndRepairButton = page.locator('[class$="care-service-buttons"]>a');
    }

    // Actions

    /**
     * @description This method clicks the 'Continue without Care and Repair' button.
     */
    async clickContinueWithoutCareAndRepairButton() {
        console.log("Clicking the 'Continue without Care and Repair' button");
        await this.clickElement(this.continuWithoutCareAndRepairButton);
    }

}