import { expect } from '@playwright/test';
import urls from '../data/url.json';
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
   * Asserts that the current page is the Currys search results page by URL.
   * @param {import('@playwright/test').Page} page - The Playwright page object.
   */
  static async validateCurrysSearchResultsPage(page) {
    const url = page.url();
    expect(url.startsWith(urls.prod.currys.searchResultsUrl)).toBe(true);
  }

}
