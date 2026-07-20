import {test,expect} from '@playwright/test'

test('Login test', async({page})=>{
    const email="heybaby1234@gmail.com"
    const products= page.locator('.card-body');
    const productName="ZARA COAT 3"
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login')
    await page.locator('#userEmail').fill(email)
    await page.locator('#userPassword').fill('Heybaby1234')
    await page.locator('#login').click()
    await page.waitForLoadState('networkidle')
    await page.locator('.card-body b').first().waitFor()
    console.log(await page.locator('.card-body b').allTextContents())
    const count= await products.count();

    for(let i=0; i<count; ++i){

        if(await products.nth(i).locator("b").textContent() === productName){
            await products.nth(i).locator('button:has-text("Add To Cart")').click();
            break;
        }
    }
    await page.locator("[routerlink*='cart']").click();
    await page.locator('div li').first().waitFor();
     const isVisible=await page.locator('h3:has-text("ZARA COAT 3")').isVisible()
    expect(isVisible).toBeTruthy();

   await page.locator('button:has-text("Checkout")').click();
   await page.locator("[placeholder*='Country']").pressSequentially("ind",{delay:100});
   const dropdown= page.locator('.ta-results');
    await dropdown.waitFor();
   const optioncount= await dropdown.locator('button').count();
   for(let i=0;i<optioncount;i++){
    const text= await dropdown.locator('button').nth(i).textContent();
    if(text===' India'){
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