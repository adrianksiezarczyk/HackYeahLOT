import { useState, useCallback } from 'react'
import produce from 'immer'

const useImmerState = initialState => {
    const [state, setState] = useState(initialState)
    const setImmerState = useCallback(setter => setState(produce(setter)), [])

    return [state, setImmerState]
}

export default useImmerState
