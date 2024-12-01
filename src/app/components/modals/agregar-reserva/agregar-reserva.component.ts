import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { ModificarEstanciaComponent } from '../modificar-estancia/modificar-estancia.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmacionBorradoComponent } from '../confirmacion-borrado/confirmacion-borrado.component';
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
    public dialog: MatDialog,

    private http: HttpClient,
    public dialogRef: MatDialogRef<ModificarEstanciaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string, precio_noche: string },
    private formBuilder: FormBuilder
  ) { }
  formulario!: FormGroup;
  // Inicializar el formulario
  closeDialog() {
    window.location.reload();
  }

  calcularPrecio() {
    console.log(this.formulario.value.fecha_inicio, this.formulario.value.fecha_fin)

    // Calcular la diferencia en milisegundos
    const diferenciaEnMilisegundos = this.formulario.value.fecha_fin.getTime() - this.formulario.value.fecha_inicio.getTime();

    // Convertir la diferencia de milisegundos a días
    console.log(diferenciaEnMilisegundos / (1000 * 3600 * 24), 'dias')
    this.formulario.value.monto_pago = Number(this.data.precio_noche) * (diferenciaEnMilisegundos / (1000 * 3600 * 24));


  }
  AgregarReserva() {
    console.log(this.formulario.valid, 'el formulario')
    if (this.formulario.valid) {
      this.calcularPrecio()
      this.dialog.open(ConfirmacionBorradoComponent, {
        width: '400px',
        data: { message: this.formulario.value.monto_pago, tipoDeBorrado: 3, formulario: this.formulario }
      });

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
      fecha_fin: [null],  // Control para la fecha de fin
      metodo_pago: '',
      monto_pago: 0

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


  Calcular_precio(fecha: any) {
    console.log(fecha)

  }
}