import { Component, Input, signal,inject } from '@angular/core';
import { EnvioDataService } from '../servicios/envioData/envio-data.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { SharedService } from 'src/app/components/servicios/sharedService/shared.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmacionBorradoComponent } from '../modals/confirmacion-borrado/confirmacion-borrado.component';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})export class ListadoComponent {
  constructor(private dataService: EnvioDataService,
              private http: HttpClient,
              public sharedService: SharedService,
              public dialog: MatDialog

  ) {}


  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };
  @Input() data: any[] = [];
  dataSource = this.data;
  expanded: boolean = false;
  columnsToDisplay = ['nombre', 'calefont','cocina', 'camas_dobles', 'camas_individuales',  'precio_noche', 'tipo'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: InfoCabania | null | undefined;
  readonly panelOpenState = signal(false);
  datosRecibidos: any = [];
  reservas: any = []; 

  columnNamesMap: { [key: string]: string } = {
    'nombre': 'Nombre',
    'calefont': 'Calefacción',
    'camas_dobles': 'Camas dobles',
    'camas_individuales': 'Camas individuales',
    'cocina': 'Cocina',
    'precio_noche': 'Precio por noche',
    'tipo': 'Tipo de cabaña'
  };

  

  ngOnInit() {
    this.dataService.data$.subscribe((data) => {

      this.datosRecibidos = data; // Actualiza con los datos recibidos
      this.dataSource = this.datosRecibidos; // Asigna los datos recibidos al dataSource
      
    });
    
    this.http.get('http://localhost:3000/reservas/').subscribe((reservas: any) => {
      this.reservas = reservas
      console.log(this.reservas,'reservas')
    });
  }


  openDialog(id:number): void {
    const dialogRef = this.dialog.open(ConfirmacionBorradoComponent, {
      width: '300px',
      data: { message: id }
    });
  }


}

export interface InfoCabania {
  id_estancia: number;
  nombre: string;
  tipo: string;
  precio_noche: string;
  camas_individuales: number;
  camas_dobles: number;
  disponibilidad: boolean;
  cocina: boolean;
  calefont: boolean;
}
