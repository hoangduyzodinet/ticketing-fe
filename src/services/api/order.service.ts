import { ICreateOrderPayload, IOrderPagingPayload } from "../../interfaces";
import baseApi from "./baseApi";

export class OrderApi extends baseApi {
    constructor() {
        super();
    }

    public async create(payload: ICreateOrderPayload) {
        const result = await this.post("/orders", payload);
        if (result && result.data) return result.data;
        return null;
    }

    public async getAllOrder(
        page: number,
        limit: number,
    ): Promise<IOrderPagingPayload | null> {
        const token = localStorage.getItem("access_token");
        const result = await this.get<any>(
            `orders/paging?page=${page}&limit=${limit}`,
        );
        if (result && result.data) return result.data;
        return null;
    }
}
