import React, { useEffect } from 'react'
import { Form } from 'tabler-react'
import { connect } from 'react-redux'

const LanguageSelect = ({ languages, getLanguages, onChange, defaultValue }) => {
    useEffect(() => {
        if (languages && languages.length) return
        const _getLanguages = async () => {
            await getLanguages()
        }
        _getLanguages()
    }, [getLanguages, languages])

    if (!languages || !languages.length) return null
    return (
        <Form.Select onChange={onChange} defaultValue={defaultValue}>
            {languages.map(language => {
                return (
                    <option key={language.id} value={language.id}>
                        {language.name}
                    </option>
                )
            })}
        </Form.Select>
    )
}
export default connect(
    state => ({
        languages: state.common.languages,
    }),
    dispatch => ({
        getLanguages: dispatch.common.getLanguages,
    }),
)(LanguageSelect)
