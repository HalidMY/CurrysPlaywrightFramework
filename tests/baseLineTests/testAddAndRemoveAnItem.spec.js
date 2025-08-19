import {test} from "@playwright/test";
import CookieHandler from "../../utils/cookieHandler.js";
import UIUtils from "../../utils/uiUtils.js";
import urls from "../../data/url.json";
import HomePage from "../../pages/homePage.js";
import item from "../../data/searchItems.json";
import SearchResultsPage from "../../pages/searchResultsPage.js";
import YourBasketPage from "../../pages/yourBasketPage.js";
import FullfillmentOptionsPage from "../../pages/fullfillmentOptionsPage.js";
import Constants from "../../utils/constants.js";
import CareAndRepairPage from "../../pages/careAndRepairPage.js";

test.describe("End2end: Guest user adds an item and then removes the item from basket", () => {
    test("Test that guest user can add an item and remove the item from basket", async ({page}) => {
        const pages = {
            constants: new Constants(),
            cookieHandler: new CookieHandler(page),
            homePage: new HomePage(page),
            searchResultsPage: new SearchResultsPage(page),
            yourbasketPage: new YourBasketPage(page),
            fullfillmentOptionsPage: new FullfillmentOptionsPage(page),
            careAndRepairPage: new CareAndRepairPage(page)
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
        await pages.careAndRepairPage.clickContinueWithoutCareAndRepairButton();
        await pages.searchResultsPage.validateItemAddedToCart();

        console.log("When the user clicks on the 'Go to Basket' button after adding an item to the cart");
        await pages.searchResultsPage.clickGoToBasketButton();

        console.log('Then the user should be redirected to the "Your Basket" page');
        await pages.yourbasketPage.validateYourBasketPage();

        console.log('When the user clicks remove item button');
        await pages.yourbasketPage.clickRemoveItemButton();
        await pages.yourbasketPage.validateRemoveItemModalIsDisplayed();
        await pages.yourbasketPage.clickConfirmRemoveItemButton();

        console.log('Then the user should see the empty cart text');
        await pages.yourbasketPage.validateEmptyCartTextIsDisplayed();

        
    });
});