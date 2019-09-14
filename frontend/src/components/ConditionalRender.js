import React from 'react'

const ConditionalRender = props => {
    const { conditionalObject, children } = props
    const _children = React.Children.toArray(props.children).filter(o => o);
    console.log('obj', conditionalObject, children)
    if (!conditionalObject) return null
    return <div>{_children}</div>
}

export default ConditionalRender
