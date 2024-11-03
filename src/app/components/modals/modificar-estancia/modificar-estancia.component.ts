import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modificar-estancia',
  templateUrl: './modificar-estancia.component.html',
  styleUrls: ['./modificar-estancia.component.css']
})
export class ModificarEstanciaComponent {
  estanciaModificar: any;
  constructor(
    private http: HttpClient,
    public dialogRef: MatDialogRef<ModificarEstanciaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string },
    private formBuilder: FormBuilder
  ) {}

  formulario = this.formBuilder.group({
    nombre: '',
    tipo: '',
    precio_noche: '',
    camas_individuales:Number, // number
    camas_dobles:Number,
    disponibilidad: '',
    cocina: '',
    calefont: '',
  })
  ngOnInit() {

    this.http.get('http://localhost:3000/estancias/'+this.data.message).subscribe((estancia: any) => {
      this.estanciaModificar = estancia
      console.log(this.estanciaModificar,'reservas')
    });
  } 

  closeDialog() {
    window.location.reload();
  }

  limpiarObjeto(obj: any): any {
    const nuevoObjeto: any = {};
  
    Object.keys(obj).forEach((key) => {
      const valor = obj[key];
  
      // Verifica si el valor es una cadena vacía o una función, si no lo es, lo agrega al nuevo objeto
      if (valor !== "" && typeof valor !== "function") {
        nuevoObjeto[key] = valor;
      }
    });
  
    return nuevoObjeto;
  }
  


  addUsuarios() {
    if (this.formulario.valid) {
      console.log(this.formulario.value, 'este e e s s s')
      const nuevoObjeto = this.limpiarObjeto(this.formulario.value)
       this.http.put('http://localhost:3000/estancias/'+this.data.message, nuevoObjeto).subscribe(
          (data) => {
            alert('SE MODIFICADO LA ESTANCIA');

            window.location.reload();
          },
          (error) => {
            console.log(this.formulario.value);
            alert('ERROR AL MODIFICAR ESTANCIA');
            console.error(error);
          }
        ); 
    } else {
      alert('MODIFICACION NO VALIDA');
    }
  }
}
