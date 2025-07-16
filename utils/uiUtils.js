
export default class UIUtils {

  // Action methods

  /**
   * Starts the browser and navigates to the specified URL.
   * @param {page} page - The Playwright page object.
   * @param {String} url url to navigate to
   */
  static async goToUrl(page, url) {
    console.log(`Navigating to URL: ${url}`);
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
  }

  // Validation methods

  /**
   * @description Validates that an element is displayed on the page.
   * @param {import("playwright-core").Locator} locator
   * @param {number} timeout - The maximum time to wait for the element to be visible.
   * @param {string} elementDescription - A description of the element for logging purposes. 
   */
  static async validateElementisDisplayed({locator, timeout = 5000, elementDescription = ''}) {
    console.log(`Validating that the element is displayed: ${elementDescription}`);
    try {
      await locator.waitFor({ state: 'visible', timeout });
      console.log(`Element is displayed: ${elementDescription}`);
    } catch (error) {
      console.error(`Element not found or not visible: ${elementDescription}`, error);
      throw new Error(`Validation failed for element: ${elementDescription}`);
    }
  }

  /**
   * @description Validates that an element has the expected text.
   * @param {String} expectedText expected text to validate
   * @param {import("playwright-core").Locator} locator locator of the element to validate
   * @param {number} timeout - The maximum time to wait for the element to be
   */
  static async validateElementHasText({ locator, expectedText, timeout = 5000, elementDescription = '' }) {
    console.log(`Validating that the element has text: ${elementDescription}`);
    try {
      await locator.waitFor({ state: 'visible', timeout });
      const actualText = await locator.textContent();
      if (actualText !== expectedText) {
        throw new Error(`Expected text "${expectedText}" but found "${actualText}"`);
      }
      console.log(`Element has expected text: ${elementDescription}`);
    } catch (error) {
      console.error(`Validation failed for element text: ${elementDescription}`, error);
      throw new Error(`Validation failed for element text: ${elementDescription}`);
    }
  }

}
