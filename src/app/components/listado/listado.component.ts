import { Component, Input, signal,inject, ViewChild } from '@angular/core';
import { EnvioDataService } from '../servicios/envioData/envio-data.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { SharedService } from 'src/app/components/servicios/sharedService/shared.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmacionBorradoComponent } from '../modals/confirmacion-borrado/confirmacion-borrado.component';
import { ModificarEstanciaComponent } from '../modals/modificar-estancia/modificar-estancia.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { AgregarEstanciaComponent } from '../modals/agregar-estancia/agregar-estancia.component';
import { AgregarReservaComponent } from '../modals/agregar-reserva/agregar-reserva.component';
import { AuthService } from '../servicios/auth/auth.service';

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
})
export class ListadoComponent {
  constructor(
    private autService: AuthService,
    private dataService: EnvioDataService,
    private http: HttpClient,
    public sharedService: SharedService,
    public dialog: MatDialog,
    public authService: AuthService,

  ) {}

  @Input() data: any[] = [];
  dataSource = new MatTableDataSource(this.data);
  expanded: boolean = false;
  columnsToDisplay = ['nombre', 'calefont', 'cocina', 'camas_dobles', 'camas_individuales', 'precio_noche', 'tipo'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: InfoCabania | null | undefined;
  readonly panelOpenState = signal(false);
  datosRecibidos: any = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;  // Agrega el ViewChild para el paginador

  columnNamesMap: { [key: string]: string } = {
    'nombre': 'Nombre',
    'calefont': 'Calefont',
    'camas_dobles': 'Camas dobles',
    'camas_individuales': 'Camas individuales',
    'cocina': 'Cocina',
    'precio_noche': 'Precio por noche',
    'tipo': 'Tipo de cabaña'
  };

  ngOnInit() {

    this.dataService.data$.subscribe((data) => {
      this.datosRecibidos = data;
      this.dataSource.data = this.datosRecibidos;
    });
    console.log(this.autService.getRol(),'el rol')
    
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;  // Asigna el paginador después de inicializar la vista
  }

  modificar(id: number): void {
    this.dialog.open(ModificarEstanciaComponent, {
      data: { message: id }
    });
  }

  openDialog(id: number): void {
    this.dialog.open(ConfirmacionBorradoComponent, {
      width: '300px',
      data: { message: id }
    });
  }

  agregarReserva(id: number): void {
    this.dialog.open(AgregarReservaComponent, {
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
