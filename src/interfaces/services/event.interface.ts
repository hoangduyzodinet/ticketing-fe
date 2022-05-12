export interface IEventPayload {
    userId: string;
    name: string;
    categoryId: string;
    logoUrl: string;
    bannerUrl: string;
    description: string;
    eventPlaceName: string;
    eventAddress: string;
    saleStartDate: moment.Moment;
    saleEndDate: moment.Moment;
    eventStartDate: moment.Moment;
    eventEndDate: moment.Moment;
    totalTickets: number;
    availableTickets: number;
    ticketImageUrl: string;
    ticketPrice: number;
    maxTicketOrder: number;
    minTicketOrder: number;
    organizationInfo: string;
    organizationEmail: string;
    organizationPhone: string;
    organizationAddress: string;
    id?: string;
}

export interface IEventPagingPayload {
    total: number;
    events: IEPayload[];
}

export interface IEPayload {
    id: string;
    name: string;
    eventPlaceName: string;
    eventAddress: string;
    eventStartDate: string;
    logoUrl: string;
    bannerUrl: string;
}
