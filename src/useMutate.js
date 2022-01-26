import React, { useState } from 'react';
import { useMutation } from 'react-query'
import {queryPostFunc } from './axios'



export default () => {

    const [valueState, setValueState] = useState('')
    const { mutate, status, error } = useMutation(queryPostFunc)

    const sendMutation = e => {
        e.preventDefault()
        mutate( {valueState} )
    }

    return (
        <>
            <h1>{status === 'error' ? error.message : status}</h1>
            <form onSubmit={sendMutation}>
                <input
                    type="text"
                    value={valueState}
                    onChange={e => setValueState(e.target.value)}
                />
                <button type="submit">Create Todo</button>
            </form>
        </>
    )
}





