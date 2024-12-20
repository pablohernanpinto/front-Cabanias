import { HttpClient } from '@angular/common/http';
import { Component, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EnvioDataService } from '../servicios/envioData/envio-data.service';
import { ConfirmacionBorradoComponent } from '../modals/confirmacion-borrado/confirmacion-borrado.component';
import { MatDialog } from '@angular/material/dialog';
import { InformacionDePagoComponent } from '../modals/informacion-de-pago/informacion-de-pago.component';

@Component({
  selector: 'app-listado-reservas',
  templateUrl: './listado-reservas.component.html',
  styleUrls: ['./listado-reservas.component.css']
})
export class ListadoReservasComponent {
  
  @Input()  id!:any

  constructor(
    public dialog: MatDialog,
    private dataService: EnvioDataService,

  ) {}

  reservas: any[] = [];

  displayedColumns: string[] = ['fecha_inicio', 'fecha_fin', 'estado', 'fecha_reserva', 'info_pago' ,'accion'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  borrarReserva(id: number): void {
    this.dialog.open(ConfirmacionBorradoComponent, {
      width: '300px',
      data: { message: id,tipoDeBorrado: 2,nombre: 'reserva', accion: 'cancelar' }
    });
  }

  informacionPago(id: number):void{
    this.dialog.open(InformacionDePagoComponent, {
      width: '300px',
      data: { message: id,tipoDeBorrado: -1,nombre: 'pago', accion: 'confirmar' }
    });

  }

  ngOnInit() {
    this.reservas = this.id


    this.dataService.dataFiltrado$.subscribe((data) => {
      this.reservas = data;
      this.dataSource.data = data;
    });

  }
}

