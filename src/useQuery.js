import React, { useState } from 'react';
import { useQuery } from 'react-query'
import { queryGetFunc } from './axios'



export default () => {

    const [pageState, setPageState] = useState(1)

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
    const { data, status, error, isPreviousData } = useQuery(queryArgs, queryGetFunc, queryOpts)

    //данные с useQuery обновляются в живом режиме
    if (isPreviousData) return <div>loading from cache...</div>
    if (status === 'loading') return <div>loading from server...</div>
    if (status === 'error') return <div>Error</div>

    return (
        <>

            <h1>{status === 'error' ? error.message : status}</h1>


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
