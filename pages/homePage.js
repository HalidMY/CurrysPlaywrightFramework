import BasePage from "./basePage";

export default class HomePage extends BasePage{
    /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page){
    super(page);
    // Locators
    this.searchInput = page.locator('div.ipad-search-blk input#Search');
    this.searchButton = page.locator('div[class$="ipad-search-blk"] button[type="submit"]');
  }

  // Actions

  /**
   * @description This method saerch for a item
   * @param {String} item Searched item
   */
  async searchForItem(item){
    console.log(`Searching for the ${item}`)
    await this.fillInput(this.searchInput, item);
  }
}