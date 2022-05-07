export class PaginationResponseDto<T> {
    data?: T[];
    total?: number;
    pageSize?: number;
    pageIndex?: number;
}
export class CachePaginationResponseDto<T> extends PaginationResponseDto<T> {
    offset?: number;
    constructor(data?: Partial<CachePaginationResponseDto<T>>) {
        super();
        if (data) {
            Object.assign(this, data);
        }
    }
}
