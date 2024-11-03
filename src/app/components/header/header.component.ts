import { Component } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/components/servicios/sharedService/shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  
})
export class HeaderComponent {

  isChecked:boolean = true;

  constructor(private router: Router,
              public sharedService: SharedService,
  ){

  }
  inicio(){
    this.router.navigate(['/'])
  }
  onToggle(event: MatSlideToggleChange) {
    this.sharedService.isChecked = event.checked; // Actualiza la variable del servicio
  }
  
}
