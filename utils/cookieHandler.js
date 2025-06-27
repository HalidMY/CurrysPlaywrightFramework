export default class CookieHandler{
    /**
   * @param {import('@playwright/test').Page} page
   */
    constructor(page){
        this.page = page;
        this.acceptCookiesButton = page.locator('#onetrust-accept-btn-handler');
        this.allowEssentialCookiesOnlyButton = page.locator('#onetrust-reject-all-handler');
        this.manageCookiesLink = page.locator('#onetrust-pc-btn-handler');
        this.rejectAllButton = page.locator('button[class="ot-pc-refuse-all-handler"]');
        this.confirmMyChoices = page.locator('button[class="save-preference-btn-handler onetrust-close-btn-handler"]');
    }

    /**
     * @description This method clicks accept cookies button
     */
    async clickAcceptCookies(){
        if (await this.acceptCookiesButton.isVisible()){
            await this.acceptCookiesButton.click();
        }
    }

    /**
     * @description This method clicks essential cookies button
     */
    async clickAllowEssentialCookiesButton(){
        if (await this.allowEssentialCookiesOnlyButton.isVisible()){
            await this.allowEssentialCookiesOnlyButton.click();
        }
    }

    /**
     * @description This method clicks reject button to reject cookies
     */
    async clickRejectAllButton(){
        if (await this.rejectAllButton.isVisible()){
            await this.rejectAllButton.click();
        }
    }

    /**
     * @description This method clicks manage cookies button and selects the cookies
     * @param {Array<string>} preferences - List of cookie preferences to manage
     */
     async clickAndManageCookies(preferences = []) {
        if (await this.manageCookiesLink.isVisible()) {
            await this.manageCookiesLink.click();
        }
    
        for (const choice of preferences) {
            const toggleLabel = this.page.locator(`//span[text()='${choice}']/ancestor::label[contains(@class, 'ot-switch')]`);
            try {
                await toggleLabel.click({ timeout: 5000 });
            } catch (e) {
                console.warn(`Toggle for "${choice}" not found or not visible`);
            }
        }
    
        if (await this.confirmMyChoices.isVisible()) {
            await this.confirmMyChoices.click();
        }
    }    
}