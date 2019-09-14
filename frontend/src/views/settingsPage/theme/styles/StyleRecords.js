import React, { Fragment, useState, useRef, useCallback } from 'react'
import styled from 'styled-components'
import { Form } from 'tabler-react'
import { SketchPicker } from 'react-color'
import useOnOutsideClick from '../../../../hooks/useOnOutsideClick'

const InlineFormGroup = styled(Form.Group)`
    display: flex !important;
    position: relative;
    justify-content: space-between;
    align-items: center;
    i {
        margin-left: 5px;
    }
`
const ColorPalette = styled.div`
    position: absolute;
    z-index: 1;
    top: 25px;
`
const CurrentColorBlock = styled.div`
    cursor: pointer;
    width: 15px;
    height: 15px;
    margin-left: 5px;
    border: 1px solid #f1f1f1;
    border-radius: 50%;
    background: ${props => props.backgroundColor};
`

const StyleRecords = ({ themeRecords, updateRecord, updateRecordDebounced }) => {
    const [colorPickerKey, setColorPickerKey] = useState(null)
    const colorPickerRef = useRef(null)

    const handleAnyClick = useCallback(() => setColorPickerKey(null), [])

    useOnOutsideClick(colorPickerRef, handleAnyClick)

    return (
        <>
            {themeRecords.map((themeRecord, index) => {
                return (
                    <Fragment key={index}>
                        {themeRecord.type === 'Color' ? (
                            <InlineFormGroup key={themeRecord.key} label={themeRecord.key}>
                                <CurrentColorBlock
                                    backgroundColor={themeRecord.value}
                                    onClick={() => {
                                        setColorPickerKey(colorPickerKey === themeRecord.key ? null : themeRecord.key)
                                    }}
                                />

                                {colorPickerKey === themeRecord.key && (
                                    <ColorPalette ref={colorPickerRef}>
                                        <SketchPicker
                                            color={themeRecord.value}
                                            onChange={color => updateRecordDebounced(themeRecord.key, color.hex)}
                                        />
                                    </ColorPalette>
                                )}
                            </InlineFormGroup>
                        ) : (
                            <Form.Group key={themeRecord.key} label={themeRecord.key}>
                                <Form.Input
                                    name={themeRecord.key}
                                    value={themeRecord.value}
                                    type={'text'}
                                    onChange={e => {
                                        updateRecord(themeRecord.key, e.target.value)
                                    }}
                                />
                            </Form.Group>
                        )}
                    </Fragment>
                )
            })}
        </>
    )
}

export default StyleRecords
