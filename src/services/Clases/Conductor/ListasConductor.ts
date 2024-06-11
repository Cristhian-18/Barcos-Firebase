import { Conductor } from "./Conductor";

export class TlistaConductor {
  ListaConductor: Conductor[];
  ListaConductorF:Conductor[];

  constructor() { 
    const storedData = localStorage.getItem('listaConductor');
    this.ListaConductorF = storedData ? JSON.parse(storedData) : [];
    if (!storedData) {
        this.agregarDatosPredefinidos();
    }
    this.ListaConductor = [];
  }

  Insertar(op: Conductor) {
    this.ListaConductorF.push(op);
    this.guardarEnLocalStorage();
  }
  Modificar(pos: number, op: Conductor) {
    this.ListaConductorF[pos] = op;
    this.guardarEnLocalStorage();
  }
  Eliminar(pos: number) {
    this.ListaConductorF.splice(pos, 1);
    this.guardarEnLocalStorage();
  }

  Listar() {
    this.ListaConductorF.forEach((a) => {
      return a;
    });
  }


  private guardarEnLocalStorage() {
    localStorage.setItem('listaConductor', JSON.stringify(this.ListaConductorF));
}

// Método para agregar los datos predefinidos si el localStorage está vacío
private agregarDatosPredefinidos() {
    this.ListaConductorF = [
      {
        cedula:"0701125256",
        nombre:"Jose",
        apellido:"Perez",
      },
      {
        cedula:"0701141412",
        nombre:"Luis",
        apellido:"Gomez",
      },
      {
        cedula:"0703362658",
        nombre:"Pepe",
        apellido:"Minalla",
      }
    ];
}
}
