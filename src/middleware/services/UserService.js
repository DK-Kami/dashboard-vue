export default {
  login({ login, password }) {
    return new Promise((res, rej) => {
      this.apiClient.post('/login', {
        email: login,
        password,
      })
        .then(response => {
          const user = response.data.user;
          this.apiClient.login(user.token);

          res(user);
        })
        .catch(err => rej(err));
    });
  },
  logout() {
    this.apiClient.logout();
  },

  saveProfile(user) {
    return this.apiClient.put('/user/profile', user);
  },
  setCurrentUserAccount(data) {
    return this.apiClient.post('/user/accounts/add', data);
  },
  async loadProfile() {
    const response = (await this.apiClient.get('/user/profile')).data.user;
    return response;
  },
};
