import webClient from '../WebClient';

export default {
  uploadAvatar(file) {
    return webClient.post('/user/upload-avatar', file);
  },

  saveProfile(user) {
    return webClient.put('/user/profile', user);
  },
  setCurrentUserAccount(data) {
    return webClient.post('/user/accounts/add', data);
  },
  async loadProfile() {
    const { user } = (await webClient.get('/user/profile')).data;
    return user;
  },
  regenerateUrl() {
    return webClient.get('/user/link/regenerate');
  },
};
