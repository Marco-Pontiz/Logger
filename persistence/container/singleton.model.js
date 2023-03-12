let instancia = null; 

export default class PrimeraConexion {
    constructor() {
        this.hora = new Date().toLocaleString();
    }
    //Método estático que garantiza que solo haya una instancia de la clase
    static getInstance() {
        if (!instancia) {
            instancia = new PrimeraConexion();
        }
        return instancia;
    }
    
    obtenerHora() {
        return this.hora;
    } 
}

