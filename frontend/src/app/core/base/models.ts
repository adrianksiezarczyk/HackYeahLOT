export interface PaginationRequestModel<T> {
    sortColumnName: string;
    sortOrder: string;
    pageSize: number;
    currentPage: number;
    filter: T
};

export interface PaginationResponseModel<T> {
    totalItems: number;
    filteredItems: number;
    data: Array<T>
}