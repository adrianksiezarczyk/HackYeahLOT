import React  from 'react'
import styled from 'styled-components'
import {  Table, Form } from 'tabler-react'
import  { RemoveButton } from '../../../components/shared/Button'

const StyledTableRow = styled(Table.Row)`
    cursor: pointer;
    ${props => props.selected && `background-color: rgba(0, 0, 0, 0.04);`}
`
const StyledTableCol = styled(Table.Col)`
    max-width: 300px;
`

const PagesTable = ({ pages, pagePreview, isEditing, selectPagePreview, updatePage, selectPage, removePage, t }) => {
    return (
        <Table highlightRowOnHover responsive>
            <Table.Header>
                <Table.Row>
                    <Table.ColHeader>{t('name')}</Table.ColHeader>
                    <Table.ColHeader>{t('url')}</Table.ColHeader>
                    <Table.ColHeader>{t('selected')}</Table.ColHeader>
                    <Table.ColHeader />
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {pages.map(page => {
                    return (
                        <StyledTableRow
                            key={page.id}
                            selected={pagePreview && pagePreview.id === page.id}
                            onClick={() => {
                                selectPagePreview(page)
                            }}>
                            <Table.Col>
                                {isEditing ? (
                                    <Form.Input
                                        value={page.name}
                                        onChange={e => {
                                            updatePage(page.id, e.target.value)
                                        }}
                                    />
                                ) : (
                                    page.name
                                )}
                            </Table.Col>
                            <StyledTableCol>{page.url}</StyledTableCol>
                            <Table.Col>
                                <Form.Checkbox
                                    checked={page.isSelected}
                                    value={page.isSelected}
                                    label={' '}
                                    onChange={e => selectPage(page.id, e.target.checked)}
                                />
                            </Table.Col>
                            <Table.Col alignContent="right">
                                <RemoveButton
                                    onClick={() => {
                                        removePage(page.id)
                                    }}
                                />
                            </Table.Col>
                        </StyledTableRow>
                    )
                })}
            </Table.Body>
        </Table>
    )
}

export default PagesTable
