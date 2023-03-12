import PrimeraConexion from "./singleton.model";

export function obtenerHora() {
    const instancia = PrimeraConexion.getInstance();
    return instancia.obtenerHora();
}