import BasePage from "./basePage";
import urls from "../data/url.json";

export default class FullfillmentOptionsPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    // Locators
    this.postCodeInput = page.locator("#stockSearch");
    this.checkPostCodeButton = page.locator(
      'a[class^="cart-submit-user-location"]'
    );
    this.deliveryOptions = page.locator(
      '[name="checkout-delivery-option-small_box_home_delivery"]'
    );
    this.continueAsGuestButton = page.locator(
      'button[value="submit-fulfillment"]'
    );
    this.selectTitleDropdown = page.locator(
      '[data-select2-id="16"] select~span'
    );
    this.firstNameInput = page.locator('#shippingFirstNamedefault');
    this.lastNameInput = page.locator('#shippingLastNamedefault');
    this.phoneNumberInput = page.locator('#shippingPhoneNumberdefault');
    this.addressline1Input = page.locator('#shippingAddressOnedefault');
    this.townOrCityInput = page.locator('#shippingTownOrCitydefault');
    this.continuePaymentButton = page.locator('button[class$="submit-shipping"]');
  }

  // Actions

  /**
   * @description This method enters the post code into the input field.
   * @param {String} postCode
   */
  async enterPostCode(postCode) {
    console.log("Entering post code:", postCode);
    await this.postCodeInput.fill(postCode);
  }

  /**
   * @description This method clicks the check post code button.
   * It is used to validate the post code and fetch delivery options.
   */
  async clickCheckPostCodeButton() {
    console.log("Clicking the 'Check Post Code' button");
    await this.clickElement(this.checkPostCodeButton);
  }

  /**
   * @description This method selects the first delivery option available.
   * It is used to proceed with the delivery option selection.
   */
  async selectRegularDeliveryOption() {
    console.log("Selecting the delivery option");
    await this.clickElement(this.deliveryOptions.first());
  }

  /**
   * @description This method clicks the 'Continue as Guest' button to proceed with the checkout process.
   */
  async clickContinueAsGuestButton() {
    console.log("Clicking the 'Continue as Guest' button");
    await this.clickElement(this.continueAsGuestButton);
  }

  /**
   * @description This method searches for the post code, selects the delivery option, and continues as a guest.
   * @param {String} postCode
   */
  async searchAndEnterPostCodeAndContinueAsGuest(postCode) {
    console.log("Searching for post code and continuing as guest");
    await this.enterPostCode(postCode);
    await this.clickCheckPostCodeButton();
    await this.selectRegularDeliveryOption();
    await this.clickContinueAsGuestButton();
  }

  /**
   * @description This method selects a title from the dropdown menu.
   * @param {import('@playwright/test').Page} page
   * @param {String} title
   */
  async selectTitle(page, title) {
    console.log("Selecting title:", title);
    await this.clickElement(this.selectTitleDropdown);
    const option = page.locator(`option[value="${title}"]`);
    await this.clickElement(option);
  }

  /**
   * @description This method fills the first name input field.
   * @param {String} firstName 
   */
  async enterFirstName(firstName) {
    console.log("Entering first name:", firstName);
    await this.fillInput(this.firstNameInput, firstName);
  }

  /**
   * @description This method fills the last name input field.
   * @param {String} lastName 
   */
  async enterLastName(lastName) {
    console.log("Entering last name:", lastName);
    await this.fillInput(this.lastNameInput, lastName);
  }

  /**
   * @description This method fills the phone number input field.
   * @param {Number} phoneNumber 
   */
  async enterPhoneNumber(phoneNumber) {
    console.log("Entering phone number:", phoneNumber);
    await this.fillInput(this.phoneNumberInput, phoneNumber);
  }

  /**
   * @description This method fills the address line 1 input field.
   * @param {String} addressLine1 
   */
  async enterAddressLine1(addressLine1) {
    console.log("Entering address line 1:", addressLine1);
    await this.fillInput(this.addressline1Input, addressLine1);
  }

  /**
   * @description This method fills the town or city input field.
   * @param {String} townOrCity 
   */
  async enterTownOrCity(townOrCity) {
    console.log("Entering town or city:", townOrCity);
    await this.fillInput(this.townOrCityInput, townOrCity);
  }

  /**
   * @description This method clicks the continue payment button to proceed with the payment process.
   */
  async clickContinuePaymentButton() {
    console.log("Clicking the 'Continue Payment' button");
    await this.clickElement(this.continuePaymentButton);
  }

  /**
   * @description This method fills the shipping details and continues to payment.
   * @param {String} firstName
   * @param {String} lastName
   * @param {Number} phoneNumber
   * @param {String} addressLine1
   * @param {String} townOrCity 
   */
  async fillShippingDetailsAndContinuePayment({firstName, lastName, phoneNumber, addressLine1, townOrCity}) {
    console.log("Filling shipping details and continuing to payment");
    await this.enterFirstName(firstName);
    await this.enterLastName(lastName);
    await this.enterPhoneNumber(phoneNumber);
    await this.enterAddressLine1(addressLine1);
    await this.enterTownOrCity(townOrCity);
    await this.clickContinuePaymentButton();
  }

  // Validations

  /**
   * @description This method validates that the Fulfillment Options page is displayed.
   * @param {import('@playwright/test').Page} page
   */
  async validateFulfillmentOptionsPage(page) {
    this.validatePageUrl(page, urls.prod.currys.fullFillmentOptionsUrl);
  }
}
