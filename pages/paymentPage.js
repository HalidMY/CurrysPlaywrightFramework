import UIUtils from '../utils/uiUtils.js';
import BasePage from "./basePage.js";

export default class PaymentPage extends BasePage{
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    // Locators
    this.paymentIframe = page.locator('#helpframe');
    this.cardNumber = page.locator('#cardNumber');
    this.cardExpiryMonth = page.locator('#expiryMonth');
    this.cardExpiryYear = page.locator('#expiryYear');
    this.cardHolderName = page.locator('#cardholderName');
    this.cardCvv = page.locator('#securityCode');
    this.makePaymentButton = page.locator('#submitButton');
  }

  // Actions

  /**
   * @description This method fills the card number input field.
   * @param {String} cardNumber
   */
  async enterCardNumber(cardNumber) {
    console.log("Entering card number:", cardNumber);
    await this.paymentIframe.locator(this.cardNumber).fill(cardNumber);
  }

  /**
   * @description This method fills the card expiry month input field.
   * @param {String} expiryMonth
   */
    async enterCardExpiryMonth(expiryMonth) {
        console.log("Entering card expiry month:", expiryMonth);
        await this.paymentIframe.locator(this.cardExpiryMonth).fill(expiryMonth);
    }

    /**
     * @description This method fills the card expiry year input field.
     * @param {String} expiryYear
     */
    async enterCardExpiryYear(expiryYear) {
        console.log("Entering card expiry year:", expiryYear);
        await this.paymentIframe.locator(this.cardExpiryYear).fill(expiryYear);
    }

    /**
     * @description This method fills the card holder name input field.
     * @param {String} cardHolderName
     */
    async enterCardHolderName(cardHolderName) {
        console.log("Entering card holder name:", cardHolderName);
        await this.paymentIframe.locator(this.cardHolderName).fill(cardHolderName);
    }

    /**
     * @description This method fills the card CVV input field.
     * @param {String} cardCvv
     */
    async enterCardCvv(cardCvv) {
        console.log("Entering card CVV:", cardCvv);
        await this.paymentIframe.locator(this.cardCvv).fill(cardCvv);
    }

    /**
     * @description This method clicks the 'Make Payment' button.
     */
    async clickMakePaymentButton() {
        console.log("Clicking the 'Make Payment' button");
        await this.paymentIframe.locator(this.makePaymentButton).click();
    }

    /**
     * @description This method fills in the payment details and clicks the 'Make Payment' button.
     * @param {Object} paymentDetails - The payment details to fill in.
     */
    async fillPaymentDetailsAndMakePayment(paymentDetails) {
        console.log("Filling in payment details and making payment");
        await this.enterCardNumber(paymentDetails.cardNumber);
        await this.enterCardExpiryMonth(paymentDetails.expiryMonth);
        await this.enterCardExpiryYear(paymentDetails.expiryYear);
        await this.enterCardHolderName(paymentDetails.cardHolderName);
        await this.enterCardCvv(paymentDetails.cardCvv);
        await this.clickMakePaymentButton();
    }

    // Validations

    /**
     * @description This method validates that the payment iframe is displayed.
     * @returns {Promise<boolean>} - Returns true if the payment iframe is displayed, otherwise
     */
    async validatePaymentIframeIsDisplayed() {
        console.log("Validating that the payment iframe is displayed");
        const isVisible = await UIUtils.validateElementisDisplayed(this.paymentIframe);
        if (isVisible) {
            console.log("Payment iframe is displayed.");
            return true;
        } else {
            console.error("Payment iframe is not displayed.");
            return false;
        }
    }
}