import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Icon, Button, Grid } from 'tabler-react'
import { trimNumber } from '../../utils/helpers/numbers'
import { useTranslation } from 'react-i18next'

const PaginationContener = styled(Grid.Col)`
    display: flex;
    justify-content: space-between;
    @media (max-width: 768px) {
        flex-direction: column;
    }
`
const ElementsCountInfo = styled.div`
    color: #495057;
    @media (max-width: 768px) {
        margin-bottom: 10px;
        margin-top: 10px;
    }
`

const PageButton = styled.li`
    margin: 0 3.2px;
    span {
        height: 38px;
        min-width: 38px;
        padding: 10px 14px;
    }

    font-weight: 600;
    letter-spacing: 0.03em;
    font-size: 0.8125rem;
`
const ResetIcon = styled(Icon)`
    line-height: 0 !important;
`

const MoreItems = ({ onClick }) => {
    return (
        <li className="page-item" onClick={onClick}>
            <span
                className="page-link"
                style={{
                    paddingTop: '0.9rem',
                    paddingBottom: '0.1rem',
                }}>
                <ResetIcon name="more-horizontal" />
            </span>
        </li>
    )
}

const PAGINATION_VIEW_TYPE = {
    ALL_PAGES_VISIBLE: 0,
    FIRST_PAGES_AND_LAST: 1,
    LAST_PAGES_AND_FIRST: 2,
    FIRST_LAST_AND_RANGE: 3,
}

const Pagination = ({ totalItems, onPageChange }) => {
    const [_currentPage, setCurrentPage] = useState(1)
    const [_totalPages, setTotalPages] = useState(0)
    // eslint-disable-next-line no-unused-vars
    const [_pageSize, setPageSize] = useState(12)
    const [t] = useTranslation('components')

    useEffect(() => {
        setTotalPages(Math.ceil(totalItems / _pageSize))
    }, [_pageSize, totalItems])

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

    const getPagintaionView = () => {
        if (_totalPages <= 5) return PAGINATION_VIEW_TYPE.ALL_PAGES_VISIBLE
        else if (_totalPages > 5 && _currentPage <= 3) return PAGINATION_VIEW_TYPE.FIRST_PAGES_AND_LAST
        else if (_totalPages > 5 && _currentPage > _totalPages - 3) return PAGINATION_VIEW_TYPE.LAST_PAGES_AND_FIRST
        else return PAGINATION_VIEW_TYPE.FIRST_LAST_AND_RANGE
    }

    const SinglePageItem = ({ page, active }) => {
        const classNames = active ? 'page-item active' : 'page-item'
        return (
            <PageButton onClick={() => gotoPage(page)} key={page} className={classNames}>
                <span className="page-link">{page}</span>
            </PageButton>
        )
    }
    const DirectionButton = ({ disabled, children, currentPage, direction }) => {
        const classNames = disabled ? 'page-item disabled' : 'page-item'
        const jump = direction === 'prev' ? -1 : 1
        return (
            <Button color="secondary" onClick={() => gotoPage(_currentPage + jump)} className={classNames}>
                {children}
            </Button>
        )
    }

    const PreviousButton = () => (
        <DirectionButton disabled={!canPrevPage} direction="prev">
            {t('Previous')}
        </DirectionButton>
    )

    const NextButton = () => (
        <DirectionButton disabled={!canNextPage} direction="next">
            {t('Next')}
        </DirectionButton>
    )
    const PaginationContent = () => {
        switch (getPagintaionView()) {
            case PAGINATION_VIEW_TYPE.ALL_PAGES_VISIBLE:
                return Array(_totalPages)
                    .fill(1)
                    .map((p, index) => (
                        <SinglePageItem key={index} page={index + 1} active={_currentPage === index + 1} />
                    ))
            case PAGINATION_VIEW_TYPE.FIRST_PAGES_AND_LAST:
                return (
                    <>
                        {Array(3)
                            .fill(1)
                            .map((p, index) => (
                                <SinglePageItem key={index} page={index + 1} active={_currentPage === index + 1} />
                            ))}
                        <MoreItems
                            onClick={() => {
                                gotoPage(Math.ceil((_totalPages + 3) / 2))
                            }}
                        />
                        <SinglePageItem page={_totalPages} active={_currentPage === _pageSize} />
                    </>
                )
            case PAGINATION_VIEW_TYPE.LAST_PAGES_AND_FIRST:
                return (
                    <>
                        <SinglePageItem page={1} active={_currentPage === 1} />
                        <MoreItems onClick={() => gotoPage(Math.ceil((_totalPages - 4) / 2))} />
                        {Array(3)
                            .fill(1)
                            .map((p, index) => (
                                <SinglePageItem
                                    key={index}
                                    page={_totalPages - 3 + index + 1}
                                    active={_currentPage === _totalPages - 3 + index + 1}
                                />
                            ))}
                    </>
                )
            case PAGINATION_VIEW_TYPE.FIRST_LAST_AND_RANGE:
                return (
                    <>
                        <SinglePageItem page={1} active={_currentPage === 1} />
                        <MoreItems onClick={() => gotoPage(Math.ceil((_currentPage - 1) / 2))} />
                        {Array(3)
                            .fill(1)
                            .map((p, index) => (
                                <SinglePageItem
                                    key={index}
                                    page={_currentPage - 2 + index + 1}
                                    active={_currentPage === _currentPage - 2 + index + 1}
                                />
                            ))}
                        <MoreItems onClick={() => gotoPage(Math.ceil((_currentPage - 2 + _totalPages) / 2))} />
                        <SinglePageItem page={_totalPages} active={_currentPage === _totalPages} />
                    </>
                )
            default:
                return null
        }
    }

    if (_pageSize === 0) return null
    return (
        <Grid.Row>
            <PaginationContener>
                <ElementsCountInfo>
                    {t('Showing')} {_currentPage * _pageSize - _pageSize + 1} {t('to')}{' '}
                    {_currentPage * _pageSize > totalItems ? totalItems : _currentPage * _pageSize} {t('of')}{' '}
                    {totalItems} {t('elements')}
                </ElementsCountInfo>

                <ul className="pagination">
                    <PreviousButton />
                    <PaginationContent />
                    <NextButton />
                </ul>
            </PaginationContener>
        </Grid.Row>
    )
}

export default Pagination
