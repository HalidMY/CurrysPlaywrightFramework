import { test } from "@playwright/test";
import CookieHandler from "../../utils/cookieHandler.js";
import UIUtils from "../../utils/uiUtils.js";
import urls from "../../data/url.json";
import HomePage from "../../pages/homePage.js";
import item from "../../data/searchItems.json";
import SearchResultsPage from "../../pages/searchResultsPage.js";

test.describe("End2end: Guest user buys an item", () => {
  test("Test that guest user can buy an item", async ({ page }) => {
    const pages = {
      cookieHandler: new CookieHandler(page),
      homePage: new HomePage(page),
      searchResultsPage: new SearchResultsPage(page),
    };

    console.log(
      "Given the user navigates to Currys home page and accept the cookies"
    );
    await UIUtils.goToUrl(page, urls.prod.currys.baseUrl);
    await pages.cookieHandler.clickAcceptCookies();

    console.log("When the user search for Apple iPhone 16 pro max");
    await pages.homePage.searchForItem(item.brands.Apple.phones[2]);
    await UIUtils.validateCurrysSearchResultsPage(pages.searchResultsPage.page);
    await pages.searchResultsPage.clickFirstAddToCartButton();
    await pages.searchResultsPage.validateItemAddedToCart();
  });
});
