import { init } from '@rematch/core'
import { product } from './product/model'
import { shop } from './shop/model'
import { user } from './user/model'
import { auth } from './auth/model'
import { common } from './common/model'

const store = init({
    models: { user, shop, product, auth, common },
})

export default store
