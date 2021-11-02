import axios from 'axios';

class WebClient {
  constructor(baseURL) {
    this.axios = axios.create({
      baseURL,
    });
  }

  _baseRequest(method, { url, params, data, headers }) {
    return this.axios({
      headers,
      method,
      params,
      data,
      url,
    });
  }
  
  get(url, params) {
    return this._baseRequest('get', { url, params });
  }
  delete(url, params) {
    return this._baseRequest('delete', { url, params });
  }
  post(url, data, params) {
    return this._baseRequest('get', { url, data, params });
  }
  put(url, data, params) {
    return this._baseRequest('get', { url, data, params });
  }
};

export default WebClient;
