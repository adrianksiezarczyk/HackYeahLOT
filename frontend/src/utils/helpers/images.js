export const getPhotoUrl = ({
    photo,
    thumbnailSize = null,
    imageUrlPrefix = 'image',
    productName = 'image',
    categoryName = '',
}) => {
    if (!photo) return null
    if (isFullUrl(photo)) return photo

    const isAli = photo.includes('alicdn.com/kf')
    const thumbnail = thumbnailSize ? `_${thumbnailSize}x${thumbnailSize}.jpg` : ''
    if (isAli) {
        const imageId = photo.split('kf/')[1].replace('.jpg', '')
        return `https://images.take.shop/${imageUrlPrefix}/${imageId}.jpg${thumbnail}`
    } else return `https://images.take.shop/${imageUrlPrefix}/${photo}.jpg${thumbnail}`
}
const isFullUrl = photo => {
    return photo.includes('http://') || photo.includes('https://')
}
