import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { useQuery } from 'react-query'

export default function Characters() {

    const fetchChars = async () => {

        axios({
            method: 'get',
            url: 'https://rickandmortyapi.com/api/character',
            responseType: 'json'
        })
            .then(data => { return data })
    }


    const { data, status } = useQuery('chars', fetchChars)

    if (status === 'loading') return <div>loading...</div>

    if (status === 'error') return <div>Error</div>



    return (
        <div>
            {console.log(fetchChars())}
            {/* {data.map((char, i) => (<div key={i}> {char.name} </div>))} */}
        </div >
    )
}
