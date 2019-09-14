import React from 'react'
import styled from 'styled-components'
import { Form } from 'tabler-react'
import { Tooltip } from 'react-tippy'

const FormElementContainer = styled.div`
    display: flex;
    align-items: center;
`
const TooltipContainer = styled.div`
    display: inline-block;
    margin-left: 5px;
`
const StyledFormTextarea = styled(Form.Textarea)`
    min-height: 100px;
`
const StyledFormCheckbox = styled(Form.Checkbox)`
    cursor: pointer !important;
`
const StyledFormSwitch = styled(Form.Switch)`
    cursor: pointer !important;
`

const InputTooltip = ({ tooltip }) => {
    if (tooltip)
        return (
            <TooltipContainer>
                <Tooltip title={tooltip} position="right" trigger="mouseenter">
                    <Form.Help />
                </Tooltip>
            </TooltipContainer>
        )
    else return null
}

// export const Input = ({ name, value, type, onChange, tooltip }) => {
//     return (
//         <>
//             <FormElementContainer>
//                 <Form.Input name={name} value={value || ''} type={type} onChange={e => onChange(e.target.value)} />
//                 {tooltip && <InputTooltip tooltip={tooltip} />}
//             </FormElementContainer>
//             <ErrorMessage name={name}>
//                 {msg => (
//                     <span style={{ display: 'block' }} className="invalid-feedback">
//                         {msg}
//                     </span>
//                 )}
//             </ErrorMessage>
//         </>
//     )
// }

const FormElement = ({
    name,
    value,
    label,
    type,
    isReadOnly,
    isCheckbox,
    isTextarea,
    onChange,
    helpDescription,
    isSwitch,
    ...props
}) => {
    if (isReadOnly) return value
    if (isCheckbox)
        return (
            <FormElementContainer>
                {isSwitch ? (
                    <StyledFormSwitch
                        name={name}
                        checked={typeof value === Boolean ? value : value === 'true'}
                        label={label}
                        onChange={e => onChange(e.target.checked)}
                        {...props}
                    />
                ) : (
                    <StyledFormCheckbox
                        name={name}
                        checked={typeof value === Boolean ? value : value === 'true'}
                        label={label}
                        onChange={e => onChange(e.target.checked)}
                    />
                )}
                <InputTooltip tooltip={helpDescription} />
            </FormElementContainer>
        )
    if (isTextarea)
        return (
            <FormElementContainer>
                <StyledFormTextarea
                    name={name}
                    value={value | ''}
                    type={'text'}
                    onChange={e => onChange(e.target.value)}
                />
                <InputTooltip tooltip={helpDescription} />
            </FormElementContainer>
        )
    return (
        <FormElementContainer>
            <Form.Input name={name} value={value || ''} type={type} onChange={e => onChange(e.target.value)} />
            <InputTooltip tooltip={helpDescription} />
        </FormElementContainer>
    )
}
export default FormElement
