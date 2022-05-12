import {
    ICategory,
    IEventPagingPayload,
    IEventPayload,
    IImage,
} from "../../interfaces";
import BaseApi from "./baseApi";
import Response from "@data-access/response/response";

export class EventApi extends BaseApi {
    constructor() {
        super();
    }

    public async getAllCategory(): Promise<ICategory[] | null> {
        const result = await this.get<any>("/categories");
        if (result && result.data) {
            return result.data;
        }
        return null;
    }

    public async uploadImage(file: any): Promise<IImage | null> {
        const result = await this.post<any>("/image", file);
        if (result && result.data) {
            return result.data;
        }
        return null;
    }

    public async createEvent(
        payload: IEventPayload,
    ): Promise<IEventPayload | null> {
        const result = await this.post<any>("/events", payload);

        if (result && result.data) {
            return result.data;
        }

        return null;
    }

    public async getEventPagingByUserId(
        page: number,
        pageSize: number,
        userId: string,
    ): Promise<IEventPagingPayload | null> {
        const result = await this.get<any>(
            `events/paging?page=${page}&pageSize=${pageSize}&userId=${userId}`,
        );

        if (result && result.data) {
            return result.data;
        }

        return null;
    }

    public async getEventPagingByCategory(
        page: number,
        pageSize: number,
        categoryId: string,
    ): Promise<IEventPagingPayload | null> {
        const result = await this.get<any>(
            `events/paging?page=${page}&pageSize=${pageSize}&categoryId=${categoryId}`,
        );

        if (result && result.data) {
            return result.data;
        }

        return null;
    }

    public async getEventById(id: string): Promise<IEventPayload | null> {
        const result = await this.get<any>(`/events/${id}`);

        if (result && result.data) {
            return result.data;
        }

        return null;
    }
}
