import { ErrorMessage, Field } from 'formik'
import React from 'react'
import { Form } from 'tabler-react'
import styled from 'styled-components'

const FieldWrapper = styled.div`
    margin-bottom: 1rem;
`

const FieldGroup = styled(Form.Group)`
    margin-bottom: unset !important;
`

const FormField = ({ name, placeholder, label, append, prepend, disabled, className = '', type = 'text' }) => {
    return (
        <FieldWrapper className={className}>
            <Field name={name} placeholder={placeholder}>
                {({ field, form }) => {
                    const isInvalid = !!form.errors[field.name] && form.touched[field.name]
                    return (
                        <>
                            <FieldGroup label={label}>
                                <Form.InputGroup>
                                    {prepend && (
                                        <Form.InputGroupPrepend>
                                            <Form.InputGroupText>{prepend}</Form.InputGroupText>
                                        </Form.InputGroupPrepend>
                                    )}
                                    <Form.Input
                                        type={type}
                                        invalid={isInvalid}
                                        cross={isInvalid}
                                        disabled={disabled}
                                        {...field}
                                    />
                                    {append && (
                                        <Form.InputGroupAppend>
                                            <Form.InputGroupText>{append}</Form.InputGroupText>
                                        </Form.InputGroupAppend>
                                    )}
                                </Form.InputGroup>
                            </FieldGroup>
                            <ErrorMessage name={field.name}>
                                {msg => (
                                    <span style={{ display: 'block' }} className="invalid-feedback">
                                        {msg}
                                    </span>
                                )}
                            </ErrorMessage>
                        </>
                    )
                }}
            </Field>
        </FieldWrapper>
    )
}

export default FormField
