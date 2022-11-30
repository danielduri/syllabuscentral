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

export function tokenFetch(endpoint, options) {
    const url=`http://192.168.1.45:3001/${endpoint}`
    return fetch(url, updateOptions(options));
}

export function tokenFetch2(endpoint, options) {
    const url=`http://192.168.1.45:3001/${endpoint}`
    let result = fetch(url, updateOptions(options));
    result = result.json();
    if(result==="Token Expired"){
        store.dispatch(sessionExpired());
        return;
    }
    return result;

}

//https://stackoverflow.com/questions/44820568/set-default-header-for-every-fetch-request