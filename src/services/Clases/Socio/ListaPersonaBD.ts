import { db } from "../../ConexionBD/conexion";
import { Persona } from "../Socio/Persona";
import { ref, set, get, update, remove, child, push } from "firebase/database";

export class TlistaPersona {
    ListaPersona: Persona[];
    ListaPersonaF: Persona[];

    constructor() {
        this.ListaPersona = [];
        this.ListaPersonaF = [];
    }

    async cargarDatos() {
        try {
            const dbRef = ref(db);
            const snapshot = await get(child(dbRef, 'listaPersonas'));
            if (snapshot.exists()) {
                const data = snapshot.val();
                this.ListaPersonaF = Object.keys(data).map(key => ({ id: key, ...data[key] }));
                
            } else {
                console.log("No hay datos disponibles, agregando datos predefinidos.");
                await this.agregarDatosPredefinidos();
            }
        } catch (error) {
            console.error("Error al cargar los datos:", error);
        }
    }

    async Insertar(op: Persona) {
        try {
            const newRef = push(ref(db, 'listaPersonas'));
            await set(newRef, op);
            await this.cargarDatos();
        } catch (error) {
            console.error("Error al insertar el dato:", error);
        }
    }

    async Modificar(id: string, op: Persona) {
        try {
            const personaRef = ref(db, `listaPersonas/${id}`);
            await update(personaRef, op);
            await this.cargarDatos();
        } catch (error) {
            console.error("Error al modificar el dato:", error);
        }
    }

    async Eliminar(id: string) {
        try {
            const personaRef = ref(db, `listaPersonas/${id}`);
            await remove(personaRef);
            await this.cargarDatos();
        } catch (error) {
            console.error("Error al eliminar el dato:", error);
        }
    }

    Listar() {
        return this.ListaPersonaF;
    }

    private async agregarDatosPredefinidos() {
        const predefinedData = [
            {
                cedula: "0706678786",
                nombre: "Cristhian José",
                apellido: "Cordova Minalla",
                fecha_Nacimiento: "2002-10-17",
                sexo: "Masculino",
                estado_civil: "Soltero",
                tipo: "Socio"
            },
            {
                cedula: "0702215156",
                nombre: "Angel Dustin",
                apellido: "Castro Lopez",
                fecha_Nacimiento: "2002-12-17",
                sexo: "Masculino",
                estado_civil: "Soltero",
                tipo: "Cliente"
            },
            {
                cedula: "0703325236",
                nombre: "Jessica Yaritza",
                apellido: "Minalla Velez",
                fecha_Nacimiento: "2000-05-20",
                sexo: "Femenino",
                estado_civil: "Soltero",
                tipo: "Cliente"
            },
            {
                cedula: "0701121215",
                nombre: "Wendy Yamilet",
                apellido: "Minalla Lopez",
                fecha_Nacimiento: "2010-05-20",
                sexo: "Femenino",
                estado_civil: "Union Libre",
                tipo: "Cliente"
            },
            {
                cedula: "0706989896",
                nombre: "Anthony Steven",
                apellido: "Gonzales Hall",
                fecha_Nacimiento: "1999-10-17",
                sexo: "Masculino",
                estado_civil: "Soltero",
                tipo: "Cliente"
            },
            {
                cedula: "0702232325",
                nombre: "Paulina Gabriela",
                apellido: "Velazquez Ramirez",
                fecha_Nacimiento: "2000-01-10",
                sexo: "Femenino",
                estado_civil: "Casada",
                tipo: "Socio"
            },
            {
                cedula: "0701136589",
                nombre: "Angelica Genesis",
                apellido: "Cedeño Ochoa",
                fecha_Nacimiento: "2001-12-10",
                sexo: "Femenino",
                estado_civil: "Casada",
                tipo: "Cliente"
            }
        ];

        for (const persona of predefinedData) {
            await this.Insertar(persona);
        }
    }
}
