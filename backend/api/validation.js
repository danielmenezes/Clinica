module.exports = app => {

    const existsOrError = (value, msg) => {
        if(!value) throw msg
        if(Array.isArray(value) && value.length === 0) throw msg
        if(typeof value === 'string' && !value.trim()) throw msg
    }

    const notExistsOrError = (value, msg) => {
        if(value) throw msg
        if(Array.isArray(value) && value.length !== 0) throw msg
        if(typeof value === 'string' && value.trim()) throw msg
    }

    const equalsOrError = (value1, value2, msg) => {
        if(value1 !== value2) throw msg
    }



    return { existsOrError, notExistsOrError, equalsOrError }
}