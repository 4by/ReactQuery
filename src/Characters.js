import React, { useState } from 'react';
import axios from 'axios'
import { useQuery } from 'react-query'


export default function Characters() {

    const fetchChars = async ({ queryKey }) => {

        const resp = await axios({
            method: 'get',
            url: `https://rickandmortyapi.com/api/character?page=${queryKey[1]}`,
            responseType: 'json'
        });
        return resp.data;
    }

    const [pageState, setPageState] = useState(1)

    // некоторые параметры, работающие во время запросов useQuery
    // keepPreviousData: хранятся ли данные между перезагрузками сервера
    const someQueryOpts = { keepPreviousData: true }

    //достаем некоторые данные с useQuery. Они обновляются в живом режиме
    //isPreviousData это поле, содержащее информацию о том загружается ли в данный момент запрос
    // из предыдущих данных (keepPreviousData) или нет (уже загрузился или вообще не пытался)
    const { data, status, isPreviousData } = useQuery(['chars', pageState], fetchChars, someQueryOpts)

    if (status === 'loading') return <div>loading...</div>
    if (status === 'error') return <div>Error</div>

    return (
        <>
            {data.results.map((char, i) => (<div key={i}> {char.name} </div>))}

            <button
                disabled={isPreviousData && pageState === 1}
                onClick={() => setPageState(old => --old)}>
                Prev
            </button>

            <button
                disabled={isPreviousData && !data.info.next}
                onClick={() => setPageState(old => ++old)}>
                Next
            </button>
        </>
    )
}
