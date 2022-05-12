import { IBankPayload, IPayload, IUserProfile } from "../../interfaces";
import baseApi from "./baseApi";

export class UserApi extends baseApi {
    constructor() {
        super();
    }

    public async findBankByUserId(id: string): Promise<IBankPayload | null> {
        const result = await this.get<any>(`/payment/bank/${id}`);
        if (result && result.data) {
            return result.data;
        }
        return null;
    }

    public async createBank(payload: IBankPayload) {
        const result = await this.post<any>("/payment/bank", payload);
        if (result && result.data) {
            return result.data;
        }
        return null;
    }

    public async getUser(): Promise<IPayload | null> {
        const result = await this.get<any>("/users/profile");
        if (result && result.data) {
            return result.data;
        }
        return null;
    }

    public async updateUser(
        payload: IUserProfile,
    ): Promise<IUserProfile | null> {
        const token = localStorage.getItem("access_token");
        const result = await this.put<any>("/users", payload);
        if (result && result.data) {
            return result.data;
        }
        return null;
    }

    public async getAllUser(): Promise<IUserProfile[] | null> {
        const result = await this.get<any>("/users");
        if (result && result.data) return result.data;
        return null;
    }

    public async getUserByAdmin(id: string): Promise<IUserProfile | null> {
        const token = localStorage.getItem("access_token");
        const result = await this.get<any>(`/users/${id}`);
        if (result && result.data) return result.data;
        return null;
    }

    public async patchUserByAdmin(id: string, payload: IUserProfile) {
        const result = await this.put(`/users/${id}`, payload);
        if (result && result.data) return result.data;
        return null;
    }
}
