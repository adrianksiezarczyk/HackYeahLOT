import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Grid, Icon, Text, Dimmer } from 'tabler-react'
import withImportList from '../../../components/HOCs/withImportList'
import ProductCard from '../../../components/product/ProductCard.new'
import Button, { RemoveButton } from '../../../components/shared/Button'
import Pagination from '../../../components/shared/Pagination'
import LoadingIndicator from '../../../components/shared/LoadingIndicator'
import NoProductsInfoRow from '../../../components/product/NoProductsInfo'

const Btn = ({ id, importList, addToImportList, removeFromImportList }) => {
    const [loading, setLoading] = useState(false)
    const isOnImportList = importList.some(i => i === id)
    const [t] = useTranslation('products-page')

    return (
        <>
            <Button
                block
                loading={loading}
                color="success"
                disabled={isOnImportList || loading}
                onClick={async () => {
                    try {
                        setLoading(true)
                        await addToImportList(id)
                        setLoading(false)
                    } catch (error) {
                        console.error(error)
                        setLoading(false)
                    }
                }}>
                <Text size="small">
                    {isOnImportList ? (
                        <>
                            <Icon prefix="fe" name="check" /> {t('already-on-list')}
                        </>
                    ) : (
                        <>
                            <Icon prefix="fe" name="plus" /> {t('add-to-list')}
                        </>
                    )}
                </Text>
            </Button>
            {isOnImportList && (
                <RemoveButton
                    style={{ marginLeft: '15px' }}
                    onClick={async () => {
                        try {
                            setLoading(true)
                            await removeFromImportList(id)
                        } catch (error) {
                            console.error(error)
                        }
                        setLoading(false)
                    }}
                />
            )}
        </>
    )
}

const AddToImportListButton = withImportList(Btn)

const ExploreProductsList = ({ products, totalItems, setPageSize, setPage, isLoading }) => {
    if (!products) return <LoadingIndicator />
    if (!products.length) return <NoProductsInfoRow />
    return (
        <Dimmer loader active={isLoading}>
            <Grid.Row>
                {products.map(product => (
                    <Grid.Col key={product.id} md={3}>
                        <ProductCard
                            {...product}
                            footer={id => {
                                return <AddToImportListButton id={id} />
                            }}
                        />
                    </Grid.Col>
                ))}
            </Grid.Row>

            {products.length > 0 && (
                <Pagination
                    totalItems={totalItems}
                    onPageChange={(page = 1, pageSize = 12) => {
                        setPage(page)
                        setPageSize(pageSize)
                    }}
                />
            )}
        </Dimmer>
    )
}

export default ExploreProductsList
