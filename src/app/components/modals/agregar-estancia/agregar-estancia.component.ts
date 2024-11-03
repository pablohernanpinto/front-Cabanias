import { Component,  } from '@angular/core';
import { FormBuilder,  Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-agregar-estancia',
  templateUrl: './agregar-estancia.component.html',
  styleUrls: ['./agregar-estancia.component.css']
})
export class AgregarEstanciaComponent {

  constructor(private http: HttpClient,private formBuilder: FormBuilder) { }

  formulario = this.formBuilder.group({
    nombre: '',
    tipo: '',
    precio_noche: '',
    camas_individuales: [0, Validators.required], // number
    camas_dobles: [0, Validators.required],
    disponibilidad: '',
    cocina: '',
    calefont: '',
  })


  closeDialog() {

    window.location.reload();

  }

  addUsuarios() {
    if (this.formulario.valid) {

      this.http.post('http://localhost:3000/estancias', this.formulario.value).subscribe(
          (data) => {
            alert('SE HA INGRESADO LA ESTANCIA');
            console.log(data);
            window.location.reload();


          },
          (error) => {
            console.log(this.formulario.value);
            alert('ERROR AL INGRESAR ESTANCIA');
            console.error(error);
          }
        );
    } else {
      alert('INGRESO NO VALIDO');
    }
  }
}
