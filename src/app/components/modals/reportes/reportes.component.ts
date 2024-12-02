import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


const today = new Date();
const month = today.getMonth();
const year = today.getFullYear();


@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent {
  duracionPromedio: any = {
    duracion_media_periodo: 0
  };

  diferenciaPromedios: any = {
    Periodo_1: 0,
    Periodo_2:0,
    diferencia:0
  };

  tarifaDiariaPromedio: any = {
    tarifa_diaria_promedio_periodo: 0
  };

/*   incrementoIngresoRespuesta: Object = {´
    Periodo_1
  };
 */

  tarifaPromedio: any;


  readonly range = new FormGroup({
    fecha_inicio: new FormControl<Date | null>(null),
    fecha_fin: new FormControl<Date | null>(null),
  });

  readonly rangoTarifa = new FormGroup({
    fecha_inicio: new FormControl<Date | null>(null),
    fecha_fin: new FormControl<Date | null>(null),
  });


  readonly incrementoIngreso = new FormGroup({
    fecha_inicio_1: new FormControl<Date | null>(null),
    fecha_fin_1: new FormControl<Date | null>(null),
    fecha_inicio_2: new FormControl<Date | null>(null),
    fecha_fin_2: new FormControl<Date | null>(null)
  });


  readonly campaignOne = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  readonly campaignTwo = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });


  constructor(
    private http: HttpClient,
    public dialogRef: MatDialogRef<ReportesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string, tipoDeBorrado: Number, nombre: String, formulario: any, accion: string }
  ) { }
  ngOnInit() {
    console.log(this.data.message)

    if (this.data.message == '1') {

      this.http.get(' http://localhost:3000/reporte/duracion-avg').subscribe((duracionPromedio: any) => {
        console.log(duracionPromedio)
        this.duracionPromedio = duracionPromedio
      });
    }
    if (this.data.message == '3') {

      this.http.get('http://localhost:3000/reporte/tarifa-avg').subscribe((tarifaPromedio: any) => {
        this.tarifaPromedio = tarifaPromedio
      });
    }


  }


  obtenerMedia() {
    if (this.range.valid) {
      console.log(this.range.value)

      this.http.post('http://localhost:3000/reporte/duracion-periodo', this.range.value).subscribe(
        (data) => {
          this.tarifaPromedio = data
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      alert('INGRESO NO VALIDO');
    }
  }


  obtenerTarifaDiariaPromedio() {
    if (this.rangoTarifa.valid) {
     // console.log(this.incrementoIngreso.value)

      this.http.post('http://localhost:3000/reporte/tarifa-periodo', this.rangoTarifa.value).subscribe(
        (data) => {
          console.log(data)
          this.tarifaDiariaPromedio = data 
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      alert('INGRESO NO VALIDO');
    }
  }


  obtenerIncrementoDeIngresos() {
    const resultado = {
      fecha_inicio_1: this.campaignOne.value.start,
      fecha_fin_1: this.campaignOne.value.end,
      fecha_inicio_2: this.campaignTwo.value.start,
      fecha_fin_2: this.campaignTwo.value.end
    };

    
    if (this.rangoTarifa.valid) {
      console.log(this.rangoTarifa.value)

      this.http.post('http://localhost:3000/reporte/incremento-ingresos', resultado).subscribe(
        (data) => {
          console.log(data)
          this.diferenciaPromedios= data
/*           this.tarifaDiariaPromedio = data */
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      alert('INGRESO NO VALIDO');
    }
  }
}

