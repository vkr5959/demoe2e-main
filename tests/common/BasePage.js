import { expect } from "@playwright/test";

export class BasePage {
  constructor(page) {
    this.page = page;
  }

  async openURL(url) {
    return await this.page.goto(url);
  }

  async getTitle() {
    return await this.page.title();
  }

  async pause() {
    return await this.page.pause();
  }

  async getUrl() {
    return this.page.url();
  }

  async getTextOfAllLocator(element) {
    return await element.allTextContents();
  }

  async wait() {
    return this.page.waitForTimeout(10000);
  }
  async getTextOfAllLocator(element) {
    return await element.allTextContents();
  }

  async wait() {
    return this.page.waitForTimeout(10000);
  }

  async getTextOfLocator(element) {
    return await element.textContent();
  }

  async getCountOfElement(element) {
    return await element.count();
  }

  async getTextOfFirstLocator(element) {
    return await element.first().textContent();
  }

  async waitForPageLoad() {
    return await this.page.waitForLoadState("domcontentloaded");
  }

  async waitAndClick(element) {
    return await element.click();
  }

  async waitAndClickOnFirstElement(element) {
    await element.first().waitFor({ state: "visible" });
    return await element.first().click();
  }

  async waitAndHardClick(selector) {
    return await this.page.$eval(selector, (element) => element.click());
  }
  async waitAndFill(element, text) {
    return await element.fill(text);
  }

  async keyPress(selector, key) {
    return await this.page.press(selector, key);
  }

  async takeScreenShot() {
    return expect(await this.page.screenshot()).toMatchSnapshot("MyScreenShot.png");
  }

  async verifyElementText(selector, text) {
    const textValue = await this.page.textContent(selector);
    return expect(textValue.trim()).toBe(text);
  }

  async verifyElementContainsText(selector, text) {
    const locatorText = await this.page.locator(selector);
    return await expect(locatorText).toContainText(text);
  }

  async verifyJSElementValue(selector, text) {
    const textValue = await this.page.$eval(selector, (element) => element.value);
    return expect(textValue.trim()).toBe(text);
  }

  async selectValueFromDropdown(selector, text) {
    const dropdown = await this.page.locator(selector);
    return await dropdown.selectOption({ value: text });
  }

  async verifyElementAttribute(element, attribute, value) {
    const textValue = await element.getAttribute(attribute);
    return expect(textValue.trim()).toBe(value);
  }
  async isElementVisible(element) {
    try {
      const isVisible = await element.isVisible();
      expect(isVisible).toBeTruthy();
      return await element.isVisible();
    } catch (error) {
      console.error("Error checking visibility:", error);
      return false;
    }
  }
  async verifyIfTextPresentInList(elements, textToSearhed) 
  { let found = false; 
    for (let i = 0; i < (await elements.count()); i++)
     {
         if ((await elements.nth(i).textContent()) === textToSearhed)
          { found = true; break; 
        } 
    } return found; 
}

async getFirstElementFromTheList(element) {
    //const rows = await this.page.locator(selector);
    const count = await element.count();
    for (let i = 0; i < count; ++i) {
      const firstItem = await element.nth(0).textContent();
      return firstItem;
    }
  }
  async clickFirstElementFromTheList(element) {
    //const rows = await this.page.locator(selector);
    const count = await element.count();
    for (let i = 0; i < count; ++i) {
      const firstItem = await element.nth(0).textContent();
      return firstItem.click();
    }
  }

  async getLastElementFromTheList(selector) {
    const rows = await this.page.locator(selector);
    const count = await rows.count();
    for (let i = 0; i < count; ++i) {
      const lastItem = await rows.nth(5).textContent();
      return lastItem;
    }
  }

  async clickAllElements(selector) {
    const rows = await this.page.locator(selector);
    const count = 2;
    for (let i = 0; i < count; ++i) {
      await rows.nth(i).click();
    }
  }
  async isElementVisibleInList(elements) {
    if (elements.length > 0) {
      for (const element of await elements) {
        await expect(element.isVisible()).resolves.toBe(true);
      }
    } else {
      console.log("No buttons found with the class.");
    }
  }

  async isElementNotVisible(selector) {
    const element = this.page.locator(selector);
    return expect(element).toBeHidden;
  }

  async isElementEnabled(selector, errorMessage) {
    const element = this.page.locator(selector);
    try {
      const isEnabled = await element.isEnabled();
      expect(isEnabled).toBeTruthy();
    } catch (error) {
      throw new Error(`${errorMessage}`);
    }
  }

  async isElementChecked(selector, errorMessage) {
    const element = this.page.locator(selector);
    try {
      const isChecked = await element.isChecked();
      expect(isChecked).toBeTruthy();
    } catch (error) {
      throw new Error(`${errorMessage}`);
    }
  }
  async isAttributePresent(element, attributeName) {
    const attributeValue = element ? (await element.getAttribute(attributeName)) !== null : false;
    return attributeValue;
  }

  async ifClassPresent(locator, classNameToBeChecked) {
    const isClassPresent = await this.hasClass(this.page, locator, classNameToBeChecked);
    return isClassPresent;
  }

  async hasClass(page, locator, expectedClass) {
    // Check if the element has the expected class
    const elementClasses = await locator?.getAttribute("class");
    return elementClasses ? elementClasses.includes(expectedClass) : false;
  }

  async getAttributeValue(element, attribute) {
    return await element.getAttribute(attribute);
  }

  async getTextAndRemoveSpaceFromText(element) {
    const textValue = await element.textContent();
    return textValue.replace(/\s/g, "");
  }
}