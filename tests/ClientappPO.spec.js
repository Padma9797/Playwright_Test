import {test,expect} from '@playwright/test'
import { POManager } from '../PageObject/POManager.js';
import{customtest} from '../utils/test-base.js'

//Json->string->Js object
const dataset =JSON.parse(JSON.stringify(require("../utils/placeorderTestData.json")));



test('Login test', async({page})=>
    {
    const poManager= new POManager(page)
    const products= page.locator('.card-body');
    const loginPage= poManager.getLoginPage();
    await loginPage.goTo()
    await loginPage.validLogin(dataset.username,dataset.password);
    const dashboardPage= poManager.getDashboardPage();
    await dashboardPage.selectProduct(dataset.productName)
    await dashboardPage.navigateToCart();

    const cartPage= poManager.getCartPage();
    await cartPage.verifyProductIsDisplayed(dataset.productName);
    await cartPage.checkOut();

   await page.locator("[placeholder*='Country']").pressSequentially("ind",{delay:100});
   const dropdown= page.locator('.ta-results');
    await dropdown.waitFor();
   const optioncount= await dropdown.locator('button').count();
   for(let i=0;i<optioncount;i++){
    const text= await dropdown.locator('button').nth(i).textContent();
    if(text.trim()==='India'){
        await dropdown.locator('button').nth(i).click();
        break;
    }
   }
   //await expect(await page.locator('.user__name [type="text"]')).toHaveText(email);
   await page.locator('a:has-text("Place Order")').click();
   expect(await page.locator('.hero-primary')).toHaveText(' Thankyou for the order. ');
   const orderId= await page.locator('.em-spacer-1 .ng-star-inserted').textContent()
   console.log(orderId);

   await page.locator('button[routerlink*=myorders]').click();
   await page.locator('tbody').waitFor();
   const tablerow= page.locator('tbody tr')
   for (let i=0; i < await tablerow.count();++i){
     const roworderId= await tablerow.nth(i).locator('th').textContent()
     if (roworderId.includes(orderId)){
     await tablerow.nth(i).locator('button').click();
     break
     }
   }

const orderdetail = await page.locator('.col-text').textContent()
expect(orderdetail.includes(orderId)).toBeTruthy();
})


customtest('Client App with test data fixture', async({page,testDataForOder})=>
    
{
    const poManager= new POManager(page)
    const products= page.locator('.card-body');
    const loginPage= poManager.getLoginPage();
    await loginPage.goTo()
    await loginPage.validLogin(testDataForOder.username,testDataForOder.password);
    const dashboardPage= poManager.getDashboardPage();
    await dashboardPage.selectProduct(testDataForOder.productName)
    await dashboardPage.navigateToCart();

    const cartPage= poManager.getCartPage();
    await cartPage.verifyProductIsDisplayed(dataset.productName);
    await cartPage.checkOut();
})