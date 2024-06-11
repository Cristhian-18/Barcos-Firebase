import { TlistaPersona } from "../../services/Clases/Socio/ListaPersonaBD";
import { TlistaConductor } from "../../services/Clases/Conductor/ListasConductorBD";
import { ArquilerBarco } from "../../services/Clases/ArquilerBarcos/ArquilerBarcos";
import { TlistaArquilerBarco } from "../../services/Clases/ArquilerBarcos/ListasArquilerBarcosBD";
import { TlistaBarco } from "../../services/Clases/Barcos/ListasBarcosBD";
import toastr from "toastr";
import Swal from "sweetalert2";

const conductor = document.querySelector("#conductor") as HTMLInputElement;
const socios = document.querySelector("#socioL") as HTMLInputElement;
const barcos = document.querySelector("#barcos") as HTMLInputElement;
const destinos = document.querySelector("#destinos") as HTMLInputElement;
const fecha = document.querySelector("#fecha_inicio") as HTMLInputElement;
const form = document.querySelector("#frmEdit") as HTMLFormElement;

let banderainsert = false;
let posedit = "";
var cuota = 0;

const crud = new TlistaArquilerBarco();
const crude = new TlistaPersona();
const crudc = new TlistaConductor();
const crudb = new TlistaBarco();

Actualizar();

export function cargarcomboxE() {
  document.addEventListener("DOMContentLoaded", () => {
    const selectCategoriaRevistas = document.getElementById(
      "socioL"
    ) as HTMLSelectElement;

    selectCategoriaRevistas.addEventListener("change", () => {
      //indexE = selectCategoriaRevistas.selectedIndex - 1;
    });

    crude
      .cargarDatos()
      .then(() => {
        crude.ListaPersonaF.forEach((estudiante, index) => {
          const option = document.createElement("option");
          option.value = JSON.stringify(estudiante);
          option.textContent = `${estudiante.nombre} ${estudiante.apellido}`;
          selectCategoriaRevistas.appendChild(option);
        });
      })
      .catch((error) => {
        console.error("Error al cargar los datos:", error);
      });
  });
}
cargarcomboxE();

export function cargarcomboxB() {
  document.addEventListener("DOMContentLoaded", () => {
    const selectCategoriaRevistas = document.getElementById(
      "barcos"
    ) as HTMLSelectElement;

    selectCategoriaRevistas.addEventListener("change", () => {
      //indexE = selectCategoriaRevistas.selectedIndex - 1;
    });

    crudb
      .cargarDatos()
      .then(() => {
        crudb.ListaBarcoF.forEach((estudiante, index) => {
          const option = document.createElement("option");
          option.value = JSON.stringify(estudiante);
          option.textContent = `${estudiante.numeroMatricula}`;
          selectCategoriaRevistas.appendChild(option);
        });
      })
      .catch((error) => {
        console.error("Error al cargar los datos:", error);
      });
  });
}
cargarcomboxB();

export function cargarcomboxC() {
  document.addEventListener("DOMContentLoaded", () => {
    const selectCategoriaRevistas = document.getElementById(
      "conductor"
    ) as HTMLSelectElement;

    selectCategoriaRevistas.addEventListener("change", () => {
      //indexE = selectCategoriaRevistas.selectedIndex - 1;
    });
    crudc
      .cargarDatos()
      .then(() => {
        crudc.ListaConductorF.forEach((estudiante, index) => {
          const option = document.createElement("option");
          option.value = JSON.stringify(estudiante);
          option.textContent = `${estudiante.nombre} ${estudiante.apellido}`;
          selectCategoriaRevistas.appendChild(option);
        });
      })
      .catch((error) => {
        console.error("Error al cargar los datos:", error);
      });
  });
}
cargarcomboxC();

const divprecionfin = document.getElementById("TRecaudado");
const divprecionfinH1 = document.createElement("h4");
divprecionfinH1.className = "text-2xl font-semibold text-gray-700";
divprecionfinH1.textContent = "0,00";
divprecionfin!.appendChild(divprecionfinH1);

const divTViajes = document.getElementById("TViajes");
const divTViajesH1 = document.createElement("h1");
divTViajesH1.className = "text-2xl font-medium text-gray-700";
divTViajesH1.textContent = crud.ListaArquilerBarcoF.length.toString();
divTViajes!.appendChild(divTViajesH1);

