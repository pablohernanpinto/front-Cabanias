import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacionDePagoComponent } from './informacion-de-pago.component';

describe('InformacionDePagoComponent', () => {
  let component: InformacionDePagoComponent;
  let fixture: ComponentFixture<InformacionDePagoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InformacionDePagoComponent]
    });
    fixture = TestBed.createComponent(InformacionDePagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
