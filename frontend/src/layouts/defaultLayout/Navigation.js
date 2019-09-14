import React from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import { RouterContextProvider, Container, Grid, Nav } from 'tabler-react'
import routes from '../../routes'
import styled from 'styled-components'

const NavLinkWrapper = styled(NavLink)`
    padding: 1em !important;
`
const StyledNav = styled(Nav)`
    @media (min-width: 1280px) {
        li:last-child {
            position: absolute;
            right: 0;
        }
    }
`
const items = routes.map(route => {
    const hasChildren = route.children && route.children.length > 0
    if (!hasChildren)
        return {
            value: route.name,
            to: route.path,
            LinkComponent: withRouter(NavLinkWrapper),
            useExact: route.exact,
            icon: route.icon,
        }
    else if (hasChildren)
        return {
            value: route.name,
            icon: route.icon,
            subItems: route.children.map(route => {
                return {
                    value: route.name,
                    to: route.path,
                    LinkComponent: withRouter(NavLink),
                }
            }),
        }
    else return undefined
})

const Navigation = ({ collapse, history }) => {
    return (
        <div className={`header d-lg-flex p-0 ${collapse ? 'collapse' : ''}`}>
            <Container>
                <Grid.Row>
                    <Grid.Col className="col-lg order-lg-first">
                        <StyledNav
                            tabbed
                            className="border-0 flex-column flex-lg-row"
                            routerContextComponentType={withRouter(RouterContextProvider)}
                            itemsObjects={items.filter(Boolean)}
                        />
                    </Grid.Col>
                </Grid.Row>
            </Container>
        </div>
    )
}

export default Navigation
