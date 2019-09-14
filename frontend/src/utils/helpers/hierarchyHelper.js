export const getHierarchy = hierarchy => {
    if (!hierarchy) return null
    let hierarchyArray = hierarchy.split('#')
    hierarchyArray.pop()
    hierarchyArray.shift()
    return hierarchyArray
}
