import { Component } from '@angular/core';
import { SharedService } from 'src/app/components/servicios/sharedService/shared.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css'],
})
export class BodyComponent {
  constructor(
    public sharedService: SharedService,
  ){

  }

}
