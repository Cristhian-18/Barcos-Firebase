

export class Persona
{
   cedula:string;
   nombre:string;
   apellido:string;
   fecha_Nacimiento:string;
   sexo:string;
   estado_civil:string;
   tipo:string

  constructor(cedu:string,nomb:string, apelli:string, fecha_na:string, sex:string, esta:string,tipo:string){
    this.cedula = cedu;
    this.nombre = nomb;
    this.apellido = apelli;
    this.fecha_Nacimiento = fecha_na;
    this.sexo = sex;
    this.estado_civil = esta;
    this.tipo = tipo
  }
    
}


