import { ApiService } from "@/services/apiService.ts";

export class MarketplaceService {
  private api: ApiService;

  constructor(token?: string) {
    this.api = new ApiService(token, process.env.VUE_APP_MARKETPLACE_SERVICE);
  }

  async getAllProducts() {
    const response = await this.api.API.get('/products/all');
    if (response) {
      return response.data
    }
  }

  async getAllCategories() {
    const response = await this.api.API.get('/categories/all');
    if (response) {
      return response.data
    }
  }
}