import axios from 'axios'
import store from '@/store';
import router from '@/router';

class WebClient {
  constructor(baseURL) {
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
        return;
      }
      // if (error.response.status === 400 || error.response.status === 500) {
      //   console.log("AJAX error...");
      // }
      return Promise.reject(error.response.data);
    });
  }

  get(url, params) {
    return this.axios.get('', {
      params: {
        cmd: url,
        ...params,
        origin: 'gallery.vdooh.com',
      },
    });
  }
  post(url, data, params) {
    return this.axios.post('', data, {
      params: {
        cmd: url,
        ...params,
        origin: 'gallery.vdooh.com',
      },
    });
  }
  request(url, config) {
    return this.axios.request({
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
      method: 'GET',
      url,
      ...config
    });
  }
  // get(url, params) {
  //   return this.axios.get(url, {
  //     params,
  //   })
  // }
  // post(url, data, params) {
  //   return this.axios.post(url, data, {
  //     params,
  //   })
  // }
  // put(url, data, params) {
  //   return this.axios.post(url, data, {
  //     params,
  //   })
  // }
};

// const url = 'http://127.0.0.1:3000';
const url = 'https://test.vdooh.com/ui/hujax.ajax';
export default new WebClient(url);
