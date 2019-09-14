import React from 'react'
import { Grid } from 'tabler-react'
import styled from 'styled-components'
import { getPhotoUrl } from '../utils/helpers/images';

const StyledImg = styled.img`
    ${props =>
        props.isSpecial &&
        `
        border: 3px solid #F1C40F;
    `}
`

const ImageCheckbox = ({
    col: { width = 6, sm = 4, md = 0, lg = 0 } = {},
    value,
    checked,
    imageURL,
    isSpecial,
    disabled,
    onClick,
    onMouseEnter,
    onMouseLeave,
    onPointerEnter,
    onPointerLeave,
    onFocus,
    onBlur,
    onChange,
}) => {
    return (
        <Grid.Col width={width} sm={sm} md={md} lg={lg}>
            <label className="imagecheck mb-4" onClick={onClick}>
                <input
                    name="imagecheck"
                    type="checkbox"
                    value={value}
                    className="imagecheck-input"
                    defaultChecked={checked}
                    disabled={disabled}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                    onPointerEnter={onPointerEnter}
                    onPointerLeave={onPointerLeave}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onChange={onChange}
                />
                <figure className="imagecheck-figure">
                    <StyledImg src={getPhotoUrl({photo:imageURL})} alt="Select" className="imagecheck-image" isSpecial={isSpecial} />
                </figure>
            </label>
        </Grid.Col>
    )
}

export default ImageCheckbox
