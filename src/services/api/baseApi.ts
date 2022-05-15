import axios, { AxiosInstance } from "axios";

import Response from "./../../data-access/response/response";

export default class BaseApi {
    private httpClient: AxiosInstance;

    constructor() {
        let token = "";
        if (typeof window !== "undefined") {
            token = localStorage.getItem("access_token") ?? "";
        } else {
            console.log("we are running on the server");
        }
        this.httpClient = axios.create({
            baseURL: process.env.NEXT_PUBLIC_API_URL || "",
            withCredentials: false,
            timeout: 60 * 1000,
            headers: {
                Authorization: `Bearer  ${token}`,
            },
        });
    }

    public async get<T>(
        endPoint: string,
        params?: {
            [param: string]: string | string[];
        },
    ): Promise<Response<T | null>> {
        return (
            this.httpClient
                .get<T>(endPoint, { params: params })
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                .then((response: any) => {
                    const result = response.data;
                    return new Response(true, result, "Success", "");
                })
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                .catch((error: any) => {
                    const errCode = error.response?.data?.error;
                    return new Response(false, null, "Error", errCode);
                })
        );
    }

    public async delete<T>(
        endPoint: string,
        params?: {
            [param: string]: string | string[];
        },
    ): Promise<Response<T | null>> {
        return (
            this.httpClient
                .delete<T>(`${endPoint}`, { params: params })
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                .then((response: any) => {
                    const result = response.data;
                    return new Response(true, result, "Success", "");
                })
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                .catch((error: any) => {
                    const errCode = error.response?.data?.error;
                    return new Response(false, null, "Error", errCode);
                })
        );
    }
    public async post<T>(
        endPoint: string,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data: Record<string, any>,
        params?: {
            [param: string]: string | string[];
        },
    ): Promise<Response<T | null>> {
        return (
            this.httpClient
                .post<T>(`${endPoint}`, data, { params: params })
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                .then((response: any) => {
                    const result = response.data;
                    return new Response(true, result, "Success", "");
                })
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                .catch((error: any) => {
                    const errCode = error.response?.data?.error;
                    return new Response(false, null, "Error", errCode);
                })
        );
    }

    public async put<T>(
        endPoint: string,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data: Record<string, any>,
        params?: {
            [param: string]: string | string[];
        },
    ): Promise<Response<T | null>> {
        return (
            this.httpClient
                .put<T>(`${endPoint}`, data, { params: params })
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                .then((response: any) => {
                    const result = response.data;
                    return new Response(true, result, "Success", "");
                })
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                .catch((error: any) => {
                    const errCode = error.response?.data?.error;
                    return new Response(false, null, "Error", errCode);
                })
        );
    }
}
