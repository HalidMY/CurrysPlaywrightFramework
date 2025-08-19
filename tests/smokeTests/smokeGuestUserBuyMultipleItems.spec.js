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


test.describe("End2end: Guest user buys multiple items", () => {
    test("Test that guest user can buy multiple items", async ({page}) => {

        const pages = {
            constants: new Constants(),
            cookieHandler: new CookieHandler(page),
            homePage: new HomePage(page),
            searchResultsPage: new SearchResultsPage(page),
            yourbasketPage: new YourBasketPage(page),
            fullfillmentOptionsPage: new FullfillmentOptionsPage(page),
            paymentPage: new PaymentPage(page),
        };

        console.log("Given the user navigates to Currys home page and accept the cookies");
        await UIUtils.goToUrl(page, urls.prod.currys.baseUrl);
        await pages.cookieHandler.clickAcceptCookies();

        console.log("When the user searches for a Apple MacBook Pro 16");
        await pages.homePage.searchForItem(item.brands.Apple.laptops[3]);
        await pages.searchResultsPage.validateCurrysSearchResultsPage(pages.searchResultsPage.page);

        console.log("Then the user should be able to see the item in the search results");
        await pages.searchResultsPage.validateSearchResultsContainItem(item.brands.Apple.laptops[3]);
        await pages.searchResultsPage.clickFirstAddToCartButton();
        await pages.searchResultsPage.validateItemAddedToCart();

        console.log("When the user clicks on search bar and searches for a Apple tablet");
        await pages.searchResultsPage.clickContinueShoppingButton();
        await pages.searchResultsPage.searchForItemFromSRP(item.brands.Apple.tablets[3]);
        await pages.searchResultsPage.validateCurrysSearchResultsPage(pages.searchResultsPage.page);

        console.log("Then the user should be able to see the item in the search results");
        await pages.searchResultsPage.validateSearchResultsContainItem(item.brands.Apple.tablets[3]);
        await pages.searchResultsPage.clickFirstAddToCartButton();
        await pages.searchResultsPage.validateItemAddedToCart();

        console.log("When the user clicks on the 'Go to Basket' button after adding an item to the cart");
        await pages.searchResultsPage.clickGoToBasketButton();

        console.log('Then the user should be redirected to the "Your Basket" page');
        await pages.yourbasketPage.validateYourBasketPage();

        console.log('When the user clicks on the "Checkout" button and the login iframe should be displayed');
        await pages.yourbasketPage.clickCheckoutButton();
        await pages.yourbasketPage.validateIframeIsDisplayed();

        console.log('When the user clicks on the "Continue as Guest" button');
        await pages.yourbasketPage.clickContinueAsGuestButton(Constants.GUEST_USER_EMAIL);

        console.log('Then the user should be redirected to the "Fulfillment Options" page');
        await pages.fullfillmentOptionsPage.validateFulfillmentOptionsPage(pages.fullfillmentOptionsPage.page);

        console.log('When the user searches for a post code and clicks "Continue as Guest"');
        await pages.fullfillmentOptionsPage.searchAndEnterPostCodeAndContinueAsGuest(Constants.POST_CODE);

        console.log('Then the user should be redirected to the "Payment" page');
        await pages.paymentPage.validatePaymentIframeIsDisplayed();

        console.log('When the user fills in the payment details and clicks "Pay Now"');
        await pages.paymentPage.fillPaymentDetailsAndMakePayment({
            cardNumber: Cards.CARD1.cardNumber,
            expiryMonth: Cards.CARD1.expiryMonth,
            expiryYear: Cards.CARD1.expiryYear,
            cardHolderName: Cards.CARD1.cardHolderName,
            cardCvv: Cards.CARD1.cardCvv
        });

    });
});