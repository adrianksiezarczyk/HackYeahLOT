import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Icon } from 'tabler-react'
import { getHierarchy } from '../utils/helpers/hierarchyHelper'
import { useTranslation } from 'react-i18next'

const TreeItem = styled.li`
    padding: 0 !important;
    display: flex !important;
    justify-content: space-between;
    align-items: center;
    ${props => (props.disabled ? `cursor: unset` : `cursor: pointer`)};
`

const TreeItemName = styled.span`
    padding: 0.75em;
    line-height: 1;
    ${props => props.bold && 'font-weight: bold'}
`

const TreeItemIcon = styled(Icon)`
    padding: 0.75em;
    border-left: 1px solid rgba(0, 40, 100, 0.12);
    ${props =>
        props.reverse &&
        `
        border-left: unset;
        border-right: 1px solid rgba(0, 40, 100, 0.12);
    `}
    ${props => props.clickable && `cursor: pointer`}
`

const CategoryTree = props => {
    const {
        data,
        async,
        getChildren,
        expandedCategory,
        expandCategory,
        clearCategory,
        noItemsComponent,
        isShopCategory,
    } = props
    const [children, setChildren] = useState([])
    const [t] = useTranslation('products-page')

    useEffect(() => {
        const getNodesAsync = async () => {
            try {
                const cats = await getChildren(expandedCategory.id)
                setChildren(cats)
            } catch (error) {
                console.error(error)
                setChildren([])
            }
        }

        if (async && !data && expandedCategory && expandedCategory.hasChildren) getNodesAsync()
    }, [async, data, expandedCategory, getChildren])

    let treeData = data ? (Array.isArray(data) ? data : data.nodes) : children
    if (!treeData) return null

    const getParentCategory = async () => {
        const hierarchy = getHierarchy(expandedCategory.hierarchy)
        const findParentId = hierarchy[hierarchy.length - 3]
        const parentId = hierarchy[hierarchy.length - 2]
        const cats = await getChildren(findParentId)
        const newExpanded = cats.find(c => Number(c.id) === Number(parentId))
        expandCategory(newExpanded)
    }

    return (
        <>
            <ul className="list-group list-group-flush">
                {treeData.length === 0 && expandedCategory.id === null && (
                    <TreeItem disabled>
                        <TreeItemName>{noItemsComponent}</TreeItemName>
                    </TreeItem>
                )}
                <TreeItem disabled className="list-group-item">
                    <TreeItemIcon
                        onClick={async () => {
                            let hierarchy = getHierarchy(expandedCategory.hierarchy)
                            if (!hierarchy || hierarchy.length === 1) return clearCategory()
                            return await getParentCategory()
                        }}
                        reverse
                        clickable
                        name={
                            !expandedCategory.parentCategoryName ? (!isShopCategory ? 'x' : 'filter') : 'chevron-left'
                        }
                    />
                    <TreeItemName>
                        {expandedCategory.name || (isShopCategory ? '' : <>{t('clear-filter')}</>)}
                    </TreeItemName>
                </TreeItem>
                {treeData.map(node => (
                    <TreeItem className="list-group-item" key={node.id} onClick={() => expandCategory(node)}>
                        <TreeItemName bold={!expandedCategory.hasChildren && expandedCategory.id === node.id}>
                            {node.name}
                        </TreeItemName>
                        {node.hasChildren && <TreeItemIcon name="chevron-right" />}
                    </TreeItem>
                ))}
            </ul>
        </>
    )
}

export default CategoryTree
