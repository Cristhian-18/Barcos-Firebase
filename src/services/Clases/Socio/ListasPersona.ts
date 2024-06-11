import { Persona } from "../Socio/Persona";

export class TlistaPersona {
    ListaPersona: Persona[];
    ListaPersonaF: Persona[];

    constructor() {
        const storedData = localStorage.getItem('listaPersonas');
        this.ListaPersonaF = storedData ? JSON.parse(storedData) : [];
        if (!storedData) {
            this.agregarDatosPredefinidos();
        }
        this.ListaPersona = [];
    }

    Insertar(op: Persona) {
        this.ListaPersonaF.push(op);
        this.guardarEnLocalStorage();
    }
    Modificar(pos: number, op: Persona) {
        this.ListaPersonaF[pos] = op;
        this.guardarEnLocalStorage();
    }
    Eliminar(pos: number) {      
        this.ListaPersonaF.splice(pos, 1);
        this.guardarEnLocalStorage();
    }

    Listar(){
        this.ListaPersonaF.forEach(a => {
            return a;
        })
    }

    private guardarEnLocalStorage() {
        localStorage.setItem('listaPersonas', JSON.stringify(this.ListaPersonaF));
    }

    private agregarDatosPredefinidos() {
        this.ListaPersonaF = [
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
            estado_civil: "Soltero",
            tipo: "Cliente"
         }
        ];
    }
}