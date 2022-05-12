export interface IJwtPayload {
    accessToken: string;
    payload: IPayload;
}

export interface IPayload {
    id: string;
    email: string;
    name: string;
    role: string;
}
