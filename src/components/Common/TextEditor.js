import React, {useEffect, useState} from "react";
import './textEditor.css'
import TextareaAutosize from 'react-textarea-autosize';

export const arrayStringify = (array) => {
    if(Array.isArray(array)){
        let string = ""
        for (const item of array) {
            string = string + '•' + item + '\n'
        }
        return string.trimEnd()
    }
}

export const arrayRegenerate = (string) => {
    const array = string.split('\n')
    let ret = []
    for(const item of array){
        if(item[0]==='•'){
            ret.push(item.substring(1))
        }else{
            ret.push(item)
        }
    }
    return ret;
}

const TextEditor = (props) => {
    const [lineCountCache, setLineCountCache] = useState(0)

    //let defaultValue=useRef("")

    useEffect(()=>{
        if(props.value){
            setLineCountCache(props.value.split("\n").length)
        }
    }, [props.value])


    return(
        <div>
            <p id='lineCounter'> {lineCountCache} </p>
            <TextareaAutosize className={"form-control"} value={props.value} id='codeEditor' wrap='on'
                              onChange={e => {
                                    setLineCountCache(e.target.value.split('\n').length)
                                    props.onChange(e.target.value)
                              }}
                              disabled={props.disabled}
                              placeholder={"Asegúrate que el número de ítems totales que deseas poner es igual al número de líneas mostrado a la izquierda"}></TextareaAutosize>
        </div>
    )
}

export default TextEditor

//https://medium.com/weekly-webtips/enable-line-numbering-to-any-html-textarea-35e15ea320e2