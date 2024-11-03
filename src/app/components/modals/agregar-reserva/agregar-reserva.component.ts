import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { ModificarEstanciaComponent } from '../modificar-estancia/modificar-estancia.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-agregar-reserva',
  templateUrl: './agregar-reserva.component.html',
  styleUrls: ['./agregar-reserva.component.css']
})
export class AgregarReservaComponent {

  startDate = new FormControl(new Date());
  endDate = new FormControl(new Date());
  unavailableDates: Date[] = [];
  reservas: any;
  reservasFiltradas: any;

  constructor(

    private http: HttpClient,
    public dialogRef: MatDialogRef<ModificarEstanciaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string },
    private formBuilder: FormBuilder
  ) { }
  formulario!: FormGroup;


  // Inicializar el formulario
  closeDialog() {
    window.location.reload();
  }

  AgregarReserva() {
    if (this.formulario.valid) {
      // Accede a los valores de las fechas seleccionadas
      const { startDate, endDate } = this.formulario.value;



      console.log(this.formulario.value, 'este es')
      // Aquí puedes añadir la lógica para guardar la reserva

      this.http.post('http://localhost:3000/reservas', this.formulario.value).subscribe(
        (data) => {
          alert('SE HA REGISTRADO LA RESERVA');
          console.log(data);
          window.location.reload();


        },
        (error) => {
          console.log(this.formulario.value);
          alert('ERROR AL REGISTRAR LA RESERVA');
          console.error(error);
        }
      );
    } else {
      alert('INGRESO NO VALIDO');
    }

  }



  ngOnInit() {
    this.http.get('http://localhost:3000/reservas/').subscribe((reservas: any) => {
      this.reservas = reservas;
      const reservasFiltradas = reservas.filter((reserva: { id_estancia: number; }) => reserva.id_estancia === Number(this.data.message));
      this.unavailableDates = this.getUnavailableDates(reservasFiltradas);
    });

    this.formulario = this.formBuilder.group({
      id_estancia: this.data.message,
      fecha_inicio: [null], // Control para la fecha de inicio
      fecha_fin: [null]    // Control para la fecha de fin
    });


  };

  getUnavailableDates(reservas: any[]): Date[] {
    console.log(reservas)
    let unavailable: Date[] = [];
    reservas.forEach(reserva => {
      const start = new Date(reserva.fecha_inicio);
      const end = new Date(reserva.fecha_fin);
      let currentDate = start;
      while (currentDate <= end) {
        unavailable.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }
    });
    return unavailable;
  }

  isDateAvailable = (d: Date | null): boolean => {
    const date = (d || new Date());
    return !this.unavailableDates.some(
      unavailableDate => unavailableDate.getTime() === date.getTime()
    );
  };
}