const divMayorF = document.getElementById("MayorF");
const divMayorFH1 = document.createElement("h1");
divMayorFH1.className = "text-2xl font-medium text-gray-700";
divMayorFH1.textContent = "---";
divMayorF!.appendChild(divMayorFH1);

document
  .querySelector(".btn-guardar")!
  .addEventListener("click", () => Guardar());

document
  .querySelector(".btn-cerrar")!
  .addEventListener("click", () => limpiarCampos());

export function Guardar() {
  if (banderainsert == true) {
    const conduJSON = JSON.parse(conductor.value);
    const socioJSON = JSON.parse(socios.value);
    const barcoJSON = JSON.parse(barcos.value);
    if (socioJSON.tipo == "Socio") {
      cuota = 0;
    } else {
      cuotaPagar();
    }

    const aux = new ArquilerBarco(
      destinos.value,
      fecha.value,
      cuota.toString()
    );
    aux.nombreConductor.push(conduJSON);
    aux.nombreCliente.push(socioJSON);
    aux.nombreBarco.push(barcoJSON);

    if (socioJSON.fecha_Nacimiento) {
      var fechaNacimiento = new Date(socioJSON.fecha_Nacimiento);
      var edad = calcularEdad(fechaNacimiento);
      console.log(fechaNacimiento);
      console.log(edad);
      if (edad < 18) {
        Advertencia();
        limpiarCampos();
      } else {
        for (let j = 0; j < crudb.ListaBarcoF.length; j++) {
          const barco = crudb.ListaBarcoF[j];

          if (barco.duenoB && barco.duenoB.length > 0) {
            if (barco.duenoB[0].nombre === aux.nombreCliente[0].nombre) {
              aux.CuotaPagar = 0 + "";
            }
          }
        }

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
            divTViajesH1.textContent =
              crud.ListaArquilerBarcoF.length.toString();
            divTViajes!.appendChild(divTViajesH1);
            limpiarCampos();
            Swal.fire(
              "Modificado!",
              "El registro ha sido Modificado con Exito!",
              "success"
            );
          }
        });
      }
      limpiarCampos();
      function calcularEdad(fechaNacimiento: Date) {
        var hoy = new Date();
        var edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
        var mes = hoy.getMonth() - fechaNacimiento.getMonth();
        if (
          mes < 0 ||
          (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())
        ) {
          edad--;
        }
        return edad;
      }
    }

    banderainsert = false;
  } else {
    insertar();
    Actualizar();
    limpiarCampos();
  }
}

export async function insertar() {
  const conduJSON = JSON.parse(conductor.value);
  const socioJSON = JSON.parse(socios.value);
  const barcoJSON = JSON.parse(barcos.value);
  if (socioJSON.tipo == "Socio") {
    cuota = 0;
  } else {
    cuotaPagar();
  }

  const op = new ArquilerBarco(destinos.value, fecha.value, cuota.toString());
  op.nombreConductor.push(conduJSON);
  op.nombreCliente.push(socioJSON);
  op.nombreBarco.push(barcoJSON);

  console.log(op);

  if (socioJSON.fecha_Nacimiento) {
    var fechaNacimiento = new Date(socioJSON.fecha_Nacimiento);
    var edad = calcularEdad(fechaNacimiento);
    console.log(fechaNacimiento);
    console.log(edad);
    if (edad < 18) {
      Advertencia();
      
    } else {
      for (let j = 0; j < crudb.ListaBarcoF.length; j++) {
        const barco = crudb.ListaBarcoF[j];

        if (barco.duenoB && barco.duenoB.length > 0) {
          if (barco.duenoB[0].nombre === op.nombreCliente[0].nombre) {
            op.CuotaPagar = 0 + "";
          }
        }
      }
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
      Actualizar();
    }

    function calcularEdad(fechaNacimiento: Date) {
      var hoy = new Date();
      var edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
      var mes = hoy.getMonth() - fechaNacimiento.getMonth();
      if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
        edad--;
      }
      return edad;
    }
  }
}

