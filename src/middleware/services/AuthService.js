import webClient from '../WebClient';

export default {
  async login({ login, password }) {
    const { user } = (await webClient.post('/login', {
      email: login,
      password,
    })).data;

    webClient.login(user.token);
    return user;
  },
 
  async register({ password, nickname, email }) {
    const { user } = (await webClient.post('/register', {
      nickname,
      password,
      email,
    }));

    return user;
  },

  logout() {
    webClient.logout();
  },
};
