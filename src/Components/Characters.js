import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { useQuery } from 'react-query'

export default function Characters() {

    const fetchChars = () => {

      return axios({
            method: 'get',
            url: 'https://rickandmortyapi.com/api/character',
            responseType: 'json'
        })
            .then(resp => resp.data.results)
    }


    const { data, status } = useQuery('chars', fetchChars)

    if (status === 'loading') return <div>loading...</div>

    if (status === 'error') return <div>Error</div>

    return (
        <div>
            {data.map((char, i) => (<div key={i}> {char.name} </div>))}
        </div >
    )
}
