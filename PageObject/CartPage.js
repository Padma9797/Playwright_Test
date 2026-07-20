import { expect } from '@playwright/test';

export class CartPage{

    constructor(page){
        this.page=page;
        this.cartProducts= page.locator('div li').first();
        this.checkoutButton =page.locator('button:has-text("Checkout")');
        this.productsTitle= page.locator('.card-body b');
        this.cart= page.locator("[routerlink*='cart']")
        }

        async verifyProductIsDisplayed(productName){
            await this.cartProducts.waitFor();
             const bool=await this.getProductLocator(productName).isVisible()
            expect(bool).toBeTruthy();
        }

        getProductLocator(productName){
            return this.page.locator('h3:has-text("'+productName+'")');
        }

        async checkOut()
        {
            await this.checkoutButton.click();
        }

    }

        module.exports={CartPage};