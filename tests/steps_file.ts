// in this file you can append custom step methods to 'I' object

module.exports = () => actor({

  login() {
    this.amOnPage('/');

    this.click('Login');

    this.fillField('E-mail', 'tester@example.com');
    this.fillField('Password', 'password');

    this.click('로그인', { css: 'form' });

    this.waitForText('Cart');
  },
});
