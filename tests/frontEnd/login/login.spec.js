


/*

- assert zoomcar url
- assert the city drop down value
- select the city 
- click on login/sign up
- login with email 
- verify url after login 
- verify if user is logged in 
*/

import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://www.zoomcar.com/');
// Expect a title "to contain" a substring.
  await expect(page).toHaveTitle("Best Car Rental with Zoomcar | Explore & Drive Hassle-Free");
  await expect(await page.url()).toBe("https://www.zoomcar.com/")
});