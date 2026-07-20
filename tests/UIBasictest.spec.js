import {test,expect} from '@playwright/test'
import { request } from 'node:http';


test('Login test', async({browser})=>{

    const context= await browser.newContext();
    const page= await context.newPage();
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login')
    await page.locator('#userEmail').fill('heybaby1234@gmail.com')
    await page.locator('#userPassword').fill('Heybaby1234')
    await page.locator('#login').click()
    await page.waitForLoadState('networkidle')
    //await page.locator('.card-body b').first().waitFor()
    console.log(await page.locator('.card-body b').allTextContents())
})

test('Child window handling',async({browser})=>{
    const context= await browser.newContext()
    const page= await context.newPage()
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    const link= page.locator("[href*='documents-request']")

   const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    await link.click()]
    )
    
    const text= await newPage.locator(".red").textContent()
    console.log(text)
    const arrayText= text.split("@")
    const domain= arrayText[1].split(" ")[0]
    console.log(domain)
    await page.pause()
    await page.locator("#username").fill(domain)
    console.log( await page.locator("#username").inputValue())


})