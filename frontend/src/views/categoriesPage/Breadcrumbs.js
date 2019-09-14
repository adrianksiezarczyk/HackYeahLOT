import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Icon } from 'tabler-react'

const BreadCrumbItem = styled.li`
    cursor: ${props => (props.active ? 'default' : 'pointer')};
    ${props => props.active && `pointer-events: none`};
`

const Breadcrumbs = ({ currentCategory, setCurrentCategory }) => {
    const [categories, setCategories] = useState([])

    const pushCategory = useCallback(() => setCategories(old => old.concat(currentCategory)), [currentCategory])

    const sliceCategories = useCallback(
        cat => {
            const newCategoryInHistoryIndex = categories.findIndex(c => c.id === cat.id)
            if (newCategoryInHistoryIndex > -1) {
                const sliced = categories.slice(0, newCategoryInHistoryIndex)
                setCategories(sliced)
            }
        },
        [categories],
    )

    useEffect(() => {
        if (!currentCategory.id) {
            setCategories([])
        } else pushCategory()
    }, [currentCategory.id, pushCategory])

    return (
        <nav>
            <ol className="breadcrumb">
                <li className={`breadcrumb-item ${!currentCategory.name && 'active'}`}>
                    <Icon link name="home" onClick={() => setCurrentCategory({ id: null, name: '', hierarchy: '' })} />
                </li>
                {categories &&
                    categories.map((cat, i) => {
                        return (
                            <BreadCrumbItem
                                active={i === categories.length - 1}
                                onClick={() => {
                                    setCurrentCategory(cat)
                                    sliceCategories(cat)
                                }}
                                className={`breadcrumb-item ${i === categories.length - 1 && 'active'}`}>
                                {cat.name}
                            </BreadCrumbItem>
                        )
                    })}
            </ol>
        </nav>
    )
}

export default Breadcrumbs
