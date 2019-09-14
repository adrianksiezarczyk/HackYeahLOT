/* eslint-disable eqeqeq*/
import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { Card, Dimmer, Grid, Form, Icon } from 'tabler-react'
import { PrimaryButton, SecondaryButton } from '../../../components/shared/Button'
import useImmerState from '../../../hooks/useImmerState'
import CardStatusAlert, { useAlert } from '../../../components/shared/Alert'
import StoriesApi from '../../../services/stories/api'
import ReactDOM from 'react-dom'
import { getBase64WithoutPrefix } from '../../../utils/helpers/getBase64WithoutPrefix'
import { withRouter } from 'react-router-dom'

const StoryImageContainer = styled.div`
    display: flex;
`
const StoryImage = styled.div`
    position: relative;
    width: 150px;
    height: 200px;
    border: 1px solid #e1e1e1;
    padding: 5px;
    img {
        ${props => props.toRemove && 'opacity: 0.2;'}
        object-fit: contain;
        width: 100%;
        height: 100%;
    }
    :hover > div {
        visibility: visible;
    }
`
const RemoveButton = styled.div`
    visibility: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
    position: absolute;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    top: -7px;
    right: -7px;
    background-color: ${props => (props.toRemove ? '#5099ff;' : '#ff6262;')};
    cursor: pointer;
    i {
        color: #fff;
        font-size: 22px;
    }
`

const StoryDetails = props => {
    const [isLoading, setLoading] = useState(null)
    const [isEditing, setEditing] = useState(false)
    const [story, setStory] = useState(props.location.state || null)
    const [removingPhotos, setRemovingPhotos] = useState([])
    const [uploadingPhotos, setUploadingPhotos] = useImmerState([])
    const [status, setNoStatus, setSuccessStatus, setFailureStatus] = useAlert()
    const { t } = props
    const fileInputRef = useRef(null)

    useEffect(() => {
        if (!fileInputRef.current) return
        const customFileDOM = ReactDOM.findDOMNode(fileInputRef.current)
        const fileInputDOM = customFileDOM.querySelector('input.custom-file-input')
        fileInputDOM.setAttribute('multiple', true)
        fileInputDOM.style.cursor = 'pointer'
    }, [story])

    useEffect(() => {
        if (props.location.state) return
        if (props.match.params.storyId == 0) {
            setStory({ author: '', rate: '', productId: '', photos: [] })
            return
        }
        const getStoryDetails = async () => {
            try {
                const story = await StoriesApi.getDetails(props.match.params.storyId)
                setStory(story)
            } catch (e) {
                console.error(e)
            }
        }
        getStoryDetails()
    }, [props.location.state, props.match.params.storyId])

    const updateStory = (key, value) => {
        setStory({ ...story, [key]: value })
        setEditing(true)
    }

    const save = async () => {
        setLoading(true)
        let storyId = story.id
        try {
            const images = uploadingPhotos.map(photo => {
                return {
                    fileBase64: getBase64WithoutPrefix(photo.base64),
                    fileExtension: photo.extension,
                    fileName: photo.name,
                }
            })
            if (!story.id) storyId = await StoriesApi.add({ ...story, images })
            else
                await StoriesApi.update({
                    ...story,
                    images,
                    removePhotosIds: story.photos.map(p => p.id).filter(id => removingPhotos.some(pId => pId === id)),
                })
            setStory({ ...story, id: storyId })
            setEditing(false)
            setSuccessStatus()
        } catch (e) {
            setFailureStatus()
        }
        setLoading(false)
    }
    const cancel = () => {
        setStory(props.location.state || {})
        setEditing(false)
    }

    const removeImage = photoId => {
        if (removingPhotos.includes(photoId)) setRemovingPhotos(removingPhotos.filter(id => id !== photoId))
        else setRemovingPhotos(removingPhotos.concat(photoId))
        setEditing(true)
    }
    const removeUploadingImage = photoName => {
        setUploadingPhotos(draft => {
            const photoIndex = draft.findIndex(photo => photo.name === photoName)
            draft.splice(photoIndex, 1)
        })
    }

    const setImage = (base64, fileName, fileExtension) => {
        setUploadingPhotos(draft => {
            draft.push({
                base64: base64,
                extension: fileExtension,
                name: fileName,
            })
        })
    }
    const handleUpload = e => {
        setEditing(true)
        let files = e.target.files
        for (var i = 0; i < files.length; i++) {
            let reader = new FileReader()
            const file = files[i]
            reader.readAsDataURL(file)
            reader.onloadend = () => {
                const fileInfoArr = file.name.split('.')
                const fileName = fileInfoArr[0]
                const fileExtension = fileInfoArr.slice(-1).pop()
                setImage(reader.result, fileName, fileExtension)
            }
        }
    }

    if (!story) return null
    return (
        <Card>
            <Card.Header>
                <Card.Title>{props.match.params.storyId == 0 ? t('Add story') : t('Edit story')}</Card.Title>
                <Card.Options>
                    {isEditing && (
                        <>
                            <PrimaryButton text={t('save')} onClick={save} />
                            <SecondaryButton text={t('cancel')} onClick={cancel} />
                        </>
                    )}
                </Card.Options>
            </Card.Header>
            <CardStatusAlert status={status} onHide={setNoStatus} />
            <Card.Body>
                <Dimmer loader active={isLoading}>
                    <Grid.Row>
                        <Grid.Col md={6}>
                            <Form.Group label={t('Author')}>
                                <Form.Input
                                    value={story.author}
                                    onChange={e => updateStory('author', e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group label={t('Rating')}>
                                <Form.Input value={story.rate} onChange={e => updateStory('rate', e.target.value)} />
                            </Form.Group>
                            <Form.Group label={t('Product Id')}>
                                <Form.Input
                                    value={story.productId}
                                    type="number"
                                    onChange={e => updateStory('productId', e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.FileInput ref={fileInputRef} onChange={handleUpload} />
                            </Form.Group>
                        </Grid.Col>
                        <Grid.Col md={6}>
                            <StoryImageContainer>
                                {story.photos &&
                                    story.photos.map(photo => {
                                        const toRemoveCondition = removingPhotos.includes(photo.id)
                                        return (
                                            <StoryImage toRemove={toRemoveCondition} key={photo.id}>
                                                <RemoveButton
                                                    toRemove={toRemoveCondition}
                                                    onClick={() => {
                                                        removeImage(photo.id)
                                                    }}>
                                                    <Icon name={toRemoveCondition ? 'refresh-cw' : 'x'} />
                                                </RemoveButton>
                                                <img src={photo.url} alt="" />
                                            </StoryImage>
                                        )
                                    })}
                                {uploadingPhotos.map(photo => {
                                    return (
                                        <StoryImage key={photo.name}>
                                            <RemoveButton
                                                onClick={() => {
                                                    removeUploadingImage(photo.name)
                                                }}>
                                                <Icon name="x" />
                                            </RemoveButton>
                                            <img src={photo.base64} alt="" />
                                        </StoryImage>
                                    )
                                })}
                            </StoryImageContainer>
                        </Grid.Col>
                    </Grid.Row>
                </Dimmer>
            </Card.Body>
        </Card>
    )
}

export default withRouter(StoryDetails)
