import axios from 'axios'


export const queryGetFunc = async ({ queryKey }) => {

    const axiosGetObj = {
        method: 'get',
        url: `https://rickandmortyapi.com/api/${queryKey[0]}?page=${queryKey[1]}`,
        responseType: 'json'
    }

    return await axios(axiosGetObj).then(resp => resp.data)
}

export const queryPostFunc = async (data) => {

    const axiosPostObj = {
        method: 'post',
        url: 'https://jsonplaceholder.typicode.com/posts',
        responseType: 'json',
        data
    }    
    //не знаю как выводить это после mutate
     axios(axiosPostObj).then(console.log)
    return await axios(axiosPostObj)
}

