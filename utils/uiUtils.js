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
}
