import { test } from "@playwright/test";
import CookieHandler from "../../utils/cookieHandler.js";
import UIUtils from "../../utils/uiUtils.js";
import urls from "../../data/url.json";
import HomePage from "../../pages/homePage.js";
import item from "../../data/searchItems.json";
import SearchResultsPage from "../../pages/searchResultsPage.js";
import YourBasketPage from "../../pages/yourBasketPage.js";
import FullfillmentOptionsPage from "../../pages/fullfillmentOptionsPage.js";
import Constants from "../../utils/constants.js";
import PaymentPage from "../../pages/paymentPage.js";
import Cards from "./../../utils/card.js";

test.describe("End2end: Guest user buys an item", () => {
  test("Test that guest user can buy an item", async ({ page }) => {
    const pages = {
      constants: new Constants(),
      cookieHandler: new CookieHandler(page),
      homePage: new HomePage(page),
      searchResultsPage: new SearchResultsPage(page),
      yourbasketPage: new YourBasketPage(page),
      fullfillmentOptionsPage: new FullfillmentOptionsPage(page),
      paymentPage: new PaymentPage(page),
    };

    console.log(
      "Given the user navigates to Currys home page and accept the cookies"
    );
    await UIUtils.goToUrl(page, urls.prod.currys.baseUrl);
    await pages.cookieHandler.clickAcceptCookies();

    console.log("When the user search for Apple iPhone 16 pro max");
    console.log("Then the user should be able to see the item in the cart");
    await pages.homePage.searchForItem(item.brands.Apple.phones[2]);
    await pages.searchResultsPage.validateCurrysSearchResultsPage(
      pages.searchResultsPage.page
    );
    await pages.searchResultsPage.clickFirstAddToCartButton();
    await pages.searchResultsPage.validateItemAddedToCart();

    console.log(
      "When the user clicks on the 'Go to Basket' button after adding an item to the cart"
    );
    await pages.searchResultsPage.clickGoToBasketButton();

    console.log('Then the user should be redirected to the "Your Basket" page');
    await pages.yourbasketPage.validateYourBasketPage();

    console.log(
      'When the user clicks on the "Checkout" button and the login iframe should be displayed'
    );
    await pages.yourbasketPage.clickCheckoutButton();
    await pages.yourbasketPage.validateIframeIsDisplayed();

    console.log('When the user clicks on the "Continue as Guest" button');
    await pages.yourbasketPage.clickContinueAsGuestButton(
      Constants.GUEST_USER_EMAIL
    );

    console.log(
      'Then the user should be redirected to the "Fulfillment Options" page'
    );
    await pages.fullfillmentOptionsPage.validateFulfillmentOptionsPage(
      pages.fullfillmentOptionsPage.page
    );
    await pages.fullfillmentOptionsPage.searchAndEnterPostCodeAndContinueAsGuest(
      "EC1A 1BB"
    );

    console.log(
      "When the user fills in the shipping details and continues to payment"
    );
    await pages.fullfillmentOptionsPage.fillShippingDetailsAndContinuePayment({
      firstName: Constants.GUEST_USER_FIRST_NAME,
      lastName: Constants.GUEST_USER_LAST_NAME,
      phoneNumber: Constants.GUEST_USER_PHONE_NUMBER,
      addressLine1: Constants.GUEST_USER_ADDRESS_LINE_1,
      townOrCity: Constants.GUEST_USER_TOWN_OR_CITY,
    });

    console.log("Then the user should be redirected to the payment page");
    await pages.fullfillmentOptionsPage.clickPaymentButton();
    await pages.paymentPage.validatePaymentIframeIsDisplayed();

    console.log(
      'When the user fills in the payment details and clicks the "Make Payment" button'
    );
    await pages.paymentPage.fillPaymentDetailsAndMakePayment({
      cardNumber: Cards.CARD1.cardNumber,
      expiryMonth: Cards.CARD1.expiryMonth,
      expiryYear: Cards.CARD1.expiryYear,
      cardHolderName: Cards.CARD1.cardHolderName,
      cardCvv: Cards.CARD1.cvv,
    });
  });
});
