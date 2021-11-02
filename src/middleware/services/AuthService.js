import apiClient from '../index';

export default {
  async login(login, password) {
    const result = await apiClient.get('/users', { login, password });
    return result;
  },
};
