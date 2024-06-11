import { Persona } from "../Socio/Persona";

export class Barco {
  numeroMatricula: string;
  nombre: string;
  duenoB: Persona[];
  numeroAmarre: string;
  cuota: string;

  constructor(numeroMatricula: string, nombre: string,numeroAmarre: string, cuota: string) {

      this.numeroMatricula = numeroMatricula;
      this.nombre = nombre;
      this.duenoB = [];
      this.numeroAmarre = numeroAmarre;
      this.cuota = cuota;
  }

}