import React, { useState, useEffect } from 'react'
import withCurrentShop from '../../components/HOCs/withCurrentShop'
import ProductApi from '../../services/product/api'

const ProductsLimitMessage = ({ currentShop }) => {
    const [limitInfo, setLimitInfo] = useState(null)

    useEffect(() => {
        const getCategoriesAsync = async () => {
            try {
                const info = await ProductApi.getProductsLimit()
                setLimitInfo(info)
            } catch (error) {
                console.error(error)
                setLimitInfo(null)
            }
        }
        getCategoriesAsync()
    }, [currentShop.id])

    if (!limitInfo) return null

    return (
        <span>
            Masz {limitInfo.totalItems}/{limitInfo.totalItemsLimit} produktów.{' '}
            <a href="https://admin.take.shop/profile"><b>Potrzebujesz więcej? Kup wyższy pakiet.</b></a>
        </span>
    )
}

export default withCurrentShop(ProductsLimitMessage)
