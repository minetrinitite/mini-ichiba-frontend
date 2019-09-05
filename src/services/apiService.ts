import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import store from "@/store.ts";

export class ApiService {
  API: AxiosInstance;
  headers: object;

  constructor(token?: string, baseURL?: string) {
    this.headers = {
      "Accept": "application/json",
    };

    this.API = axios.create({
      baseURL: baseURL,
      headers: this.headers,
      responseType: 'json',
    });

    this.API.interceptors.response.use((response) => {
      return response
    }, (error) => {
      store.commit('SET_LOADING_ITEMS', false);
      store.commit('SET_LOADING_ORDERS', false);
      console.log(error);
    });
  }

  async postRequest(path: string, body: Object, axiosConfig?: AxiosRequestConfig) {
    const response = await this.API.post(path, body, axiosConfig);
    if (response) {
      return response.data
    }
    else {
      return 0
    }    
  }

  async getRequest(path: string, axiosConfig?: AxiosRequestConfig) {
    const response = await this.API.get(path, axiosConfig);
    if (response) {
      return response.data
    }
    else {
      return 0
    }    
  }
}