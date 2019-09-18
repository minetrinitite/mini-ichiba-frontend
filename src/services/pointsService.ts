import store from "@/store.ts";
import { ApiService } from "@/services/apiService.ts";

export class PointsService {
  private api: ApiService;

  constructor(token?: string) {
    this.api = new ApiService(token, process.env.VUE_APP_POINTS_SERVICE);
  }

  async getUserPoints() {
    console.log("requesting points from " + process.env.VUE_APP_POINTS_SERVICE + "/points")
    const data = await this.api.getRequest("/points");
    if (data) {
      return data
    }
    else {
      return 0
    }
  }

  async setUserPoints(userId: string, pointsAmount: number) {
    const data = await this.api.postRequest("/points", {
      "userId": userId,
      "amount": pointsAmount
    });
    if (data) {
      return data
    }
    else {
      return 0
    }
  }

  async startPointsTransaction(userId: string, pointsAmountDecrease: number) {
    const data = await this.api.postRequest("/points/transaction/start", {
      "userId": userId,
      "amount": pointsAmountDecrease
    });
    if (data) {
      return data
    }
    else {
      return 0
    }
  }

  async cancelPointsTransaction(transactionId: string) {
    const data = await this.api.postRequest("/points/transaction/cancel", {"transactionId": transactionId});
    if (data) {
      return data
    }
    else {
      return 0
    }
  }

  async endPointsTransaction(transactionId: string) {
    const data = await this.api.postRequest("/points/transaction/confirm", {"transactionId": transactionId});
    if (data) {
      return data
    }
    else {
      return 0
    }
  }
}