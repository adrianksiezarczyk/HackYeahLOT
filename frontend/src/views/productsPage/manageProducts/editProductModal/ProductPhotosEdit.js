import React, { useCallback } from 'react'
import { Form, Grid } from 'tabler-react'
import ImageCheckbox from '../../../../components/ImageCheckbox'

const ProductPhotosEdit = ({ t, photos, setProductInfo, isMainPhotoSelection }) => {
    const togglePhoto = useCallback(
        id => {
            setProductInfo(draft => {
                const selectedPhoto = draft.productPhotos.find(ph => ph.id === id)
                selectedPhoto.showInShop = !selectedPhoto.showInShop
            })
        },
        [setProductInfo],
    )

    const selectDefaultPhoto = useCallback(
        id => {
            setProductInfo(draft => {
                const defaultPhoto = draft.productPhotos.find(ph => ph.default)
                if (defaultPhoto) defaultPhoto.default = false
                const selectedPhoto = draft.productPhotos.find(ph => ph.id === id)
                selectedPhoto.default = true
            })
        },
        [setProductInfo],
    )

    return (
        <Form.Group label>
            <Grid.Row>
                {photos.map(photo => {
                    return (
                        <ImageCheckbox
                            key={photo.id}
                            checked={photo.showInShop}
                            imageURL={photo.thumbnailUrl_250px}
                            value={photo.id}
                            isSpecial={photo.default}
                            col={{ sm: 2 }}
                            disabled={isMainPhotoSelection}
                            onClick={() => {
                                if (isMainPhotoSelection) selectDefaultPhoto(photo.id)
                                else togglePhoto(photo.id)
                            }}
                        />
                    )
                })}
                {isMainPhotoSelection && (
                    <p style={{ marginLeft: '15px' }}>{t('select main photo for product and click select button')}</p>
                )}
            </Grid.Row>
        </Form.Group>
    )
}

export default ProductPhotosEdit
