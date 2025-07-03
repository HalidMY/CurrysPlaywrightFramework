export default class CookieHandler {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.acceptCookiesButton = page.locator("#onetrust-accept-btn-handler");
    this.allowEssentialCookiesOnlyButton = page.locator(
      "#onetrust-reject-all-handler"
    );
    this.manageCookiesLink = page.locator("#onetrust-pc-btn-handler");
    this.rejectAllButton = page.locator(
      'button[class="ot-pc-refuse-all-handler"]'
    );
    this.confirmMyChoices = page.locator(
      'button[class="save-preference-btn-handler onetrust-close-btn-handler"]'
    );
  }

  /**
   * @description This method clicks accept cookies button
   */
  async clickAcceptCookies() {
    await this.page.addLocatorHandler(
      this.acceptCookiesButton,
      async (locator) => {
        if (await locator.isVisible()) {
          await locator.click();
        }
      }
    );
  }

  /**
   * @description This method clicks essential cookies button
   */
  async clickAllowEssentialCookiesButton() {
    await this.page.addLocatorHandler(
      this.allowEssentialCookiesOnlyButton,
      async (locator) => {
        if (await locator.isVisible()) {
          await locator.click();
        }
      }
    );
  }

  /**
   * @description This method clicks reject button to reject cookies
   */
  async clickRejectAllButton() {
    await this.page.addLocatorHandler(this.rejectAllButton, async (locator) => {
      if (this.locator.isVisible()) {
        await locator.click();
      }
    });
  }

  /**
   * @description This method clicks manage cookies button and selects the cookies
   * @param {Array<string>} preferences - List of cookie preferences to manage
   */
  async registerAutoManageCookiesHandler(preferences = []) {
    await this.page.addLocatorHandler(
      this.manageCookiesLink,
      async (locator) => {
        if (await locator.isVisible()) {
          await locator.click();
          
          for (const choice of preferences) {
            const toggleLabel = this.page.locator(
              `//span[text()='${choice}']/ancestor::label[contains(@class, 'ot-switch')]`
            );
            try {
              await toggleLabel.click({ timeout: 5000 });
            } catch (e) {
              console.warn(`Toggle for "${choice}" not found or not visible`);
            }
          }
          
          if (await this.confirmMyChoices.isVisible()) {
            await this.confirmMyChoices.click();
          } else {
            console.warn("Confirm My Choices button not found or not visible");
          }
        }
      }
    );
  }
}
