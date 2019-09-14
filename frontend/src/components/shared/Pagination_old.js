import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Form, Icon } from 'tabler-react'
import { trimNumber } from '../../utils/helpers/numbers'
import { PrimaryButton } from '../shared/Button'
import { useTranslation } from 'react-i18next'

const PaginationWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    span {
        display: flex;
        align-items: center;
    }
`
const ButtonsWrapper = styled.div`
    display: flex;
`
const PageSizeSelect = styled(Form.Group)`
    margin-bottom: 0 !important;
`

const PageSizeWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const PageNumberInput = styled(Form.Input)`
    max-width: 5ch;
    display: unset !important;
`

const Pagination = ({ totalItems, onPageChange }) => {
    const [_currentPage, setCurrentPage] = useState(1)
    const [_totalPages, setTotalPages] = useState(0)
    const [_pageSize, setPageSize] = useState(12)
    const [t] = useTranslation('components')

    useEffect(() => {
        setTotalPages(Math.ceil(totalItems / _pageSize))
    }, [_pageSize, totalItems])

    const changePageSize = pageSize => {
        setCurrentPage(1)
        setPageSize(pageSize)
        onPageChange(1, pageSize)
    }

    const canNextPage = _currentPage < _totalPages
    const canPrevPage = _currentPage > 1

    const gotoPage = useCallback(
        page => {
            const parsed = parseInt(page, 10)
            let go = isNaN(parsed) ? 1 : parsed
            go = trimNumber(go, 1, _totalPages)
            if (go !== 0) {
                if (onPageChange) onPageChange(go, _pageSize)
                setCurrentPage(go)
            }
        },
        [_pageSize, _totalPages, onPageChange],
    )

    const changePage = useCallback(
        page => {
            const parsed = parseInt(page, 10)
            let go = isNaN(parsed) ? setCurrentPage('') : parsed
            go = trimNumber(go, 0, _totalPages)
            setCurrentPage(go)
        },
        [_totalPages],
    )

    return (
        <PaginationWrapper>
            <ButtonsWrapper>
                <PrimaryButton
                    text={<Icon name="chevrons-left" />}
                    disabled={!canPrevPage}
                    onClick={() => gotoPage(1)}
                />
                <PrimaryButton
                    text={<Icon name="chevron-left" />}
                    disabled={!canPrevPage}
                    onClick={() => gotoPage(_currentPage - 1)}
                />
            </ButtonsWrapper>
            <PageSizeWrapper>
                <span className={`mr-5`}>
                    {t('page')}{' '}
                    <PageNumberInput
                        type="number"
                        value={_currentPage}
                        onChange={e => changePage(e.target.value)}
                        onBlur={e => gotoPage(_currentPage)}
                        onKeyPress={e => {
                            if (e.charCode === 13) gotoPage(_currentPage)
                        }}
                    />{' '}
                    {t('of')} {_totalPages}{' '}
                </span>
                <span className={`mr-2`}>{t('page-size')}:</span>
                <PageSizeSelect>
                    <Form.Select value={_pageSize} onChange={e => changePageSize(e.target.value)}>
                        <option>4</option>
                        <option>8</option>
                        <option>12</option>
                        <option>16</option>
                        <option>20</option>
                    </Form.Select>
                </PageSizeSelect>
            </PageSizeWrapper>
            <ButtonsWrapper>
                <PrimaryButton
                    text={<Icon name="chevron-right" />}
                    disabled={!canNextPage}
                    onClick={() => gotoPage(_currentPage + 1)}
                />
                <PrimaryButton
                    className="ml-2"
                    text={<Icon name="chevrons-right" />}
                    disabled={!canNextPage}
                    onClick={() => gotoPage(_totalPages)}
                />
            </ButtonsWrapper>
        </PaginationWrapper>
    )
}

export default Pagination
