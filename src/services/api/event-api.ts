import { IEventPayload, ICategory, IEventPagingPayload } from './../models/event.interface';
import axiosClient from './axios-client';

export const eventApi = {
  getAllCategory(): Promise<ICategory[]> {
    return axiosClient.get('/categories');
  },

  uploadImage(file: any) {
    return axiosClient.post('/image', file);
  },

  createEvent(payload: IEventPayload): Promise<IEventPayload> {
    const token = localStorage.getItem('token');

    return axiosClient.post('/events', payload, {
      headers: {
        Authorization: `Bearer  ${token}`,
      },
    });
  },

  getEventPagingByUserId(
    page: number,
    pageSize: number,
    userId: string
  ): Promise<IEventPagingPayload> {
    return axiosClient.get(`events/paging?page=${page}&pageSize=${pageSize}&userId=${userId}`);
  },

  getEventPagingByCategory(
    page: number,
    pageSize: number,
    categoryId: string
  ): Promise<IEventPagingPayload> {
    return axiosClient.get(
      `events/paging?page=${page}&pageSize=${pageSize}&categoryId=${categoryId}`
    );
  },

  getEventById(id: string): Promise<IEventPayload> {
    return axiosClient.get(`/events/${id}`);
  },
};
