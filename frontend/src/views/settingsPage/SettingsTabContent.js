import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Form, Card, Dimmer } from 'tabler-react'
import { PrimaryButton, SecondaryButton } from '../../components/shared/Button'
import { SuccessCardAlert, FailureCardAlert } from '../../components/shared/Alert'
import FormElement from '../../components/form/FormElement'
import LoadingIndicator from '../../components/shared/LoadingIndicator'
import { SERVER_TYPES, UI_BREAKPOINTS, STATUSES, MAIN_CONFIGURATION_GROUPS } from '../../constants'
import useImmerState from '../../hooks/useImmerState'
import ConfigurationApi from '../../services/configuration/api'
import { getInputTypeOnConfigurationType } from '../../utils/helpers/getInputTypeOnConfigurationType'
import { groupBy } from '../../utils/helpers/arrayHelpers'
import CustomScripts from './settingsTab/CustomScripts'
import { useTranslation } from 'react-i18next'

const Container = styled.div`
    column-count: 2 !important;
    @media (max-width: ${UI_BREAKPOINTS.SM}px) {
        column-count: 1 !important;
    }
    width: 100%;
    margin-top: 15px;
`

const SettingsTabContent = ({ mainGroup }) => {
    const [groupLoading, setLoadingGroup] = useState(null)
    const [editedGroup, setEditedGroup] = useState(null)
    const [editedGroupStatus, setEditedGroupStatus] = useState({ group: null, status: null })
    const [initialConfigurations, setInitialConfigurations] = useImmerState(null)
    const [configurations, setConfigurations] = useImmerState(null)

    const [t] = useTranslation('settings-page')

    useEffect(() => {
        setLoadingGroup(mainGroup)
        const getConfiguration = async () => {
            try {
                const configurationResponse = await ConfigurationApi.getGroup(mainGroup)
                setInitialConfigurations(() => configurationResponse)
                setConfigurations(() => configurationResponse)
            } catch (e) {}
            setLoadingGroup(null)
        }
        getConfiguration()
    }, [mainGroup, setConfigurations, setInitialConfigurations])

    const setConfigurationValue = (key, value, group) => {
        setEditedGroupStatus({ group: null, status: null })
        setEditedGroup(group)
        setConfigurations(draft => {
            const result = draft.find(c => c.key === key)
            if (result) result.value = value
        })
    }

    const grouppedConfigurations = () => Object.entries(groupBy(configurations, 'group'))

    const cancel = () => {
        setEditedGroup(null)
        setConfigurations(() => initialConfigurations)
    }
    const save = async group => {
        setEditedGroup(null)
        setEditedGroupStatus({ group, status: null })
        setLoadingGroup(group)
        try {
            const groupConfigurations = grouppedConfigurations().find(([grp, conf]) => grp === group)[1]
            await ConfigurationApi.updateGroup({ group, configurations: groupConfigurations })

            const configurationResponse = await ConfigurationApi.getGroup(mainGroup)
            setInitialConfigurations(() => configurationResponse)
            setConfigurations(() => configurationResponse)

            setEditedGroupStatus({ group, status: STATUSES.SUCCESS })
        } catch (e) {
            console.error('ERROR', e)
            setEditedGroupStatus({ group, status: STATUSES.FAIL })
            cancel()
        }
        setLoadingGroup(null)
    }
    const CardStatusAlert = ({ group }) => {
        const hide = () => {
            setEditedGroupStatus({ group: null, status: null })
        }
        if (!editedGroupStatus.status || editedGroupStatus.group !== group) return null
        if (editedGroupStatus.status === STATUSES.SUCCESS) return <SuccessCardAlert onHide={hide} />
        else if (editedGroupStatus.status === STATUSES.FAIL) return <FailureCardAlert onHide={hide} />
    }

    if (!configurations) return <LoadingIndicator />

    return (
        <Container className="card-columns">
            {grouppedConfigurations().map(([group, configurations]) => {
                return (
                    <Card key={group}>
                        <Card.Header>
                            <Card.Title>{group}</Card.Title>
                            {editedGroup === group && (
                                <Card.Options>
                                    <PrimaryButton text="Save" onClick={() => save(group)} />
                                    <SecondaryButton text="Cancel" onClick={cancel} />
                                </Card.Options>
                            )}
                        </Card.Header>
                        <CardStatusAlert group={group} />
                        <Card.Body>
                            <Dimmer loader active={groupLoading === group}>
                                {configurations.map(configuration => {
                                    const isCheckbox = configuration.type === SERVER_TYPES.BOOL
                                    let label = configuration.friendlyName
                                        ? configuration.friendlyName
                                        : configuration.key
                                    return (
                                        <Form.Group key={configuration.key} label={isCheckbox ? '' : label}>
                                            <FormElement
                                                name={configuration.key}
                                                value={configuration.value}
                                                label={label}
                                                type={getInputTypeOnConfigurationType(configuration.type)}
                                                isReadOnly={configuration.isReadOnly}
                                                isCheckbox={isCheckbox}
                                                isTextarea={configuration.isTextarea}
                                                isSwitch={true}
                                                helpDescription={configuration.description}
                                                onChange={value =>
                                                    setConfigurationValue(configuration.key, value.toString(), group)
                                                }
                                            />
                                        </Form.Group>
                                    )
                                })}
                            </Dimmer>
                        </Card.Body>
                    </Card>
                )
            })}
            {mainGroup === MAIN_CONFIGURATION_GROUPS.OTHER && <CustomScripts t={t} />}
        </Container>
    )
}

export default SettingsTabContent
