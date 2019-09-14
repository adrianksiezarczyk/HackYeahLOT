import React from 'react'
import styled from 'styled-components'
import { Form, Icon } from 'tabler-react'
import { getLanguage, setLanguage } from '../../../utils/l10n'
import { useTranslation } from 'react-i18next'
import { ALLOWED_LANGUAGE_CODES } from '../../../constants'

const LanguageSelectWrapper = styled.div`
    .form-group {
        margin-bottom: 0 !important;
    }
`

const LanguageSelectItem = styled(Form.SelectGroupItem)`
    :hover {
        color: #16181b;
        text-decoration: none;
        background-color: #f8f9fa;
    }
`

const LanguageSelect = () => {
    const { i18n } = useTranslation()

    const changeLanguage = lng => {
        setLanguage(lng)
        i18n.changeLanguage(lng)
    }

    return (
        <LanguageSelectWrapper>
            <Form.Group>
                <Form.SelectGroup>
                    <LanguageSelectItem
                        label={<Icon prefix="flag" name="pl" />}
                        checked={ALLOWED_LANGUAGE_CODES.PL === getLanguage()}
                        value={ALLOWED_LANGUAGE_CODES.PL}
                        onChange={() => changeLanguage(ALLOWED_LANGUAGE_CODES.PL)}
                    />
                    <LanguageSelectItem
                        label={<Icon prefix="flag" name="gb" />}
                        checked={ALLOWED_LANGUAGE_CODES.EN === getLanguage()}
                        value={ALLOWED_LANGUAGE_CODES.EN}
                        onChange={() => changeLanguage(ALLOWED_LANGUAGE_CODES.EN)}
                    />
                    <LanguageSelectItem
                        label={<Icon prefix="flag" name="cn" />}
                        checked={ALLOWED_LANGUAGE_CODES.ZH === getLanguage()}
                        value={ALLOWED_LANGUAGE_CODES.ZH}
                        onChange={() => changeLanguage(ALLOWED_LANGUAGE_CODES.ZH)}
                    />
                </Form.SelectGroup>
            </Form.Group>
        </LanguageSelectWrapper>
    )
}

export default LanguageSelect
