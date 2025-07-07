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

test.describe("End2end: Guest user buys an item", () => {
  test("Test that guest user can buy an item", async ({ page }) => {
    const pages = {
      constants: new Constants() ,
      cookieHandler: new CookieHandler(page),
      homePage: new HomePage(page),
      searchResultsPage: new SearchResultsPage(page),
      yourbasketPage: new YourBasketPage(page),
      fullfillmentOptionsPage: new FullfillmentOptionsPage(page),
    };

    console.log(
      "Given the user navigates to Currys home page and accept the cookies"
    );
    await UIUtils.goToUrl(page, urls.prod.currys.baseUrl);
    await pages.cookieHandler.clickAcceptCookies();

    console.log("When the user search for Apple iPhone 16 pro max");
    console.log("Then the user should be able to see the item in the cart");
    await pages.homePage.searchForItem(item.brands.Apple.phones[2]);
    await pages.searchResultsPage.validateCurrysSearchResultsPage(pages.searchResultsPage.page);
    await pages.searchResultsPage.clickFirstAddToCartButton();
    await pages.searchResultsPage.validateItemAddedToCart();

    console.log(
      "When the user clicks on the 'Go to Basket' button after adding an item to the cart"
    );
    await pages.searchResultsPage.clickGoToBasketButton();

    console.log('Then the user should be redirected to the "Your Basket" page');
    await pages.yourbasketPage.validateYourBasketPage();

    console.log('When the user clicks on the "Checkout" button and the login iframe should be displayed');
    await pages.yourbasketPage.clickCheckoutButton();
    await pages.yourbasketPage.validateIframeIsDisplayed();

    console.log('When the user clicks on the "Continue as Guest" button');
    await pages.yourbasketPage.clickContinueAsGuestButton(Constants.GUEST_USER_EMAIL);

    console.log('Then the user should be redirected to the "Fulfillment Options" page');
    await pages.fullfillmentOptionsPage.validateFulfillmentOptionsPage();
    await pages.fullfillmentOptionsPage.searchAndEnterPostCodeAndContinueAsGuest("EC1A 1BB");
  
  });
});
