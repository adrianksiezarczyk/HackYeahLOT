import React from 'react'
import { Form } from 'tabler-react'
import styled from 'styled-components'

const PriceFilterWrapper = styled.div`
    padding: 0.75em;
`

const PriceFilter = ({ priceRange, setPriceRange }) => {
    return (
        <PriceFilterWrapper>
            <Form.Group label="Prices">
                <Form.Radio
                    label="All"
                    name="example-radios"
                    onChange={() => setPriceRange({ minPrice: null, maxPrice: null })}
                    checked={!priceRange.minPrice && !priceRange.maxPrice}
                />
                <Form.Radio
                    label="Under $10"
                    name="example-radios"
                    onChange={() => setPriceRange({ minPrice: null, maxPrice: 10 })}
                    checked={priceRange.minPrice === null && priceRange.maxPrice === 10}
                />
                <Form.Radio
                    label="$10 to $25"
                    name="example-radios"
                    onChange={() => setPriceRange({ minPrice: 10, maxPrice: 25 })}
                    checked={priceRange.minPrice === 10 && priceRange.maxPrice === 25}
                />
                <Form.Radio
                    label="$25 to $50"
                    name="example-radios"
                    onChange={() => setPriceRange({ minPrice: 25, maxPrice: 50 })}
                    checked={priceRange.minPrice === 25 && priceRange.maxPrice === 50}
                />
                <Form.Radio
                    label="$50 and above"
                    name="example-radios"
                    onChange={() => setPriceRange({ minPrice: 50, maxPrice: null })}
                    checked={priceRange.minPrice === 50 && priceRange.maxPrice === null}
                />
            </Form.Group>
        </PriceFilterWrapper>
    )
}

export default PriceFilter
