import BasePage from "./basePage";
import urls from "../data/url.json";
export default class SearchResultsPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    // Locators
    this.addToCartButtons = page.locator('[class="addToCartActionButton"]');
    this.addedToBasketMessage = page.locator("#addToBasketModalLabel");
    this.goToBasketButton = page.locator('a[class$="goto-basket"]');
    this.continueShoppingButton = page.locator('[title="Continue shopping"]');
    this.searchBar = page.locator('[class*="search-monile"] #Search');
    this.searchButton = page.locator('[class*="search-monile"] button[type="submit"]');
  }

  // Actions

  /**
   * @description This method clicks the first 'Add to Cart' button on the search results page.
   */
  async clickFirstAddToCartButton() {
    console.log(
      "Clicking the first 'Add to Cart' button on the search results page"
    );
    const firstButton = this.addToCartButtons.first();
    await this.clickElement(firstButton);
  }

  /**
   * @description This method clicks the 'Go to Basket' button after an item has been added to the cart.
   */
  async clickGoToBasketButton() {
    console.log("Clicking the 'Go to Basket' button");
    await this.clickElement(this.goToBasketButton);
  }

  /**
   * @description This method clicks the 'Continue Shopping' button on the search results page.
   */
  async clickContinueShoppingButton() {
    console.log("Clicking the 'Continue Shopping' button");
    await this.clickElement(this.continueShoppingButton);
  }

  /**
   * @description This method searches for an item using the search bar.
   * @param {string} itemName - The name of the item to search for.
   */
  async searchForItemFromSRP(itemName) {
    console.log(`Searching for item: ${itemName}`);
    await this.fillInput(this.searchBar, itemName);
    await this.clickElement(this.searchButton);
  }

  // Validations

  /**
   * Asserts that the current page is the Currys search results page by URL.
   * @param {import('@playwright/test').Page} page - The Playwright page object.
   */
  async validateCurrysSearchResultsPage(page) {
    this.validatePageUrl(page, urls.prod.currys.searchResultsUrl);
  }

  /**
   * @description This method validates that the item has been added to the cart by checking for
   * @returns {Promise<boolean>} - Returns true if the item is successfully added to the cart, otherwise false.
   */
  async validateItemAddedToCart() {
    console.log("Validating that the item has been added to the cart");
    return await this.addedToBasketMessage.isVisible().then((isVisible) => {
      if (isVisible) {
        console.log("Item successfully added to the cart.");
        return true;
      } else {
        console.error("Item was not added to the cart.");
        return false;
      }
    });
  }
}
