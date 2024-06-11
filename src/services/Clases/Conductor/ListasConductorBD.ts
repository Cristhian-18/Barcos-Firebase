import { Conductor } from "./Conductor";
import { db } from "../../ConexionBD/conexion";
import { ref, set, get, update, remove, child, push } from "firebase/database";

export class TlistaConductor {
    ListaConductor: Conductor[];
    ListaConductorF: Conductor[];

    constructor() { 
        this.ListaConductor = [];
        this.ListaConductorF = [];
    }

    async cargarDatos() {
        try {
            const dbRef = ref(db);
            const snapshot = await get(child(dbRef, 'listaConductor'));
            if (snapshot.exists()) {
                const data = snapshot.val();
                this.ListaConductorF = Object.keys(data).map(key => ({ id: key, ...data[key] }));
                
            } else {
                console.log("No hay datos disponibles, agregando datos predefinidos.");
                await this.agregarDatosPredefinidos();
            }
        } catch (error) {
            console.error("Error al cargar los datos:", error);
        }
    }

    async Insertar(op: Conductor) {
        try {
            const newRef = push(ref(db, 'listaConductor'));
            await set(newRef, op);
            await this.cargarDatos();
        } catch (error) {
            console.error("Error al insertar el dato:", error);
        }
    }

    async Modificar(id: string, op: Conductor) {
        try {
            const conductorRef = ref(db, `listaConductor/${id}`);
            await update(conductorRef, op);
            await this.cargarDatos();
        } catch (error) {
            console.error("Error al modificar el dato:", error);
        }
    }

    async Eliminar(id: string) {
        try {
            const conductorRef = ref(db, `listaConductor/${id}`);
            await remove(conductorRef);
            await this.cargarDatos();
        } catch (error) {
            console.error("Error al eliminar el dato:", error);
        }
    }

    Listar() {
        return this.ListaConductorF;
    }

    private async agregarDatosPredefinidos() {
        const predefinedData = [
            {
                cedula: "0701125256",
                nombre: "Jose Luis",
                apellido: "Velez Gomez",
            },
            {
                cedula: "0701141412",
                nombre: "Luis Angel",
                apellido: "Gomez Placios",
            },
            {
                cedula: "0703362658",
                nombre: "Pedro Wilfrido",
                apellido: "Loaiza Puna",
            },
            {
                cedula: "0702253587",
                nombre: "Marvin Hadnner",
                apellido: "Torres Vega",
            },
            {
                cedula: "0701237241",
                nombre: "Moises Jaiver",
                apellido: "Chacha Castro",
            }
        ];

        for (const conductor of predefinedData) {
            await this.Insertar(conductor);
        }
    }
}
