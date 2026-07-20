export class LoginPage {

    constructor(page)
    {   
        this.page=page;
        this.signInbutton=page.locator('#login')
        this.userName= page.locator('#userEmail')
        this.password= page.locator('#userPassword')
    }
    async validLogin(userName,password)
    {
        await this.userName.fill(userName);
        await this.password.fill(password);
        await this.signInbutton.click();
        await this.page.waitForLoadState('networkidle')
       
    }

    async goTo()
    {
    await this.page.goto('https://rahulshettyacademy.com/client/#/auth/login')
    }

}

module.exports={LoginPage};
