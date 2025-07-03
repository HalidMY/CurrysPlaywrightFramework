export default class SearchResultsPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    // Locators
    this.addToCartButtons = page.locator('[class="addToCartActionButton"]');
    this.addedToBasketMessage = page.locator("#addToBasketModalLabel");
    this.goToBasketButton = page.locator('a[class$="goto-basket"]');
    this.yourBasketText = page.locator('h2[class^="number-of-items"]');
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
    await firstButton.click();
  }

  // Validations

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

  /**
   * @description This method validates that the 'Your Basket' page is displayed after adding an item to the cart.
   * @returns {Promise<boolean>} - Returns true if the 'Your Basket' page is displayed, otherwise false.
   */
  async validateYourBasketPage() {
    console.log("Validating that the 'Your Basket' page is displayed");
    return await this.yourBasketText.isVisible().then((isVisible) => {
      if (isVisible) {
        console.log("'Your Basket' page is displayed.");
        return true;
      } else {
        console.error("'Your Basket' page is not displayed.");
        return false;
      }
    });
  }
}
