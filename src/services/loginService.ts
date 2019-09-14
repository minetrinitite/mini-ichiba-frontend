import store from "@/store.ts";
import { ApiService } from "@/services/apiService.ts";

export class LoginService {
  private api: ApiService;

  constructor(token?: string) {
    this.api = new ApiService(token, process.env.VUE_APP_LOGIN_SERVICE);
  }

  async createNewUser(name: string, email: string, password: string) {
    const data = await this.api.postRequest("/auth/new", { "email": email, "password": password, "name": name });
    if (data) {
      return data
    }
    else {
      return 0
    }
  }

  async login(email: string, password: string) {
    const data = await this.api.postRequest("/auth/login", { "email": email, "password": password });
    if (data) {
      return data
    }
    else {
      return 0
    }
  }

  async refreshToken(refreshToken: string) {
    const data = await this.api.postRequest("/auth/refreshToken", { "refresh_token": refreshToken});
    if (data) {
      return data
    }
    else {
      return 0
    }
  }
}
