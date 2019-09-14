import React, { useState } from 'react'
import { Grid, Card, Dimmer } from 'tabler-react'
import { PrimaryButton, SecondaryButton } from '../../../components/shared/Button'
import useImmerState from '../../../hooks/useImmerState'
import { debounce } from '../../../utils/helpers/debounce'
import StyleRecords from './styles/StyleRecords'
import PhoneView from './styles/PhoneView'
import ThemeApi from '../../../services/theme/api'
import TakeAlert from '../../../utils/takeAlert'

const Styles = ({ themeKeys, updateInitialStyles, t }) => {
    const [isLoading, setLoading] = useState(false)
    const [isEdited, setEdited] = useState(false)
    const [themeRecords, setTheme] = useImmerState(themeKeys)

    const getThemeValue = key => {
        const record = themeRecords.find(record => record.key === key)
        return record ? record.value : ''
    }

    const updateRecord = (key, value) => {
        setEdited(true)
        setTheme(draft => {
            const result = draft.find(c => c.key === key)
            if (result) result.value = value
        })
    }
    const updateRecordDebounced = debounce(updateRecord, 100)

    const resetTheme = () => {
        setTheme(() => themeKeys)
        setEdited(false)
    }

    const save = async () => {
        setLoading(true)
        try {
            await ThemeApi.updateStyles(themeRecords)
            updateInitialStyles(themeRecords)
            setEdited(false)
        } catch (e) {}
        setLoading(false)
    }
    const restoreDefault = async () => {
        const result = await TakeAlert.fire({
            title: t('are you sure?'),
            text: t('restore default styles'),
            showCancelButton: true,
            cancelButtonText: t('cancel'),
            confirmButtonText: t('restore'),
            type: 'warning',
            allowEscapeKey: true,
            allowOutsideClick: true,
            reverseButtons: true,
        })
        if (result.value) {
            setLoading(true)
            try {
                const response = await ThemeApi.restoreDefaultStyles()
                setTheme(() => response)
                updateInitialStyles(response)
                setEdited(false)
            } catch (e) {}
            setLoading(false)
        }
        if (result.dismiss === 'backdrop' || result.dismiss === 'esc') return
    }

    if (!themeRecords) return null
    return (
        <Card>
            <Card.Header>
                <Card.Title>{t('styles')}</Card.Title>
                <Card.Options>
                    {isEdited ? (
                        <>
                            <PrimaryButton text={t('save')} onClick={save} />
                            <SecondaryButton text={t('cancel')} onClick={resetTheme} />
                        </>
                    ) : (
                        <PrimaryButton text={t('default theme')} onClick={restoreDefault} />
                    )}
                </Card.Options>
            </Card.Header>
            <Card.Body>
                <Grid.Row>
                    <Grid.Col md={6}>
                        <Dimmer loader active={isLoading}>
                            <StyleRecords
                                themeRecords={themeRecords}
                                updateRecord={updateRecord}
                                updateRecordDebounced={updateRecordDebounced}
                            />
                        </Dimmer>
                    </Grid.Col>
                    <Grid.Col md={6}>
                        <PhoneView getThemeValue={getThemeValue} />
                    </Grid.Col>
                </Grid.Row>
            </Card.Body>
        </Card>
    )
}

export default Styles
