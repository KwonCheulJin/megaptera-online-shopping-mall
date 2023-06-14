Feature('Sign up');

Before(({ backdoor }) => {
  backdoor.setupDatabase();
});

Scenario('회원 가입 성공', ({ I }) => {
  I.amOnPage('/');

  I.click('Login');

  I.click('회원 가입');

  I.fillField('E-mail', 'tester-jin@example.com');
  I.fillField('Name', 'Tester-jin');
  I.fillField('Password', 'password');
  I.fillField('Password Confirmation', 'password');

  I.click('회원 가입', { css: 'form' });

  I.waitForText('회원 가입이 완료되었습니다.');
});

Scenario('존재하는 계정일 경우 회원 가입 실패', ({ I }) => {
  I.amOnPage('/');

  I.click('Login');

  I.click('회원 가입');

  I.fillField('E-mail', 'tester@example.com');
  I.fillField('Name', 'Tester');
  I.fillField('Password', 'password');
  I.fillField('Password Confirmation', 'password');

  I.click('회원 가입', { css: 'form' });

  I.waitForText('회원 가입 실패');
});

Scenario('패스워드 확인이 실패할 경우 버튼 비활성화', ({ I }) => {
  I.amOnPage('/');

  I.click('Login');

  I.click('회원 가입');

  I.fillField('E-mail', 'tester-jin@example.com');
  I.fillField('Name', 'Tester-jin');
  I.fillField('Password', 'xxxx');
  I.fillField('Password Confirmation', 'password');

  I.see('회원 가입', { css: 'button[disabled]' });
});
