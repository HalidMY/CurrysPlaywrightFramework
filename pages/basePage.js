export default class BasePage{
    /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page){
    this.page = page;
  }

  // Actions

  /**
   * @description This method returns page's title
   * @return {Promise<String>} The title of the page
   */
  async getTitle(){
    console.log('Getting page\'s title');
    return this.page.title();
  }
  

  /**
   * @description This method wait until element is visible
   * @param {import('@playwright/test').Locator} locator 
   */
  async waitForElement(locator) {
    await locator.waitFor({ state: 'visible', timeout:30000 });
  }

  /**
   * @description This method fills the input fields
   * @param {import('@playwright/test').Locator} locator The locator for the input field
   * @param {String} value The text value to enter input field
   */
  async fillInput(locator, value){
    await this.waitForElement(locator);
    await locator.fill(value);
  }

  /**
   * @description This method clicks selected locator
   * @param {import('@playwright/test').Locator} locator The locator for the click
   */
  async clickElement(locator) {
    await this.waitForElement(locator);
    await locator.click();
  }

  /**
   * @description This method get text from selected locator
   * @param {import('@playwright/test').Locator} locator The locator for the text
   * @returns {Promise<String>} The text retrieved from the locator
   */
  async getText(locator) {
    await this.waitForElement(locator);
    return locator.textContent();
  }

  /**
   * @description This method retrieves the URL of the current page
   * @param {import('@playwright/test').Page} page The Playwright page object
   * @returns {Promise<String>} The URL of the current page
   */
  async getUrl(page) {
    console.log('Getting page\'s URL');
    return page.url();
  }

  // Validations

  /**
   * @description This method validates that the current page's URL starts with the expected URL
   * @param {import('@playwright/test').Page} page The Playwright page object
   * @param {String} expectedUrl The expected URL to validate against
   */
  async validatePageUrl(page, expectedUrl) {
    const url = await this.getUrl(page);
    console.log(`Validating page URL: ${url}`);
    if (!url.startsWith(expectedUrl)) {
      throw new Error(`Expected URL to start with ${expectedUrl}, but got ${url}`);
    }
  }
}