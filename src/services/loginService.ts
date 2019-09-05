import store from "@/store.ts";
import { ApiService } from "@/services/apiService.ts";

export class LoginService {
  private api: ApiService;

  constructor(token?: string) {
    this.api = new ApiService(token, process.env.VUE_APP_MARKETPLACE_SERVICE);
  }

  async createNewUser(username: string, password: string) {
    const data = await this.api.postRequest("/auth/new", {"login": username, "password": password});
    if (data) {
      return data
    }
    else {
      return 0
    }
  }

  async login(username: string, password: string) {
    const data = await this.api.postRequest("/auth/login", {"login": username, "password": password});
    if (data) {
      return data
    }
    else {
      return 0
    }
  }

  async refreshToken(accessToken: string, refreshToken: string) {
    const data = await this.api.postRequest("/auth/new", {"access token": accessToken, "refresh token": refreshToken});
    if (data) {
      return data
    }
    else {
      return 0
    }
  }
}
