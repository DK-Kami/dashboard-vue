import axios from 'axios'
import store from '@/store';
import router from '@/router';

class WebClient {
  constructor(baseURL) {
    this.baseURL = baseURL;

    this.axios = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });

    this.setInterceptors();
  }

  setInterceptors() {
    this.axios.interceptors.response.use(null, error => {
      if (!error.request.status) {
        store.dispatch('notification/set', {
          message: 'Сайт временно находится в режиме обслуживания. Пожалуйста, подождите',
          type: 'error',
        });
        return Promise.reject({ error: 'not connection' })
      }

      if (!error.response || !error.response.config) return;
      if (error.response.config.params && error.response.config.params.cmd === 'authorize') {
        return Promise.reject(error.response.data);
      }

      if (error.response.status === 401 || error.response.status === 403) {
        store.dispatch('unsetUserData');
        router(store).push({ name: "login" });
      }
      return Promise.reject(error.response.data.error);
    });
  }

  login(token) {
    this.axios.defaults.headers.common['Authorization'] = token;
    this.axios.defaults.baseURL = this.baseURL + 'api';
  }
  logout() {
    delete this.axios.defaults.headers.common['Authorization'] ;
    this.axios.defaults.baseURL = this.baseURL;
  }

  get(url, params) {
    return this.axios.get(url, {
      params,
    });
  }
  post(url, data, params) {
    return this.axios.post(url, data, {
      params,
    });
  }
  put(url, data, params) {
    return this.axios.put(url, data, {
      params,
    });
  }
  delete(url, params) {
    return this.axios.delete(url, {
      params,
    });
  }
};

const url = 'http://localhost:5000/';
export default new WebClient(url);
