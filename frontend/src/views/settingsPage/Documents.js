import React, { useState, useEffect } from 'react'
import { Card, Grid, Table } from 'tabler-react'
import { useTranslation } from 'react-i18next'
import LoadingIndicator from '../../components/shared/LoadingIndicator'
import DocumentsApi from '../../services/documents/api'
import { EditButton } from '../../components/shared/Button'
import { Link } from 'react-router-dom'

const Documents = () => {
    const [documents, setDocuments] = useState(null)

    const { t } = useTranslation('settings-page')

    useEffect(() => {
        const fetch = async () => {
            try {
                const documents = await DocumentsApi.get()
                setDocuments(documents)
            } catch (e) {}
        }
        fetch()
    }, [])

    if (!documents) return <LoadingIndicator />
    return (
        <Card>
            <Card.Body>
                <Grid.Row>
                    <Grid.Col md={6}>
                        <Table>
                            <Table.Header>
                                <Table.Row>
                                    <Table.ColHeader>Id</Table.ColHeader>
                                    <Table.ColHeader>{t('name')}</Table.ColHeader>
                                    <Table.ColHeader />
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {documents.map(document => {
                                    return (
                                        <Table.Row>
                                            <Table.Col>{document.id}</Table.Col>
                                            <Table.Col>{document.name}</Table.Col>
                                            <Table.Col>
                                                <Link to={`documents/${document.id}`}>
                                                    <EditButton text={t('edit')} />
                                                </Link>
                                               
                                            </Table.Col>
                                        </Table.Row>
                                    )
                                })}
                            </Table.Body>
                        </Table>
                    </Grid.Col>
                </Grid.Row>
            </Card.Body>
        </Card>
    )
}

export default Documents
