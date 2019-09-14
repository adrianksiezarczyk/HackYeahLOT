import React from 'react'
import { Table, Badge } from 'tabler-react'
import Button from '../../../components/shared/Button'
import { Link } from 'react-router-dom'

const getStatusLabel = status => {
    let color = 'default'
    switch (status.staticName) {
        case 'PAID':
            color = 'success'
            break
        case 'NEW':
            color = 'default'
            break
        case 'CANCELED':
        case 'AUTOORDERQUEUED':
            color = 'warning'
            break
        case 'SENT':
            color = 'info'
            break
        case 'AUTOORDERFAIL':
            color = 'danger'
            break
        default:
            break
    }
    return (
        <Badge color={color} className="mr-1">
            {status.name}
        </Badge>
    )
}

const OrdersTableBody = ({ orders, t }) => {
    return (
        <Table.Body>
            {orders.map(order => {
                return (
                    <Table.Row key={order.id}>
                        <Table.Col>
                            <p>
                                <Link to={`/orders/${order.id}`}>{order.id}</Link>
                            </p>
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href={`https://panel.baselinker.com/orders.php#order:${order.baseLinkerOrderId}`}>
                                {order.baseLinkerOrderId}
                            </a>
                        </Table.Col>
                        <Table.Col>
                            <p>{order.date}</p>
                            <p>{order.realizationDate}</p>
                        </Table.Col>
                        <Table.Col>
                            {order.aliExpressOrderNumbers.map((nr, index) => (
                                <span key={index}>{nr} </span>
                            ))}
                        </Table.Col>
                        <Table.Col>{order.customerEmail}</Table.Col>
                        <Table.Col>
                            {order.products.map((product, index) => (
                                <p key={index} style={{ marginBottom: 0 }}>
                                    {product.quantity}x{product.name}
                                </p>
                            ))}
                        </Table.Col>
                        <Table.Col>{order.amountPaid}</Table.Col>
                        <Table.Col>{getStatusLabel(order.status)}</Table.Col>
                        <Table.Col>
                            <div style={{ textAlign: 'right' }}>
                                <Link to={`/orders/${order.id}`}>
                                    <Button size="sm" color="secondary">
                                        {t('edit')}
                                    </Button>
                                </Link>
                            </div>
                        </Table.Col>
                    </Table.Row>
                )
            })}
        </Table.Body>
    )
}

export default OrdersTableBody
