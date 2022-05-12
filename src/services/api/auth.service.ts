import { IJwtPayload, ILoginPayload, ISignupPayload } from "../../interfaces";
import BaseApi from "./baseApi";

export class AuthApi extends BaseApi {
    constructor() {
        super();
    }

    public async signup(payload: ISignupPayload) {
        const result = await this.post("/users/signup", payload);
        if (result && result.data) return result.data;
        return null;
    }

    public async login(payload: ILoginPayload): Promise<IJwtPayload | null> {
        const result = await this.post<any>("/auth/login", payload);
        if (result && result.data) return result.data;
        return null;
    }

    public async loginFacebook(accessToken: string) {
        const result = await this.get(
            `auth/facebook?access_token=${accessToken}`,
        );
        if (result && result.data) return result.data;
        return null;
    }
}
