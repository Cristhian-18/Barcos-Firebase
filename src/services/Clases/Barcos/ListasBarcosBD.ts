
import { Barco } from "./Barcos";
import { db } from "../../ConexionBD/conexion";
import { ref, set, get, update, remove, child, push } from "firebase/database";


export class TlistaBarco {
    ListaBarco: Barco[];
    ListaBarcoF: Barco[];

    constructor() {
        this.ListaBarco = [];
        this.ListaBarcoF = [];
        this.cargarDatos();
    }

    async cargarDatos() {
        try {
            const dbRef = ref(db);
            const snapshot = await get(child(dbRef, 'listaBarcos'));
            if (snapshot.exists()) {
                const data = snapshot.val();
                this.ListaBarcoF = Object.keys(data).map(key => ({ id: key, ...data[key] }));             
            } else {
                console.log("No hay datos disponibles, agregando datos predefinidos.");
                this.ListaBarcoF = [];
            }
        } catch (error) {
            console.error("Error al cargar los datos:", error);
        }
    }

    async Insertar(op: Barco) {
        try {
            const newRef = push(ref(db, 'listaBarcos'));
            await set(newRef, op);
            return 200;
        } catch (error) {
            console.error("Error al insertar el dato:", error);
        }
    }

    async Modificar(id: string, op: Barco) {
        try {
            const barcoRef = ref(db, `listaBarcos/${id}`);
            await update(barcoRef, op);
            //await this.cargarDatos();
        } catch (error) {
            console.error("Error al modificar el dato:", error);
        }
    }

    async Eliminar(id: string) {
        try {
            const barcoRef = ref(db, `listaBarcos/${id}`);
            await remove(barcoRef);
            //await this.cargarDatos();
        } catch (error) {
            console.error("Error al eliminar el dato:", error);
        }
    }
    Listar() {
        return this.ListaBarcoF;
    }

}