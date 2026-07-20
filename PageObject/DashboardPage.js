class DashboardPage{

    constructor(page)
    {
        this.page=page;
        this.products=page.locator('.card-body');
        this.productsTitle= page.locator('.card-body b');
        this.cart= page.locator("[routerlink*='cart']");
        
    }

    async selectProduct(productName)
    {
        const titles =await  this.productsTitle.allTextContents()
        const count= await this.products.count();
         for(let i=0; i<count; ++i){

        if(await this.products.nth(i).locator("b").textContent() === productName)
        {
            // add to cart
            await this.products.nth(i).locator('button:has-text("Add To Cart")').click();
            break;
        }
    }
    }

    async navigateToCart()
    {
    
    await this.cart.click();
    }

} 
module.exports={DashboardPage};
   