export const errorHandler = (status, message) => {
    const error = new Error()
    error.status = status
    error.message = message
    error.success = false
    return error
}