import React, { Suspense } from 'react'
import { useTranslation } from 'react-i18next'
import MediaQuery from 'react-responsive'
import Select from 'react-select'
import styled from 'styled-components'
import { Form } from 'tabler-react'
import Button from '../../../components/shared/Button'
import LoadingIndicator from '../../../components/shared/LoadingIndicator'
import { UI_BREAKPOINTS } from '../../../constants'

const SerachInput = styled.div`
    flex-grow: 1;
    margin-right: 1em;
`
const SearchWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    .input-icon {
        flex-grow: 1;
    }
`
const MobileWrapper = styled.div`
    display: flex;
    flex-direction: column;
`

const SelectWrapper = styled.div`
    min-width: 30ch;
`

const SelectInputWrapper = styled(Form.InputGroupText)`
    padding: 0 !important;
    border: unset !important;
`

const customStyles = {
    option: base => ({
        ...base,
        textAlign: 'left',
    }),
}

const SearchBar = ({ categories, selectedCategory, selectMainCategory, disabled }) => {
    const { t } = useTranslation('products-page', { useSuspense: false })
    const items = [{ id: null, name: t('all-categories') }, ...categories]

    return (
        <>
            <Suspense fallback={<LoadingIndicator />}>
                <MediaQuery minWidth={UI_BREAKPOINTS.LG}>
                    <SearchWrapper>
                        <SerachInput>
                            <Form.InputGroup>
                                <Form.Input icon="search" placeholder={t('search-placeholder')} disabled={disabled} />
                                <SelectInputWrapper>
                                    <SelectWrapper>
                                        <Select
                                            styles={customStyles}
                                            value={items.find(cat => cat.id === selectedCategory) || items[0]}
                                            options={items}
                                            getOptionLabel={option => option['name']}
                                            getOptionValue={option => option['id']}
                                            onChange={val => {
                                                selectMainCategory(val.id)
                                            }}
                                        />
                                    </SelectWrapper>
                                </SelectInputWrapper>
                            </Form.InputGroup>
                        </SerachInput>
                        <Button color="primary">{t('search')}</Button>
                    </SearchWrapper>
                </MediaQuery>
                <MediaQuery maxWidth={UI_BREAKPOINTS.LG}>
                    <MobileWrapper>
                        <Form.Input icon="search" placeholder={t('search-placeholder')} />
                        <Select
                            styles={customStyles}
                            value={items.find(cat => cat.id === selectedCategory) || items[0]}
                            options={items}
                            getOptionLabel={option => option['name']}
                            getOptionValue={option => option['id']}
                            onChange={val => {
                                selectMainCategory(val.id)
                            }}
                        />
                        <Button color="primary">{t('search')}</Button>
                    </MobileWrapper>
                </MediaQuery>
            </Suspense>
        </>
    )
}

export default SearchBar
