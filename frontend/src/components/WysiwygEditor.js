import React, { useState, useCallback, useEffect, useRef, useImperativeHandle, forwardRef } from 'react'
import ReactQuill from 'react-quill'
import styled from 'styled-components'
import 'react-quill/dist/quill.snow.css'
import useDebounced from '../hooks/useDebounced'

const WysiwygContainer = styled.div`
    position: relative;
`
const Textarea = styled.textarea`
    position: absolute;
    top: 42px;
    left: 0;
    width: 100%;
    height: 275px;
    ${props => (props.hidden ? 'display:none' : 'display:initial')}
`

const RichTextEditor = styled(ReactQuill)`
    margin-bottom: 16px;
    & .ql-container {
        ${props => `height: ${props.height}px;`};
        overflow-y: scroll;
        resize: vertical;
    }
    & .ql-editor {
        ${props => (props.hidden ? 'display:none' : 'display:initial')}
    }
    & .ql-showHtml {
        width: 100% !important;
        &::after {
            content: '[HTML]';
            display: inline;
            white-space: nowrap;
        }
    }
`

const WysiwygEditor = forwardRef((props, ref) => {
    const [value, setValue] = useState('')
    const [valueHtml, setValueHtml] = useState('')
    const [isRawHtmlView, setRawHtmlView] = useState(false)
    const quillRef = useRef(null)
    const reactQuillRef = useRef(null)

    const { htmlContent, onChange, height = 275 } = props

    const isFirstRun = useRef(true)
    useEffect(() => {
        if (isFirstRun.current) {
            isFirstRun.current = false
            return
        }
    })

    const debouncedHtmlContent = useDebounced(htmlContent, 100)
    useEffect(() => {
        if (debouncedHtmlContent) {
            setValue(debouncedHtmlContent)
            setValueHtml(debouncedHtmlContent)
        }
    }, [debouncedHtmlContent])

    useEffect(() => {
        if (isFirstRun) return
        if (!isRawHtmlView) setValue(valueHtml)
        else setValueHtml(value)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isRawHtmlView])

    useImperativeHandle(ref, text => ({
        insertText(text) {
            if (!reactQuillRef.current) return
            quillRef.current = reactQuillRef.current.getEditor()

            const range = quillRef.current.getSelection()
            const position = range ? range.index : 0
            quillRef.current.insertText(position, text)
        },
    }))

    const setContent = useCallback(
        value => {
            setValue(value)
            if (onChange) onChange(value)
        },
        [onChange],
    )
    const changeView = useCallback(() => {
        setRawHtmlView(!isRawHtmlView)
    }, [isRawHtmlView])

    const modules = {
        toolbar: {
            container: [
                [{ header: [1, 2, 3, 4, false] }],
                [{ font: [] }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ align: [] }, { list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
                [{ color: [] }, { background: [] }],
                ['clean'],
                ['showHtml'],
            ],
            handlers: {
                showHtml: changeView, //TODO
            },
        },
    }

    if (typeof htmlContent === 'undefined') return null
    return (
        <WysiwygContainer>
            <RichTextEditor
                ref={reactQuillRef}
                theme="snow"
                onChange={setContent}
                value={value}
                height={height}
                modules={modules}
            />
            <Textarea
                value={valueHtml}
                hidden={!isRawHtmlView}
                onChange={e => {
                    setValueHtml(e.target.value)
                }}
            />
        </WysiwygContainer>
    )
})

export default WysiwygEditor
