export class Pagination {
    pageIndex = 1;
    pageSize = 12;
    order?: string;

    constructor(data: Partial<Pagination>) {
        Object.assign(this, data);
        // this.page = pageIndex ?? 1;
        // this.take = pageSize ?? 10;
        // this.filter = keyword ?? '';
        // this.sortField = orderBy ?? '';
        // this.order = direction ?? 'ASC';
    }
}

export class PagingData<T> {
    data?: Array<T>;
    pageIndex?: number;
    pageSize?: number;
    totalRow?: number;
    total?: number;
}
