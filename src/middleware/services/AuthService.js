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
  }
};
