const base =require('@playwright/test');

exports.customtest =base.test.extend({
 testDataForOder :{ 
    username: "heybaby1234@gmail.com",
    password : "Heybaby1234",
    productName : "ZARA COAT 3"
 }

})