import fetch from "isomorphic-unfetch";

let baseUrl = 'http://localhost:3000'

export const login = async (path, data) =>{
    try{
        const res = await postData(baseUrl+path, data)
        return  res
    }catch(e){
        console.log(e)
    }

}


export const register = async (path, data) => {
    try{
        const res = await postData(baseUrl+path, data);
        return res;

    } catch(err){
        console.log(err)
    }
}

export const updateUser = async (path, data ) => {
    try {
        const res = await fetch(baseUrl+path, {
            method: 'PUT',
            body: JSON.stringify(data)
        })

        return await res.json()

    } catch (err){

        console.log(err)

    }
}

async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        // credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        // referrerPolicy: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return await response.json(); // parses JSON response into native JavaScript objects
}


export const apiCaller = (path, options) => {

//    const options = Object.assign(
//        { headers: { 'Content-Type': 'application/json'} },
//        config );

    return fetch(`${baseUrl}${path}`,options)
            .then(res => res.json(),
                error => console.log(error))
    
}
