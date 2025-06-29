export default class BasePage{
    /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page){
    this.page = page;
  }

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
  

}