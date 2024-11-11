import { Component, Input, signal, ViewChild } from '@angular/core';
import { EnvioDataService } from '../servicios/envioData/envio-data.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { SharedService } from 'src/app/components/servicios/sharedService/shared.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmacionBorradoComponent } from '../modals/confirmacion-borrado/confirmacion-borrado.component';
import { ModificarEstanciaComponent } from '../modals/modificar-estancia/modificar-estancia.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
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
  reservas: any;
  constructor(
    private dataService: EnvioDataService,
    public sharedService: SharedService,
    public dialog: MatDialog,
    public authService: AuthService,
    private http: HttpClient,


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
    const url = 'http://localhost:3000/reservas';
    this.http.get(url).subscribe((data: any) => {
      this.reservas = data
      
    })

    this.dataService.data$.subscribe((data) => {
      this.datosRecibidos = data;
      this.dataSource.data = this.datosRecibidos;
    });

    
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
      data: { message: id,tipoDeBorrado: 1,nombre: 'estancia' }
    });
  }

  agregarReserva(id: number): void {
    this.dialog.open(AgregarReservaComponent, {
      data: { message: id }
    });
  }


  // Función para alternar la expansión de la fila y capturar el ID
  toggleRow(element: any): void {
    // Si la fila está expandida, colapsarla; si no, expandirla
    this.expandedElement = this.expandedElement === element ? null : element;

    // Obtener el ID del elemento expandido y enviarlo a otra función
    if (this.expandedElement) {
      const idEstancia = this.expandedElement.id_estancia;
      this.miFuncionParaEnviarID(idEstancia);
    }
  }

  // Función para manejar el ID del elemento expandido
  miFuncionParaEnviarID(id: number): void {
    const reservasFiltradas = this.reservas.filter((reserva: { id_estancia: number; }) => reserva.id_estancia === Number(id));
    this.dataService.envioFiltrados(reservasFiltradas)
    // Lógica adicional para procesar el ID
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
