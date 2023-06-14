import { render } from '@testing-library/react';
import SignupFormStore from './SignupFormStore';

const context = describe;

const signup = jest.fn();

jest.mock('../services/ApiService', () => ({
  get apiService() {
    return {
      signup,
    };
  },
}));

describe('SignupFormStore', () => {
  let store: SignupFormStore;

  beforeEach(() => {
    jest.clearAllMocks();

    store = new SignupFormStore();
  });
  context('changeEmail', () => {
    const email = 'tester@example.com';
    it('sets state', () => {
      store.changeEmail(email);

      expect(store.email).toBe(email);
    });
  });
  context('changeName', () => {
    const name = 'Tester';
    it('sets state', () => {
      store.changeName(name);

      expect(store.name).toBe(name);
    });
  });
  context('changePassword', () => {
    const password = 'password';
    it('sets state', () => {
      store.changePassword(password);

      expect(store.password).toBe(password);
    });
  });
  context('changePasswordConfirmation', () => {
    const password = 'password';
    it('sets state', () => {
      store.changePasswordConfirmation(password);

      expect(store.passwordConfirmation).toBe(password);
    });
  });
  context('reset', () => {
    beforeEach(() => {
      store.changeEmail('tester@example.com');
      store.changeName('Tester');
      store.changePassword('password');
      store.changePasswordConfirmation('password');
    });
    it('clear state', () => {
      store.reset();

      expect(store.email).toBeFalsy();
      expect(store.name).toBeFalsy();
      expect(store.password).toBeFalsy();
      expect(store.passwordConfirmation).toBeFalsy();
    });
  });
  context('valid', () => {
    const email = 'tester@example.com';
    const name = 'Tester';
    const password = 'password';
    it('email, name, password가 모두 통과되면 valid는 true이다.', () => {
      store.changeEmail(email);
      store.changeName(name);
      store.changePassword(password);
      store.changePasswordConfirmation(password);

      expect(store.valid).toBeTruthy();
    });
    it('email이 공백이면 valid는 false이다', () => {
      store.changeEmail('');
      store.changeName(name);
      store.changePassword(password);
      store.changePasswordConfirmation(password);

      expect(store.valid).toBeFalsy();
    });
  });
  describe('회원가입 시', () => {
    const email = 'tester@example.com';
    const name = 'Tester';
    const password = 'password';
    const accessToken = 'AccessToken';
    beforeEach(() => {
      store.changeEmail(email);
      store.changeName(name);
      store.changePassword(password);
      store.changePasswordConfirmation(password);
    });
    context('요청이 성공했을 때', () => {
      beforeEach(() => {
        signup.mockResolvedValue(accessToken);
      });
      it('엑세스 토큰 설정', async () => {
        await store.signup();

        expect(store.accessToken).toBe(accessToken);
        expect(store.error).toBeFalsy();

        expect(signup).toBeCalledWith({ email, name, password });
      });
    });
    context('요청이 실패 했을 때', () => {
      beforeEach(() => {
        signup.mockRejectedValue(new Error('Bad Request'));
      });
      it('엑세스 토큰 설정', async () => {
        await store.signup();

        expect(store.accessToken).toBeFalsy();
        expect(store.error).toBeTruthy();

        expect(signup).toBeCalledWith({ email, name, password });
      });
    });
  });
});
