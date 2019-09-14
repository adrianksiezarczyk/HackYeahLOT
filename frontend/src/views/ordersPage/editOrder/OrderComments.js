import React from 'react'
import { Card } from 'tabler-react'
import { StyledCard } from './components'
import styled from 'styled-components'

const StyledCardHeader = styled(Card.Header)`
    background-color: #f5f5f5 !important;
`

const OrderComments = ({ orderComments, t }) => {
    if (!orderComments || !orderComments.length) return null
    return (
        <StyledCard isCollapsible title={t('comments')}>
            <Card.Body>
                {orderComments.map(comment => {
                    return (
                        <Card key={comment.id}>
                            <StyledCardHeader>
                                <Card.Title>
                                    <b>
                                        {comment.firstName} {comment.lastName}
                                    </b>{' '}
                                    {t('commented on')} {comment.date}
                                </Card.Title>
                            </StyledCardHeader>
                            <Card.Body>
                                <div dangerouslySetInnerHTML={{ __html: comment.content }} />
                            </Card.Body>
                        </Card>
                    )
                })}
            </Card.Body>
        </StyledCard>
    )
}

export default OrderComments
