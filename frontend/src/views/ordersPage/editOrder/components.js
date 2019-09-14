import styled from 'styled-components'
import { Card, Table } from 'tabler-react'

export const StyledCard = styled(Card)`
    .card-header {
        position: relative;
    }
    .card-options-collapse::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        cursor: pointer;
    }
`

export const ButtonsContainer = styled.div`
    z-index: 1;
    height: 0px; /* for chevron icon fix */
`

export const StyledTable = styled(Table)`
    td {
        vertical-align: middle !important;
    }
`
