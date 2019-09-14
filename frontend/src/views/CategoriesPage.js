import React from 'react'
import { Page } from 'tabler-react'

import withCurrentShop from '../components/HOCs/withCurrentShop'
import Categories from './categoriesPage/Categories'

const CategoriesPage = () => {
    return (
        <Page.Content>
            <Categories />
        </Page.Content>
    )
}
export default withCurrentShop(CategoriesPage)
     