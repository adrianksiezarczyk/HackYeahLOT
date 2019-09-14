import React, { Fragment } from 'react'
import { Icon } from 'tabler-react'
import { Form, Table, Grid, Dropdown } from 'tabler-react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

export const Cell = styled.div`
    ::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
    }
`

const StyledFilterColHeader = styled(Table.ColHeader)`
    border-bottom: none !important;
`
const StyledInput = styled(Form.Input)`
    ${props => props.width && `width: ${props.width}px!important;`}
`

export const TableFilterHeader = ({ filterColumns, modifyFilters, t }) => {
    return (
        <Table.Header>
            <Table.Row>
                {filterColumns.map(filterColumn => {
                    if (!filterColumn) return <StyledFilterColHeader />
                    return (
                        <StyledFilterColHeader key={filterColumn}>
                            <StyledInput
                                placeholder={t ? t(filterColumn) : filterColumn}
                                onChange={e => {
                                    modifyFilters(filterColumn, e.target.value)
                                }}
                            />
                        </StyledFilterColHeader>
                    )
                })}
            </Table.Row>
        </Table.Header>
    )
}

const StyledSortColHeader = styled.th`
    position: relative;
    cursor: pointer;
`

export const TableSortHeader = ({
    sortColumns = [],
    defaultColumns = [],
    modifySorting,
    sortColumnName,
    descending,
    className = '',
    t,
}) => {
    const SortIcon = ({ columnName }) => {
        if (sortColumnName !== columnName) return null

        if (descending) return <Icon name="chevron-down" />
        else return <Icon name="chevron-up" />
    }

    return (
        <Table.Header className={className}>
            <Table.Row>
                {sortColumns.map(sortColumn => {
                    return (
                        <StyledSortColHeader key={sortColumn} name={sortColumn}>
                            <Cell
                                onClick={() => {
                                    modifySorting(sortColumn)
                                }}>
                                {t ? t(sortColumn) : sortColumn} <SortIcon columnName={sortColumn} />
                            </Cell>
                        </StyledSortColHeader>
                    )
                })}
                {defaultColumns.map(column => {
                    return (
                        <th key={column} name={column}>
                            {t ? t(column) : column}
                        </th>
                    )
                })}
            </Table.Row>
        </Table.Header>
    )
}

const AccordionHeader = styled(Table.Row)`
    ${props => (props.show ? `display:table-row;` : `display:none;`)}
    transition: 1.4s;
    label {
        font-size: 12px;
    }
    .input-group {
        align-items: center !important;
        justify-content: space-between;
    }
    .custom-select {
        flex: 0 1 200px !important;
    }
`
const StyledFormGroup = styled(Form.Group)`
    margin-bottom: 2px !important;
`

const StyledFormInput = styled(Form.Input)`
    flex: 0 1 200px !important;
`

export const TableFilterAccordionHeader = ({ isOpen, filterColumns, modifyFilters, t, children }) => {
    return (
        <AccordionHeader show={isOpen ? 1 : 0}>
            <Table.ColHeader colSpan={8}>
                <Grid>
                    <Grid.Row>
                        {filterColumns.map(filterColumn => {
                            return (
                                <Fragment key={filterColumn}>
                                    <Grid.Col md={4}>
                                        <StyledFormGroup>
                                            <Form.InputGroup>
                                                <Form.Label>{t(filterColumn)}</Form.Label>
                                                <StyledFormInput
                                                    onChange={e => {
                                                        modifyFilters(filterColumn, e.target.value)
                                                    }}
                                                />
                                            </Form.InputGroup>
                                        </StyledFormGroup>
                                    </Grid.Col>
                                    <Grid.Col md={2} />
                                </Fragment>
                            )
                        })}
                        {children}
                    </Grid.Row>
                </Grid>
            </Table.ColHeader>
        </AccordionHeader>
    )
}

const DropdownItemTitle = styled(Dropdown.Item)`
    text-align: center !important;
    color: #999 !important;
    &:active {
        background-color: #fff !important;
    }
`
const StyledDropdownItem = styled(Dropdown.Item)`
    cursor: pointer;
    ${props => props.active && `background-color:#2684ffa6!important;`}
`

export const TableSortDropdownButton = ({ sortColumns, modifySorting, sortColumnName, descending, t }) => {
    const { t: components_t } = useTranslation('components')
    return (
        <Dropdown
            type="button"
            toggle={false}
            color="secondary"
            icon="filter"
            items={[
                <DropdownItemTitle>{components_t('Sort by')}</DropdownItemTitle>,
                <Dropdown.ItemDivider />,
                sortColumns.map(column => {
                    return (
                        <StyledDropdownItem
                            key={column}
                            active={sortColumnName === column}
                            onClick={() => {
                                modifySorting(column)
                            }}>
                            {t(column)}
                        </StyledDropdownItem>
                    )
                }),
                <Dropdown.ItemDivider />,
                <DropdownItemTitle>{components_t('Sort and display')}</DropdownItemTitle>,
                <Dropdown.ItemDivider />,
                <StyledDropdownItem
                    active={descending}
                    onClick={() => {
                        if (!descending) modifySorting(sortColumnName)
                    }}>
                    {components_t('descending')}
                </StyledDropdownItem>,
                <StyledDropdownItem
                    active={!descending}
                    onClick={() => {
                        if (descending) modifySorting(sortColumnName)
                    }}>
                    {components_t('ascending')}
                </StyledDropdownItem>,
            ]}
        />
    )
}
