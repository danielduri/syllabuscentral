import {Accordion, Button, Form, Modal} from "react-bootstrap";
import './Modal.css'
import React, {useEffect, useRef, useState} from "react";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import TextEditor, {arrayStringify, arrayRegenerate} from "../Common/TextEditor";
import TextareaAutosize from "react-textarea-autosize";
import {tokenFetch} from "../Common/functions/tokenFetch";
import {useWhatChanged} from "@simbathesailor/use-what-changed";

//TODO figure out with template model: delete defaultValue and use value?
//TODO figure out file upload
//TODO upload syllabus and figure out valitadion logic
//TODO deploy to production

export function NewModel(props) {

    const emptyModel = {
        degree: null,
        year: null,
        period: null,
        language: "",
        code: null,
        name: "",
        intlName: "",
        shorthand: "",
        type: "",
        ECTS: null,
        subject: "",
        module: "",
        department: "",
        coordinator: null,
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

    const [initialModel, setInitialModel] = useState(emptyModel)

    const generateOption = (value) => {
        return {label: value, value: value}
    }
    const generateOptionWithValue = (label, value) => {
        return {label: label, value: value}
    }

    const [departmentOptions, setDepartmentOptions] = useState([])
    const [degreeOptions, setDegreeOptions] = useState([])

    useEffect(() => {
        if(props.show){

            let degOp=[]
            let depOp=[]

            tokenFetch('newModel', {
                method: 'post',
                headers: {"Content-type": "application/json"},
                body: JSON.stringify({
                    reqType: "initial",
                })
            }).then(res => {
                for (const resElement of res.degrees) {
                    degOp.push(generateOptionWithValue(resElement.degreeDisplayName, resElement.degreeRawName))
                }
                for (const resElement of res.departments) {
                    depOp.push(generateOptionWithValue(resElement.departmentName, resElement.departmentID))
                }
                setDegreeOptions(degOp)
                setDepartmentOptions(depOp)
            })

            if(props.model!==undefined){

                let model = props.model

                const minContentsString = arrayStringify(props.model.minContents)
                const programString = arrayStringify(props.model.program)
                const resultsString = arrayStringify(props.model.results)
                const literatureString = arrayStringify(props.model.literature)
                const CBstring = arrayStringify(props.model.competences.basic)
                const CGstring = arrayStringify(props.model.competences.general)
                const CSstring = arrayStringify(props.model.competences.specific)

                model.minContents = minContentsString
                model.program = programString
                model.results = resultsString
                model.literature = literatureString
                model.competences.basic = CBstring
                model.competences.general = CGstring
                model.competences.specific = CSstring

                setInitialModel(model)

                setDegree(props.model.degree);
                setYear(props.model.year)
                setPeriod(props.model.period)
                setLanguage(props.model.language)
                setCode(props.model.code)
                setSubjectName(props.model.name)
                setIntlName(props.model.intlName)
                setShorthand(props.model.shorthand)
                setType(props.model.type)
                setECTS(props.model.ECTS)
                setSubject(props.model.subject)
                setModule(props.model.module)
                setDepartment(props.model.department)
                setCoordinator(props.model.coordinator)
                setMinContents(minContentsString)
                setProgram(programString)
                setResults(resultsString)
                setEvaluation(props.model.evaluation)
                setLiterature(literatureString)
                setCompetencesBasic(CBstring)
                setCompetencesGeneral(CGstring)
                setCompetencesSpecific(CSstring)
            }else{
                initialModel.current=emptyModel
                setDegree(emptyModel.degree);
                setYear(emptyModel.year)
                setPeriod(emptyModel.period)
                setLanguage(emptyModel.language)
                setCode(emptyModel.code)
                setSubjectName(emptyModel.name)
                setIntlName(emptyModel.intlName)
                setShorthand(emptyModel.shorthand)
                setType(emptyModel.type)
                setECTS(emptyModel.ECTS)
                setSubject(emptyModel.subject)
                setModule(emptyModel.module)
                setDepartment(emptyModel.department)
                setCoordinator(emptyModel.coordinator)
                setMinContents(emptyModel.minContents)
                setProgram(emptyModel.program)
                setResults(emptyModel.results)
                setEvaluation(emptyModel.evaluation)
                setLiterature(emptyModel.literature)
                setCompetencesBasic(emptyModel.competences.basic)
                setCompetencesGeneral(emptyModel.competences.general)
                setCompetencesSpecific(emptyModel.competences.specific)
            }
        }
    }, [props.show])

    useEffect(() => {

    }, [degreeOptions, departmentOptions])

    const handleSubmit = (event) => {
        const newModel = {
            degree: degree,
            year: year,
            period: period,
            language: language,
            code: code,
            name: subjectName,
            intlName: intlName,
            shorthand: shorthand,
            type: type,
            ECTS: ECTS,
            subject: subject,
            module: module,
            department: department,
            coordinator: coordinator,
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
        console.log(newModel);
        event.preventDefault();
        event.stopPropagation();

    };

    const [validated, setValidated] = useState(false);

    const [degree, setDegree] = useState(null);
    const [invalidDegree, setInvalidDegree] = useState(false);

    const [year, setYear] = useState(null);
    const [invalidYears, setInvalidYears] = useState(false);

    const [period, setPeriod] = useState(null);
    const periodOptions = [
        { label: "1", value: 1},
        { label: "2", value: 2},
        { label: "Ninguno", value: null}
    ]
    const [invalidPeriod, setInvalidPeriod] = useState(false);

    const [language, setLanguage] = useState({label: 'Español', value: 'Español'});
    const languageOptions = [
        { label: "Español", value: "Español"},
        { label: "Inglés", value: "Inglés"}
    ]
    const [invalidLanguage, setInvalidLanguage] = useState(false);

    const [code, setCode] = useState(null);
    const [invalidCode, setInvalidCode] = useState(false);


    const [subjectName, setSubjectName] = useState("");
    const [invalidSubjectName, setInvalidSubjectName] = useState(false);

    const [intlName, setIntlName] = useState("");
    const [invalidIntlName, setInvalidIntlName] = useState(false);

    const [shorthand, setShorthand] = useState("");
    const [invalidShorthand, setInvalidShorthand] = useState(false);

    const [subject, setSubject] = useState("");
    const [invalidSubject, setInvalidSubject] = useState(false);

    const [type, setType] = useState("");
    const typeOptions = [
        { label: "Formación Básica"},
        { label: "Optativa"},
        { label: "Obligatoria"}
    ]
    const [invalidType, setInvalidType] = useState(false);

    const [ECTS, setECTS] = useState("");
    const ECTSoptions = [
        { label: 3},
        { label: 6},
        { label: 4.5},
        { label: 9},
        { label: 12}
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


    /*
    const handleSubmit = (event) => {
        setWrongEmail("");
        handleEmailChange();
        event.preventDefault();
        event.stopPropagation();
    };

    useEffect(() => {
        if((wrongEmail==="") && (validated)){
            setValidated(false);
            props.onHide()
        }
    }, [wrongEmail, validated, props])

     */

    const [yearOptions, setYearOptions] = useState([])
    const [moduleOptions, setModuleOptions] = useState([])
    const [subjectOptions, setSubjectOptions] = useState([])

    function handleDegreeChange(e) {
        setDegree(e)
        setYear(null)
        setModule(null)
        setSubject(null)
        tokenFetch('newModel', {
            method: 'post',
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({
                reqType: "degree",
                degree: e.value
            })
        }).then(res => {
            let yrOp=[]
            let subOp=[]
            let modOp=[]
            for (let i = 1; i <= res.duration; i++) {
                yrOp.push(generateOptionWithValue(`${i}º`, i))
            }
            for (const resElement of res.subjects) {
                subOp.push(generateOption(resElement.subjectName))
            }
            for (const resElement of res.modules) {
                modOp.push(generateOptionWithValue(resElement.moduleName))
            }
            setYearOptions(yrOp)
            setSubjectOptions(subOp)
            setModuleOptions(modOp)
        })
    }

    const [coordinatorOptions, setCoordinatorOptions] = useState([])
    function handleDepartmentChange(e) {
        setDepartment(e)
        setCoordinator(null)
        tokenFetch('newModel', {
            method: 'post',
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({
                reqType: "department",
                department: e.value
            })
        }).then(res => {
            let coordOp=[]
            for (const resElement of res.coordinators) {
                coordOp.push(generateOptionWithValue(resElement.userName, resElement.userID))
            }
            setCoordinatorOptions(coordOp)
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
            <Modal.Header closeButton className={"h-auto"}>
                <Modal.Title id="contained-modal-title-vcenter" className={"h-auto"}>
                    <h3 className={"h-auto"}> Nuevo modelo </h3>
                </Modal.Title>
            </Modal.Header>

            <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Modal.Body>
                <Select defaultValue={generateOption(initialModel.degree)}
                        value={degree}
                        placeholder={"Grado"}
                        options={degreeOptions}
                        className={" tl pv2"}
                        isSearchable={false}
                        onChange={handleDegreeChange}
                />

                <div className={"flex items-end"}>


                    <Form.Group className="w-25 tl pa2" controlId="year">
                        <Form.Label>Curso</Form.Label>
                        <Select defaultValue={generateOption(initialModel.year)}
                                isDisabled={false}
                                isSearchable={false}
                                placeholder={"Año"}
                                options={yearOptions}
                                onChange={setYear}
                                value={year}
                        />
                    </Form.Group>

                    <Form.Group className="w-25 tl pa2" controlId="period">
                        <Form.Label>Cuatrimestre</Form.Label>
                        <Select defaultValue={generateOption(initialModel.period)}
                                isSearchable={false}
                                placeholder={"Periodo"}
                                options={periodOptions}
                                onChange={setPeriod}
                                value={period}
                        />
                    </Form.Group>

                    <Form.Group className="w-25 tl pa2" controlId="language">
                        <Form.Label>Idioma</Form.Label>
                        <CreatableSelect
                            placeholder={"Idioma"}
                            defaultValue={generateOption(initialModel.language)}
                            options={languageOptions}
                            onChange={setLanguage}
                            value={language}
                        />
                    </Form.Group>

                    <Form.Group className="w-25 tl pa2" controlId="code">
                        <Form.Label>Código</Form.Label>
                        <Form.Control type="text" onChange={event => setCode(event.target.value)} required isInvalid={invalidCode}
                                      defaultValue={initialModel.code} />
                        <Form.Control.Feedback type="invalid">
                            El código debe ser numérico
                        </Form.Control.Feedback>
                    </Form.Group>
                </div>

                <Form.Group className="mb-3 pv1" controlId="subjectName">
                    <Form.Label>Nombre de la asignatura</Form.Label>
                    <Form.Control type="text" onChange={event => setSubjectName(event.target.value)} required isInvalid={invalidSubjectName}
                                  defaultValue={initialModel.name}/>
                    <Form.Control.Feedback type="invalid">
                        Nombre de la asignatura demasiado corto o contiene caracteres inválidos
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3 pv1" controlId="intlName">
                    <Form.Label>Nombre en inglés</Form.Label>
                    <Form.Control type="text" onChange={event => setIntlName(event.target.value)} required isInvalid={invalidIntlName}
                                  defaultValue={initialModel.intlName}/>
                    <Form.Control.Feedback type="invalid">
                        Nombre de la asignatura demasiado corto o contiene caracteres inválidos
                    </Form.Control.Feedback>
                </Form.Group>

                <div className={"flex items-end"}>
                    <Form.Group className="mb-3 pv1 w-25" controlId="shorthand">
                        <Form.Label>Abreviatura</Form.Label>
                        <Form.Control type="text" onChange={event => setShorthand(event.target.value)} required isInvalid={invalidShorthand}
                                      defaultValue={initialModel.shorthand} />
                        <Form.Control.Feedback type="invalid">
                            Abreviatura demasiado larga. Máx 5 caracteres.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3 pv1 w-75 ph3" controlId="subject">
                        <Form.Label>Materia</Form.Label>
                        <CreatableSelect
                            placeholder={"Selecciona..."}
                            defaultValue={generateOption(initialModel.subject)}
                            options={subjectOptions}
                            isDisabled={subjectOptions===[]}
                            className={"tl"}
                            onChange={setSubject}
                            value={subject}
                        />
                    </Form.Group>
                </div>

                <div className={"flex items-end"}>

                    <Form.Group className="mb-3 pv1 w-75" controlId="type">
                        <Form.Label>Tipo</Form.Label>
                        <Select
                            placeholder={"Selecciona..."}
                            defaultValue={generateOption(initialModel.type)}
                            options={typeOptions}
                            className={"tl"}
                            onChange={setType}
                            value={type}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3 pv1 w-25 ph3" controlId="ECTS">
                        <Form.Label>ECTS</Form.Label>
                        <Select
                            defaultValue={generateOption(initialModel.ECTS)}
                            options={ECTSoptions}
                            className={"tl"}
                            onChange={setECTS}
                            isSearchable={false}
                            value={ECTS}
                        />
                    </Form.Group>
                </div>

                <Form.Label>Módulo</Form.Label>
                <CreatableSelect
                    defaultValue={generateOption(initialModel.module)}
                    options={moduleOptions}
                    className={"tl pa2"}
                    onChange={setModule}
                    isDisabled={moduleOptions===[]}
                    value={module}
                />

                <Form.Label>Departamento</Form.Label>
                <Select
                    defaultValue={generateOption(initialModel.department)}
                    options={departmentOptions}
                    className={"tl pa2"}
                    onChange={handleDepartmentChange}
                    value={department}
                />

                <Form.Label>Coordinador</Form.Label>
                <Select
                    isDisabled={department===""}
                    defaultValue={generateOption(initialModel.coordinator)}
                    options={coordinatorOptions}
                    className={"tl pa2"}
                    onChange={setCoordinator}
                    value={coordinator}
                />

                <div className={"mt4 mb2 form-control"}>
                    <Form.Label>Descripción de contenidos mínimos</Form.Label>
                    <TextEditor onChange={setMinContents} defaultValue={initialModel.minContents}/>
                </div>

                <div className={"mt4 mb2 form-control"}>
                    <Form.Label>Programa</Form.Label>
                    <TextEditor onChange={setProgram} defaultValue={initialModel.program}/>
                </div>

                <Accordion className={"mt4 mb4 form-control"} defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Competencias</Accordion.Header>
                        <Accordion.Body className={"bg-light-green"}>
                            <div className={"bg-light-green"}>
                                <Form.Label>Básicas</Form.Label>
                                <TextEditor onChange={setCompetencesBasic} defaultValue={initialModel.competences.basic}/>

                                <Form.Label>Generales y transversales</Form.Label>
                                <TextEditor onChange={setCompetencesGeneral} defaultValue={initialModel.competences.general}/>

                                <Form.Label>Específicas</Form.Label>
                                <TextEditor onChange={setCompetencesSpecific} defaultValue={initialModel.competences.specific}/>
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>

                <div className={"mt4 mb4 form-control"}>
                    <Form.Label>Evaluación</Form.Label>
                    <TextareaAutosize defaultValue={initialModel.evaluation} onChange={(e) => setEvaluation(e.target.value)} className={"w-100 form-control"}></TextareaAutosize>
                </div>

                <div className={"mt4 mb4 form-control"}>
                    <Form.Label>Resultados de aprendizaje</Form.Label>
                    <TextEditor defaultValue={initialModel.results} onChange={setResults} className={"w-100 form-control"}></TextEditor>
                </div>

                <div className={"mt2 mb2 form-control"}>
                    <Form.Label>Bibliografía</Form.Label>
                    <TextEditor defaultValue={initialModel.literature} onChange={setLiterature} className={"h3"}/>
                </div>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" type="submit">Subir</Button>
                <Button variant={"danger"} onClick={props.onHide}>Cancelar</Button>
            </Modal.Footer>
            </Form>

        </Modal>
    );
}