import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

const withCurrentShop = WrappedComponent => {
    class WithCurrentShop extends PureComponent {
        async componentDidMount() {
            const { allShops, getShops } = this.props
            if (!allShops) await getShops()
        }

        render() {
            const { allShops, currentShop, setCurrentShop } = this.props
            if (!allShops) return null
            if (!currentShop) return null
            return <WrappedComponent {...{ currentShop, allShops, setCurrentShop }} {...this.props} />
        }
    }

    return connect(
        state => ({
            currentShop: state.shop.current,
            allShops: state.shop.all,
        }),
        dispatch => ({
            setCurrentShop: dispatch.shop.setCurrent,
            getShops: dispatch.shop.getShops,
        }),
    )(WithCurrentShop)
}

export default withCurrentShop
