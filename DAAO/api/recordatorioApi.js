import {RecordatorioDAO} from "../dao/recordatorioDAO.js";
import {Recordatorio} from "../../model/recordatorio.model.js";
import crypto from "crypto";

export default class RecordatorioApi {
    constructor() {
        this.RecordatorioDAO = new RecordatorioDAO();
    }

    getRecordatorios() {
        return this.RecordatorioDAO.getRecordatorios();
    }
    createRecordatorio = ({ datos }) => {
        const id = crypto.randomBytes(10).toString("hex");
        const nuevoRecordatorio = new Recordatorio(id, datos);

        this.RecordatorioDAO.saveRecordatorio(nuevoRecordatorio);
        return nuevoRecordatorio;
    }

    markAsReadRecordatorio = ({ id }) => {
        const updateRecordatorio = this.RecordatorioDAO.updateRecordatorio(id, {leido: true});
        return updateRecordatorio;
    }

    deleteReadRecordatorio = () => {
        const deletedRecordatorio = this.RecordatorioDAO.deleteRecordatorioWhere("leido", true);
        return deletedRecordatorio;
    }
}