
import { AqrquilerBarco } from "./ArquilerBarcos";



export class TlistaAqrquilerBarco {
    ListaAqrquilerBarco: AqrquilerBarco[];
    ListaAqrquilerBarcoF: AqrquilerBarco[];

    constructor() {
        const storedData = localStorage.getItem('listaAqrquilerBarcos');
        this.ListaAqrquilerBarcoF = storedData ? JSON.parse(storedData) : [];
        
        this.ListaAqrquilerBarco = [];
    }

    Insertar(op: AqrquilerBarco) {
        this.ListaAqrquilerBarcoF.push(op);
        this.guardarEnLocalStorage();
    }
    Modificar(pos: number, op: AqrquilerBarco) {
        this.ListaAqrquilerBarcoF[pos] = op;
        this.guardarEnLocalStorage();
    }
    Eliminar(pos: number) {      
        this.ListaAqrquilerBarcoF.splice(pos, 1);
        this.guardarEnLocalStorage();
    }

    Listar(){
        this.ListaAqrquilerBarcoF.forEach(a => {
            return a;
        })
    }

    private guardarEnLocalStorage() {
        localStorage.setItem('listaAqrquilerBarcos', JSON.stringify(this.ListaAqrquilerBarcoF));
    }


}