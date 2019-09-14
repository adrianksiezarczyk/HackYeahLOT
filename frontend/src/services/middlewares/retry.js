const retry = ({ delayTimer = 500, maxAttempts = 3 } = {}) => {
    return next => (url, opts) => {
        let numberOfAttemptsMade = 0

        const checkStatus = response => {
            if (!response.clone().ok && response.status >= 500) {
                numberOfAttemptsMade++

                if (!maxAttempts || numberOfAttemptsMade <= maxAttempts) {
                    return new Promise(resolve => {
                        const delay = delayTimer * numberOfAttemptsMade
                        setTimeout(() => {
                            resolve(next(url, opts))
                        }, delay)
                    }).then(checkStatus)
                }
            }
            return response
        }
        return next(url, opts).then(checkStatus)
    }
}

export default retry
