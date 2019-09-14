import React, { useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import { Grid, Card, Dimmer } from 'tabler-react'
import Button, { EditButton, PrimaryButton, SecondaryButton } from '../../components/shared/Button'
import CardStatusAlert, { useAlert } from '../../components/shared/Alert'
import { warningTakeAlert } from '../../components/shared/TakeAlert'
import ShopPageApi from '../../services/shopPage/api'
import useImmerState from '../../hooks/useImmerState'
import useModal from '../../components/hooks/useModal'
import AddPageModal from './shopMainPage/AddPageModal'
import PagesTable from './shopMainPage/PagesTable'

const IFrameContainer = styled.div`
    height: 700px;
`
const StyledIFrame = styled.iframe`
    position: absolute;
    display: block;
    overflow: hidden;
    overflow-x: hidden;
    overflow-y: hidden;
    height: inherit;
    width: 100%;
    top: 0px;
    left: 0px;
`

const ShopMainPage = props => {
    const [isLoading, setLoading] = useState(true)
    const [status, setNoStatus, setSuccessStatus, setFailureStatus] = useAlert()
    const [initialPages, setInitialPages] = useImmerState(null)
    const [pages, setPages] = useImmerState(null)
    const [pagePreview, setPagePreview] = useState(null)
    const [isEditing, setEditing] = useState(null)
    const { t } = props

    const { isOpen: isModalOpen, open: openModal, close: closeModal } = useModal()

    const fetchData = useCallback(
        async (page = 1, pageSize = 12) => {
            setLoading(true)
            try {
                const data = await ShopPageApi.getAll()
                setInitialPages(() => data)
                setPages(() => data)
                const selectedPage = data.find(page => page.isSelected)
                if (selectedPage) setPagePreview(selectedPage)
            } catch (error) {
                console.error(error)
            }
            setLoading(false)
        },
        [setInitialPages, setPages],
    )

    useEffect(() => {
        fetchData()
    }, [fetchData])

    const selectPage = async (pageId, checked) => {
        try {
            await ShopPageApi.selectPage(pageId)
            setPages(draft => {
                draft.forEach(page => {
                    page.isSelected = false
                })
                const page = draft.find(page => page.id === pageId)
                if (page) page.isSelected = checked
            })
            setSuccessStatus()
        } catch (e) {
            console.error(e)
            setFailureStatus()
        }
    }
    const selectPagePreview = page => setPagePreview(page)

    const onRemovePage = async id => {
        setLoading(true)
        try {
            await ShopPageApi.remove(id)
            setPages(draft => {
                const index = draft.indexOf(page => page.id === id)
                draft = draft.splice(index, 1)
            })
            setInitialPages(draft => {
                const index = draft.indexOf(page => page.id === id)
                draft = draft.splice(index, 1)
            })
            setSuccessStatus()
        } catch (e) {
            setFailureStatus()
        }
        setLoading(false)
    }

    const removePage = id =>
        warningTakeAlert(t('are you sure?'), t('remove main page'), t('remove'), () => onRemovePage(id))

    const savePages = async () => {
        const model = pages.map(page => {
            return { id: page.id, name: page.name }
        })
        setLoading(true)
        try {
            await ShopPageApi.update(model)
            setInitialPages(draft => {
                model.forEach(modelPage => {
                    const page = draft.find(draftPage => draftPage.id === modelPage.id)
                    if (page) page.name = modelPage.name
                })
            })
            setEditing(false)
            setSuccessStatus()
        } catch (e) {
            setFailureStatus()
        }
        setLoading(false)
    }
    const updatePage = (id, name) => {
        setPages(draft => {
            const page = draft.find(page => page.id === id)
            if (page) page.name = name
        })
    }
    const cancel = () => {
        setPages(() => initialPages)
        setEditing(false)
    }

    if (!pages) return null
    return (
        <Grid>
            <Grid.Row>
                <Grid.Col md={6}>
                    <Card>
                        <Card.Header>
                            <Card.Title>{t('shop pages')}</Card.Title>
                            <Card.Options>
                                <Button size="sm" color="success" onClick={openModal}>
                                    {t('add')}
                                </Button>

                                {isEditing ? (
                                    <>
                                        <PrimaryButton
                                            text={t('save')}
                                            onClick={() => {
                                                savePages()
                                            }}
                                        />
                                        <SecondaryButton text={t('cancel')} onClick={cancel} />
                                    </>
                                ) : (
                                    <EditButton text={t('edit')} onClick={() => setEditing(true)} />
                                )}
                            </Card.Options>
                        </Card.Header>
                        <CardStatusAlert status={status} onHide={setNoStatus} />
                        <Card.Body>
                            <Dimmer loader active={isLoading}>
                                <PagesTable
                                    pages={pages}
                                    pagePreview={pagePreview}
                                    isEditing={isEditing}
                                    selectPagePreview={selectPagePreview}
                                    updatePage={updatePage}
                                    selectPage={selectPage}
                                    removePage={removePage}
                                    t={t}
                                />
                            </Dimmer>
                        </Card.Body>
                    </Card>
                </Grid.Col>
                <Grid.Col md={6}>
                    <Card>
                        <Card.Body>
                            <Dimmer loader active={isLoading}>
                                <IFrameContainer>
                                    <StyledIFrame
                                        src={pagePreview && pagePreview.url}
                                        title="shopMainPage"
                                        frameborder="0"
                                        scrolling="yes"
                                    />
                                </IFrameContainer>
                            </Dimmer>
                        </Card.Body>
                    </Card>
                </Grid.Col>
            </Grid.Row>
            <AddPageModal size="md" isOpen={isModalOpen} onCloseModal={closeModal} t={t} />
        </Grid>
    )
}

export default ShopMainPage
