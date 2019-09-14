import React, { useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import { Grid, Table, Card, Dimmer } from 'tabler-react'
import StoriesApi from '../../services/stories/api'
import Button, { RemoveButton, EditButton } from '../../components/shared/Button'
import { Link } from 'react-router-dom'
import CardStatusAlert, { useAlert } from '../../components/shared/Alert'
import { warningTakeAlert } from '../../components/shared/TakeAlert'
import Pagination from '../../components/shared/Pagination'

const StyledTableRow = styled(Table.Row)`
    cursor: pointer;
    ${props => props.selected && `background-color:#e1e1e1;`}
`

const StoryImageContainer = styled.div`
    display: flex;
`
const StoryImage = styled.div`
    width: 150px;
    height: 200px;
    border: 1px solid #e1e1e1;
    padding: 5px;
    img {
        object-fit: contain;
        width: 100%;
        height: 100%;
    }
`

const Stories = props => {
    const [isLoading, setLoading] = useState(true)
    const [status, setNoStatus, setSuccessStatus, setFailureStatus] = useAlert()
    const [selectedStory, setSelectedStory] = useState(null)
    const [totalItems, setTotalItems] = useState(null)
    const [stories, setStories] = useState(null)
    const { t } = props

    const fetchData = useCallback(
        async (page = 1, pageSize = 12) => {
            setLoading(true)
            try {
                const { data, totalItems } = await StoriesApi.get({ page, pageSize })
               setTotalItems(totalItems)
                setStories(data)
                setSelectedStory(data[0])
            } catch (error) {
                console.error(error)
            }
            setLoading(false)
        },
        [],
    )

    useEffect(() => {
        fetchData()
    }, [fetchData])

    const onRemove = async storyId => {
        try {
            setLoading(true)
            await StoriesApi.delete(storyId)
            await fetchData()
            setSuccessStatus()
        } catch (e) {
            setFailureStatus()
        }
        setLoading(false)
    }
    const remove = storyId =>
        warningTakeAlert(t('are you sure?'), t('remove story'), t('remove'), () => onRemove(storyId))

    if (!stories) return null
    return (
        <Grid>
            <Grid.Row>
                <Grid.Col md={6}>
                    <Card>
                        <Card.Header>
                            <Card.Title>{t('stories')}</Card.Title>
                            <Card.Options>
                                <Link to={`stories/0`}>
                                    <Button size="sm" color="success">
                                        {t('add')}
                                    </Button>
                                </Link>
                            </Card.Options>
                        </Card.Header>
                        <CardStatusAlert status={status} onHide={setNoStatus} />
                        <Card.Body>
                            <Dimmer loader active={isLoading}>
                                <Table highlightRowOnHover>
                                    <Table.Header>
                                        <Table.Row>
                                            <Table.ColHeader>{t('Author')}</Table.ColHeader>
                                            <Table.ColHeader>{t('Rating')}</Table.ColHeader>
                                            <Table.ColHeader>{t('Product Id')}</Table.ColHeader>
                                            <Table.ColHeader />
                                        </Table.Row>
                                    </Table.Header>
                                    <Table.Body>
                                        {stories.map(story => {
                                            return (
                                                <StyledTableRow
                                                    key={story.id}
                                                    selected={selectedStory && story.id === selectedStory.id}
                                                    onClick={() => {
                                                        setSelectedStory(story)
                                                    }}>
                                                    <Table.Col>{story.author}</Table.Col>
                                                    <Table.Col>{story.rate}</Table.Col>
                                                    <Table.Col>{story.productId}</Table.Col>
                                                    <Table.Col alignContent="right">
                                                        <Link
                                                            to={{
                                                                pathname: `stories/${story.id}`,
                                                                state: story,
                                                            }}>
                                                            <EditButton text={t('edit')} />
                                                        </Link>
                                                        <RemoveButton
                                                            onClick={() => {
                                                                remove(story.id)
                                                            }}
                                                        />
                                                    </Table.Col>
                                                </StyledTableRow>
                                            )
                                        })}
                                    </Table.Body>
                                </Table>
                                <Pagination totalItems={totalItems} onPageChange={fetchData} />
                            </Dimmer>
                        </Card.Body>
                    </Card>
                </Grid.Col>
                <Grid.Col md={6}>
                    <Card>
                        <Card.Body>
                            <Dimmer loader active={isLoading}>
                                <StoryImageContainer>
                                    {selectedStory &&
                                        selectedStory.photos.map(photo => {
                                            return (
                                                <StoryImage key={photo.id}>
                                                    <img src={photo.url} alt="" />
                                                </StoryImage>
                                            )
                                        })}
                                </StoryImageContainer>
                            </Dimmer>
                        </Card.Body>
                    </Card>
                </Grid.Col>
            </Grid.Row>
        </Grid>
    )
}

export default Stories
