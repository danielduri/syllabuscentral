import {store} from "../../../store";
import {sessionExpired} from "../../../features/user/userSlice";

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

export async function tokenFetch(endpoint, options) {
    const url = `http://192.168.1.26:3001/${endpoint}`
    return fetch(url, updateOptions(options))
        .then(result => result.json())
        .then(json => {
        if (json === "Token Expired") {
            store.dispatch(sessionExpired());
            return;
        }
        return json;
    });
}

//https://stackoverflow.com/questions/44820568/set-default-header-for-every-fetch-request