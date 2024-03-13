import axios from "axios";

// Roltec
export const ENDPOINT = "http://localhost:4000/api/v1/";
export const FILES_ENDPOINT = "http://localhost:4000";

// DEV
// export const ENDPOINT = "http://137.184.87.110:80/api/";
// export const FILES_ENDPOINT = "https://137.184.87.110:80";

// export const ENDPOINT = "http://localhost:4000/api/";




const requestFunction = async (method, url, body) => {
    const headers =  { 'Content-Type': 'application/json' }
    const options = {
        method,
        url,
        data: JSON.stringify(body || {}),
        headers
    }
    console.log("options====>",options)
    // console.log("respon del servidor",method,url,JSON.stringify( body) )
    try {
        const response = await axios(options);
        console.log("respon del servidor", response)
        return { error: false, data: response.data };
    } catch (error) {
        console.log("respon del servidor error", error.response.data)
        let errorMessages = [];
        const errors = error.response.data;
        for (let error in errors) {
            if (Array.isArray(errors[error])) {
                errorMessages.push(`${errors[error][0]}, `);
            } else {
                errorMessages.push(`${errors[error]}, `);
            }
        }
        throw { error: true, data: "".concat(errorMessages) }
    }
};


// //Prospectos
export const getProspectos = async () => {
    return await requestFunction('get', `${ENDPOINT}prospectos`);
}

export const getProspecto = async (id) => {
    return await requestFunction('get', `${ENDPOINT}prospectos/${id}`);
}

export const updateProspecto = async (prospecto, id) => {
    return await requestFunction('put', `${ENDPOINT}prospectos/${id}`, prospecto)
}
export const newProspecto = async (prospecto) => {
    return await requestFunction('post', `${ENDPOINT}prospectos`, prospecto)
}


export const getStatuses = async () => {
    return await requestFunction('get', `${ENDPOINT}statuses`);
}
