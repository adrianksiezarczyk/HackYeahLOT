import { useEffect, useState, useCallback } from 'react'
import withCurrentShop from '../HOCs/withCurrentShop'
import useDebounced from '../../hooks/useDebounced'

const Products = ({
    categoryId,
    getProducts,
    getProductsParams,
    currentShop,
    children,
    importList,
    shouldUpdateOnImportListChange,
}) => {
    const [products, setProducts] = useState(null)
    const [isLoading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [totalItems, setTotalItems] = useState(null)
    const [pageSize, setPageSize] = useState(12)
    const [filters, setFilters] = useState({})

    useEffect(() => setPage(1), [categoryId, getProducts, currentShop.id])

    const setFilter = (key, value) => {
        const _filters = Object.assign({}, filters)
        _filters[key] = value
        setFilters(_filters)
        setProducts(null)
    }
    const debouncedFilters = useDebounced(filters, 500)

    const getCurrentProducts = useCallback(async () => {
        setLoading(true)
        try {
            const { data, filteredItems } = await getProducts({
                categoryId,
                pageSize,
                page,
                ...getProductsParams,
                ...debouncedFilters,
            })
            setTotalItems(filteredItems)
            setProducts(data)
            setLoading(false)
        } catch (error) {
            console.error(error)
            console.error(error.json)
            setProducts([])
            setLoading(false)
        }
    }, [categoryId, getProducts, getProductsParams, page, debouncedFilters, pageSize])

    useEffect(() => {
        getCurrentProducts()
    }, [getCurrentProducts])

    useEffect(() => {
        if (shouldUpdateOnImportListChange) {
            setPage(1)
            getCurrentProducts()
        }
    }, [getCurrentProducts, shouldUpdateOnImportListChange, importList])

    return children({ products, totalItems, setPageSize, setPage, setFilter, getCurrentProducts, isLoading })
}

export default withCurrentShop(Products)
