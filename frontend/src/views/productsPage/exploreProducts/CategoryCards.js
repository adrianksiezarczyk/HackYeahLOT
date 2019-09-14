import React from 'react'
import styled from 'styled-components'
import { Card, Dropdown, Grid, Icon } from 'tabler-react'

const CategoryCard = styled(Card)`
    height: 100%;
    margin-bottom: 0 !important;
    cursor: pointer;
    @media (max-width: 480px) {
        .card-body {
            padding: 0.5rem 0.5rem;
        }
    }
`

const CategoryCards = ({ categories, selectMainCategory }) => {
    return (
        <Grid.Row cards deck className="no-gutters">
            {categories.slice(0, 7).map(c => (
                <Grid.Col key={c.id} width={6} xs={6} sm={6} md={6} lg={3} xl={3}>
                    <div onClick={() => selectMainCategory(c.id)} style={{ height: '100%' }}>
                        <CategoryCard body={<b>{c.name}</b>} />
                    </div>
                </Grid.Col>
            ))}
            <Grid.Col key={12} xs={6} sm={6} md={6} lg={3} xl={3}>
                <Dropdown
                    triggerContent={<CategoryCard body={<Icon name="more-horizontal" />} />}
                    toggle={false}
                    items={
                        <>
                            {categories.slice(7).map(c => (
                                <Dropdown.Item key={c.id} onClick={() => selectMainCategory(c.id)}>
                                    {c.name}
                                </Dropdown.Item>
                            ))}
                        </>
                    }
                />
            </Grid.Col>
        </Grid.Row>
    )
}

export default CategoryCards
