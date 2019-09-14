import React, { useEffect, useState, lazy, Suspense } from 'react'
import styled from 'styled-components'
import { Card, Grid } from 'tabler-react'
import CategoryTree from '../../components/CategoryTree'
import LoadingIndicator from '../../components/shared/LoadingIndicator'
import CategoryApi from '../../services/category/api'
import CategoryCards from './exploreProducts/CategoryCards'
import ExploreProductsList from './exploreProducts/ExploreProductsList'
import PriceFilter from './exploreProducts/PriceFilter'
import Button from '../../components/shared/Button'
import { useTranslation } from 'react-i18next'
import useModal from '../../components/hooks/useModal'
import Products from '../../components/product/Products'
import ProductApi from '../../services/product/api'
import SearchDropdown, { SearchDropdownOption } from '../../components/shared/SearchDropdown'

const SearchButtonWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-bottom: 5px;
`
const ItemWrapper = styled.div`
    margin-bottom: 1em;
`

const ImportButtonWrapper = styled(ItemWrapper)`
    display: flex;
    justify-content: flex-end;
    align-items: center;
`

const ImportModal = lazy(() => import('./exploreProducts/ImportModal'))

const ExploreProducts = () => {
    const [categoriesAliexpress, setCategoriesAliexpress] = useState(null)
    const [selectedMainCategory, setSelectedMainCategory] = useState(null)
    const [expandedCategory, setExpandedCategory] = useState(null)
    const [priceRange, setPriceRange] = useState({ minPrice: null, maxPrice: null })
    const [t] = useTranslation('products-page')

    const { isOpen: importModelOpen, open: openImportModal, close: closeImportModal } = useModal()

    const selectMainCategory = id => {
        setSelectedMainCategory(id)
        const category = categoriesAliexpress.find(c => c.id === id)
        setExpandedCategory(category)
    }

    const expandCategory = category => {
        typeof category === 'object'
            ? setExpandedCategory(category)
            : setExpandedCategory(categoriesAliexpress.find(c => c.id === category))
    }

    const clearCategory = () => {
        setSelectedMainCategory(null)
        setExpandedCategory(null)
    }

    useEffect(() => {
        const getCategoriesAsync = async () => {
            try {
                const cats = await CategoryApi.getAliexpressCategories('')
                setCategoriesAliexpress(cats)
            } catch (error) {
                console.error(error)
                setCategoriesAliexpress([])
            }
        }
        getCategoriesAsync()
    }, [])

    if (!categoriesAliexpress) return <LoadingIndicator />

    return (
        <Products
            categoryId={selectedMainCategory ? expandedCategory.id : null}
            getProducts={ProductApi.get}
            getProductsParams={priceRange}
            noLoaders>
            {({ setFilter, ...productsProps }) => (
                /* <ItemWrapper>
                <SearchBar
                disabled
                    selectedCategory={selectedMainCategory}
                    selectMainCategory={selectMainCategory}
                    categories={categoriesAliexpress}
                />
            </ItemWrapper> */
                <>
                    <SearchButtonWrapper>
                        <SearchDropdown>
                            <SearchDropdownOption
                                placeholder={t('ID in shop')}
                                onChange={e => {
                                    setFilter('productId', e.target.value)
                                }}
                            />
                            <SearchDropdownOption
                                placeholder={t('Aliexpress ID')}
                                onChange={e => {
                                    setFilter('aliExpressProductId', e.target.value)
                                }}
                            />
                        </SearchDropdown>
                    </SearchButtonWrapper>
                    <ImportButtonWrapper>
                        <Button size="sm" color="grey" onClick={openImportModal}>
                            {t('import-by-url-button')}
                        </Button>
                    </ImportButtonWrapper>
                    <ItemWrapper>
                        {selectedMainCategory === null && (
                            <CategoryCards selectMainCategory={selectMainCategory} categories={categoriesAliexpress} />
                        )}
                    </ItemWrapper>
                    <ItemWrapper>
                        <>
                            {selectedMainCategory && (
                                <Grid.Row>
                                    <Grid.Col md={3}>
                                        <Card>
                                            <CategoryTree
                                                async
                                                expandedCategory={expandedCategory}
                                                expandCategory={expandCategory}
                                                getChildren={CategoryApi.getAliexpressCategories}
                                                clearCategory={clearCategory}
                                                isShopCategory={false}
                                            />
                                            <PriceFilter setPriceRange={setPriceRange} priceRange={priceRange} />
                                        </Card>
                                    </Grid.Col>
                                    <Grid.Col>
                                        <ExploreProductsList {...productsProps} />
                                    </Grid.Col>
                                </Grid.Row>
                            )}
                            {!selectedMainCategory && <ExploreProductsList {...productsProps} />}
                        </>
                    </ItemWrapper>
                    <Suspense fallback={<LoadingIndicator />}>
                        <ImportModal isOpen={importModelOpen} onCloseModal={closeImportModal} t={t} />
                    </Suspense>
                </>
            )}
        </Products>
    )
}

export default ExploreProducts
