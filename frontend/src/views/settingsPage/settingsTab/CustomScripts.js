import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Card, Dimmer, Form } from 'tabler-react'
import Button, { PrimaryButton, SecondaryButton, EditButton, RemoveButton } from '../../../components/shared/Button'
import CardStatusAlert, { useAlert } from '../../../components/shared/Alert'
import LoadingIndicator from '../../../components/shared/LoadingIndicator'
import ConfigurationApi from '../../../services/configuration/api'
import { warningTakeAlert } from '../../../components/shared/TakeAlert'

const ScriptBox = styled.div`
    margin-top: 10px;
`
const Header = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 3px;
`
const StyledInput = styled(Form.Input)`
    margin-bottom: 5px;
`

const CustomScripts = ({ t }) => {
    const [isLoading, setLoading] = useState(true)
    const [status, setNoStatus, setSuccessStatus, setFailureStatus] = useAlert()
    const [scripts, setScripts] = useState(null)
    const [newScript, setNewScript] = useState(null)
    const [editedScript, setEditedScript] = useState(null)

    const getScripts = async () => {
        try {
            const scripts = await ConfigurationApi.getCustomScripts()
            setScripts(scripts)
        } catch (e) {}
    }
    useEffect(() => {
        getScripts()
        setLoading(false)
    }, [])

    const addNewScript = async () => {
        setLoading(true)
        try {
            await ConfigurationApi.addScript(newScript)
            await getScripts()
            setNewScript(null)
            setSuccessStatus()
        } catch (e) {
            setFailureStatus()
        }
        setLoading(false)
    }
    const updateScript = async () => {
        setLoading(true)
        try {
            await ConfigurationApi.updateScript(editedScript)
            await getScripts()
            setEditedScript(null)
            setSuccessStatus()
        } catch (e) {
            setFailureStatus()
        }
        setLoading(false)
    }

    const onRemove = async scriptId => {
        setLoading(true)
        try {
            await ConfigurationApi.deleteScript(scriptId)
            await getScripts()
            setSuccessStatus()
        } catch (e) {
            setFailureStatus()
        }
        setLoading(false)
    }
    const removeScript = scriptId =>
        warningTakeAlert(t('are you sure?'), t('remove script'), t('remove'), () => onRemove(scriptId))

    if (!scripts) return <LoadingIndicator />
    return (
        <Card>
            <Card.Header>
                <Card.Title>{t('Custom scripts')}</Card.Title>
                <Card.Options>
                    {!newScript && (
                        <Button
                            size="sm"
                            color="success"
                            onClick={() => {
                                setNewScript({ name: '', content: '' })
                            }}>
                            {t('add')}
                        </Button>
                    )}
                    {newScript && (
                        <>
                            <PrimaryButton
                                text={t('save')}
                                onClick={() => {
                                    addNewScript()
                                }}
                            />
                            <SecondaryButton
                                text={t('cancel')}
                                onClick={() => {
                                    setNewScript(null)
                                }}
                            />
                        </>
                    )}
                </Card.Options>
            </Card.Header>
            <CardStatusAlert status={status} onHide={setNoStatus} />
            <Card.Body>
                <Dimmer loader active={isLoading}>
                    {newScript && (
                        <>
                            <StyledInput
                                placeholder={t('name')}
                                value={newScript.name}
                                onChange={e => {
                                    setNewScript({ ...newScript, name: e.target.value })
                                }}
                            />
                            <Form.Textarea
                                placeholder={t('content')}
                                value={newScript.content}
                                onChange={e => {
                                    setNewScript({ ...newScript, content: e.target.value })
                                }}
                            />
                        </>
                    )}
                    {scripts.map(script => {
                        if (editedScript && editedScript.id === script.id)
                            return (
                                <ScriptBox key={script.id}>
                                    <Header>
                                        <Form.Label>
                                            <Form.Input
                                                value={editedScript.name}
                                                onChange={e => {
                                                    setEditedScript({ ...editedScript, name: e.target.value })
                                                }}
                                            />
                                        </Form.Label>
                                        <div>
                                            <PrimaryButton
                                                text="save"
                                                onClick={() => {
                                                    updateScript()
                                                }}
                                            />
                                            <SecondaryButton
                                                text="cancel"
                                                onClick={() => {
                                                    setEditedScript(null)
                                                }}
                                            />
                                            <RemoveButton
                                                onClick={() => {
                                                    removeScript(script.id)
                                                }}
                                            />
                                        </div>
                                    </Header>
                                    <Form.Textarea
                                        value={editedScript.content}
                                        onChange={e => {
                                            setEditedScript({ ...editedScript, content: e.target.value })
                                        }}
                                    />
                                </ScriptBox>
                            )
                        return (
                            <ScriptBox key={script.id}>
                                <Header>
                                    <Form.Label>{script.name}</Form.Label>
                                    <div>
                                        <EditButton
                                            text={t('edit')}
                                            onClick={() => {
                                                setEditedScript(script)
                                            }}
                                        />

                                        <RemoveButton
                                            onClick={() => {
                                                removeScript(script.id)
                                            }}
                                        />
                                    </div>
                                </Header>
                                <Form.Textarea value={script.content} readOnly disabled />
                            </ScriptBox>
                        )
                    })}
                </Dimmer>
            </Card.Body>
        </Card>
    )
}

export default CustomScripts
