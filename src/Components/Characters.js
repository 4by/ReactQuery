import React, { useState, useEffect } from 'react';
import axios from 'axios'


export default function Characters() {

    const [chars, setChars] = useState([])

    const fetchCharacters = async () => {

        axios({
            method: 'get',
            url: 'https://rickandmortyapi.com/api/character',
            responseType: 'json'
        })
            .then(resp => setChars(resp.data.results))


    }

    useEffect(() => fetchCharacters(), [])

    return (
        <div>
            {chars.map((char,i) => (
                <div key={i}> {char.name} </div>
            ))}
        </div >
    )
}
