/* eslint-disable react-hooks/exhaustive-deps */
// noinspection DuplicatedCode

import {Accordion, Button, Form, Modal, OverlayTrigger, Popover, Spinner} from "react-bootstrap";
import '../Modal.css'
import React, {useEffect, useRef, useState} from "react";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import {arrayRegenerate, arrayStringify} from "../Common/TextEditor";
import TextareaAutosize from "react-textarea-autosize";
import {tokenFetch} from "../Common/functions/tokenFetch";
import {useSelector} from "react-redux";
import {emptyModel} from "./courseViewerFunctions";
import {ECTSoptions, languageOptions, periodOptions, typeOptions} from "./courseViewerOptions";
import {generateOption, generateOptionWithValue, validateCode, validateShorthand} from "../Common/functions/misc";
import ReactSwitch from "react-switch";

export function CourseViewer(props) {

    //region state declarations
    const modalRef = useRef();

    const [edit, setEdit]=useState(false)

    /*
    in view, all fields are disabled and has props.model
        Buttons: edit/OK

    in edit, all fields are enabled and has props.model
    validate is similar to edit but props.model is given by the API
    copy is similar to edit but some fields are cleared
        Buttons: delete/save/cancel

    in create, all fields are enabled and uses emptyModel
        Buttons: save/cancel

     */

    const [degree, setDegree] = useState(generateOption(""));
    const [invalidDegree, setInvalidDegree] = useState(false);

    const [year, setYear] = useState(generateOption(""));
    const [invalidYears, setInvalidYears] = useState(false);

    const [period, setPeriod] = useState(generateOption(""));
    const [invalidPeriod, setInvalidPeriod] = useState(false);

    const [language, setLanguage] = useState({label: 'Español', value: 'Español'});
    const [invalidLanguage, setInvalidLanguage] = useState(false);

    const [code, setCode] = useState("");
    const [invalidCode, setInvalidCode] = useState(false);
    const [codeIsEditable, setCodeIsEditable] = useState(false);
    const [codeFeedback, setCodeFeedback] = useState("El código debe ser numérico");

    const [courseName, setCourseName] = useState("");
    const [invalidCourseName, setInvalidCourseName] = useState(false);

    const [intlName, setIntlName] = useState("");
    const [invalidIntlName, setInvalidIntlName] = useState(false);
    const [recIntlName, setRecIntlName] = useState([]);

    const [shorthand, setShorthand] = useState("");
    const [invalidShorthand, setInvalidShorthand] = useState(false);

    const [subject, setSubject] = useState("");
    const [invalidSubject, setInvalidSubject] = useState(false);

    const [type, setType] = useState("");
    const [invalidType, setInvalidType] = useState(false);

    const [ECTS, setECTS] = useState("");
    const [invalidECTS, setInvalidECTS] = useState(false);

    const [module, setModule] = useState("");
    const [invalidModule, setInvalidModule] = useState(false);

    const [department, setDepartment] = useState("");
    const [invalidDepartment, setInvalidDepartment] = useState(false);

    const [coordinator, setCoordinator] = useState("");
    const [invalidCoordinator, setInvalidCoordinator] = useState(false);

    const [minContents, setMinContents] = useState("");
    const [invalidMinContents, setInvalidMinContents] = useState(false);
    const [recMinContents, setRecMinContents] = useState([]);

    const [program, setProgram] = useState("");
    const [invalidProgram, setInvalidProgram] = useState(false);
    const [recProgram, setRecProgram] = useState([]);

    const [competencesBasic, setCompetencesBasic] = useState("");
    const [invalidCompetencesBasic, setInvalidCompetencesBasic] = useState(false);
    const [recCompetencesBasic, setRecCompetencesBasic] = useState([]);

    const [competencesGeneral, setCompetencesGeneral] = useState("");
    const [invalidCompetencesGeneral, setInvalidCompetencesGeneral] = useState(false);
    const [recCompetencesGeneral, setRecCompetencesGeneral] = useState([]);

    const [competencesSpecific, setCompetencesSpecific] = useState("");
    const [invalidCompetencesSpecific, setInvalidCompetencesSpecific] = useState(false);
    const [recCompetencesSpecific, setRecCompetencesSpecific] = useState([]);

    const [results, setResults] = useState("");
    const [invalidResults, setInvalidResults] = useState(false);
    const [recResults, setRecResults] = useState([]);

    const [evaluation, setEvaluation] = useState("");
    const [invalidEvaluation, setInvalidEvaluation] = useState(false);
    const [recEvaluation, setRecEvaluation] = useState([]);

    const [literature, setLiterature] = useState("");
    const [invalidLiterature, setInvalidLiterature] = useState(false);
    const [recLiterature, setRecLiterature] = useState([]);

    const [enableEditButton, setEnableEditButton] = useState(false);
    const [enableDeleteButton, setEnableDeleteButton] = useState(false);

    const [departmentOptions, setDepartmentOptions] = useState([])
    const [degreeOptions, setDegreeOptions] = useState([])

    const [yearOptions, setYearOptions] = useState([])
    const [moduleOptions, setModuleOptions] = useState([])
    const [subjectOptions, setSubjectOptions] = useState([])
    const [coordinatorOptions, setCoordinatorOptions] = useState([])

    const [recsActive, setRecsActive] = useState(false);
    const [cost, setCost] = useState(0)
    //endregion

    //region useEffect hooks

    useEffect( () => {
        init();
    }, [props.show])

    useEffect(()=>{
        if (validateCode(code)){
            setInvalidCode(false)
        }else{
            setInvalidCode(true)
        }
    },[code])

    useEffect(()=>{
        if (validateShorthand(shorthand)){
            setInvalidShorthand(false)
        }else {
            setInvalidShorthand(true)
        }
    },[shorthand])
    //endregion

    const user = useSelector ((state) => state.user)

    const scrollToTop = () => {
        modalRef.current?.scrollIntoView({ block:'nearest', behavior:'smooth' });
    }

    function clearFeedback() {
        setInvalidDegree(false)
        setInvalidYears(false)
        setInvalidPeriod(false)
        setInvalidLanguage(false)
        setInvalidCode(false)
        setInvalidCourseName(false)
        setInvalidIntlName(false)
        setInvalidShorthand(false)
        setInvalidSubject(false)
        setInvalidType(false)
        setInvalidECTS(false)
        setInvalidModule(false)
        setInvalidDepartment(false)
        setInvalidCoordinator(false)
        setInvalidMinContents(false)
        setInvalidProgram(false)
        setInvalidCompetencesBasic(false)
        setInvalidCompetencesGeneral(false)
        setInvalidCompetencesSpecific(false)
        setInvalidResults(false)
        setInvalidEvaluation(false)
        setInvalidLiterature(false)
    }

    function clearRecommendations() {
        setRecsActive(false)
        setRecIntlName([])
        setRecMinContents([])
        setRecProgram([])
        setRecCompetencesBasic([])
        setRecCompetencesGeneral([])
        setRecCompetencesSpecific([])
        setRecResults([])
        setRecEvaluation([])
        setRecLiterature([])
        setCost(0)
    }

    const init = () => {
        if (props.show) {
            clearFeedback();
            clearRecommendations();
            if(props.mode==="create"){
                setEdit(true)
                setRecsActive(true)
                setCodeIsEditable(true)
                loadData(true).then(r => null)
            }else if(props.mode==="edit"){
                setEdit(true)
                setRecsActive(true)
                loadData(true).then(r => null)
            }else if(props.mode==="copy" || props.mode==="validate"){
                setEdit(true)
                loadData(true).then(() => {})
                setCodeIsEditable(true)
            } else {
                setEdit(false)
                loadModel(false).then(r => null)
            }
        }
    }

    function toggleEdit() {
        scrollToTop();
        loadData(true).then(r => {
            setEdit(!edit);
        })
    }

    async function loadData(editing){
        let degOp = []
        let depOp = []

        await tokenFetch('modelViewer', {
            method: 'put',
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({
                reqType: "initial",
            })
        }).then(res => {
            for (const resElement of res.degrees) {
                degOp.push(generateOptionWithValue(resElement.degreeDisplayName, resElement.degreeID))
            }
            for (const resElement of res.departments) {
                depOp.push(generateOptionWithValue(resElement.departmentName, resElement.departmentID))
            }
            setDegreeOptions(degOp)
            setDepartmentOptions(depOp)
            loadModel(editing)
        })
    }

    async function prepareModel(model, editing) {
        let readyModel = JSON.parse(JSON.stringify(model))
        readyModel.ECTS = generateOption(Number.parseFloat(model.ECTS))
        readyModel.language = generateOption(model.language)
        if (Number.parseInt(model.period) > 0) {
            readyModel.period = generateOption(model.period)
        } else {
            readyModel.period = generateOptionWithValue("Ninguno", 0)
        }
        if (Number.parseInt(model.year) === 0) {
            readyModel.year = generateOptionWithValue(`Optativas`, 0)
        } else if (Number.parseInt(model.year) > 0) {
            readyModel.year = generateOptionWithValue(`${model.year}º`, model.year)
        } else {
            readyModel.year = null
        }
        readyModel.type = generateOption(model.type)
        //TODO: include evaluation
        readyModel.evaluation = arrayStringify(model.evaluation)
        readyModel.minContents = arrayStringify(model.minContents)
        readyModel.program = arrayStringify(model.program)
        readyModel.results = arrayStringify(model.results)
        readyModel.literature = arrayStringify(model.literature)

        const comp = JSON.parse(model.competences)
        readyModel.competences = {
            basic: arrayStringify(comp.basic),
            general: arrayStringify(comp.general),
            specific: arrayStringify(comp.specific)
        }
        //readyModel.competences.basic = arrayStringify(comp.basic)
        //readyModel.competences.general = arrayStringify(comp.general)
        //readyModel.competences.specific = arrayStringify(comp.specific)

        if(!editing){
            readyModel.degree=generateOption(model.degree)
            readyModel.department=generateOption(model.department)
            readyModel.module=generateOption(model.module)
            readyModel.subject=generateOption(model.subject)
            readyModel.coordinator=generateOption(model.coordinator)
        }else{
            await tokenFetch('modelViewer', {
                method: 'put',
                headers: {"Content-type": "application/json"},
                body: JSON.stringify({
                    reqType: "model",
                    degree: model.degree,
                    department: model.department,
                    module: model.module,
                    subject: model.subject,
                    coordinator: model.coordinator

                })
            }).then(res => {
                if(res.degree){
                    readyModel.degree = generateOptionWithValue(res.degree.degreeDisplayName, res.degree.degreeID)
                    populateDegreeOptions(res)
                }else{
                    readyModel.degree = emptyModel.degree
                }

                if(res.department){
                    readyModel.department = generateOptionWithValue(model.department, res.department)
                    populateDepartmentUsers(res)
                }else{
                    readyModel.department = emptyModel.department
                }

                if(res.coordinator){
                    readyModel.coordinator = generateOptionWithValue(model.coordinator, res.coordinator.userID)
                }else{
                    readyModel.coordinator = emptyModel.coordinator
                }

                if(res.moduleID){
                    readyModel.module = generateOptionWithValue(model.module, res.moduleID)
                }else{
                    readyModel.module = generateOption(model.module)
                }

                if(res.subjectID){
                    readyModel.subject = generateOptionWithValue(model.subject, res.subjectID)
                }else{
                    readyModel.subject = generateOption(model.subject)
                }

            })
        }

        return readyModel

    }

    async function loadModel(editing) {
        let model = emptyModel
        if (props.model !== undefined) {
            await prepareModel(props.model, editing).then(result => {
                model = result;
            })
        }
        setPeriod(model.period)
        setLanguage(model.language)
        setCourseName(model.name)
        setIntlName(model.intlName)
        setShorthand(model.shorthand)
        setType(model.type)
        setECTS(model.ECTS)
        setDepartment(model.department)
        setCoordinator(model.coordinator)
        setMinContents(model.minContents)
        setProgram(model.program)
        setResults(model.results)
        setEvaluation(model.evaluation)
        setLiterature(model.literature)
        setCompetencesBasic(model.competences.basic)
        setCompetencesGeneral(model.competences.general)
        setCompetencesSpecific(model.competences.specific)
        if(props.mode==="copy"){
            setDegree(emptyModel.degree)
            setYear(emptyModel.degree)
            setCode(emptyModel.degree)
            setModule(emptyModel.module)
            setSubject(emptyModel.subject)
        }else{
            setDegree(model.degree)
            setYear(model.year)
            setCode(model.code)
            setModule(model.module)
            setSubject(model.subject)
        }
        if(user.userInfo.userType>=1 || model.coordinator.label===user.userInfo.userName){
            setEnableEditButton(true);
            setEnableDeleteButton(true);
        }
    }

    function validateForm(){

        let submit=true

        if(degree===null || degree===undefined || degree.value===null || !Number.isInteger(degree.value)){
            setInvalidDegree(true)
            submit=false
        }else{
            setInvalidDegree(false)
        }

        if(year===null || year===undefined || year.value===null || !Number.isInteger(year.value)){
            setInvalidYears(true)
            submit=false
        }else{
            setInvalidYears(false)
        }

        if(period===null || period===undefined || period.value===null || !Number.isInteger(period.value)){
            setInvalidPeriod(true)
            submit=false
        }else{
            setInvalidPeriod(false)
        }

        if(language===null || language===undefined || language.value===null || language.value===""){
            setInvalidLanguage(true)
            submit=false
        }else{
            setInvalidLanguage(false)
        }

        if(code==="" || !Number.parseInt(code) || !validateCode(code)){
            setInvalidCode(true)
            submit=false
        }else{
            setInvalidCode(false)
        }

        if(courseName===undefined || courseName===""){
            setInvalidCourseName(true)
            submit=false
        }else{
            setInvalidCourseName(false)
        }

        if(intlName===undefined || intlName===""){
            setInvalidIntlName(true)
            submit=false
        }else{
            setInvalidIntlName(false)
        }

        if(shorthand===undefined || shorthand==="" || !validateShorthand(shorthand)){
            setInvalidShorthand(true)
            submit=false
        }else{
            setInvalidShorthand(false)
        }

        if(type===null || type===undefined || type.value===""){
            setInvalidType(true)
            submit=false
        }else{
            setInvalidType(false)
        }

        if(ECTS===null || ECTS===undefined || !Number.parseFloat(ECTS.value)){
            setInvalidECTS(true)
            submit=false
        }else{
            setInvalidECTS(false)
        }

        if(subject===null || subject===undefined || subject.value===""){
            setInvalidSubject(true)
            submit=false
        }else{
            setInvalidSubject(false)
        }

        if(module===null || module===undefined || module.value===""){
            setInvalidModule(true)
            submit=false
        }else{
            setInvalidModule(false)
        }

        if(department===null || department===undefined || !Number.isInteger(department.value)){
            setInvalidDepartment(true)
            submit=false
        }else{
            setInvalidDepartment(false)
        }

        if(coordinator===null || coordinator===undefined || !Number.isInteger(coordinator.value)){
            setInvalidCoordinator(true)
            submit=false
        }else{
            setInvalidCoordinator(false)
        }

        if(minContents===undefined || !minContents.trim()){
            setInvalidMinContents(true)
            submit=false
        }else{
            setInvalidMinContents(false)
        }

        if(program===undefined || !program.trim()){
            setInvalidProgram(true)
            submit=false
        }else{
            setInvalidProgram(false)
        }

        if(results===undefined || !results.trim()){
            setInvalidResults(true)
            submit=false
        }else{
            setInvalidResults(false)
        }

        if(evaluation===undefined || !evaluation.trim()){
            setInvalidEvaluation(true)
            submit=false
        }else{
            setInvalidEvaluation(false)
        }

        if(literature===undefined || !literature.trim()){
            setInvalidLiterature(true)
            submit=false
        }else{
            setInvalidLiterature(false)
        }

        if(competencesBasic===undefined || !competencesBasic.trim()){
            setInvalidCompetencesBasic(true)
            submit=false
        }else{
            setInvalidCompetencesBasic(false)
        }

        if(competencesGeneral===undefined || !competencesGeneral.trim()){
            setInvalidCompetencesGeneral(true)
            submit=false
        }else{
            setInvalidCompetencesGeneral(false)
        }

        if(competencesSpecific===undefined || !competencesSpecific.trim()){
            setInvalidCompetencesSpecific(true)
            submit=false
        }else{
            setInvalidCompetencesSpecific(false)
        }

        return submit
    }

    const handleSubmit = () => {
        if(validateForm()){
            const newModel = {
                degree: degree.value,
                year: year.value,
                period: period.value,
                language: language.value,
                code: code,
                name: courseName,
                intlName: intlName,
                shorthand: shorthand,
                type: type.value,
                ECTS: ECTS.value,
                subject: subject.value,
                module: module.value,
                department: department.value,
                coordinator: coordinator.value,
                minContents: arrayRegenerate(minContents),
                program: arrayRegenerate(program),
                results: arrayRegenerate(results),
                evaluation: arrayRegenerate(evaluation),
                literature: arrayRegenerate(literature),
                competences: {
                    basic: arrayRegenerate(competencesBasic),
                    general: arrayRegenerate(competencesGeneral),
                    specific: arrayRegenerate(competencesSpecific)
                }
            }

            if(props.model===undefined || props.mode==="copy" || props.mode==="validate"){
                tokenFetch('newModel', {
                    method: 'post',
                    headers: {"Content-type": "application/json"},
                    body: JSON.stringify({
                        model: newModel
                    })
                }).then(resp => {
                    handleResponse(resp)
                })
            }else{
                tokenFetch('editModel', {
                    method: 'put',
                    headers: {"Content-type": "application/json"},
                    body: JSON.stringify({
                        model: newModel
                    })
                }).then(resp => {
                    handleResponse(resp)
                })
            }

        }else{
            scrollToTop();
        }

    }

    function handleDelete(c) {
        tokenFetch('deleteModel', {
            method: 'put',
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({
                model: c
            })
        }).then(res => {
            props.onHide()
            window.location.reload()
        }, (res => console.log(res)))
    }

    function handleDegreeChange(e) {
        setDegree(e)
        setYear(null)
        setModule(null)
        setSubject(null)
        tokenFetch('modelViewer', {
            method: 'put',
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({
                reqType: "degree",
                degree: e.value
            })
        }).then(res => {
            populateDegreeOptions(res)
        })
    }

    function handleDepartmentChange(e) {
        setDepartment(e)
        setCoordinator(null)
        tokenFetch('modelViewer', {
            method: 'put',
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({
                reqType: "department",
                department: e.value
            })
        }).then(res => {
            populateDepartmentUsers(res)
        })
    }

    function handleResponse(resp){
        if(resp==="OK"){
            props.onHide();
            window.location.reload()
        }else{
            setInvalidCode(true);
            setCodeFeedback(`Error: ${resp}`)
            scrollToTop();
        }
    }

    const getRecs = (fieldName, recs, setRecs, fieldState, setFieldState) => {
        if(recs.length===0 && courseName!=="" && courseName!==undefined && degree.label!==""
            && degree.label!==undefined && fieldName!=="" && fieldName!==undefined && edit && recsActive){

            setRecs(<div className={"ma3"}> <Spinner animation="border" variant="success"/>
                <p className={"dib v-mid mh3"}> Generando sugerencias...</p> </div>)

            tokenFetch("recommendations", {
                method: "post",
                headers: {"Content-type": "application/json"},
                body: JSON.stringify({
                    "field": fieldName,
                    "title": courseName,
                    "degree": degree.label,
                    "completion": fieldState
                })
            }).then(res => {
                try{
                    // eslint-disable-next-line
                    const regex = /\,(?!\s*?[\{\[\"\'\w])/g;
                    res.recommendations = res.recommendations.replace(regex, '');
                    const recommendations = JSON.parse(res.recommendations)
                    if(Array.isArray(recommendations)) {
                        let array = []
                        for (const element of recommendations) {
                            array.push(
                                <Button id={fieldName + element + "button"}
                                        key={fieldName + element + "button"}
                                        variant={"outline-info"}
                                        className={"br-pill ma2"}
                                        onClick={() => {
                                            appendText(fieldState, element, setFieldState)
                                            document.getElementById(fieldName + element + "button").style.display = "none"
                                        }}>{element}</Button>
                            )
                        }
                        setRecs(array)
                    }
                }catch (e) {
                    console.log(e)
                    setRecs([<Button id={fieldName+fieldName+"button"}
                                    key={fieldName+fieldName+"button"}
                                    variant={"outline-info"}
                                    className={"br-pill ma2"}
                                    onClick={()=> {
                                        appendText(fieldState, res.recommendations, setFieldState)
                                        document.getElementById(fieldName+fieldName+"button").style.display = "none"
                                    }}>{res.recommendations}</Button>])
                }
                setCost(cost => cost + res.cost)
            }, error=>{setRecs([<p className={"red"}>Se ha producido un error en la generación de sugerencias</p>])})
        }
    }

    const appendText = (text, newText, changeFunction) => {
        if(text.length>0 && text[text.length-1]!=="\n"){
            changeFunction(text => text + '\n')
        }
        changeFunction(text => text + newText + '\n')
    }

    function populateDegreeOptions(json){
        let yrOp=[]
        let subOp=[]
        let modOp=[]

        for (let i = 1; i <= json.duration; i++) {
            yrOp.push(generateOptionWithValue(`${i}º`, i))
        }
        yrOp.push(generateOptionWithValue(`Optativas`, 0))
        for (const resElement of json.subjects) {
            subOp.push(generateOptionWithValue(resElement.subjectName, resElement.subjectID))
        }
        for (const resElement of json.modules) {
            modOp.push(generateOptionWithValue(resElement.moduleName, resElement.moduleID))
        }
        setYearOptions(yrOp)
        setSubjectOptions(subOp)
        setModuleOptions(modOp)
    }

    function populateDepartmentUsers(json){
        let coordOp=[]
        for (const resElement of json.coordinators) {
            coordOp.push(generateOptionWithValue(resElement.userName, resElement.userID))
        }
        setCoordinatorOptions(coordOp)
    }

    //region return
    const confirmEliminatePopover = (
        <Popover id="confirmEliminatePopover">
            <Popover.Header as="h3">Confirmación</Popover.Header>
            <Popover.Body>
                Esta acción es irreversible. ¿Seguro que desea eliminar este modelo?
                <h3> </h3>
                <Button className={"w-100"} variant={"danger"} onClick={() => handleDelete(code)}>Sí, seguro</Button>
            </Popover.Body>
        </Popover>
    );

    // noinspection RequiredAttributes
    return (
        <Modal
            show={props.show}
            onHide={props.onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            backdrop={edit ? "static" : true}
        >

            <Form>
            <Modal.Header closeButton className={"h-auto"}>
                <div ref={modalRef}>
                <Modal.Title id="contained-modal-title-vcenter" className={"h-auto"}>
                    <h3 className={"h-auto"}> Guía docente </h3>
                </Modal.Title>
                </div>
            </Modal.Header>

            <Modal.Body>

                <div>
                    {
                        recsActive ?
                            <p className={"green flex justify-end"}>Las sugerencias se generan si están indicados el nombre de la asignatura y el grado</p>
                            : <></>
                    }

                    {edit ?
                        <div className={"flex justify-end"}>
                            <p className={"dib v-mid mh3"}>
                                Generar sugerencias
                            </p>
                            <ReactSwitch checked={recsActive} onChange={setRecsActive}/>
                        </div>

                        :<></>}
                </div>

                <Form.Label className={invalidDegree ? "red" : ""}>Grado</Form.Label>
                <Select
                        value={degree}
                        placeholder={"Grado"}
                        options={degreeOptions}
                        className={" tl pv2"}
                        isSearchable={false}
                        onChange={handleDegreeChange}
                        isDisabled={!edit}
                />

                <div className={"flex items-end"}>


                    <Form.Group className="w-25 tl pa2" controlId="year">
                        <Form.Label className={invalidYears ? "red" : ""}>Curso</Form.Label>
                        <Select
                                isDisabled={!edit}
                                isSearchable={false}
                                placeholder={"Año"}
                                options={yearOptions}
                                onChange={setYear}
                                value={year}
                        />
                    </Form.Group>

                    <Form.Group className="w-25 tl pa2" controlId="period">
                        <Form.Label className={invalidPeriod ? "red" : ""}>Cuatrimestre</Form.Label>
                        <Select
                                isSearchable={false}
                                placeholder={"Periodo"}
                                options={periodOptions}
                                onChange={setPeriod}
                                value={period}
                                isDisabled={!edit}
                        />
                    </Form.Group>

                    <Form.Group className="w-25 tl pa2" controlId="language">
                        <Form.Label className={invalidLanguage ? "red" : ""}>Idioma</Form.Label>
                        <CreatableSelect
                            placeholder={"Idioma"}
                            options={languageOptions}
                            onChange={setLanguage}
                            value={language}
                            isDisabled={!edit}
                        />
                    </Form.Group>

                    <Form.Group className="w-25 tl pa2" controlId="code">
                        <Form.Label>Código</Form.Label>
                        <Form.Control type="text" onChange={event => setCode(event.target.value)} required isInvalid={invalidCode}
                                      value={code} disabled={!codeIsEditable} />
                        <Form.Control.Feedback type="invalid">
                            {codeFeedback}
                        </Form.Control.Feedback>
                    </Form.Group>
                </div>

                <Form.Group className="mb-3 pv1" controlId="courseName">
                    <Form.Label>Nombre de la asignatura</Form.Label>
                    <Form.Control type="text" onChange={event => setCourseName(event.target.value)} required isInvalid={invalidCourseName}
                                  value={courseName} disabled={!edit}/>
                    <Form.Control.Feedback type="invalid">
                        Nombre de la asignatura demasiado corto o contiene caracteres inválidos
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3 pv1" controlId="intlName">
                    <Form.Label>Nombre en inglés</Form.Label>
                    <Form.Control type="text" onChange={event => setIntlName(event.target.value)} required isInvalid={invalidIntlName}
                                  onFocus={()=>getRecs("Nombre de la asignatura en inglés", recIntlName, setRecIntlName, intlName, setIntlName)}
                                  value={intlName} disabled={!edit}/>
                    {recIntlName}
                    <Form.Control.Feedback type="invalid">
                        Nombre de la asignatura demasiado corto o contiene caracteres inválidos
                    </Form.Control.Feedback>
                </Form.Group>

                <div className={"flex items-end"}>
                    <Form.Group className="mb-3 pv1 w-25" controlId="shorthand">
                        <Form.Label>Abreviatura</Form.Label>
                        <Form.Control type="text" onChange={event => setShorthand(event.target.value)} required isInvalid={invalidShorthand}
                                      value={shorthand} disabled={!edit} />
                        <Form.Control.Feedback type="invalid">
                            Abreviatura demasiado larga o corta. 2-5 caracteres.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3 pv1 w-75 ph3" controlId="subject">
                        <Form.Label className={invalidSubject ? "red" : ""}>Materia</Form.Label>
                        <CreatableSelect
                            placeholder={"Selecciona..."}
                            options={subjectOptions}
                            isDisabled={!edit || subjectOptions===[]}
                            className={"tl"}
                            onChange={setSubject}
                            value={subject}
                        />
                    </Form.Group>
                </div>

                <div className={"flex items-end"}>

                    <Form.Group className="mb-3 pv1 w-75" controlId="type">
                        <Form.Label className={invalidType ? "red" : ""}>Tipo</Form.Label>
                        <Select
                            placeholder={"Selecciona..."}
                            options={typeOptions}
                            className={"tl"}
                            onChange={setType}
                            value={type}
                            isDisabled={!edit}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3 pv1 w-25 ph3" controlId="ECTS">
                        <Form.Label className={invalidECTS ? "red" : ""}>ECTS</Form.Label>
                        <Select
                            options={ECTSoptions}
                            className={"tl"}
                            onChange={setECTS}
                            isSearchable={false}
                            value={ECTS}
                            isDisabled={!edit}
                        />
                    </Form.Group>
                </div>

                <Form.Label className={invalidModule ? "red" : ""}>Módulo</Form.Label>
                <CreatableSelect
                    options={moduleOptions}
                    className={"tl pa2"}
                    onChange={setModule}
                    isDisabled={!edit || moduleOptions===[]}
                    value={module}
                />

                <Form.Label className={invalidDepartment ? "red" : ""}>Departamento</Form.Label>
                <Select
                    options={departmentOptions}
                    className={"tl pa2"}
                    onChange={handleDepartmentChange}
                    value={department}
                    isDisabled={!edit}
                />

                <Form.Label className={invalidCoordinator ? "red" : ""}>Coordinador</Form.Label>
                <Select
                    isDisabled={!edit || department===""}
                    options={coordinatorOptions}
                    className={"tl pa2"}
                    onChange={setCoordinator}
                    value={coordinator}
                />

                <div className={"mt4 mb2 form-control"}>
                    <Form.Label className={invalidMinContents ? "red" : ""} >Descripción de contenidos mínimos</Form.Label>
                    <TextareaAutosize onChange={(e)=>setMinContents(e.target.value)} value={minContents} disabled={!edit} className={"w-100 form-control"}
                                onFocus={()=>getRecs("Descripción de contenidos mínimos", recMinContents, setRecMinContents, minContents, setMinContents)}
                    />
                    {recMinContents}
                </div>

                <div className={"mt4 mb2 form-control"}>
                    <Form.Label className={invalidProgram ? "red" : ""}>Programa</Form.Label>
                    <TextareaAutosize onChange={(e)=>setProgram(e.target.value)} value={program} className={"w-100 form-control"}
                                onFocus={()=>getRecs("Programa", recProgram, setRecProgram, program, setProgram)}
                                disabled={!edit} />
                    {recProgram}
                </div>

                <Accordion className={"mt4 mb4 form-control"} defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Competencias</Accordion.Header>
                        <Accordion.Body className={"bg-light-gray"}>
                            <div className={"bg-light-gray"}>
                                <div className={"mv3"}>
                                    <Form.Label className={invalidCompetencesBasic ? "red" : ""}>Básicas</Form.Label>
                                    <TextareaAutosize onChange={(e)=>setCompetencesBasic(e.target.value)} value={competencesBasic} className={"w-100 form-control"}
                                                onFocus={()=>getRecs("Competencias básicas", recCompetencesBasic, setRecCompetencesBasic, competencesBasic, setCompetencesBasic)}
                                                disabled={!edit} />
                                    {recCompetencesBasic}
                                </div>

                                <div className={"mv3"}>
                                    <Form.Label className={invalidCompetencesGeneral ? "red" : ""}>Generales y transversales</Form.Label>
                                    <TextareaAutosize onChange={(e)=>setCompetencesGeneral(e.target.value)} value={competencesGeneral} className={"w-100 form-control"}
                                                onFocus={()=>getRecs("Competencias generales", recCompetencesGeneral, setRecCompetencesGeneral, competencesGeneral, setCompetencesGeneral)}
                                                disabled={!edit} />
                                    {recCompetencesGeneral}
                                </div>

                                <div className={"mv3"}>
                                    <Form.Label className={invalidCompetencesSpecific ? "red" : ""}>Específicas</Form.Label>
                                    <TextareaAutosize onChange={(e)=>setCompetencesSpecific(e.target.value)} value={competencesSpecific} className={"w-100 form-control"}
                                                onFocus={()=>getRecs("Competencias específicas", recCompetencesSpecific, setRecCompetencesSpecific, competencesSpecific, setCompetencesSpecific)}
                                                disabled={!edit} />
                                    {recCompetencesSpecific}
                                </div>

                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>

                <div className={"mt4 mb4 form-control"}>
                    <Form.Label className={invalidEvaluation ? "red" : ""}>Evaluación</Form.Label>
                    <TextareaAutosize value={evaluation} onChange={(e) => setEvaluation(e.target.value)} className={"w-100 form-control"}
                                      onFocus={()=>getRecs("Evaluación", recEvaluation, setRecEvaluation, evaluation, setEvaluation)}
                                      disabled={!edit} ></TextareaAutosize>
                    {recEvaluation}
                </div>

                <div className={"mt4 mb4 form-control"}>
                    <Form.Label className={invalidResults ? "red" : ""}>Resultados de aprendizaje</Form.Label>
                    <TextareaAutosize value={results} onChange={(e)=>setResults(e.target.value)} className={"w-100 form-control"}
                                onFocus={()=>getRecs("Resultados de aprendizaje", recResults, setRecResults, results, setResults)}
                                disabled={!edit} ></TextareaAutosize>
                    {recResults}
                </div>

                <div className={"mt2 mb2 form-control"}>
                    <Form.Label className={invalidLiterature ? "red" : ""}>Bibliografía</Form.Label>
                    <TextareaAutosize value={literature} onChange={(e)=>setLiterature(e.target.value)} className={"w-100 form-control"}
                                onFocus={()=>getRecs("Bibliografía", recLiterature, setRecLiterature, literature, setLiterature)}
                                disabled={!edit} />
                    {recLiterature}
                </div>

            </Modal.Body>
            <Modal.Footer>

                {props.mode === "create" || props.mode === "copy" ?
                    <></> :
                    <OverlayTrigger rootClose={true} trigger="click" placement="top" overlay={confirmEliminatePopover}>
                        <Button variant="danger" disabled={!enableDeleteButton} className={"mr-auto"} key={"delete"}>Eliminar</Button>
                    </OverlayTrigger>
                }

                {recsActive ?
                    <div className={""}>
                        Coste de las sugerencias: {Math.round(cost*10000)/10000} $
                    </div>
                    : <></>
                }
                
                {edit ?
                    <Button variant="success" key={"confirm"} onClick={() => handleSubmit()}>Confirmar</Button> :
                    <Button variant="success" key={"confirm"} disabled={!enableEditButton} onClick={() => toggleEdit()}>Editar</Button>

                }

                <Button variant={"primary"} key={"cancel"} onClick={props.onHide}>{edit ? "Cerrar" :"Cancelar"}</Button>
            </Modal.Footer>
            </Form>

        </Modal>
    );
    //endregion
}