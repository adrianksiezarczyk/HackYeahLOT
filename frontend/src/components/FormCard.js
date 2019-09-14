import React from 'react'
import { Form, Card } from 'tabler-react'

const FormCard = ({ children, footer, title, onSubmit, action, method }) => {
    return (
        <Form className="card" onSubmit={onSubmit} action={action} method={method}>
            <Card.Body className="p-6">
                <Card.Title RootComponent="div">{title}</Card.Title>
                {children}
                <Form.Footer>{footer}</Form.Footer>
            </Card.Body>
        </Form>
    )
}

export default FormCard
