import qs from 'qs'

export const queryRequest = { pageSize: 12, currentPage: 1 }

export const prepareQueryModel = queryRequest => {
    return qs.stringify(
        {
            currentPage: queryRequest.currentPage,
            sortColumnName: queryRequest.sortColumnName || '',
            sortOrder: queryRequest.sortOrder || 'desc',
            pageSize: queryRequest.pageSize,
            filter: queryRequest.filter,
        },
        { allowDots: true },
    )
}
