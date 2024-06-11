
import { ArquilerBarco } from "./ArquilerBarcos";
import { db } from "../../ConexionBD/conexion";
import { ref, set, get, update, remove, child, push } from "firebase/database";

export class TlistaArquilerBarco {
    ListaArquilerBarco: ArquilerBarco[];
    ListaArquilerBarcoF: ArquilerBarco[];

    constructor() {
        this.ListaArquilerBarco = [];
        this.ListaArquilerBarcoF = [];
        this.cargarDatos();
    }

    async cargarDatos() {
        try {
            const dbRef = ref(db);
            const snapshot = await get(child(dbRef, 'listaArquilerBarcos'));
            if (snapshot.exists()) {
                const data = snapshot.val();
                this.ListaArquilerBarcoF = Object.keys(data).map(key => ({ id: key, ...data[key] }));
                
            } else {
                console.log("No hay datos disponibles.");
                this.ListaArquilerBarcoF = [];
            }
        } catch (error) {
            console.error("Error al cargar los datos:", error);
        }
    }

    async Insertar(op: ArquilerBarco) {
        try {
            const newRef = push(ref(db, 'listaArquilerBarcos'));
            await set(newRef, op);
            //await this.cargarDatos();
            return 200;
        } catch (error) {
            console.error("Error al insertar el dato:", error);
        }
    }

    async Modificar(id: string, op: ArquilerBarco) {
        try {
            const barcoRef = ref(db, `listaArquilerBarcos/${id}`);
            await update(barcoRef, op);
            //await this.cargarDatos();
        } catch (error) {
            console.error("Error al modificar el dato:", error);
        }
    }

    async Eliminar(id: string) {
        try {
            const barcoRef = ref(db, `listaArquilerBarcos/${id}`);
            await remove(barcoRef);
            //await this.cargarDatos();
        } catch (error) {
            console.error("Error al eliminar el dato:", error);
        }
    }

    Listar() {
        return this.ListaArquilerBarcoF;
    }
}