export function limpiarCampos() {
  (document.getElementById("socioL") as HTMLSelectElement).selectedIndex = 0;
  (document.getElementById("conductor") as HTMLSelectElement).selectedIndex = 0;
  (document.getElementById("barcos") as HTMLSelectElement).selectedIndex = 0;
  (document.getElementById("destinos") as HTMLSelectElement).selectedIndex = 0;
  fecha.value = "";
  banderainsert = false;
}

export function cargar(op: ArquilerBarco) {
  const conductorelect = document.querySelector(
    "#conductor"
  ) as HTMLSelectElement;
  const socioSelect = document.querySelector("#socioL") as HTMLSelectElement;
  const barcoselect = document.querySelector("#barcos") as HTMLSelectElement;

  destinos.value = op.nombreDestino;
  fecha.value = op.fecha_salida;
  cuota = parseInt(op.CuotaPagar);

  if (op.nombreCliente.length > 0) {
    const dueno = op.nombreCliente[0];

    for (let i = 0; i < socioSelect.options.length; i++) {
      const option = socioSelect.options[i];
      try {
        const optionValue = JSON.parse(option.value);

        if (optionValue.cedula === dueno.cedula) {
          socioSelect.selectedIndex = i;
          break;
        }
      } catch (error) {}
    }
  }

  if (op.nombreConductor.length > 0) {
    const dueno = op.nombreConductor[0];

    for (let i = 0; i < conductorelect.options.length; i++) {
      const option = conductorelect.options[i];
      try {
        const optionValue = JSON.parse(option.value);
        if (optionValue.cedula === dueno.cedula) {
          conductorelect.selectedIndex = i;
          break;
        }
      } catch (error) {}
    }
  }
  if (op.nombreBarco.length > 0) {
    const dueno = op.nombreBarco[0];

    for (let i = 0; i < barcoselect.options.length; i++) {
      const option = barcoselect.options[i];
      try {
        const optionValue = JSON.parse(option.value);

        if (optionValue.numeroMatricula === dueno.numeroMatricula) {
          barcoselect.selectedIndex = i;
          break;
        }
      } catch (error) {}
    }
  }

  posedit = op.id;
  banderainsert = true;
}

export function eliminar(pos: string) {
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
      crud.Eliminar(pos);
      divTViajesH1.textContent = crud.ListaArquilerBarcoF.length.toString();
      divTViajes!.appendChild(divTViajesH1);
      Actualizar();
      Swal.fire("¡Eliminado!", "El registro ha sido eliminado.", "success");
    }
  });
}

export function cuotaPagar() {
  if (destinos.value == "Dubai") {
    cuota = 100;
  } else if (destinos.value == "Caracas") {
    cuota = 200;
  } else if (destinos.value == "Japon") {
    cuota = 300;
  }
  if (destinos.value == "Francia") {
    cuota = 400;
  }
  if (destinos.value == "Mexico") {
    cuota = 150;
  }
  if (destinos.value == "Chile") {
    cuota = 100;
  }
}

export function TotalRecaudato() {
  let total = 0;
  for (let i = 0; i < crud.ListaArquilerBarcoF.length; i++) {
    const alquiler = crud.ListaArquilerBarcoF[i];

    if (alquiler.nombreCliente && alquiler.nombreCliente.length > 0) {
      if (alquiler.nombreCliente[0].tipo === "Cliente") {
        total += parseInt(alquiler.CuotaPagar);
      }
    }
  }
  divprecionfinH1.textContent = total.toString();
  divprecionfin!.appendChild(divprecionfinH1);
}

export function BarcoNumeroV() {
  if (!crud.ListaArquilerBarcoF || crud.ListaArquilerBarcoF.length === 0) {
    console.log("La lista está vacía o no existe.");

    divMayorFH1.textContent = "---";
    divMayorF!.appendChild(divMayorFH1);

    divTViajesH1.textContent = crud.ListaArquilerBarcoF.length.toString();
    divTViajes!.appendChild(divTViajesH1);

    return null;
  }
  const matriculaCount: { [key: string]: number } = {};

  crud.ListaArquilerBarcoF.forEach((item) => {
    const matricula = item.nombreBarco[0].numeroMatricula;

    if (matricula) {
      if (matriculaCount[matricula]) {
        matriculaCount[matricula]++;
      } else {
        matriculaCount[matricula] = 1;
      }
    }
  });

  let maxCount = 0;
  let mostFrequentMatricula = null;

  for (const matricula in matriculaCount) {
    if (matriculaCount[matricula] > maxCount) {
      maxCount = matriculaCount[matricula];
      mostFrequentMatricula = matricula;
    } else {
    }
  }

  divMayorFH1.textContent = mostFrequentMatricula;
  divMayorF!.appendChild(divMayorFH1);
  console.log(crud.ListaArquilerBarcoF.length.toString());

  divTViajesH1.textContent = crud.ListaArquilerBarcoF.length.toString();
  divTViajes!.appendChild(divTViajesH1);

  return mostFrequentMatricula;
}


