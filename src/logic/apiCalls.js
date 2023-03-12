import fetch from 'node-fetch';




const chunkIdsHeaders = {
    accept: 'application/json',
    'Content-Type': 'application/json',
    'X-API-Key': '7c4e87e6-aef8-467a-b43a-4f80147453bf',
}

const chunkDataHeaders = {
    accept: 'application/json',
    'X-API-Key': 'd486a94c-29f4-453a-a822-f909a97dbfa7',
}


const apiCall = async ({url, body, headers, method='GET'}) => {

    // const ChunkIdsReq = JSON.stringify({question: query})

    let response
    try {
        response = body ? await fetch(url, {method: method, body: body, headers: headers}) : await fetch(url, {method: method, headers: headers});
    } catch (error) {
        console.log(error);
    }

    const data = await response.json();

    // console.log(data);
    return data;
}

export const getChunkIds = async (query) => {
    const url = 'https://inference-runner.hw.ask-ai.co/ask'

    return await apiCall({url, body: JSON.stringify({question: query}), headers: chunkIdsHeaders, method: 'POST'})
    //
    // const ChunkIdsReq = JSON.stringify({question: query})
    //
    //
    // let response
    // try {
    //     response = await fetch('https://inference-runner.hw.ask-ai.co/ask', {method: 'POST', body: ChunkIdsReq, headers: chunkIdsHeaders});
    // } catch (error) {
    //     console.log(error);
    // }
    //
    // const data = await response.json();
    //
    // console.log(data);
    // await getChunkData();
    // return data;
}

export const getChunkData = async (chunkId) => {
    const generateTokenUl = 'https://chunk-holder.hw.ask-ai.co/auth/generate-token'
    const chunkData = 'https://chunk-holder.hw.ask-ai.co/chunks'
    const token = await apiCall({url: generateTokenUl, headers:chunkDataHeaders, method: 'POST'})


    const res = await apiCall({url: `${chunkData}/${chunkId}`, headers: {...chunkDataHeaders, Authorization: `${token.token}`}})
    // console.log("res",res);

    return res



    // const ChunkIdsReq = JSON.stringify({question: chunkId})
    //
    //
    // let response
    // try {
    //     response = await fetch('https://chunk-holder.hw.ask-ai.co/auth/generate-token', {method: 'POST', headers: chunkDataHeaders});
    // } catch (error) {
    //     console.log(error);
    // }
    //
    // const data = await response.json();
    //
    // console.log(data);
    // return data;
}

