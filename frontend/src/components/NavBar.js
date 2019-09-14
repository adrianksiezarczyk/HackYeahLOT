import React, { Suspense } from 'react'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { Container, Page } from 'tabler-react'
import LoadingIndicator from './shared/LoadingIndicator'
import { TabHeader } from './shared/Tabs'

const StyledTabHeader = styled(TabHeader)`
    background: #fff;
    border: 1px solid #dee2e6;
    width: 100%;
    .active {
        font-weight: 500 !important;
    }
    margin: unset !important;
    border-radius: 3px;
`

const NavBar = props => {
    return (
        <Page.Header>
            <Container>
                <StyledTabHeader>
                    <Suspense fallback={<LoadingIndicator />}>{props.children(props.match.url)}</Suspense>
                </StyledTabHeader>
            </Container>
        </Page.Header>
    )
}

export default withRouter(NavBar)
