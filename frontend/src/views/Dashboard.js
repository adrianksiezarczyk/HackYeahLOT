import React from 'react'
import styled from 'styled-components'
import { Grid, Card, Page } from 'tabler-react'
import withCurrentShop from '../components/HOCs/withCurrentShop'

const StyledCard = styled(Card)`
    margin-top: 30px;
    .card-title {
        font-size: 26px;
    }
    .card-body {
        font-size: 20px;
    }
`
const Dashboard = ({ currentShop }) => {
    return (
        <Page.Content>
            <Grid>
                <Grid.Row>
                    <Grid.Col>
                        <StyledCard statusColor="blue">
                            <Card.Header>
                                <Card.Title> Cześć!</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                To jest nowy panel administracyjny. Nie posiada jeszcze wszystkich funkcji, które są w
                                poprzedniej wersji. W razie potrzeby korzystaj ze starszej wersji panelu tutaj:{' '}
                                <a href="https://admin.take.shop">https://admin.take.shop</a>
                            </Card.Body>
                        </StyledCard>
                    </Grid.Col>
                </Grid.Row>
            </Grid>
        </Page.Content>
    )
}
export default withCurrentShop(Dashboard)
