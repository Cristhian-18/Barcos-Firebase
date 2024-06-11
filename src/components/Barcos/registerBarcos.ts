
import { TlistaBarco } from '../../services/Clases/Barcos/ListasBarcosBD';
import { Barco } from "../../services/Clases/Barcos/Barcos";
import { TlistaPersona } from "../../services/Clases/Socio/ListaPersonaBD";
import Swal from "sweetalert2";

const nombreM = document.querySelector("#numeroM") as HTMLInputElement;
const nombre = document.querySelector("#nombre") as HTMLInputElement;
const numeroA = document.querySelector("#numeroA") as HTMLInputElement;
const cuota = document.querySelector("#cuota") as HTMLInputElement;

const form = document.querySelector("#frmEdit") as HTMLFormElement;
const socio = document.querySelector(
  "#socioL"
) as HTMLInputElement;
let banderainsert = false;
let posedit = "";


const crud = new TlistaBarco();
const crude = new TlistaPersona();

Actualizar();


export function cargarcomboxE() {
  document.addEventListener("DOMContentLoaded", () => {
    const selectCategoriaRevistas = document.getElementById(
      "socioL"
    ) as HTMLSelectElement;
  
    selectCategoriaRevistas.addEventListener("change", () => {
      //indexE = selectCategoriaRevistas.selectedIndex - 1;
    });

    crude.cargarDatos().then(() => {
      crude.ListaPersonaF.forEach((estudiante, index) => {
        const option = document.createElement("option");
        option.value = JSON.stringify(estudiante);
        option.textContent = `${estudiante.nombre} ${estudiante.apellido}`;
        selectCategoriaRevistas.appendChild(option);
      });
    }).catch((error) => {
      console.error("Error al cargar los datos:", error);
    });

  });
}
cargarcomboxE();


document
  .querySelector(".btn-guardar")!
  .addEventListener("click", () => Guardar());

document
  .querySelector(".btn-cerrar")!
  .addEventListener("click", () => limpiarCampos());

export function Guardar() {
  if (banderainsert == true) {
    const socioJSON = JSON.parse(socio.value);
    const aux = new Barco(
     nombreM.value,
     nombre.value,
     numeroA.value,
     cuota.value
    );
    aux.duenoB.push(socioJSON)

    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esta acción!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, modificar!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        crud.Modificar(posedit, aux);
        Actualizar();
        limpiarCampos();
        Swal.fire(
          "Modificado!",
          "El registro ha sido Modificado con Exito!",
          "success"
        );
      }
    });
    limpiarCampos();
    banderainsert = false;
    
  } else {
    insertar();
    Actualizar();
    limpiarCampos();
  }
}

export async function insertar() {
  const socioJSON = JSON.parse(socio.value);
  const op = new Barco(
   nombreM.value,
   nombre.value,
   numeroA.value,
   cuota.value
  );
  op.duenoB.push(socioJSON)
  const response = await crud.Insertar(op);

  if (response === 200) {
    Swal.fire(
      "¡Inserción exitosa!",
      "Los datos han sido guardados correctamente.",
      "success"
    );
    Actualizar(); 
  } else {
    Swal.fire("Error", "Hubo un problema al insertar los datos.", "error");
  }
}

function limpiarCampos() {
  (document.getElementById("socioL") as HTMLSelectElement).selectedIndex = 0;
  nombreM.value ="";
  nombre.value ="";
  numeroA.value ="";
  cuota.value ="";
  banderainsert = false;
}

export function cargar(op: Barco) {
  const socioSelect = document.querySelector("#socioL") as HTMLSelectElement;
  nombreM.value = op.numeroMatricula;
  nombre.value = op.nombre;
  numeroA.value = op.numeroAmarre;
  cuota.value = op.cuota;

  if (op.duenoB.length > 0) {
    const dueno = op.duenoB[0];

    for (let i = 0; i < socioSelect.options.length; i++) {
      const option = socioSelect.options[i];
      try {
        const optionValue = JSON.parse(option.value);

        if (optionValue.cedula === dueno.cedula) {
          socioSelect.selectedIndex = i;
          break;
        }
      } catch (error) {
        
      }
    }
  }

  posedit = op.id;
  banderainsert = true;
}


export function eliminar(op:string) {

  Swal.fire({
    title: "¿Estás seguro?",
    text: "¡No podrás revertir esta acción!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, eliminar!",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      crud.Eliminar(op);
      Actualizar();
      if(crud.ListaBarcoF.length ==0){
        const body = document.querySelector("tbody")!;
        body.innerHTML = ""; 
      }
      Swal.fire("¡Eliminado!", "El registro ha sido eliminado.", "success");
    }
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


export function Listar(op: TlistaBarco) {
  const body = document.querySelector("tbody")!;
  body.innerHTML = ""; 
  const clase =
    "px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200";

  op.ListaBarcoF.forEach((barco, index) => {
   
    const tabla = document.createElement("tr");

    const cod = document.createElement("td");
    cod.className = clase;
    cod.textContent = barco.numeroMatricula;

    const nom = document.createElement("td");
    nom.className = clase;
    nom.textContent = barco.nombre;
    const dueno = document.createElement("td");
    dueno.className = clase;
    dueno.textContent = barco.duenoB[0].nombre +" "+ barco.duenoB[0].apellido;

    const auto = document.createElement("td");
    auto.className = clase;
    auto.textContent = barco.numeroAmarre;

    const edito = document.createElement("td");
    edito.className = clase;
    edito.textContent = barco.cuota;

    const edit = document.createElement("td");
    const botonContainer = document.createElement("div");
    const botonEditar = document.createElement("button");
    botonEditar.className =
      "btnEditar btn btn-secondary focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900";
    botonEditar.innerHTML = "Editar";
    const botonEliminar = document.createElement("button");
    botonEliminar.className =
      "btnBorrar btn btn-danger focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900";
    botonEliminar.innerHTML = "Eliminar";

    botonContainer.appendChild(botonEditar);
    botonContainer.appendChild(botonEliminar);

    edit.appendChild(botonContainer);

    botonContainer.addEventListener("click", (event) => {
      const target = event.target as HTMLElement;

      if (target === botonEditar) {
        cargar(barco);
        const botonAgregar = document.getElementById("btnNuevo");
        if (botonAgregar) {
          console.log("s");
          botonAgregar.click();
        }
      } else if (target === botonEliminar) {
        console.log("Eliminando barco en la posición:", barco.id);
        eliminar(barco.id);
      }
    });

    tabla.append(cod, nom, dueno,auto, edito,edit);

    const body = document.querySelector("tbody")!;
    body.prepend(tabla);
  });
}
