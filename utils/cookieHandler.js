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
}