describe('login spec', () => {
    const user = {
      username: 'standard_user',
      password: 'secret_sauce',
      wrongPassword: 'wrongPwd',
      firstName: 'Test',
      lastName: 'Tester',
      zip: 12345
    }
    const url = 'https://www.saucedemo.com';
  
    let userName;
    let password;
    let btnLogin;
  
    beforeEach(() => {
      
      cy.visit(url);
      
      userName = cy.getDataTestEl("username");
      password = cy.getDataTestEl("password");
      btnLogin = cy.getDataTestEl("login-button");
  
    })
  
    it('test wrong credentials', () => {
      userName.type(user.username);
      password.type(user.wrongPassword);
      btnLogin.click();
      cy.getDataTestEl("error").contains('Username and password do not match any user in this service');
    })
    
    it('test correct credentials and proceed with other steps', () => {
      
      cy.verifyVisibleAndAttributes(userName, "Username", "text");
      cy.verifyVisibleAndAttributes(password, "Password", "password");
  
      btnLogin = cy.getDataTestEl("login-button");
      cy.verifyVisibleAndValue(btnLogin, "Login");
  
      userName.type(user.username);
      password.type(user.password);
      btnLogin.click();
      
      const btnAddToCart = cy.getDataTestEl("add-to-cart-sauce-labs-backpack");
      cy.verifyVisibleAndText(btnAddToCart, "Add to cart");
      btnAddToCart.click();
  
      cy.verifyVisibleAndText(cy.getDataTestEl("remove-sauce-labs-backpack"), "Remove");
  
      const elItmPriceBuy = cy.getDataTestEl("inventory-item-price");
      const elItmNameBuy = cy.getDataTestEl("inventory-item-name");
      
      cy.verifyVisibleAndText(cy.getDataTestEl("shopping-cart-badge"), 1);
      
      cy.getDataTestEl("shopping-cart-link").click();
  
      cy.verifyVisibleAndText(cy.getDataTestEl("item-quantity"), 1);
  
      const elItmName = cy.getDataTestEl("inventory-item-name");
      elItmName.should("be.visible");
      elItmNameBuy.invoke('text').then((text) => {
        elItmName.should('have.text', text.trim());
      });
      
      const btnCheckout = cy.getDataTestEl("checkout"); 
      cy.verifyVisibleAndText(btnCheckout, "Checkout");
      btnCheckout.click();
  
      const firstName = cy.getDataTestEl("firstName");
      const lastName = cy.getDataTestEl("lastName");
      const postalCode = cy.getDataTestEl("postalCode");
  
      cy.verifyVisibleAndAttributes(firstName, "First Name", "text");
      cy.verifyVisibleAndAttributes(lastName, "Last Name", "text");
      cy.verifyVisibleAndAttributes(postalCode, "Zip/Postal Code", "text");
  
      const btnContinue = cy.getDataTestEl("continue");
      
      cy.verifyVisibleAndValue(btnContinue, "Continue");
  
      firstName.type(user.firstName);
      lastName.type(user.lastName);
      postalCode.type(user.zip);
      btnContinue.click();
  
      elItmPriceBuy.invoke('text').then((text) => {
        cy.getDataTestEl("subtotal-label").should('contain', text.trim());
      });
  
      const btnFinish = cy.getDataTestEl("finish");
      cy.verifyVisibleAndText(btnFinish, "Finish");
      btnFinish.click();
  
      const title = cy.getDataTestEl("title");
      cy.verifyVisibleAndText(title, "Checkout: Complete!");
  
      const headerTxt = cy.getDataTestEl("complete-header");
      cy.verifyVisibleAndText(headerTxt, "Thank you for your order!");
      
      const completeTxt = cy.getDataTestEl("complete-text");
      cy.verifyVisibleAndText(completeTxt, "Your order has been dispatched, and will arrive just as fast as the pony can get there!");
  
    })
  })
  