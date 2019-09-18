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

  async getAllOrders(token: string) {
    // TODO: bet there is a better way to send request parameters
    const response = await this.api.API.get('/orders/all?token=' + token);
    if (response) {
      return response.data;
    }
  }

  async postOrder(order: object) {
    const response = await this.api.API.post('/orders/create', order);
    if (response) {
      //return response.status;
      return response;
    }
  }
}