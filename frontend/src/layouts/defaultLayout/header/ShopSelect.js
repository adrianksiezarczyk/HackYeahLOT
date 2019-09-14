import React from 'react'
import Select from 'react-select'
import styled from 'styled-components'
import withCurrentShop from '../../../components/HOCs/withCurrentShop'
import { Icon } from 'tabler-react'

const SelectWrapper = styled.div`
    display: flex;
    min-width: 25ch;
`

const SelectShop = styled(Select)`
    display: inline-block;
    width: 100%;
    > div {
        cursor: pointer !important;
        /* hack for react-select */
    }
`
const EyeButton = styled.a`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    cursor: pointer;
    color: #9aa0ac;
    :hover {
        color: #717171;
    }
`

const ShopSelect = ({ currentShop, allShops, setCurrentShop }) => {
    if (!currentShop || Object.entries(currentShop).length === 0) return null
    return (
        <SelectWrapper>
            <SelectShop
                placeholder="Shop"
                isSearchable
                name="shopId"
                options={allShops}
                getOptionLabel={option => option['domain']}
                getOptionValue={option => option['id']}
                onChange={setCurrentShop}
                defaultValue={currentShop}
            />
            <EyeButton target="_blank" rel="noopener noreferrer" href={`//${currentShop.domain}`}>
                <Icon name="eye" />
            </EyeButton>
        </SelectWrapper>
    )
}

export default withCurrentShop(ShopSelect)
