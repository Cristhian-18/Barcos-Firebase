
import { ArquilerBarco } from "./ArquilerBarcos";



export class TlistaArquilerBarco {
    ListaArquilerBarco: ArquilerBarco[];
    ListaArquilerBarcoF: ArquilerBarco[];

    constructor() {
        const storedData = localStorage.getItem('listaArquilerBarcos');
        this.ListaArquilerBarcoF = storedData ? JSON.parse(storedData) : [];
        
        this.ListaArquilerBarco = [];
    }

    Insertar(op: ArquilerBarco) {
        this.ListaArquilerBarcoF.push(op);
        this.guardarEnLocalStorage();
    }
    Modificar(pos: number, op: ArquilerBarco) {
        this.ListaArquilerBarcoF[pos] = op;
        this.guardarEnLocalStorage();
    }
    Eliminar(pos: number) {      
        this.ListaArquilerBarcoF.splice(pos, 1);
        this.guardarEnLocalStorage();
    }

    Listar(){
        this.ListaArquilerBarcoF.forEach(a => {
            return a;
        })
    }

    private guardarEnLocalStorage() {
        localStorage.setItem('listaArquilerBarcos', JSON.stringify(this.ListaArquilerBarcoF));
    }


}