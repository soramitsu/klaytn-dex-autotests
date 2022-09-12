module.exports = function() {
  return actor({

    fill_password: function(password) {
      this.fillField('input[id=password]', password);
    },


    auth: function(url, password){

      this.wait(3) // заменить на ожидание хедера
      this.amOnPage(url)
      this.wait(3)

      this.click('//button/span[text()=" Connect Wallet "]')
      this.wait(2)
      this.click('//button/span[text()="Kaikas"]')
      this.wait(2)

      this.switchToNextTab();
      this.see("Enter password to unlock Kaikas.")
      this.fill_password(password)
      this.click('//button/span[text()="Unlock"]')
      this.wait(3)

      tryTo(() => this.rejectNotification());

      this.wait(2)
      this.see("Connect to dApp")    
      this.click("//label/div[@class='checkbox-icon']")
      this.wait(1)
      this.click('//button[text()="Connect"]')
      this.wait(3)
      this.refreshPage();
      this.wait(3)
      this.see("Token List") 
      this.switchToPreviousTab();
      this.refreshPage();
      this.wait(3)
      this.see('Assets')
      this.wait(1)
      tryTo(() => this.connectWallet());
      this.wait(3)
      this.seeElement('//button/span[text()=" Select Token "]')
  },

  swap: function(token1, token2){

    this.click("Liquidity")
    this.click("Swap")
    this.seeInCurrentUrl('/swap');

    this.click('(//button[@data-testid="token-select"])[1]')
    this.wait(2)
    this.fillField('//input[@data-testid="modal-search"]', token1)
    this.click('//div[@data-testid="modal-list-item"]')
    this.wait(2)
    
    this.refreshPage();
    this.wait(2)
    this.click('//button/span[text()=" Select Token "]')
    this.waitForText('Select a token', 5)
    this.fillField('//input[@data-testid="modal-search"]', token2)
    this.click('//div[@data-testid="modal-list-item"]')

    this.wait(2)
    this.fillField('(//div/input)[1]', '1');
    this.wait(5)

    this.forceClick('//button/span[text()="Swap"]')
    this.wait(3)

    tryTo(() => this.acceptNotification())
    this.wait(2)

    tryTo(() => this.acceptNotification())
    this.wait(2)

    
    this.see('Confirm Swap')
    this.wait(3)
    this.forceClick('//div[@role="dialog"]//button/span[text()=" Confirm Swap "]')
    this.wait(3)
    this.acceptLastNotification()
    this.wait(3)
    this.see("Transaction Submitted")
    this.click('Close')

  },

  swap_bottom: function(token1, token2){

    this.click("Liquidity")
    this.click("Swap")
    this.seeInCurrentUrl('/swap');

    this.click('(//button[@data-testid="token-select"])[2]')
    this.wait(2)
    this.fillField('//input[@data-testid="modal-search"]', token2)
    this.click('//div[@data-testid="modal-list-item"]')
    this.wait(2)
    
    this.refreshPage();
    this.wait(2)
    this.click('(//button[@data-testid="token-select"])[1]')
    this.waitForText('Select a token', 5)
    this.fillField('//input[@data-testid="modal-search"]', token1)
    this.click('//div[@data-testid="modal-list-item"]')

    this.wait(2)
    this.fillField('(//div/input)[1]', '1');
    this.wait(5)

    this.forceClick('//button/span[text()="Swap"]')
    this.wait(3)

    tryTo(() => this.acceptNotification())
    this.wait(2)

    tryTo(() => this.acceptNotification())
    this.wait(2)

    
    this.see('Confirm Swap')
    this.wait(3)
    this.forceClick('//div[@role="dialog"]//button/span[text()=" Confirm Swap "]')
    this.wait(3)
    this.acceptLastNotification()
    this.wait(3)
    this.see("Transaction Submitted")
    this.click('Close')

  },

  connectWallet: function(){
    this.see('//button/span[text()=" Connect Wallet "]')
    this.click('//button/span[text()=" Connect Wallet "]')
  },

  acceptNotification: function(){
      
      this.waitForInvisible('//button/span[text()=" Remove "]')
      this.waitForInvisible('//button/span[text()=" Confirm Remove "]')
      this.waitForInvisible('//button/span[text()=" Supply "]')
      this.waitForInvisible('//div[@role="dialog"]//button/span[text()=" Confirm Supply "]')
      this.waitForInvisible('//button/span[text()="Swap"]')
      this.waitForInvisible('//div[@role="dialog"]//button/span[text()=" Confirm Swap "]')

      this.switchToNextTab();
      this.wait(2)
      this.refreshPage();
      this.wait(5)
      this.see('Confirm Your TX')
      this.click('//button[text()="Confirm"]')
      this.wait(5)
      this.see('Transaction History')
      this.switchToPreviousTab();
      
    } 
  ,

  acceptLastNotification: function(){
    
    this.switchToNextTab();
    this.wait(2)
    this.refreshPage();
    this.wait(5)
    this.see('Confirm Your TX')
    this.click('//button[text()="Confirm"]')
    this.wait(4)
    this.see('Transaction History')
    this.switchToPreviousTab();
    
  } 
,

  rejectNotification: function(){
    this.see('Confirm Your TX')
    this.click('//button[text()="Reject"]')
  },

  switchFromNotification: function(){
    this.see('Confirm Your TX')
    this.click('//button[text()="Confirm"]')
  }

  });
}
