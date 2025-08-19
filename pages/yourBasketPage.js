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
    this.removeItemButton = page.locator('[class$="removeLinkCart"]>a');
    this.removeItemModal = page.locator('#removeProductLineItemModal');
    this.confirmRemoveItemButton = page.locator('[class$="confirmation-btn"]');
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
    await this.loginIframe.locator(this.guestEmailInput).fill(userEmail);
    await this.clickElement(this.loginIframe.locator(this.guestButton));
  }

  /**
   * @description This method clicks the 'Remove Item' button to remove an item from the basket.
   */
  async clickRemoveItemButton() {
    console.log("Clicking the 'Remove Item' button");
    await this.clickElement(this.removeItemButton);
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

  /**
   * @description This method confirms the remove item modal is displayed.
   */
  async validateRemoveItemModalIsDisplayed() {
    console.log("Validating that the remove item modal is displayed");
    return await this.removeItemModal.isVisible().then((isVisible) => {
      if (isVisible) {
        console.log("Remove item modal is displayed.");
        return true;
      } else {
        console.error("Remove item modal is not displayed.");
        return false;
      }
    })
  }
}
