import React from 'react'
import MediaQuery from 'react-responsive'
import styled from 'styled-components'
import { Nav } from 'tabler-react'
import { UI_BREAKPOINTS } from '../../constants'

const TabHeaderWrapper = styled.ul`
    margin-bottom: 24px !important;
    flex: 1 1 auto;
    margin-right: 0 !important;
`

const TabHeaderWithAddon = styled.div`
    display: flex;
`

const TabHeaderAddon = styled.div`
    -ms-flex-item-align: center;
    align-self: center;
    margin-right: 12px;
    margin-left: auto;
`

export const TabHeader = ({ children, addon, className = '' }) => (
    <TabHeaderWithAddon>
        <TabHeaderWrapper className={`nav nav-tabs Tab_header_tabs ${className}`}>
            {children}
            {addon && (
                <MediaQuery minWidth={UI_BREAKPOINTS.MD}>
                    <TabHeaderAddon>{addon}</TabHeaderAddon>
                </MediaQuery>
            )}
        </TabHeaderWrapper>
    </TabHeaderWithAddon>
)

export const TabLink = ({ title, onClick, active }) => {
    return <Nav.Item value={title} onClick={onClick} active={active} />
}

export const TabPane = ({ active, children }) => {
    if (!active) return null
    return children
}
