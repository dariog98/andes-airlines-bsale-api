const snakeToCamel = (string) => {
    return string.toLowerCase().replace(/([-_][a-z])/g, group =>
        group
            .toUpperCase()
            .replace('-', '')
            .replace('_', '')
    )
}

const snakeToCamelObject = (object) => {
    return Object.keys(object).reduce((accumulator, current) => {
        accumulator[snakeToCamel(current)] = object[current]
        return accumulator
    }, {})
}

export { snakeToCamel, snakeToCamelObject }