/*
 * @Author: your name
 * @Date: 2020-04-02 15:17:55
 * @LastEditTime: 2020-04-02 15:20:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /platform/src/hooks/useRefState.ts
 */
import { useState, useRef, useCallback } from 'react'

export default function useRefState(initialState:any) {
    const ins = useRef()

    const [state, setState] = useState(() => {
        // 初始化
        const value = typeof initialState === 'function' ? initialState() : initialState
        ins.current = value
        return value
    })

    const setValue = useCallback(value => {
        if (typeof value === 'function') {
            setState((prevState:any) => {
                const finalValue = value(prevState)
                ins.current = finalValue
                return finalValue
            })
        } else {
            ins.current = value
            setState(value)
        }
    }, [])

    return [state, setValue, ins]
}

