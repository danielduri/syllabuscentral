/* eslint-disable react-hooks/exhaustive-deps */
import {Accordion, Button, Form, Modal, OverlayTrigger, Popover} from "react-bootstrap";
import './Modal.css'
import React, {useEffect, useRef, useState} from "react";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import TextEditor, {arrayRegenerate, arrayStringify} from "../Common/TextEditor";
import TextareaAutosize from "react-textarea-autosize";
import {tokenFetch} from "../Common/functions/tokenFetch";

//TODO deploy to production
//TODO handle backend responses
//TODO support for additional fields

export function ModelViewer(props) {

    const init = () => {
        if (props.show) {
            if(props.mode==="create"){
                setEdit(true)
                setCodeIsEditable(true)
                loadData(true).then(r => null)
            }else if(props.mode==="edit"){
                setEdit(true)
                loadData(true).then(r => null)
            }else if(props.mode==="copy"){
                setEdit(true)
                loadData(true).then(() => {})
                setCodeIsEditable(true)
            } else {
                setEdit(false)
                loadModel(false).then(r => null)
            }
        }
    }

    const modalRef = useRef();

    const scrollToTop = () => {
        modalRef.current?.scrollIntoView({ block:'nearest', behavior:'smooth' });
    }

    const [edit, setEdit]=useState(false)

    /*
    in view, all fields are disabled and has props.model
        Buttons: edit/OK

    in edit, all fields are enabled and has props.model
        fetch is similar to edit but props.model is given
        Buttons: delete/save/cancel

    in create, all fields are enabled and uses emptyModel
        Buttons: save/cancel
     */

    const generateOption = (value) => {
        return {label: value, value: value}
    }
    const generateOptionWithValue = (label, value) => {
        return {label: label, value: value}
    }

    const [degree, setDegree] = useState(generateOption(""));
    const [invalidDegree, setInvalidDegree] = useState(false);

    const [year, setYear] = useState(generateOption(""));
    const [invalidYears, setInvalidYears] = useState(false);

    const [period, setPeriod] = useState(generateOption(""));
    const periodOptions = [
        { label: "1", value: 1},
        { label: "2", value: 2},
        { label: "Ninguno", value: 0}
    ]
    const [invalidPeriod, setInvalidPeriod] = useState(false);

    const [language, setLanguage] = useState({label: 'Español', value: 'Español'});
    const languageOptions = [
        { label: "Español", value: "Español"},
        { label: "Inglés", value: "Inglés"}
    ]
    const [invalidLanguage, setInvalidLanguage] = useState(false);

    const [code, setCode] = useState("");
    const [invalidCode, setInvalidCode] = useState(false);
    const [codeIsEditable, setCodeIsEditable] = useState(false);
    const [codeFeedback, setCodeFeedback] = useState("El código debe ser numérico");

    const testCode = (c) => {
        if(c!==""){
            return !/\D/.test(code);
        }else{
            return true
        }
    }

    useEffect(()=>{
        if (testCode(code)){
            setInvalidCode(false)
        }else{
            setInvalidCode(true)
        }
    },[code])

    const [courseName, setCourseName] = useState("");
    const [invalidCourseName, setInvalidCourseName] = useState(false);

    const [intlName, setIntlName] = useState("");
    const [invalidIntlName, setInvalidIntlName] = useState(false);

    const [shorthand, setShorthand] = useState("");
    const [invalidShorthand, setInvalidShorthand] = useState(false);

    const testShorthand = (sh) => {
        if(shorthand!==""){
            let regex = /^[\w-_.]*$/;
            return !(sh.length < 2 || sh.length > 5 || !regex.test(sh));
        }else{
            return true
        }
    }

    useEffect(()=>{
        if (testShorthand(shorthand)){
            setInvalidShorthand(false)
        }else {
            setInvalidShorthand(true)
        }
    },[shorthand])

    const [subject, setSubject] = useState("");
    const [invalidSubject, setInvalidSubject] = useState(false);

    const [type, setType] = useState("");
    const typeOptions = [
        generateOption("Formación Básica"),
        generateOption("Optativa"),
        generateOption("Obligatoria"),
        generateOption("Trabajo de fin de grado")
    ]
    const [invalidType, setInvalidType] = useState(false);

    const [ECTS, setECTS] = useState("");
    const ECTSoptions = [
        generateOption(3),
        generateOption(4.5),
        generateOption(6),
        generateOption(9),
        generateOption(12)
    ]
    const [invalidECTS, setInvalidECTS] = useState(false);

    const [module, setModule] = useState("");
    const [invalidModule, setInvalidModule] = useState(false);

    const [department, setDepartment] = useState("");
    const [invalidDepartment, setInvalidDepartment] = useState(false);

    const [coordinator, setCoordinator] = useState("");
    const [invalidCoordinator, setInvalidCoordinator] = useState(false);

    const [minContents, setMinContents] = useState("");
    const [invalidMinContents, setInvalidMinContents] = useState(false);

    const [program, setProgram] = useState("");
    const [invalidProgram, setInvalidProgram] = useState(false);

    const [competencesBasic, setCompetencesBasic] = useState("");
    const [invalidCompetencesBasic, setInvalidCompetencesBasic] = useState(false);

    const [competencesGeneral, setCompetencesGeneral] = useState("");
    const [invalidCompetencesGeneral, setInvalidCompetencesGeneral] = useState(false);

    const [competencesSpecific, setCompetencesSpecific] = useState("");
    const [invalidCompetencesSpecific, setInvalidCompetencesSpecific] = useState(false);

    const [results, setResults] = useState("");
    const [invalidResults, setInvalidResults] = useState(false);

    const [evaluation, setEvaluation] = useState("");
    const [invalidEvaluation, setInvalidEvaluation] = useState(false);

    const [literature, setLiterature] = useState("");
    const [invalidLiterature, setInvalidLiterature] = useState(false);

    async function loadData(editing){
        let degOp = []
        let depOp = []

        await tokenFetch('newModel', {
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

    function toggleEdit() {
        scrollToTop();
        loadData(true).then(r => {
            setEdit(!edit);
        })
    }

    const emptyModel = {
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

    const [departmentOptions, setDepartmentOptions] = useState([])
    const [degreeOptions, setDegreeOptions] = useState([])


    async function prepareModel(model, editing) {
        let readyModel = JSON.parse(JSON.stringify(model))
        readyModel.ECTS = generateOption(Number.parseFloat(model.ECTS))
        readyModel.language = generateOption(model.language)
        if (Number.parseInt(model.period) > 0) {
            readyModel.period = generateOption(model.period)
        } else {
            readyModel.period = generateOptionWithValue("Ninguno", 0)
        }
        if (Number.parseInt(model.year) > 0) {
            readyModel.year = generateOptionWithValue(`${model.year}º`, model.year)
        } else {
            readyModel.year = null
        }
        readyModel.type = generateOption(model.type)

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
            await tokenFetch('newModel', {
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
                    readyModel.department = generateOptionWithValue(model.department, res.department.departmentID)
                    populateDepartmentUsers(res)
                }else{
                    readyModel.department = emptyModel.department
                }

                if(res.module){
                    readyModel.module = generateOptionWithValue(model.module, res.module.moduleID)
                }else{
                    readyModel.module = generateOption(model.module)
                }

                if(res.subject){
                    readyModel.subject = generateOptionWithValue(model.subject, res.subject.subjectID)
                }else{
                    readyModel.subject = generateOption(model.subject)
                }

                if(res.coordinator){
                    readyModel.coordinator = generateOptionWithValue(model.coordinator, res.coordinator.userID)
                }else{
                    readyModel.coordinator = emptyModel.coordinator
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
    }

    useEffect( () => {
        init();
    }, [props.show])

    function validateForm(){

        let submit=true

        if(degree===null || !Number.isInteger(degree.value)){
            setInvalidDegree(true)
            submit=false
        }else{
            setInvalidDegree(false)
        }

        if(year===null || !Number.isInteger(year.value)){
            setInvalidYears(true)
            submit=false
        }else{
            setInvalidYears(false)
        }

        if(period===null || !Number.isInteger(period.value)){
            setInvalidPeriod(true)
            submit=false
        }else{
            setInvalidPeriod(false)
        }

        if(language===null || language.value===""){
            setInvalidLanguage(true)
            submit=false
        }else{
            setInvalidLanguage(false)
        }

        if(code===null || !Number.parseInt(code) || !testCode(code)){
            setInvalidCode(true)
            submit=false
        }else{
            setInvalidCode(false)
        }

        if(courseName===null || courseName===""){
            setInvalidCourseName(true)
            submit=false
        }else{
            setInvalidCourseName(false)
        }

        if(intlName===null || intlName===""){
            setInvalidIntlName(true)
            submit=false
        }else{
            setInvalidIntlName(false)
        }

        if(shorthand===null || shorthand==="" || !testShorthand(shorthand)){
            setInvalidShorthand(true)
            submit=false
        }else{
            setInvalidShorthand(false)
        }

        if(type===null || type.value===""){
            setInvalidType(true)
            submit=false
        }else{
            setInvalidType(false)
        }

        if(ECTS===null || !Number.parseFloat(ECTS.value)){
            setInvalidECTS(true)
            submit=false
        }else{
            setInvalidECTS(false)
        }

        if(subject===null || subject.value===""){
            setInvalidSubject(true)
            submit=false
        }else{
            setInvalidSubject(false)
        }

        if(module===null || module.value===""){
            setInvalidModule(true)
            submit=false
        }else{
            setInvalidModule(false)
        }

        if(department===null || !Number.isInteger(department.value)){
            setInvalidDepartment(true)
            submit=false
        }else{
            setInvalidDepartment(false)
        }

        if(coordinator===null || !Number.isInteger(coordinator.value)){
            setInvalidCoordinator(true)
            submit=false
        }else{
            setInvalidCoordinator(false)
        }

        if(minContents===null || minContents===""){
            setInvalidMinContents(true)
            submit=false
        }else{
            setInvalidMinContents(false)
        }

        if(program===null || program===""){
            setInvalidProgram(true)
            submit=false
        }else{
            setInvalidProgram(false)
        }

        if(results===null || results===""){
            setInvalidResults(true)
            submit=false
        }else{
            setInvalidResults(false)
        }

        if(evaluation===null || evaluation===""){
            setInvalidEvaluation(true)
            submit=false
        }else{
            setInvalidEvaluation(false)
        }

        if(literature===null || literature===""){
            setInvalidLiterature(true)
            submit=false
        }else{
            setInvalidLiterature(false)
        }

        if(competencesBasic===null || competencesBasic===""){
            setInvalidCompetencesBasic(true)
            submit=false
        }else{
            setInvalidCompetencesBasic(false)
        }

        if(competencesGeneral===null || competencesGeneral===""){
            setInvalidCompetencesGeneral(true)
            submit=false
        }else{
            setInvalidCompetencesGeneral(false)
        }

        if(competencesSpecific===null || competencesSpecific===""){
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
                evaluation: evaluation,
                literature: arrayRegenerate(literature),
                competences: {
                    basic: arrayRegenerate(competencesBasic),
                    general: arrayRegenerate(competencesGeneral),
                    specific: arrayRegenerate(competencesSpecific)
                }
            }

            if(props.model===undefined || props.mode==="copy"){
                tokenFetch('newModel', {
                    method: 'put',
                    headers: {"Content-type": "application/json"},
                    body: JSON.stringify({
                        reqType: "upload",
                        model: newModel
                    })
                }).then(resp => {
                    if(resp==="OK"){
                        props.onHide();
                        window.location.reload()
                    }else if (resp==="Code already in use"){
                        setInvalidCode(true);
                        setCodeFeedback("Este código ya se ha utilizado")
                        scrollToTop();
                    }else{
                        setInvalidCode(true);
                        setCodeFeedback("Error desconocido")
                        scrollToTop();
                    }
                })
            }else{
                tokenFetch('editModel', {
                    method: 'put',
                    headers: {"Content-type": "application/json"},
                    body: JSON.stringify({
                        model: newModel
                    })
                }).then(resp => {
                    console.log("success");
                    props.onHide();
                }, resp => {
                    console.log("failed")
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



    const [yearOptions, setYearOptions] = useState([])
    const [moduleOptions, setModuleOptions] = useState([])
    const [subjectOptions, setSubjectOptions] = useState([])

    function populateDegreeOptions(json){
        let yrOp=[]
        let subOp=[]
        let modOp=[]

        for (let i = 1; i <= json.duration; i++) {
            yrOp.push(generateOptionWithValue(`${i}º`, i))
        }
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

    function handleDegreeChange(e) {
        setDegree(e)
        setYear(null)
        setModule(null)
        setSubject(null)
        tokenFetch('newModel', {
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

    const [coordinatorOptions, setCoordinatorOptions] = useState([])
    function handleDepartmentChange(e) {
        setDepartment(e)
        setCoordinator(null)
        tokenFetch('newModel', {
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

    return (
        <Modal
            show={props.show}
            onHide={props.onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            backdrop={"static"}
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
                                  value={intlName} disabled={!edit}/>
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
                    <TextEditor onChange={setMinContents} value={minContents} disabled={!edit} />
                </div>

                <div className={"mt4 mb2 form-control"}>
                    <Form.Label className={invalidProgram ? "red" : ""}>Programa</Form.Label>
                    <TextEditor onChange={setProgram} value={program}  disabled={!edit} />
                </div>

                <Accordion className={"mt4 mb4 form-control"} defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Competencias</Accordion.Header>
                        <Accordion.Body className={"bg-light-gray"}>
                            <div className={"bg-light-gray"}>
                                <Form.Label className={invalidCompetencesBasic ? "red" : ""}>Básicas</Form.Label>
                                <TextEditor onChange={setCompetencesBasic} value={competencesBasic} disabled={!edit} />

                                <Form.Label className={invalidCompetencesGeneral ? "red" : ""}>Generales y transversales</Form.Label>
                                <TextEditor onChange={setCompetencesGeneral} value={competencesGeneral} disabled={!edit} />

                                <Form.Label className={invalidCompetencesSpecific ? "red" : ""}>Específicas</Form.Label>
                                <TextEditor onChange={setCompetencesSpecific} value={competencesSpecific} disabled={!edit} />
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>

                <div className={"mt4 mb4 form-control"}>
                    <Form.Label className={invalidEvaluation ? "red" : ""}>Evaluación</Form.Label>
                    <TextareaAutosize value={evaluation} onChange={(e) => setEvaluation(e.target.value)}
                                      className={"w-100 form-control"} disabled={!edit} ></TextareaAutosize>
                </div>

                <div className={"mt4 mb4 form-control"}>
                    <Form.Label className={invalidResults ? "red" : ""}>Resultados de aprendizaje</Form.Label>
                    <TextEditor value={results} onChange={setResults} className={"w-100 form-control"} disabled={!edit} ></TextEditor>
                </div>

                <div className={"mt2 mb2 form-control"}>
                    <Form.Label className={invalidLiterature ? "red" : ""}>Bibliografía</Form.Label>
                    <TextEditor value={literature} onChange={setLiterature} className={"h3"} disabled={!edit} />
                </div>

            </Modal.Body>
            <Modal.Footer>

                {props.mode === "create" ?
                    <></> :
                    <OverlayTrigger rootClose={true} trigger="click" placement="top" overlay={confirmEliminatePopover}>
                        <Button variant="danger" className={"mr-auto"} key={"delete"}>Eliminar</Button>
                    </OverlayTrigger>
                }



                {edit ?
                    <Button variant="success" key={"confirm"} onClick={() => handleSubmit()}>Confirmar</Button> :
                    <Button variant="success" key={"confirm"} onClick={() => toggleEdit()}>Editar</Button>

                }

                <Button variant={"primary"} key={"cancel"} onClick={props.onHide}>{edit ? "Cerrar" :"Cancelar"}</Button>
            </Modal.Footer>
            </Form>

        </Modal>
    );
}