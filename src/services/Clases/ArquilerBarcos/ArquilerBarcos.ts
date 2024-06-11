import { Barco } from "../Barcos/Barcos";
import { Conductor } from "../Conductor/Conductor";
import { Persona } from "../Socio/Persona";

export class ArquilerBarco {
  nombreConductor: Conductor[];
  nombreCliente: Persona[];
  nombreBarco:Barco[];
  nombreDestino:string;
  fecha_salida: string;
  CuotaPagar: string;

  constructor( desti:string, fecha_salida: string, CuotaPagar: string) {
    this.nombreConductor = [];
    this.nombreCliente = [];
    this.nombreBarco = [];
    this.nombreDestino = desti;
    this.fecha_salida = fecha_salida;
    this.CuotaPagar = CuotaPagar;
  }
}
