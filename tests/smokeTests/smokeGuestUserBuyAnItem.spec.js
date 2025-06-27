import { test } from "@playwright/test";
import CookieHandler from "../../utils/cookieHandler.js";
import UIUtils from "../../utils/uiUtils.js";
import urls from "../../data/url.json";   


test.describe('End2end: Guest user buys an item', () => {
    test('Test that guest user can buy an item', async ({page}) => {
        const cookieHandler = new CookieHandler(page);

        await UIUtils.goToUrl(page, urls.prod.currys.baseUrl);
        await cookieHandler.clickAcceptCookies();


    })
})