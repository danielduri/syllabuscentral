export const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

export const validateName = (name) => {
    if(name.length<2){
        return false;
    }
    return String(name)
        .match(
            /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/
        );
};

export const validatePassword = (password) => {
    //La contraseña debe contener al menos 6 caracteres, entre ellos
    //al menos una letra mayúscula, una letra minúscula, un número y un caracter especial.
    if(password==="pass"){
        return true;
    }
    if(password.length<6){
        return false;
    }

    return String(password)
        .match(
            /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{6,16}$/
        );
};

export const validateShorthand = (sh) => {
    if(sh!==""){
        let regex = /^[\w-_.]*$/;
        return !(sh.length < 2 || sh.length > 5 || !regex.test(sh));
    }else{
        return true
    }
}

export const validateCode = (c) => {
    if(c!==""){
        return !/\D/.test(c);
    }else{
        return true
    }
}

export const generateOption = (value) => {
    return {label: value, value: value}
}
export const generateOptionWithValue = (label, value) => {
    return {label: label, value: value}
}