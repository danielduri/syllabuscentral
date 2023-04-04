import {Button} from "react-bootstrap";

export const emptyModel = {
    degree: "",
    year: "",
    period: "",
    language: {label: "", value: ""},
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

export const onFocus = () => {
    console.log("onFocus")

}

export const makeRecButton = (rec, appendText) => {
    return (
        //onClick=append button text to textarea
        <Button variant={"outline-secondary"} className={"br-pill ma2"} onClick={()=>appendText()}>{rec}</Button>
    )
}