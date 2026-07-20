import { LoginPage } from './LoginPage.js';
import { DashboardPage } from './DashboardPage.js';
import { CartPage } from './CartPage.js'; 

export class POManager{

constructor(page)
{
 this.page=page;
 this.loginPage = new LoginPage(this.page);
 this.dashboardPage = new DashboardPage(this.page);
}

getLoginPage()
{
    return this.loginPage;
}

getDashboardPage()
{
    return this.dashboardPage;
}
getCartPage()
{
    return new CartPage(this.page);
}

}

module.exports={POManager};