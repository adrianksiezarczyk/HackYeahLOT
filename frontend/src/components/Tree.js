import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Icon } from 'tabler-react'
import { isArray } from 'util'
import Button from './shared/Button'
import { useTranslation } from 'react-i18next'

const TreeItem = styled.li`
    padding-top: 0.25em !important;
    padding-bottom: 0.25em !important;
    padding-left: 0 !important;
    padding-right: 0 !important;
`

const TreeItemName = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const TreeItemList = styled.ul`
    padding-top: 0.25em !important;
    padding-bottom: 0em !important;
    padding-left: 0 !important;
    padding-right: 0 !important;
    margin-left: 2em;
`

const Node = ({ async, ...props }) => {
    const [t] = useTranslation('products-page')
    const [expanded, setExpanded] = useState(false)
    const [children, setChildren] = useState([])
    const { hasChildren, nodes, getChildren } = props
    let nodeHasChildren = typeof hasChildren === 'undefined' ? nodes && nodes.length > 0 : hasChildren
    let childNodes = async ? children : nodes

    useEffect(() => {
        const getNodesAsync = async () => {
            try {
                const cats = await getChildren(props.id)
                setChildren(cats)
            } catch (error) {
                console.error(error)
                setChildren([])
            }
        }

        if (async && nodeHasChildren) {
            getNodesAsync()
        }
    }, [async, getChildren, nodeHasChildren, props.id])

    return (
        <TreeItem className="list-group-item">
            <TreeItemName>
                <span style={{ cursor: 'pointer' }} onClick={() => setExpanded(!expanded)}>
                    {props.name}{' '}
                    {hasChildren && (
                        <span>
                            <Icon name={expanded ? `chevron-up` : `chevron-down`} />
                        </span>
                    )}
                </span>
                <Button
                    disabled={props.id === props.shopCategoryId}
                    size="sm"
                    color="primary"
                    onClick={() =>
                        props.setProductInfo(draft => {
                            draft.shopCategoryId = props.id
                        })
                    }>
                    {t('set')}
                </Button>
            </TreeItemName>
            {expanded && hasChildren && childNodes && childNodes.length > 0 && (
                <TreeItemList>
                    {childNodes.map(n => (
                        <Node key={n.id} async={async} getChildren={getChildren} {...props} {...n} />
                    ))}
                </TreeItemList>
            )}
        </TreeItem>
    )
}

const SyncTree = ({ data, ...props }) => {
    const isObjectWithNodes = data.nodes && isArray(data.nodes) && data.nodes.length > 0
    if (isArray(data)) return data.map(node => <Node key={node.id} async={false} {...node} />)
    else if (isObjectWithNodes) return data.nodes.map(node => <Node key={node.id} async={false} {...node} {...props} />)
    else return null
}

const AsyncTree = ({ data, getChildren, ...props }) => {
    const isObjectWithNodes = data && data.nodes && isArray(data.nodes) && data.nodes.length > 0
    if (isArray(data))
        return (
            <ul className="list-group list-group-flush">
                {data.map(node => (
                    <Node key={node.id} async getChildren={getChildren} {...props} {...node} />
                ))}
            </ul>
        )
    else if (isObjectWithNodes)
        return (
            <ul className="list-group list-group-flush">
                {data.nodes.map(node => (
                    <Node key={node.id} async getChildren={getChildren} {...props} {...node} />
                ))}
            </ul>
        )
    else return null
}

const Tree = ({ data, nodeId, getChildren, async, ...props }) => {
    const [children, setChildren] = useState([])
    useEffect(() => {
        const getNodesAsync = async () => {
            try {
                const cats = await getChildren(nodeId)
                setChildren(cats)
            } catch (error) {
                console.error(error)
                setChildren([])
            }
        }

        if (async && !data) {
            getNodesAsync()
        }
    }, [async, data, getChildren, nodeId])

    let treeData = data ? data : children

    if (!async) return <SyncTree data={treeData} {...props} />
    else return <AsyncTree data={treeData} getChildren={getChildren} {...props} />
}
/*
DATA SHOULD BE ARRAY OF NODES:
{
    NAME: STRING,
    NODES: ARRAY<NODE>
}

OR OBJECT WITH CHILD NODES:
{
    NODES: ARRAY<NODE>
}

GETCHILDREN SHOULD BE FUNCTION THAT GETS NODE ID AND RETURNS ARRAY OF NODES
*/
export default Tree
