import {obtenerHora} from "./singleton.services"

export async function getSingleton(req, res) {
    res.json({hora: obtenerHora()});
}