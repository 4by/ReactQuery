import React, { useState } from 'react';
import axios from 'axios'
import { useQuery } from 'react-query'

const getLink = 'https://rickandmortyapi.com/api/'


export default function Characters() {

    const [pageState, setPageState] = useState(1)

    // query-функция, которая должна возвращать данные для обработки
    const queryFunc = async ({ queryKey }) => {
        const resp = await axios({
            method: 'get',
            url: `${getLink}${queryKey[0]}?page=${queryKey[1]}`,
            responseType: 'json'
        });
        return resp.data;
    }
    //аргументы в query-функцию
    const queryArgs = ['character', pageState]
    //конфигурации самого query-запроса
    // keepPreviousData: хранятся ли данные между перезагрузками сервера
    const queryOpts = {
        keepPreviousData: true,
        retry: false,
    }

    //isPreviousData это поле, содержащее информацию о том загружается ли в данный момент запрос
    // из предыдущих данных (keepPreviousData) или нет (уже загрузился или вообще не пытался)
    const { data, status, isPreviousData } = useQuery(queryArgs, queryFunc, queryOpts)

    //данные с useQuery обновляются в живом режиме
    if (isPreviousData) return <div>loading from cache...</div>
    if (status === 'loading') return <div>loading from server...</div>
    if (status === 'error') return <div>Error</div>

    return (
        <>
            {data.results.map((char, i) => (<div key={i}> {char.name} </div>))}

            <button
                disabled={pageState === 1}
                onClick={() => setPageState(old => --old)}>
                Prev
            </button>

            <button
                disabled={!data.info.next}
                onClick={() => setPageState(old => ++old)}>
                Next
            </button>
        </>
    )
}
