import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

const withImportList = WrappedComponent => {
    class WithImportList extends PureComponent {
        async componentDidMount() {
            if (!this.props.importList) await this.props.getImportList()
        }

        async componentDidUpdate(prevProps) {
            if (prevProps.currentShop.id !== this.props.currentShop.id) {
                await this.props.getImportList()
            }
        }

        render() {
            if (!this.props.importList) return null
            return <WrappedComponent {...this.props} />
        }
    }

    return connect(
        state => ({
            importList: state.product.importList,
            currentShop: state.shop.current,
        }),
        dispatch => ({
            addToImportList: dispatch.product.addToImportList,
            removeFromImportList:dispatch.product.removeFromImportList, 
            getImportList: dispatch.product.getImportList,
        }),
    )(WithImportList)
}

export default withImportList
