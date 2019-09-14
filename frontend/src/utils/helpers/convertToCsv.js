export const convertToCsv = (objArray, ignoreQuotes = false) => {
    const separator = ','
    const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray
    let str = ''
    for (var i = 0; i < array.length; i++) {
        var line = ''
        for (var index in array[i]) {
            if (line !== '') line += separator

            if (ignoreQuotes) line += `${array[i][index]}`
            else line += `"${array[i][index]}"`
        }
        str += line + '\r\n'
    }
    return str
}
