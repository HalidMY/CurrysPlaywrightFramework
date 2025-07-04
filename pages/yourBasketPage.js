import BasePage from "./basePage";

export default class YourBasketPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    // Locators
    this.yourBasketText = page.locator('h2[class^="number-of-items"]');
    this.checkoutButton = page.locator('[class^="checkout-button"] > a');
    this.loginIframe = page.frameLocator("#login-iframe");
    this.continueAsGuestButton = page.locator('[class$="container-guest-mTop"]');
    this.guestEmailInput = page.locator('#guest-email-div-accessid');
    this.guestButton = page.locator('#guest-btn-accessid');
  }

  // Actions

  /**
   * @description This method clicks the 'Checkout' button on the 'Your Basket' page.
   */
  async clickCheckoutButton() {
    console.log("Clicking the 'Checkout' button");
    await this.clickElement(this.checkoutButton);
  }

  /**
   * @description This method clicks the 'Continue as Guest' button in the login iframe and fills in the guest email input.
   * @param {String} userEmail 
   */
  async clickContinueAsGuestButton(userEmail) {
    console.log("Clicking the 'Continue as Guest' button");
    await this.clickElement(this.loginIframe.locator(this.guestEmailInput).fill(userEmail));
    await this.clickElement(this.loginIframe.locator(this.guestButton).click());
  }

  // Validations

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

  /**
   * @description This method validates that the login iframe is displayed on the 'Your Basket' page.
   * @returns {Promise<boolean>} - Returns true if the login iframe is displayed, otherwise false.
   */
  async validateIframeIsDisplayed() {
    console.log("Validating that the login iframe is displayed");
    const isVisible = await this.loginIframe.isVisible();
    if (isVisible) {
      console.log("Login iframe is displayed.");
      return true;
    } else {
      console.error("Login iframe is not displayed.");
      return false;
    }
  }
}
