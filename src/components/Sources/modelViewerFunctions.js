export const testShorthand = (sh) => {
    if(sh!==""){
        let regex = /^[\w-_.]*$/;
        return !(sh.length < 2 || sh.length > 5 || !regex.test(sh));
    }else{
        return true
    }
}

export const testCode = (c) => {
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

export const emptyModel = {
    degree: "",
    year: "",
    period: "",
    language: "",
    code: "",
    name: "",
    intlName: "",
    shorthand: "",
    type: "",
    ECTS: "",
    subject: "",
    module: "",
    department: "",
    coordinator: "",
    minContents: "",
    program: "",
    results: "",
    evaluation: "",
    literature: "",
    competences: {
        basic: "",
        general: "",
        specific: ""
    }
}