
import { Barco } from "./Barcos";

export class TlistaBarco {
    ListaBarco: Barco[];
    ListaBarcoF: Barco[];

    constructor() {
        const storedData = localStorage.getItem('listaBarcos');
        this.ListaBarcoF = storedData ? JSON.parse(storedData) : [];
        
        this.ListaBarco = [];
    }

    Insertar(op: Barco) {
        this.ListaBarcoF.push(op);
        this.guardarEnLocalStorage();
    }
    Modificar(pos: number, op: Barco) {
        this.ListaBarcoF[pos] = op;
        this.guardarEnLocalStorage();
    }
    Eliminar(pos: number) {      
        this.ListaBarcoF.splice(pos, 1);
        this.guardarEnLocalStorage();
    }

    Listar(){
        this.ListaBarcoF.forEach(a => {
            return a;
        })
    }

    private guardarEnLocalStorage() {
        localStorage.setItem('listaBarcos', JSON.stringify(this.ListaBarcoF));
    }


}