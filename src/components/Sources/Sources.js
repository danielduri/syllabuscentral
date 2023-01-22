import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import Unauthorized from "../Common/Unauthorized";
import {Button, Form, Table} from "react-bootstrap";
import {ModelViewer} from "./ModelViewer";
import {FileUpload} from "./FileUpload";
import {tokenFetch} from "../Common/functions/tokenFetch";

function getModel(courseID) {
    return tokenFetch(`getModel?courseid=${courseID}`, {
        method: 'get',
        headers: {"Content-type": "application/json"},
    }).then(res => {
        return res;
    })
}

function Sources (){

    /*const model = {
        "degree": "DOBLE GRADO DE ADMINISTRACIÓN DE EMPRESAS E INFORMATICA",
        "year": 5,
        "period": 1,
        "language": "Español",
        "code": 901582,
        "name": "Ampliación de Sistemas Operativos y Redes",
        "intlName": "Advanced Operating Systems and Networks",
        "shorthand": "ASOR",
        "type": "Obligatoria",
        "ECTS": 6,
        "subject": "Sistemas Operati",
        "module": "Complementario",
        "department": "Arquitectura de Computadores y Automática",
        "coordinator": "Santiago Montero, Rubén Manuel",
        "minContents": [
            "Administración con lenguajes de script.",
            "Diseño e implementación de aplicaciones basadas en servicios del SO.",
            "Utilidades de monitorización.",
            "Introducción a sistemas distribuidos.",
            "Internet de nueva generación (Ipv6).",
            "Protocolos de encaminamiento.",
            "Protocolos y servicios de red avanzados.",
            "Programaci",
            "ón con sockets."
        ],
        "program": [
            "1. AMPLIACIÓN DE REDES",
            "1.1. Revisión del protocolo IPv4. DHCP",
            "-Revisión de IPv4, ARP e ICMP",
            "-Configuración dinámica (DHCP)",
            "1.2. Conceptos avanzados del protocolo TCP",
            "-Revisión de TCP",
            "-Control de errores y temporizadores de retransmisió",
            "n-Control de flujo y congestión",
            "-Ajuste de parámetros",
            "1.3. Servicios de red",
            "-Traducción de direcciones de red (NAT)",
            "-Filtrado de paquetes",
            "-Sistema de nombres de dominio (DNS)",
            "1.4. Internet de nueva generación IPv6",
            "-Comparación con IPv4",
            "-Direccionamiento",
            "-Formato del datagrama",
            "-ICMPv6",
            "1.5. Encaminamiento en Internet",
            "-Sistemas autónomos",
            "-RIP, OSPF y BGP",
            "2. AMPLIACIÓN DE SISTEMAS OPERATIVOS",
            "2.1. Introducción",
            "-Estructura y recursos del sistema",
            "-Arquitectura del sistema operativo Li",
            "nux",
            "-Interfaz de llamadas al sistema",
            "-Códigos de error y gestión de errores",
            "-Llamadas al sistema y funciones de biblioteca",
            "2.2. Gestión del sistemas de ficheros",
            "-Arquitectura del sistema de ficheros",
            "-Manejo de ficheros ordinarios",
            "-Manejo de directorios",
            "2.3. Gestión de procesos y memoria",
            "",
            "-Estructura e información de procesos",
            "-Ejecución de programas",
            "-Control de procesos",
            "-Gestión de señales y temporizadores",
            "-Comunicación mediante tuberías (pipes)",
            "2.4. Programación con sockets",
            "-Modelo cliente",
            "-servidor",
            "-Tipos de sockets",
            "-Gestión y uso de sockets",
            "PRÁCTICAS",
            "1.1. DHCP",
            "1.2. TCP",
            "1.3. DNS",
            "1.4. IPv6",
            "1.5. RIP",
            "2.1. Programación shell",
            "2.2. Entorno de desarrollo",
            "2.3. Sistema de ficheros",
            "2.4. Procesos",
            "2.5. Tuberías",
            "2.6. Sockets"
        ],
        "competences": {
            "basic": [
                "CT1",
                "-Capacidad de comunicación oral y escrita, en inglés y español utilizando los medios audiovisuales habituales, y para trabajar",
                "en equipos",
                "multidisciplinares y en contextos internacionales.",
                "CT2",
                "-Capacidad de análisis y síntesis en la resolución de problemas.",
                "CT3",
                "-Capacidad para gestionar adecuadamente la información disponible integrando creativamente conocimientos y aplicándolos a la r",
                "esolución",
                "de problemas informáticos utilizando el método científico.",
                "CT4",
                "-Capacidad de organización, planificación, ejecución y",
                "dirección de recursos humanos.",
                "",
                "CT5",
                "-Capacidad para valorar la repercusión social y medioambiental de las soluciones de la ingeniería, y para perseguir objetivos",
                "de calidad en",
                "el desarrollo de su actividad profesional."
            ],
            "general": [
                "CG3",
                "-Conocimientos básicos sobre el uso y programación de los ordenadores, sistemas operativos, bases de datos y programas informá",
                "ticos con",
                "aplicación en ingeniería.",
                "CG10",
                "-Conocimiento, administración y mantenimiento",
                "sistemas, servicios y aplicaciones informáticas.",
                "CG15",
                "-Conocimiento de las características, funcionalidades y estructura de los Sistemas Operativos y diseñar e implementar aplicaci",
                "ones basadas",
                "en sus servicios.",
                "CG16",
                "-Conocimiento y aplicación de las caracte",
                "rísticas, funcionalidades y estructura de los Sistemas Distribuidos, las Redes de Computadores",
                "e Internet y diseñar e implementar aplicaciones basadas en ellas.",
                "CG19",
                "-Conocimiento y aplicación de los principios fundamentales y técnicas básicas de la program",
                "ación paralela, concurrente, distribuida y de",
                "tiempo real."
            ],
            "specific": [
                "No tiene"
            ]
        },
        "results": [
            "Analizar los requisitos de funcionamiento de una red de computadores y diseñar la estructura y servicios adecuados (CG10, CG1",
            "6, CT1, CT3)",
            "Comprensión del funcionamiento de los algoritmos de encaminamiento y configuración de los mismos (CG10, CG16, CT2, CT3)",
            "Desarrollo de aplicaciones distribuidas (CG3, CG10, CG15, CG16, CG19, CT2, CT3, CT5)",
            "Desarrollo de aplicaciones específicas para la gestión de sistemas de ficheros, gestión de memoria y sincronización y planifi",
            "cación de procesos",
            "(CG3, CG10, CG15, CT2, CT3)",
            "Desarrollo de prácticas en equipo (CT1, CT4)"
        ],
        "evaluation": "Asistencia al laboratorio y realización de prácticas durante el cuatrimestre = 10% Examen final teórico -práctico (laboratorio y aula) = 90% (50% teoría y 40% práctica). Tanto para la convocatoria ordinaria como para la extraordinaria. Es necesario obtener al menos un 40% de la nota en cada parte para aprobar. La nota obtenida durante el curso en las prácticas se conserva para la convocatoria extraordinaria. En la convocatoria extrao rdinaria no existirá la opción de entregar nuevas prácticas",
        "literature": [
            "· A.S. Ta",
            "nenbaum and A.S. Woodhull.; Operating Systems Design and Implementation.",
            "Prentice Hall. 3rd Edition; Enero 2006",
            "· Robert Love; Linux Kernel Development. Addison",
            "-Wesley. 3rd Edition. Julio 2010",
            "· F. Márquez García. “UNIX. Programación Avanzada”. 3ª Edición.",
            "Editorial RA",
            "-MA, 2004",
            "· L. Parziale. “TCP/IP Tutorial and Technical Overview”. 8th edition. IBM RedBooks. 2006.",
            "· Q. Li. “IPv6 Core Protocols Implementation”. 1st edition. Morgan Kaufmann Publishers.",
            "2005.",
            "· F. Halsall. “Redes de Computadores e Internet”.",
            "5ª edición. Addison",
            "-Wesley. 2006."
        ]
    }

     */

    const user = useSelector((state) => state.user)
    const [searchText, setSearchText] = useState("");
    const [ newModel, setNewModel ] = useState(false);
    const [ view, setView ] = useState(false);
    const [ copy, setCopy ] = useState(false);
    const [ upload, setUpload ] = useState(false);
    const [ validate, setValidate ] = useState(false);
    const [ model, setModel ] = useState(undefined);

    const [ list, setList ] = useState([]);

    const getList = (search) => {
        tokenFetch('getModels', {
            method: 'put',
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({
                search: search
            })
        }).then(data =>{
            if(data.length>0){
                let itemList = [];
                for (let i = 0; i < data.length; i++) {
                    const item = data[i];
                    if(i>0){
                        if(item.degree!==data[i-1].degree){
                            itemList.push(<tr key={item.degree}><td colSpan={100}><h4 className={"pv2"}>{item.degree}</h4></td></tr>)
                        }
                    }else{
                        itemList.push(<tr key={item.degree}><td colSpan={100}><h4 className={"pv2"}>{item.degree}</h4></td></tr>)
                    }
                    itemList.push( <tr key={item.courseid}>
                        <td>{item.courseid}</td>
                        <td>{item.shorthand}</td>
                        <td>{item.name}</td>
                        <td>{item.ECTS}</td>
                        <td>{item.coordinator}</td>
                        <td>{item.department}</td>
                        <td>{item.type}</td>
                        <td>
                            <div>
                                <Button variant={"success"} key={item.courseid} className={"ma1"} onClick={() => {
                                    getModel(item.courseid).then(response => {
                                        setModel(response);
                                        setView(true);
                                    })
                                }}>Ver</Button>
                                <Button variant={"success"} key={item.courseid + "copy"} className={"ma1"} onClick={() => {
                                    getModel(item.courseid).then(response => {
                                        setModel(response);
                                        setCopy(true);
                                    })
                                }}>Copiar</Button>
                        </div>
                        </td>
                    </tr>)
                }
                setList(itemList)
            }else{
                setList([]);
            }
        })
    }

    useEffect(() => {
        getList(searchText)
    }, [searchText])



    return (
        <div className={"center"}>
            <Form className="d-flex w-50 center">
                <Form.Control
                    type="search"
                    placeholder="Buscar..."
                    className="me-2"
                    aria-label="Search"
                    onChange={event => setSearchText(event.target.value)}
                    value={searchText}
                />
                {//searchText==="" ? <></> : <Button variant="outline-danger" onClick={() => setSearchText("")}>Borrar</Button>
                }
            </Form>

            <div className={"center tc pa3"}>
                <Button variant={"success"} className={"w-20 ma1"} onClick={() => setNewModel(true)}>
                    Nuevo modelo</Button>
                <ModelViewer show={newModel} mode={"create"} onHide={() => setNewModel(false)}></ModelViewer>

                <ModelViewer show={view} mode={"view"} model={model} onHide={() => setView(false)}></ModelViewer>

                <ModelViewer show={copy} mode={"copy"} model={model} onHide={() => setCopy(false)}></ModelViewer>

                <ModelViewer show={validate} mode={"validate"} model={model} onHide={() => setValidate(false)}></ModelViewer>

                <Button variant={"success"} className={"w-20 ma1"} onClick={() => setUpload(true)}>
                    Subir modelo</Button>
                <FileUpload show={upload} onHide={() => setUpload(false)} setModel={setModel} openViewer={setValidate}></FileUpload>

            </div>

            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Código</th>
                    <th>Abrev.</th>
                    <th>Asignatura</th>
                    <th>ECTS</th>
                    <th>Coordinador</th>
                    <th>Departamento</th>
                    <th>Tipo</th>
                    <th>Acciones</th>
                </tr>
                </thead>
                <tbody>
                {list.length > 0 ? list : <tr><td colSpan={100}><p className={"fw6 pv4"}>No hay resultados. Busca por nombre, abreviatura o código completo. </p></td></tr>}
                </tbody>
            </Table>

        </div>
    )

}

export default Sources;