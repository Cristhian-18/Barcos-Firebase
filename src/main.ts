// import { TlistaPersona } from "./services/Clases/Socio/ListaPersonaBD";
import { TlistaPersona } from "./services/Clases/Socio/ListaPersonaBD";

const crud = new TlistaPersona();

// Asegúrate de que los datos se carguen antes de listar
Actualizar();

export async function Listar(op: TlistaPersona) {
    console.log(op.Listar());
    const body = document.querySelector("tbody")!;
    body.innerHTML = ""; 
    const clase =
        "px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200";

    op.ListaPersonaF.forEach((libro, index) => {
        const tabla = document.createElement("tr");

        const cod = document.createElement("td");
        cod.className = clase;
        cod.textContent = libro.cedula;

        const nom = document.createElement("td");
        nom.className = clase;
        nom.textContent = libro.nombre;

        const auto = document.createElement("td");
        auto.className = clase;
        auto.textContent = libro.apellido;

        const edito = document.createElement("td");
        edito.className = clase;
        edito.textContent = libro.fecha_Nacimiento;

        const cate = document.createElement("td");
        cate.className = clase;
        cate.textContent = libro.sexo;

        const anos = document.createElement("td");
        anos.className = clase;
        anos.textContent = libro.estado_civil;

        const tipo = document.createElement("td");
        tipo.className = clase;
        tipo.textContent = libro.tipo;

        tabla.append(cod, nom, auto, edito, cate, anos, tipo);

        body.prepend(tabla);
    });
}
export function Actualizar() {
    // Mostrar el loader
    document.getElementById('loader')!.classList.remove('hidden');
    crud.cargarDatos()
        .then(() => {
           
            document.getElementById('loader')!.classList.add('hidden');
            Listar(crud);  
        })
        .catch((error) => {
            
            document.getElementById('loader')!.classList.add('hidden');
  
            console.error("Error al cargar los datos:", error);
        });
  }
  