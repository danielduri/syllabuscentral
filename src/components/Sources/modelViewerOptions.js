import {generateOption} from "./modelViewerFunctions";

export const typeOptions = [
    generateOption("Formación básica"),
    generateOption("Optativa"),
    generateOption("Obligatoria"),
    generateOption("Trabajo de fin de grado")
]

export const ECTSoptions = [
    generateOption(3),
    generateOption(4.5),
    generateOption(6),
    generateOption(9),
    generateOption(12)
]

export const periodOptions = [
    { label: "1", value: 1},
    { label: "2", value: 2},
    { label: "Ninguno", value: 0}
]

export const languageOptions = [
    { label: "Español", value: "Español"},
    { label: "Inglés", value: "Inglés"}
]