export function Actualizar() {
  // Mostrar el loader
  document.getElementById('loader')!.classList.remove('hidden');
  crud.cargarDatos()
      .then(() => {
         
          document.getElementById('loader')!.classList.add('hidden');
          Listar(crud);
          TotalRecaudato();
          BarcoNumeroV(); 
      })
      .catch((error) => {
          
          document.getElementById('loader')!.classList.add('hidden');

          console.error("Error al cargar los datos:", error);
      });
}


export function Listar(op: TlistaArquilerBarco) {
  const body = document.querySelector("tbody")!;
  body.innerHTML = "";

  const clase =
    "px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200";

  op.ListaArquilerBarcoF.forEach((arquilerBarco, index) => {
    const tabla = document.createElement("tr");

    const nombrec = document.createElement("td");
    nombrec.className = clase;
    nombrec.textContent =
      arquilerBarco.nombreConductor[0].nombre +
      " " +
      arquilerBarco.nombreConductor[0].apellido;

    const nomcli = document.createElement("td");
    nomcli.className = clase;
    nomcli.textContent =
      arquilerBarco.nombreCliente[0].nombre +
      " " +
      arquilerBarco.nombreCliente[0].apellido;

    const barco = document.createElement("td");
    barco.className = clase;
    barco.textContent = arquilerBarco.nombreBarco[0].numeroMatricula;

    const desti = document.createElement("td");
    desti.className = clase;
    desti.textContent = arquilerBarco.nombreDestino;

    const fecha = document.createElement("td");
    fecha.className = clase;

    const fechaSalida1 = new Date(arquilerBarco.fecha_salida);
    const dia = fechaSalida1.getDate().toString().padStart(2, "0");
    const mes = (fechaSalida1.getMonth() + 1).toString().padStart(2, "0");
    const año = fechaSalida1.getFullYear();
    fecha.textContent = `${dia}/${mes}/${año}`;

    const hora = document.createElement("td");
    hora.className = clase;

    const fechaSalida = new Date(arquilerBarco.fecha_salida);
    const horas = fechaSalida.getHours().toString().padStart(2, "0");
    const minutos = fechaSalida.getMinutes().toString().padStart(2, "0");
    hora.textContent = `${horas}:${minutos}`;

    const cuota = document.createElement("td");
    cuota.className = clase;
    cuota.textContent = arquilerBarco.CuotaPagar;

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
        cargar(arquilerBarco);
        const botonAgregar = document.getElementById("btnNuevo");
        if (botonAgregar) {
          botonAgregar.click();
        }
      } else if (target === botonEliminar) {
        console.log(
          "Eliminando arquilerBarco en la posición:",
          arquilerBarco.id
        );
        eliminar(arquilerBarco.id);
      }
    });

    tabla.append(nombrec, nomcli, barco, desti, fecha, hora, cuota, edit);

    const body = document.querySelector("tbody")!;
    body.prepend(tabla);
  });
}
export function Advertencia() {
  toastr.options = {
    closeButton: false,
    debug: false,
    newestOnTop: false,
    progressBar: false,
    positionClass: "toast-top-center",
    preventDuplicates: false,
    showDuration: 300,
    hideDuration: 1000,
    timeOut: 5000,
    extendedTimeOut: 1000,
    showEasing: "swing",
    hideEasing: "linear",
    showMethod: "fadeIn",
    hideMethod: "fadeOut",
  };
  toastr["error"](
    "Lo siento, no puedes alquilar porque eres menor de edad.",
    "Error!"
  );
}
