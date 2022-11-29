function updateOptions(options) {
    const update = { ...options };
    if (localStorage.jwtToken) {
        update.headers = {
            ...update.headers,
            Authorization: `Bearer ${localStorage.jwtToken}`,
        };
    }
    return update;
}

export default function tokenFetch(endpoint, options) {
    const url=`http://192.168.1.45:3001/${endpoint}`
    return fetch(url, updateOptions(options));
}

//https://stackoverflow.com/questions/44820568/set-default-header-for-every-fetch-request